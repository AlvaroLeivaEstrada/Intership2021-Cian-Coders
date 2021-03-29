import json
# Django
from django.core.files import File

# Rest Framework
from django.db.models.query_utils import select_related_descend
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

# Models
from api.models.material import MaterialClase
from api.models.asignacion import Asignacion
from api.models.permission import IsCated,IsEstud

# Serializers
from api.serializers.material import MaterialSerializer,RegistroMaterialSerializer
from api.serializers.asignacion import AsignacionSerializer


class MaterialViewSet(viewsets.ModelViewSet):
    queryset = MaterialClase.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("titulo",)
    search_fields = ("titulo",)
    ordering_fields = ("titulo",)
    permission_classes = (IsCated,)

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return MaterialSerializer
        else:
            return RegistroMaterialSerializer

    def create(self,request):
        
        data = request.data
    
        archivo = data.get("archivo")
        data = json.loads(data["data"])
        
        serializer = RegistroMaterialSerializer(data=data)
        if serializer.is_valid():
            id_asignacion = data.get("asignacion")
            asignacion = Asignacion.objects.get(pk=id_asignacion)
            MaterialClase.objects.create(
                asignacion=asignacion,
                titulo = data.get("titulo"),
                descripcion = data.get("descripcion"),
                archivo = File(archivo)
            )

            return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):

        data = request.data
        archivo = data.get("archivo")
        data = json.loads(data["data"])
      
        serializer = RegistroMaterialSerializer(data = data)
        
        if serializer.is_valid():
            material = MaterialClase.objects.get(pk=pk)
            if material.archivo is not None:
                material.archivo.delete()
            
            material.titulo = data.get("titulo")
            material.descripcion = data.get("descripcion")
            material.archivo = File(archivo)
            material.save()
            return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:            
            material = MaterialClase.objects.get(pk=pk)
            asignacion =  material.asignacion
            serializer = AsignacionSerializer(asignacion)
            if material.archivo is not None:
                material.archivo.delete()
            material.delete()
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"],detail=False)
    def registrados(self,request):

        id_asignacion = request.GET.get("id")        
        asignacion = Asignacion.objects.get(pk=id_asignacion)
        materiales = MaterialClase.objects.filter(asignacion=asignacion)
        serializer = MaterialSerializer(materiales,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class ReadByStudent(viewsets.ModelViewSet):

    queryset = MaterialClase.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("titulo",)
    search_fields = ("titulo",)
    ordering_fields = ("titulo",)
    permission_classes = (IsEstud,)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return MaterialSerializer
        else:
            return RegistroMaterialSerializer

    @action(methods=["get"],detail=False)
    def registrados(self,request):
        id_asignacion = request.GET.get("id")        
        asignacion = Asignacion.objects.get(pk=id_asignacion)
        materiales = MaterialClase.objects.filter(asignacion=asignacion)
        serializer = MaterialSerializer(materiales,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


