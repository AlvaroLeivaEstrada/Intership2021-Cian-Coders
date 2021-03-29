import json
import io
# Django
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend

# Rest Framework
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.parsers import JSONParser


from api.models.ciclo import Ciclo
from api.models.permission import IsAdmin

from api.serializers.ciclo import RegistroCicloSerializer,CicloSerializer


class CicloViewset(viewsets.ModelViewSet):
    queryset = Ciclo.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("anio",)
    search_fields = ("anio",)
    ordering_fields = ("anio",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CicloSerializer
        else:
            return RegistroCicloSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [ IsAdmin]
        return [permission() for permission in permission_classes]

    def create(self,request):
        if self.queryset.count()>0:
            print(self.queryset.last())
            latest = self.queryset.last()
            latest.activo = False
            latest.save()
        
        data = request.data
        serializer = RegistroCicloSerializer(data= data)
        if serializer.is_valid():
            Ciclo.objects.create(**data)
            return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["get"],detail=False)
    def retrieveCurrent(self,request):
        instance = Ciclo.objects.get(activo=True) 
        serializer = CicloSerializer(instance)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
     