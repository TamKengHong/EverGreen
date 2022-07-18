from django.core.management.base import BaseCommand

from decouple import config
from django.conf import settings
from stockmarket.models import UpcomingEarnings
import requests,csv,datetime
from dateutil.relativedelta import relativedelta

#default period is 3 months
def earningsCalendar(AV_KEY,PERIOD="3month",STOCK=None):
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

def run_script():    
    AV_KEY = config("AV_KEY")
    #retrieve and delete old record
    qs = UpcomingEarnings.objects.all()
    if len(qs) > 0:
        instance = qs[0] #there is only one item in queryset
        instance.delete()
    earnings = UpcomingEarnings(data=sort_by_date_within_next_month(earningsCalendar(AV_KEY)))
    UpcomingEarnings.save(earnings)

class Command(BaseCommand):
    help = 'Collects upcoming earnings from Alphavantage API'
    def handle(self, *args, **options):
        run_script()
        return