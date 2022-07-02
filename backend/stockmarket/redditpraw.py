from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import QueryDict
from decouple import config
import praw
import pickle
#import datetime as dt
#from psaw import PushshiftAPI

#current = dt.datetime.now()

def create_subreddit_instance(reddit,subname):
    return reddit.subreddit(subname)

#set default time limit as "today" to return all posts within the day itself
#set default limit as None so that all posts are returned
def track_stock_mentions_in_past_24_hours(reddit,subname,stock,time_filter="day",limit=None):
    subreddit = create_subreddit_instance(reddit,subname)
    counter = 0
    for post in subreddit.top(time_filter=time_filter,limit=limit):
        title = post.title
        counter += title.count(stock)
        txt = post.selftext
        counter += txt.count(stock)
        post.comments.replace_more(limit=0) #remove all MoreComments objects
        for comment in post.comments.list():
            body = comment.body
            counter += body.count(stock)
    return counter

#set default time limit as "day" to return all posts within the day itself
#set default limit as None so that all posts are returned
def track_mentions_in_past_24_hours(reddit,subname,active_stocks,time_filter="day",limit=None):
    subreddit = create_subreddit_instance(reddit,subname)
    for post in subreddit.top(time_filter=time_filter,limit=limit):
        title = post.title.strip().split()
        for word in title:
            if word in active_stocks:
                active_stocks[word] += 1
        txt = post.selftext.strip().split()
        for word in txt:
            if word in active_stocks:
                active_stocks[word] += 1
        post.comments.replace_more(limit=0) #remove all MoreComments objects
        for comment in post.comments.list():
            body = comment.body.strip().split()
            for word in body:
                if word in active_stocks:
                    active_stocks[word] += 1
    return active_stocks

#function for sorting dictionary of active stocks by number of mentions and returning the top pairs
#by default, a list of the top 20 stocks is returned
def sort_by_mentions(active_stocks,limit=20):
    lst = [(key,value) for key,value in active_stocks.items() if value > 0]
    lst.sort(key = lambda x: x[1],reverse = True) #sort in descending order
    for i in range(len(lst)-limit):
        lst.pop()
    return lst

CLIENT_ID,REDDIT_SECRET_KEY = config("CLIENT_ID"),config("SECRET_KEY")

#create a reddit instance
reddit = praw.Reddit(client_id=CLIENT_ID, client_secret=REDDIT_SECRET_KEY,user_agent="MyBot")

#read in preloaded dictionary of active stocks from .pkl file
with open("activestocks.pkl","rb") as f:
    active_stocks = pickle.load(f)

@api_view(['GET'])
def script_runner(request):
    data = QueryDict(request.body)
    active_stocks = track_mentions_in_past_24_hours(reddit,"wallstreetbets",active_stocks)
    sort_by_mentions(active_stocks,limit=len(active_stocks))





