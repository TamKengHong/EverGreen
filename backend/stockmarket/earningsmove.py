import yfinance as yf

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