from rest_framework import permissions

#To implement a custom permission, override BasePermission and implement either, or both, of the following methods:
#.has_permission(self, request, view)
#.has_object_permission(self, request, view, obj)

class CustomUserPermissions(permissions.BasePermission):
    #change default PermissionsDenied error message to be more precise
    message = "Wrong credentials entered; try again"
    #Allow authenticated users to access endpoint
    #Do not allow users to create new users using a POST request; we want new users to be created through the dj-rest-auth/registration endpoint
    def has_permission(self, request, view):
        return True if request.method != "POST" and (request.user.is_authenticated or request.user.is_superuser) else False

	# Allows anyone to get data if its a safe HTTP request (GET, OPTIONS, HEAD)
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
		# If it is not a safe HTTP request (e.g POST), check that the user currently
		# authenticated in the system is the same as obj.
        return request.user.id == obj.id or request.user.is_superuser

class PostPermissions(permissions.BasePermission):
    #Allow authenticated users to access endpoint
    def has_permission(self, request, view):
        return True if request.user.is_authenticated or request.user.is_superuser else False

    def has_object_permission(self, request, view, obj):
        #allow anyone to view posts through safe HTTP request (GET, OPTIONS, HEAd)
        if request.method in permissions.SAFE_METHODS:
            return True 
        #allow users to edit only their own posts through POST requests by checking that the author of the post is the same as the authenticated user
        #superusers can edit and delete everyone's posts
        return request.user == obj.name or request.user.is_superuser

class CommentPermissions(permissions.BasePermission):
    #Allow authenticated users to access endpoint
    def has_permission(self, request, view):
        return True if request.user.is_authenticated or request.user.is_superuser else False

    def has_object_permission(self, request, view, obj):
        # Allow anyone to view comments through safe HTTP request (e.g GET, OPTIONS, HEAD)
        if request.method in permissions.SAFE_METHODS:
            return True
		#allow users to edit only their own comments through POST requests by checking that the commenter is the same as the authenticated user
        #superusers can edit and delete everyone's posts
        return request.user == obj.name or request.user.is_superuser

class BookmarkPermissions(permissions.BasePermission):
    #Allow authenticated users to access endpoint
    def has_permission(self, request, view):
        return True if request.user.is_authenticated or request.user.is_superuser else False

    def has_object_permission(self, request, view, obj):
        # Allow anyone to view bookmarks through safe HTTP request (e.g GET, OPTIONS, HEAD)
        if request.method in permissions.SAFE_METHODS:
            return True
		#allow users to edit only their own bookamrks through POST requests by checking that the commenter is the same as the authenticated user
        #superusers can edit and delete everyone's posts
        return request.user == obj.name or request.user.is_superuser