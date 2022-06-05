from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import CustomUserViewSet,LoginViewSet

router = routers.DefaultRouter()
router.register("users",CustomUserViewSet)
#specify basename for LoginViewSet since LoginViewSet does not have queryset attribute
router.register("auth",LoginViewSet,basename="login")
urlpatterns = [path('', include(router.urls))]
