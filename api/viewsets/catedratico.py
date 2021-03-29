from django.db.models.query_utils import select_related_descend
from django.db.models import Count

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

# Model
from api.models.catedratico import Catedratico
from api.models.profile import Profile
from api.models.profesion import Profesion
from django.contrib.auth.models import User
from api.models.permission import IsAdmin

# Serializer
from api.serializers.catedratico import CatedraticoSerializer,RegistroCatedraticoSerializer


class CatedraticoViewset(viewsets.ModelViewSet):
    queryset = Catedratico.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("profile__nombre",)
    search_fields = ("profile__nombre",)
    ordering_fields = ("profile__nombre",)
    permission_classes = (IsAdmin,)
   
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CatedraticoSerializer
        else:
            return RegistroCatedraticoSerializer

    
    def create(self,request,*args,**kwargs):
      
        data = request.data
        copy = data
        serializer = RegistroCatedraticoSerializer(data=data)

        if serializer.is_valid():
            user = data.pop("user")
            id_profesion = data.pop("profesion")
            profesion = Profesion.objects.get(pk=id_profesion)
            usuario = User.objects.create(email=user.get("email"),username=user.get("username"))
            usuario.set_password(user.get("password"))
            usuario.save()
            perfil = Profile.objects.create(user=usuario,**data.get("profile"))  
            perfil.save();   
            Catedratico.objects.create(profile=perfil,profesion=profesion)
            return Response(copy, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def update(self,request,pk=None):
       
        data = request.data
        copyData = data
        updatedUser = data.pop("user")
        id_user = updatedUser.get("id")
        user = User.objects.get(pk=id_user)
        user.email = updatedUser.get("email")
        user.username = updatedUser.get("username")
        user.password = updatedUser.get("password")
        user.save()
        serializer = RegistroCatedraticoSerializer(data=data)
       
        if serializer.is_valid():

            id_profesion = data.get("profesion")
            id_profile = data.get("profile").get("id")
            profesion = Profesion.objects.get(pk=id_profesion)
            profesion.save()

            perfil= Profile.objects.get(pk=id_profile)
            perfil.nombre = data.get("profile").get("nombre")
            perfil.apellidos = data.get("profile").get("apellidos")
            perfil.rol = data.get("profile").get("rol")
            perfil.phone = data.get("profile").get("phone")
            perfil.address = data.get("profile").get("address")
            perfil.gender = data.get("profile").get("gender")
            perfil.save()
            
            catedratico = Catedratico.objects.get(pk=pk)
            catedratico.profile = perfil
            catedratico.profesion=profesion
    
            catedratico.save()
            return Response(request.data,status=status.HTTP_201_CREATED) 
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def totalCatedraticos(self,request):
        total = Catedratico.objects.aggregate(totalCatedraticos=Count("id"))
        return Response(total,status=status.HTTP_201_CREATED) 

    
      

  
       
        

       
   