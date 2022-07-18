from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import CustomUserViewSet,PostViewSet,CommentViewSet,BookmarkViewSet,ScrapingModelViewSet,UpcomingEarningsViewSet

router = routers.DefaultRouter()
router.register("users",CustomUserViewSet)
router.register("posts",PostViewSet)
router.register("comments",CommentViewSet)
router.register("bookmarks",BookmarkViewSet)
router.register("scrape",ScrapingModelViewSet)
router.register("earnings",UpcomingEarningsViewSet)
urlpatterns = [path('', include(router.urls))]
