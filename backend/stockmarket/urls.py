from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from rest_framework.authtoken import views
from .views import CustomUserViewSet

router = routers.DefaultRouter()
router.register("users",CustomUserViewSet)

urlpatterns = [path('', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token)
]
