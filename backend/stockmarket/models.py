from unicodedata import name
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser,BaseUserManager,PermissionsMixin

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
        #normalize_email normalizes email addresses by lowercasing the domain portion of the email address.
        user = self.model(email = self.normalize_email(email),username=name)
        user.set_password(password) # sets and hashes password
        user.save(using=self._db)
        return user

    def create_superuser(self,email,name,password):
        user = self.create_user(email,name,password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

#summary,profile,country are not necessary
#PermissionsMixin includes Django’s permission framework into the CustomUser class
class CustomUser(AbstractUser,PermissionsMixin):
    email = models.EmailField(verbose_name = "email address", max_length=225,unique=True)
    username = models.CharField(max_length=225,unique=True)
    #summary should not contain more than 1000 characters
    summary = models.TextField(max_length=1000,blank=True,null=True) 
    profilePicture = models.ImageField(blank=True, null=True)
    country = models.CharField(max_length=225,blank=True,null=True)
    # Set number of total likes and dislikes to 0 by default
    totalLikes = models.BigIntegerField(default=0)
    totalDislikes = models.BigIntegerField(default=0)
    # CustomUsers are managed by CustomUserManager
    objects = CustomUserManager()
    # login with email, and make username mandatory during registration
    # REQUIRED_FIELDS is a list of the field names that will be prompted for when creating a user via the create_superuser command. 
    # REQUIRED_FIELDS must contain all required fields on your user model, but should not contain the USERNAME_FIELD or password as these fields will always be prompted for.
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    def __str__(self):
        return self.username
    @property
    def getEmail(self):
        return "%s" % self.email


class Post(models.Model):
    author = models.ForeignKey(CustomUser,on_delete=models.CASCADE,to_field="username") 
    postTitle = models.CharField(max_length=255)
    postContent = models.TextField()
    postDate = models.DateTimeField(default=timezone.now)
    likes = models.BigIntegerField(default=0)
    dislikes = models.BigIntegerField(default=0)
    def __str__(self):
        return "%s : %s" % (self.postTitle,self.postContent)

class Comment(models.Model):
    commenter = models.ForeignKey(CustomUser,on_delete=models.CASCADE,to_field="username")
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    commentContent = models.TextField()
    commentDate = models.DateTimeField(default=timezone.now)
    likes = models.BigIntegerField(default=0)
    dislikes = models.BigIntegerField(default=0)
    def __str__(self):
        return "%s : %s" % (self.commenter,self.commentContent)