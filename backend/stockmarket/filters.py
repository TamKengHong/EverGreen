from rest_framework import filters;

class CustomUserSearchFilter(filters.SearchFilter):
    #override get_search_fields method of SearchFilter
    def get_search_fields(self, view, request):
        if request.query_params.get('username_only'):
            return ['=username']
        if request.query_params.get('email_only'):
            return ['=email']
        return super().get_search_fields(view, request)

class PostSearchFilter(filters.SearchFilter):
    #override get_search_fields method of SearchFilter
    def get_search_fields(self, view, request):
        if request.query_params.get('username_only'):
            return ['=name__username']
        if request.query_params.get('email_only'):
            return ['=name__email']
        if request.query_params.get('userdata_only'):
            return ['=name__username',"=name__email"]
        if request.query_params.get('title_only'):
            return ['title']
        if request.query_params.get('stockTicker_only'):
            return ['=stockTicker']
        return super().get_search_fields(view, request)

class CommentSearchFilter(filters.SearchFilter):
    #override get_search_fields method of SearchFilter
    def get_search_fields(self, view, request):
        if request.query_params.get('username_only'):
            return ['=name__username']
        if request.query_params.get('email_only'):
            return ['=name__email']
        if request.query_params.get('userdata_only'):
            return ['=name__username',"=name__email"]
        if request.query_params.get('stockTicker_only'):
            return ['=post__stockTicker']
        return super().get_search_fields(view, request)

class BookmarkSearchFilter(filters.SearchFilter):
    #override get_search_fields method of SearchFilter
    def get_search_fields(self, view, request):
        if request.query_params.get('username_only'):
            return ['=name__username']
        if request.query_params.get('stockTicker_only'):
            return ['=post__stockTicker']
        return super().get_search_fields(view, request)