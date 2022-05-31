from .models import CustomUser,Post,Comment
from .serializers import CustomUserSerializer
from rest_framework import viewsets,filters,permissions

class CustomUserViewset(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all() #retrieve all CustomUsers from database
    permission_classes = [permissions.IsAuthenticated]