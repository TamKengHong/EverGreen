from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import CustomUserViewset

router = routers.DefaultRouter()
router.register("users",CustomUserViewset)

#urlpatterns = [path('', include(router.urls)),]
urlpatterns = router.urls