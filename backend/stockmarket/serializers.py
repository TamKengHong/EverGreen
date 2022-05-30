from rest_framework import serializers
from .models import CustomUser,Post,Comment
#Serializers in Django REST Framework convert objects into JSON objects. 
#Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data. 
class CustomUserSerializer(serializers.ModelSerializer):
    pass