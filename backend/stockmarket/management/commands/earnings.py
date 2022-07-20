from django.core.management.base import BaseCommand

from decouple import config
from django.conf import settings
from stockmarket.models import UpcomingEarnings
import requests,csv,datetime,pickle,os
import yfinance as yf
from dateutil.relativedelta import relativedelta

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

def filter_for_earnings_of_stocks_above_300M(earnings_list):
    #read in preloaded set of stocks above 300 million in market cap from .pkl file
    file_path = os.path.join(settings.BASE_DIR,'stockmarket','stocks_above_300M.pkl')
    with open(file_path,"rb") as f:
        stocks_above_300M = pickle.load(f)
    return list(filter(lambda row: row[0] in stocks_above_300M,earnings_list))
#consolidate earnings by dates
def process(sorted_earnings_list):
    dct = {}
    for row in sorted_earnings_list:
        ticker,date = row[0],row[2]
        if date not in dct:
            dct[date] = [ticker]
        else:
            dct[date].append(ticker)
    return dct

def transform(sorted_earnings_list):
    return [{"ticker": row[0],"date": row[2],"implied_earnings_move": calculate_implied_move(row[0])} for row in sorted_earnings_list]

def calculate_implied_directional_move(current_stock_price,directional_options):
    #use 1 billion as an arbitrarily large number
    implied_directional_move,diff = 0,1000000000
    for row in directional_options.itertuples():
        closeness = abs(row.strike - current_stock_price)
        if closeness < diff:
            diff = closeness
            implied_directional_move = row.lastPrice/row.strike
    return round((implied_directional_move)*100,3)
    
def calculate_implied_move(STOCK):
    stock = yf.Ticker(STOCK)
    #return 0 if the stock does not have options
    if not stock.options:
        return 0
    earliest_option_date = stock.options[0]
    optchain = stock.option_chain(date=earliest_option_date)
    current_stock_price = stock.info["regularMarketPrice"]
    implied_calls_move = calculate_implied_directional_move(current_stock_price,optchain.calls)
    implied_puts_move = calculate_implied_directional_move(current_stock_price,optchain.puts)
    return round((implied_calls_move + implied_puts_move),2)
    
def run_script():    
    AV_KEY = config("AV_KEY")
    #retrieve and delete old record
    qs = UpcomingEarnings.objects.all()
    if len(qs) > 0:
        instance = qs[0] #there is only one item in queryset
        instance.delete()
    sorted_earnings_list = sort_by_date_within_next_month(filter_for_earnings_of_stocks_above_300M(earnings_calendar(AV_KEY)))
    earnings = UpcomingEarnings(data=transform(sorted_earnings_list),processedData = process(sorted_earnings_list))
    UpcomingEarnings.save(earnings)

class Command(BaseCommand):
    help = 'Collects upcoming earnings from Alphavantage API'
    def handle(self, *args, **options):
        run_script()
        return