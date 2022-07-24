import yfinance as yf
import datetime
from django.http import QueryDict
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


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

#returns a Python Datetime object in UTC
def get_upcoming_earnings_date(STOCK):
    stock = yf.Ticker(STOCK)
    try:
        upcoming_earnings_date = stock.calendar.loc["Earnings Date"]["Value"]
        #converts the Pandas Timestamp object into a native Python datetime object
        return upcoming_earnings_date.to_pydatetime()
    except: #earnings date is not present, return None
        return None

#checks if upcoming_earnings_date is premarket or afterhours
def classify_upcoming_earnings_date(upcoming_earnings_date):
    if upcoming_earnings_date is None:
        return "Earnings call time not available"
    #convert UTC to eastern time by subtracting four hours, since the given time is in UTC
    #note: this is not necessarily always the case due to daylights saving time, but this code will suffice for now
    eastern_time = (upcoming_earnings_date - datetime.timedelta(hours=4)).time()
    #the US stock market opens at 9:30am and closes at 4pm
    OPENING_TIME,CLOSING_TIME = datetime.time(9,30),datetime.time(16,0)
    if eastern_time <= OPENING_TIME:
        return "Before market open"
    if eastern_time >= CLOSING_TIME:
        return "After market close"
    #return an error message if the time is during official stock market hours
    return "An error has occurred; the time coincides with operation hours"


@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def get_implied_earnings_move(request):
    data = QueryDict(request.body)
    STOCK = data.get("stock")
    data = {"ticker": STOCK,"implied_earnings_move": calculate_implied_move(STOCK)}
    return Response(data)

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def check_earnings_call_time(request):
    data = QueryDict(request.body)
    STOCK = data.get("stock")
    data = {"ticker": STOCK,"earnings_call_time": classify_upcoming_earnings_date(get_upcoming_earnings_date(STOCK))}
    return Response(data)
