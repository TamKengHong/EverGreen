from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import QueryDict
from decouple import config
from django.conf import settings
import os
import praw
import pickle
#import datetime as dt
#from psaw import PushshiftAPI

#current = dt.datetime.now()

def create_subreddit_instance(reddit,subname):
    return reddit.subreddit(subname)

#set time limit as "today" to return all posts within the day itself
#set limit as None so that all posts are returned
def track_stock_mentions_in_past_24_hours(reddit,subname,stock,time_filter,limit):
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

#set time limit as "day" to return all posts within the day itself
#set limit as None so that all posts are returned
def track_mentions_in_past_24_hours(reddit,subname,active_stocks,time_filter,limit):
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
def sort_by_mentions(active_stocks,limit):
    lst = [(key,value) for key,value in active_stocks.items() if value > 0]
    lst.sort(key = lambda x: x[1],reverse = True) #sort in descending order
    for i in range(len(lst)-limit):
        lst.pop()
    return lst

CLIENT_ID,REDDIT_SECRET_KEY = config("CLIENT_ID"),config("REDDIT_SECRET_KEY")

@api_view(['GET'])
def script_runner(request):
    #read in preloaded dictionary of active stocks from .pkl file
    file_path = os.path.join(settings.BASE_DIR,'stockmarket','activestocks.pkl')
    with open(file_path,"rb") as f:
        active_stocks = pickle.load(f)
    #create a reddit instance
    reddit = praw.Reddit(client_id=CLIENT_ID,client_secret=REDDIT_SECRET_KEY,user_agent="MyBot")
    data = QueryDict(request.body)
    subreddit = data.get("subreddit",default="wallstreetbets") #default subreddit is wallstreetbets
    time_filter = data.get("time_filter",default="day") #default time filter is by day
    post_limit = int(data.get("post_limit",default=None)) #default limit is None
    stock_limit = int(data.get("stock_limit",default=10)) #by default, return the top 10 stocks
    active_stocks = track_mentions_in_past_24_hours(reddit,subname=subreddit,active_stocks=active_stocks,time_filter=time_filter,limit=post_limit)
    results = sort_by_mentions(active_stocks,limit=stock_limit)
    return Response(results)




