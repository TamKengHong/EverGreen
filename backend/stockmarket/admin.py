from django.contrib import admin
from .models import CustomUser,Post,Comment

# Register your models here.
# The register function is used to add models to the Django admin so that CRUD operations can be performed on the data in those models through the user interface.
admin.site.register(CustomUser)
admin.site.register(Post)
admin.site.register(Comment)