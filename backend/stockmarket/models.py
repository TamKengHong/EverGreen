from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

#AbstractBaseUser only contains the authentication functionality, but no actual fields; the fields have to be supplied in the process  of subclassing.
#on_delete = models.cascade - When the referenced object is deleted, also delete the objects that have references to it
#null = True means that Django will store empty values as NULL in the database. Default is False.
#unique = True means that this field must be unique throughout the table.
#blank = True means the field is allowed to be blank. Default is False.
#Note that if a field has blank = True, form validation will allow entry of an empty value. If a field has blank = False, the field will be required.

class CustomUserManager(BaseUserManager):
    def create_user(self,email,name,password):
        # email is compulsory for all users
        if not email: 
            raise ValueError("Users must have an email address")
        # password must be at least 15 characters
        if len(password) < 10: 
            raise ValueError("Password must be at least 10 characters")
        #normalize_email normalizes email addresses by lowercasing the domain portion of the email address.
        user = self.model(email = self.normalize_email(email),username=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email,name,password):
        user = self.create_user(email,name,password)
        user.is_superuser = True
        user.save(using=self._db)
        return user

#summary,profile,country are not necessary
#todo: incorporate Permissions and CustomUserManager
class CustomUser(AbstractBaseUser):
    email = models.EmailField(verbose_name = "email address", max_length=225,unique=True)
    username = models.CharField(max_length=225,unique=True)
    #summary should not contain more than 1000 characters
    summary = models.TextField(max_length=1000,blank=True,null=True) 
    profilePicture = models.ImageField(blank=True, null=True)
    country = models.CharField(blank=True,null=True)
    def __str__(self):
        return self.username

class Post(models.Model):
    postID = models.BigIntegerField(primary_key=True)
    author = models.ForeignKey(CustomUser,on_delete=models.CASCADE) 
    postTitle = models.CharField(max_length=255)
    postContent = models.TextField()
    postDate = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return "%s : %s" % (self.postTitle,self.postContent)
