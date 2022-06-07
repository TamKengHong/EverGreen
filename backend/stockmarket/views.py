from .models import CustomUser,Post,Comment
from .serializers import CustomUserSerializer
from rest_framework import viewsets,filters
from rest_framework.authentication import TokenAuthentication
from .permissions import CustomUserPermissions

#default authentication class for all viewsets is TokenAuthentication, as shown in settings.py
#CustomViewSet is used to get user details
class CustomUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all() #retrieve all CustomUsers from database
    authentication_classes = [TokenAuthentication]
    permission_classes = [CustomUserPermissions] #only authenticated users can get user details
    # Allow users to search/filter other users by their usernames or email by making queries such as http://example.com/api/users?search=russell
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']
    
