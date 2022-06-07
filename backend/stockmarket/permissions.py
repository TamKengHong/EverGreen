from rest_framework import permissions

#To implement a custom permission, override BasePermission and implement either, or both, of the following methods:
#.has_permission(self, request, view)
#.has_object_permission(self, request, view, obj)

class CustomUserPermissions(permissions.BasePermission):
    #change default PermissionsDenied error message to be more precise
    message = "Wrong credentials entered; try again"
    #Allow users to edit their own profile
    def has_permission(self, request, view):
        if request.user.is_authenticated or request.user.is_superuser:
            return True
        return request.method == 'POST'

	# Allows anyone to get data if its a safe HTTP request (GET, OPTIONS, HEAD)
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
		# If it is not a safe HTTP request (e.g POST), check that the user currently
		# authenticated in the system is the same as obj.
        return request.user.id == obj.id or request.user.is_superuser