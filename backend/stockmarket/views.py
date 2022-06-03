from .models import CustomUser,Post,Comment
from .serializers import CustomUserSerializer
from rest_framework import viewsets,filters,permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken

#default authentication class for all viewsets is TokenAuthentication, as shown in settings.py
class CustomUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all() #retrieve all CustomUsers from database
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    # Allow users to search/filter other users by their usernames or email by making queries such as http://example.com/api/users?search=russell
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']
    
'''
class LoginViewSet(viewsets.ViewSet):
	serializer_class = AuthTokenSerializer
    #ObtainAuthToken().post(request) return token key of user in request
    #For more information,go to https://github.com/encode/django-rest-framework/blob/master/rest_framework/authtoken/views.py
	def create(self,request):
		return ObtainAuthToken().as_view()(request=request._request)
'''