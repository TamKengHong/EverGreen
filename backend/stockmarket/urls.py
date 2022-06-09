from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import CustomUserViewSet,PostViewSet,CommentViewSet

router = routers.DefaultRouter()
router.register("users",CustomUserViewSet)
router.register("posts",PostViewSet)
router.register("comments",CommentViewSet)
urlpatterns = [path('', include(router.urls)),]
