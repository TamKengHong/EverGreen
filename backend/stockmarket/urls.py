from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import CustomUserViewSet,PostViewSet,CommentViewSet,BookmarkViewSet
from .redditpraw import script_runner

router = routers.DefaultRouter()
router.register("users",CustomUserViewSet)
router.register("posts",PostViewSet)
router.register("comments",CommentViewSet)
router.register("bookmarks",BookmarkViewSet)
urlpatterns = [path('', include(router.urls)),path('reddit/',script_runner)]
