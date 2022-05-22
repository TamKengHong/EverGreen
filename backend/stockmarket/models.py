from django.db import models
from django.utils import timezone

#on_delete = models.cascade - When the referenced object is deleted, also delete the objects that have references to it
class User(models.Model):
    userID = models.BigIntegerField(primary_key=True)
    username = models.CharField(max_length=200)
    def __str__(self):
        return self.username

class Post(models.Model):
    postID = models.BigIntegerField(primary_key=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE) 
    postTitle = models.CharField(max_length=255)
    postContent = models.TextField()
    postDate = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return "%s : %s" % (self.postTitle,self.postContent)
