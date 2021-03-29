
from django.db.models.query_utils import select_related_descend
from api import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

# Model
from api.models.grado import Grado
from api.models.nivel import Nivel
from api.models.permission import IsAdmin

# Serializer
from api.serializers.grado import GradoSerializer,GradoRegistroSerializer


class GradoViewset(viewsets.ModelViewSet):
    queryset = Grado.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_grado",)
    search_fields = ("nombre_grado",)
    ordering_fields = ("nombre_grado",)
    permission_classes = (IsAdmin,)  
   
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return GradoSerializer
        else:
            return GradoRegistroSerializer


    def create(self,request,*args,**kwargs):
        #user = request.user 
        #django outoken
        #with transaction.atomic()
        data = request.data
   
        serializer = GradoRegistroSerializer(data=data)
        
        if serializer.is_valid():
         
            id_nivel = data.get("nivel")
            nivel = Nivel.objects.get(pk=id_nivel)
            Grado.objects.create(nombre_grado=data.get("nombre_grado"),nivel=nivel)
           
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        #print(serializer.errors)
        #nivel,created=Nivel.objects.get_or_create(nivel=dict(serializer.data.get('nivel'))["nivel"])
        #seccion,created =Seccion.objects.get_or_create(tipo_seccion=dict(serializer.data.get('seccion'))["tipo_seccion"])
        #Grado.objects.create(nombre_grado=request.data.get('nombre_grado'),nivel=nivel,seccion=seccion)
        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request,pk=None):
      
        data = request.data
        serializer = GradoRegistroSerializer(data=data)
        if serializer.is_valid():
            print(data,pk)
            grado = Grado.objects.get(pk=pk)
            id_nivel = data.get('nivel')
            nivel = Nivel.objects.get(pk=id_nivel)

            grado.nivel = nivel
            print(data.get("nombre_grado"))
            grado.nombre_grado = data.get("nombre_grado")
            
            grado.save()
            print(grado)
           
            return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

