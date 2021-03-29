from api.models.grado import Grado
from django.db.models.query import QuerySet

# Rest Framework
from rest_framework import viewsets,status,filters
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
# Models
from api.models.curso import Curso
from api.models.permission import IsAdmin
# Serializer
from api.serializers.curso import CursoSerializer,RegistroCursoSerializer

from api.viewsets.grado import GradoViewset

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_curso",)
    search_fields = ("nombre_curso",)
    ordering_fields = ("nombre_curso",)
    permission_classes = (IsAdmin,)
   
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CursoSerializer
        else:
            return RegistroCursoSerializer


    def create(selft,request,*args, **kwargs):
    
        data = request.data
        serializer = RegistroCursoSerializer(data=data)
        if serializer.is_valid():
            print(data)
            Curso.objects.create(nombre_curso=data.get('nombre_curso'),descripcion=data.get("descripcion"))
            return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        



