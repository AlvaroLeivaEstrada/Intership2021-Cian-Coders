import json
from datetime import datetime

#Django
from django.core.files import File
from django.db.models import Count,Q,Sum
from django.db.models.query_utils import select_related_descend
from api import serializers

#Rest Framework
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

# Model
from api.models.asignacion import Asignacion
from api.models.tarea import Tarea
from api.models.ciclo import Ciclo
from api.models.grado import Grado
from api.models.seccion import Seccion
from api.models.curso import Curso
from api.models.permission import IsCated
from api.models.permission import IsEstud
 

# Serializer
from api.serializers.tarea import TareaSerializer,RegistroTareaSerializer
from api.serializers.asignacion import AsignacionSerializer

 

class OperateStudent(viewsets.ModelViewSet):

    queryset = Tarea.objects.all()
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("asignacion__curso__nombre_curso",)
    search_fields = ("asignacion__curso__nombre_curso",)
    ordering_fields = ("asignacion__curso__nombre_curso",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'retrieve':
            return TareaSerializer
        else:
            return RegistroTareaSerializer
   
    
    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsEstud]
        return [permission() for permission in permission_classes]
    


    @action(methods=["get"],detail=False)
    def registradas(self,request):
        id_asignacion = request.GET.get("id")        
        asignacion = Asignacion.objects.get(pk=id_asignacion)
        tareas = Tarea.objects.filter(asignacion=asignacion)
        serializer = TareaSerializer(tareas,many=True)
        
        return Response(serializer.data,status=status.HTTP_200_OK)

        
       
    


class TareaViewset(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("asignacion__curso__nombre_curso",)
    search_fields = ("asignacion__curso__nombre_curso",)
    ordering_fields = ("asignacion__curso__nombre_curso",)
   
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return TareaSerializer
        else:
            return RegistroTareaSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsCated]
        return [permission() for permission in permission_classes]
    


    def create(self,request,*args,**kwargs):

        data = request.data
        archivo = data.get("archivo")
        data = json.loads(data["data"])
        time = data.get("hora")
        time_object = datetime.strptime(time,'%H%M%S').time()
        serializer = RegistroTareaSerializer(data=data)

        if serializer.is_valid():
            asignacion = Asignacion.objects.get(pk=int(data.get("asignacion")))
            Tarea.objects.create(
                asignacion = asignacion,
                nombre = data.get("nombre"),
                descripcion = data.get("descripcion"),
                fecha = datetime.strptime(data.get("fecha"),'%Y-%m-%d').date(),
                hora = time_object,
                nota = data.get("nota"),
                archivo = File(archivo)
            )
            
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):

        try:            
            data = request.data
            archivo = data.get("archivo")
            data = json.loads(data["data"])
            
            serializer = RegistroTareaSerializer(data=data)
            if serializer.is_valid():
            
                tarea = Tarea.objects.get(pk=pk)                

                if tarea.archivo is not None:
                    tarea.archivo.delete()
                 
                tarea.nombre = data.get("nombre")
                tarea.descripcion = data.get("descripcion")
                tarea.nota = data.get("nota")
                
                time = data.get("hora")
                time_object = datetime.strptime(time,'%H:%M:%S').time()
                tarea.hora = time_object
                tarea.archivo = File(archivo)  
                             
                tarea.save()

                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:            
            tarea = Tarea.objects.get(pk=pk)
            asignacion = tarea.asignacion
            serializer = AsignacionSerializer(asignacion)
            if tarea.archivo is not None:
                tarea.archivo.delete()
            tarea.delete()
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"],detail=False)
    def registradas(self,request):
        id_asignacion = request.GET.get("id")        
        asignacion = Asignacion.objects.get(pk=id_asignacion)
        tareas = Tarea.objects.filter(asignacion=asignacion)
        serializer = TareaSerializer(tareas,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
        
    @action(methods=["get"],detail=False)
    def totalTareasPendientes(self,request):
        catedratico = request.user.profile.catedratico_profile
        queryset = catedratico.asignacion.aggregate(
            total_pendientes= Count(
                'tarea__estudiante__id',
                filter=Q(tarea__estudiante__calificacion=0)))
        return Response(queryset,status=status.HTTP_200_OK)

    @action(methods=["get"],detail=False)
    def totalTareasPendientesCurso(self,request):
        
        catedratico = request.user.profile.catedratico_profile
        queryset = catedratico.asignacion.prefetch_related(
            'tarea'
            ).annotate(
            total_tareas_por_asignacion= Count(
                'tarea'),
            total_tareas_pendientes = Count(
                'tarea__estudiante',
                filter=Q(tarea__estudiante__calificacion=0)))

        asignaciones=[]
        for asignacion in queryset:
            data = {
                'asignacion':asignacion.curso.nombre_curso,
                'total_tareas':asignacion.total_tareas_por_asignacion,
                'total_tareas_pendientes_por_curso':asignacion.total_tareas_pendientes
            }
            asignaciones.append(data)

        return Response(asignaciones,status=status.HTTP_201_CREATED)

    @action(methods=["get"],detail=False)
    def valorDeTareasTotal(self,request):

        asignacion = request.GET.get("id")

        tareas = Tarea.objects.filter(
            asignacion=asignacion
            ).aggregate(
                validarNota=Sum('nota'))

        return Response(tareas,status=status.HTTP_201_CREATED)



  