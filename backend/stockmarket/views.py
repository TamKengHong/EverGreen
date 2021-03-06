from .models import CustomUser,Post,Comment,Bookmark,ScrapingModel,UpcomingEarnings
from .serializers import CustomUserSerializer,PostSerializer,CommentSerializer,BookmarkSerializer,ScrapingModelSerializer,UpcomingEarningsSerializer
from .permissions import CustomUserPermissions,PostPermissions,CommentPermissions,BookmarkPermissions
from .filters import CustomUserSearchFilter, PostSearchFilter,CommentSearchFilter,BookmarkSearchFilter
from rest_framework import viewsets,filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


#default authentication class for all viewsets is TokenAuthentication, as shown in settings.py
#CustomViewSet is used to get user details
class CustomUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all() #retrieve all CustomUsers from database
    authentication_classes = [TokenAuthentication]
    permission_classes = [CustomUserPermissions] #only authenticated users can get user details
    # Allow users to search/filter other users by their usernames or email by making queries such as http://example.com/api/users?search=russell
    filter_backends = [CustomUserSearchFilter]
    search_fields = ['=username', '=email']

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all() #retrieve all Posts from database
    authentication_classes = [TokenAuthentication]
    permission_classes = [PostPermissions]
    # Allow users to search for a post by the author's username, email, post title, or the associated stock ticker
    filter_backends = [PostSearchFilter]
    search_fields = ['=name__username','=name__email','title','=stockTicker']

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all() #retrieve all Comments from database
    authentication_classes = [TokenAuthentication]
    permission_classes = [CommentPermissions]
    # Allow users to search for a comment by the commenter's name or the post's associated stock ticker
    filter_backends = [CommentSearchFilter] 
    search_fields = ['=name__username','=name__email','=post__stockTicker']

class BookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all() #retrieve all Comments from database
    authentication_classes = [TokenAuthentication]
    permission_classes = [BookmarkPermissions]
    # Allow users to search for a comment by the commenter's name or the post's associated stock ticker
    filter_backends = [BookmarkSearchFilter] 
    search_fields = ['=name__username','=post__stockTicker']

class ScrapingModelViewSet(viewsets.ModelViewSet):
    serializer_class = ScrapingModelSerializer
    queryset = ScrapingModel.objects.all()
    http_method_names = ["get"] #only allow for GET requests
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] #only authenticated users can access this endpoint
    # Allow users to search for a scraping job by the subreddit
    filter_backends = [filters.SearchFilter] 
    search_fields = ['=subreddit']

class UpcomingEarningsViewSet(viewsets.ModelViewSet):
    serializer_class = UpcomingEarningsSerializer
    queryset = UpcomingEarnings.objects.all()
    http_method_names = ["get"] #only allow for GET requests
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] #only authenticated users can access this endpoint