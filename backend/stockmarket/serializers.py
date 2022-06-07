from .models import CustomUser,Post,Comment
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.db import transaction

#Serializers in Django REST Framework convert objects into JSON objects. 
#Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data. 
#explicitly set all fields that should be serialized using the fields attribute in the meta class

class CustomUserSerializer(serializers.ModelSerializer): 
    class Meta:
        model = CustomUser
        fields = ["email","username","summary","profilePicture","country","totalLikes","totalDislikes","id","password"]
        # 'write_only' ensures that the field may be used when updating or creating an instance, but is not included when serializing the representation.
		# 'required' means that a password is required during deserialization
        # refer to https://www.django-rest-framework.org/api-guide/fields/
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    #validated_data is in the form of a JSON object
    #note: validation for email is carried by EmailField
    #override create function to use set_password function that hashes the passwords
    #Note that it is possible to create a new user using a PUT request to /stockmarket/users/
    #However, the create method is not utilised as the creation of new users is handled by the RegisterSerializer, which goes through the dj-rest-auth framework and handles validation
    def create(self,validated_data):
        '''
        def IsPasswordLongEnough(password):
            if len(password) < 8:
                raise serializers.ValidationError("Password must have at least 8 characters")
        IsPasswordLongEnough(validated_data["password"]) #validation test for password
        '''
        user = CustomUser(email=validated_data["email"],username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user

    #custom update is needed to be defined because the default method method does not rehash passwords, which causes issues with authentication
    def update(self,instance,validated_data):
        for key,value in validated_data.items():
            if getattr(instance,key) != value: #if there is a change in the attribute, update accordingly
                if key == "password":
                    instance.set_password(value) #rehash and reset password
                else:
                    setattr(instance,key,value)
        instance.save()
        return instance

class CustomRegisterSerializer(RegisterSerializer):
    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.save()
        return user

#modelSerializer has default update and create methods - refer to https://github.com/encode/django-rest-framework/blob/1396f6886a39acb7fe52729c7b99fe2d7d245dac/rest_framework/serializers.py#L342
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__' 

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__' 