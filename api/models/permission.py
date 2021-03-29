
from rest_framework.permissions import BasePermission
from django.contrib.auth.models import User
from api.models.profile import Profile


class IsAdmin(BasePermission):
    def has_permission(self,request,view):
        if request.user:
            if request.user.is_superuser:
                return True
            else:
                return False
        else:
            return False
            


class IsCated(BasePermission):
    def has_permission(self,request,view):
        if request.user:
            if request.user.profile.rol=="CATED":
                return True
            else:
                return False
        else:
            return False
            


class IsEstud(BasePermission):
    def has_permission(self,request,view):
        if request.user:
            if request.user.profile.rol=="ESTUD":
                return True
            else:
                return False
        else:
            return False
            