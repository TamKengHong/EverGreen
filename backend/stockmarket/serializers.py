from rest_framework import serializers
from .models import CustomUser,Post,Comment
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
    def create(self,validated_data):
        def IsPasswordLongEnough(password):
            if len(password) < 8:
                raise serializers.ValidationError("Password must have at least 8 characters")
        email = validated_data["email"]
        username = validated_data["username"]
        password = validated_data["password"]
        IsPasswordLongEnough(password) #validation test for password
        return CustomUser.objects.create_user(email,username,password)
    
    def update(self,instance,validated_data):
        for key,value in validated_data.items():
            if getattr(instance,key) != value: #if there is a change in the attribute, update accordingly
                if key == "password":
                    instance.set_password(value) #rehash and reset password
                else:
                    setattr(instance,key,value)
        instance.save()
        return instance
