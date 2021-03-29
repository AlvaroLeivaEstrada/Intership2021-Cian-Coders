from django.db.models.query_utils import select_related_descend
from django.db.models import Count
from api import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

# Model
from api.models.catedratico import Catedratico
from api.models.profile import Profile
from api.models.estudiante import Estudiante
from api.models.permission import IsAdmin,IsCated

from django.contrib.auth.models import User

# Serializer
from api.serializers.estudiante import EstudianteSerializer,RegistroEstudianteSerializer


class EstudianteViewset(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("perfil__nombre",)
    search_fields = ("perfil__nombre",)
    ordering_fields = ("perfil__nombre",)
   
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EstudianteSerializer
        else:
            return RegistroEstudianteSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]

    def create(self,request,*args,**kwargs):
        data = request.data
        copy = data

        serializer = RegistroEstudianteSerializer(data=data)

        if serializer.is_valid():
            user = data.pop("user")
            usuario = User.objects.create(email=user.get("email"),username=user.get("username"))
            usuario.set_password(user.get("password"))
            usuario.save()

            perfil = Profile.objects.create(user=usuario,**data.pop("perfil"))  
            perfil.save();   
           
            Estudiante.objects.create(
                perfil=perfil,
                carnet = data.get("carnet"),
                contacto = data.get("contacto"),
                telefono_contacto = data.get("telefono_contacto"),
                direccion_contacto = data.get("direccion_contacto")
            )
            
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
       
        serializer = RegistroEstudianteSerializer(data=data)
        
        if serializer.is_valid():
            id_profile = data.get("perfil").get("id")
            perfil= Profile.objects.get(pk=id_profile)
            perfil.nombre = data.get("perfil").get("nombre")
            perfil.apellidos = data.get("perfil").get("apellidos")
            perfil.rol = data.get("perfil").get("rol")
            perfil.phone = data.get("perfil").get("phone")
            perfil.address = data.get("perfil").get("address")
            perfil.gender = data.get("perfil").get("gender")
            perfil.save()
            
            estudiante = Estudiante.objects.get(pk=pk)
            estudiante.perfil = perfil
            estudiante.carnet = data.get("carnet")
            estudiante.contacto = data.get("contacto")
            estudiante.direccion_contacto = data.get("direccion_contacto")
            estudiante.telefono_contacto = data.get("telefono_contacto")
            estudiante.save()

            return Response(request.data,status=status.HTTP_201_CREATED) 
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    
     
    @action(methods=["get"], detail=False)
    def totalEstudiantes(self,request):

        total = Estudiante.objects.aggregate(totalEstudiantes=Count("id"))

        return Response(total,status=status.HTTP_201_CREATED)

class ListStudents(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    permission_classes = (IsCated,)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("perfil__nombre",)
    search_fields = ("perfil__nombre",)
    ordering_fields = ("perfil__nombre",)
   
    def get_serializer_class(self):
        """Define serializer for API"""
        return EstudianteSerializer
        
       
        

       
   