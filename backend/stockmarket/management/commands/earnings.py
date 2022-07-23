from django.core.management.base import BaseCommand

from decouple import config
from django.conf import settings
from stockmarket.models import UpcomingEarnings
import requests,csv,datetime,pickle,os
from dateutil.relativedelta import relativedelta
import yfinance as yf

#default period is 3 months
def earnings_calendar(AV_KEY,PERIOD="3month",STOCK=None):
    FUNCTION = "EARNINGS_CALENDAR"
    if not STOCK: #no stock provided
        CSV_URL = f'https://www.alphavantage.co/query?function={FUNCTION}&horizon={PERIOD}&apikey={AV_KEY}'
    else:
        CSV_URL = f'https://www.alphavantage.co/query?function={FUNCTION}&symbol={STOCK}&horizon={PERIOD}&apikey={AV_KEY}'
    my_list = []
    with requests.Session() as s:
        download = s.get(CSV_URL)
        decoded_content = download.content.decode('utf-8')
        cr = csv.reader(decoded_content.splitlines(), delimiter=',')
        my_list = list(cr)[1:] #remove header
    return my_list

def sort_by_date(lst):
    return sorted(lst,key = lambda x: datetime.datetime.strptime(x[2], "%Y-%m-%d"))

def sort_by_date_within_next_month(lst):
    today = datetime.datetime.today()
    date_after_month = today + relativedelta(months=1)
    lst = filter(lambda x: datetime.datetime.strptime(x[2],"%Y-%m-%d") <= date_after_month,lst)
    return sort_by_date(lst)

def filter_for_earnings_of_stocks_above_2B(earnings_list):
    #read in preloaded set of stocks above 300 million in market cap from .pkl file
    file_path = os.path.join(settings.BASE_DIR,'stockmarket','stocks_above_2B.pkl')
    with open(file_path,"rb") as f:
        stocks_above_2B= pickle.load(f)
    return list(filter(lambda row: row[0] in stocks_above_2B,earnings_list))

#returns a Python Datetime object in UTC
def get_upcoming_earnings_date(STOCK):
    stock = yf.Ticker(STOCK)
    try:
        upcoming_earnings_date = stock.calendar.loc["Earnings Date"]["Value"]
        #converts the Pandas Timestamp object into a native Python datetime object
        return upcoming_earnings_date.to_pydatetime()
    except: #earnings date is not present, return datetime object representing 0
        return datetime.datetime(0,0,0,0,0)

#checks if upcoming_earnings_date is premarket or afterhours
def classify_upcoming_earnings_date(upcoming_earnings_date):
    if upcoming_earnings_date == datetime.datetime(0,0,0,0,0):
        return "Earnings call time not available"
    #convert UTC to eastern time by subtracting four hours, since the given time is in UTC
    eastern_time = (upcoming_earnings_date - datetime.timedelta(hours=4)).time()
    #the US stock market opens at 9:30am and closes at 4pm
    OPENING_TIME,CLOSING_TIME = datetime.time(9,30),datetime.time(16,0)
    if eastern_time <= OPENING_TIME:
        return "Before market open"
    if eastern_time >= CLOSING_TIME:
        return "After market close"
    #return an error message if the time is during official stock market hours
    return "An error has occurred; the time coincides with operation hours"

#consolidate earnings by dates
def process(sorted_earnings_list):
    dct = {}
    for row in sorted_earnings_list:
        ticker,date = row[0],row[2]
        classification = classify_upcoming_earnings_date(get_upcoming_earnings_date(ticker))
        if date not in dct:
            dct[date] = {"Before market open":[],"After market close": [],"An error has occurred; the time coincides with operation hours": [],"Earnings call time not available": []}
        dct[date][classification].append(ticker)
    return dct

def transform(sorted_earnings_list):
    return [{"ticker": row[0],"date": row[2]} for row in sorted_earnings_list]
    
def run_script():    
    AV_KEY = config("AV_KEY")
    #retrieve and delete old record
    qs = UpcomingEarnings.objects.all()
    if len(qs) > 0:
        instance = qs[0] #there is only one item in queryset
        instance.delete()
    sorted_earnings_list = sort_by_date_within_next_month(filter_for_earnings_of_stocks_above_2B(earnings_calendar(AV_KEY)))
    earnings = UpcomingEarnings(data=transform(sorted_earnings_list),processedData = process(sorted_earnings_list))
    UpcomingEarnings.save(earnings)

class Command(BaseCommand):
    help = 'Collects upcoming earnings from Alphavantage API'
    def handle(self, *args, **options):
        run_script()
        return