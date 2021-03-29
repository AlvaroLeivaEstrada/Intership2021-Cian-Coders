import json
from datetime import datetime
from itertools import chain
from django.db import connection, reset_queries
import time
import functools

# Django
from django.core.files import File
from django.db.models.query_utils import select_related_descend
from api import serializers
from django.db.models import Count,Q,Sum

# Rest Framework
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.decorators import action

# Model 
from api.models.tareaEstudiante import TareaEstudiante
from api.models.asignacion import Asignacion
from api.models.asignacionEstudiante import AsignacionEstudiante
from api.models.tarea import Tarea
from api.models.profile import Profile
from api.models.estudiante import Estudiante
from api.models.permission import IsCated,IsEstud

# Serializer
from api.serializers.tareaEstudiante import TareaEstudianteSerializer,RegistroTareaEstudianteSerializer

class TareaEstudianteViewSet(viewsets.ModelViewSet):
    queryset = TareaEstudiante.objects.all()
    permission_classes = [IsCated]

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante__nombre",)
    search_fields = ("estudiante__nombre",)
    ordering_fields = ("estudiante__nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return TareaEstudianteSerializer
        else:
            return RegistroTareaSerializer

  
    def update(self,request,pk=None):
        tareaCalificada = TareaEstudiante.objects.get(pk=pk)
        try:
            data = request.data
            data = json.loads(data["data"])
            serializer = RegistroTareaEstudianteSerializer(data=data)
            if serializer.is_valid():
                tareaCalificada.calificacion = data.get("calificacion")
                tareaCalificada.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail':str(e)},status=status.HTTP_400_BAD_REQUEST)

   #Solo Catedraticos 
   
    @action(methods=["get"],detail=False)
    def obtenerTareasEntregadas(self,request):
        id=request.GET.get("id")
        
        try: 
            tarea = Tarea.objects.get(pk=id)
            entregadas = TareaEstudiante.objects.filter(tarea=tarea)
            serializer = TareaEstudianteSerializer(entregadas,many=True)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail':str(e)},status=status.HTTP_400_BAD_REQUEST)

    

class OperateStudentViewSet(viewsets.ModelViewSet):
    queryset = TareaEstudiante.objects.all()
    permission_classes = [IsEstud]

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante__nombre",)
    search_fields = ("estudiante__nombre",)
    ordering_fields = ("estudiante__nombre",)

    def query_debugger(func):
        @functools.wraps(func)
        def inner_func(*args, **kwargs):

            reset_queries()
            
            start_queries = len(connection.queries)

            start = time.perf_counter()
            result = func(*args, **kwargs)
            end = time.perf_counter()

            end_queries = len(connection.queries)

            print(f"Function : {func.__name__}")
            print(f"Number of Queries : {end_queries - start_queries}")
            print(f"Finished in : {(end - start):.2f}s")
            return result

        return inner_func


    def create(self,request):
        try:
            data = request.data
            archivo = data.get("archivo")
            data = json.loads(data["data"])
         
            serializer = RegistroTareaEstudianteSerializer(data=data)

            if serializer.is_valid():
                tarea = Tarea.objects.get(pk=data.get("tarea"))
                estudiante = Profile.objects.get(pk=data.get("estudiante"))
                TareaEstudiante.objects.create(
                    tarea=tarea,
                    estudiante=estudiante,
                    texto=data.get("texto"),
                    archivo=File(archivo),
                    fecha=datetime.strptime(data.get("fecha"),'%Y-%m-%d').date()
                )

                return Response(serializer.data,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    #Solo Estudiantes
    @action(methods=["get"],detail=False)
    def listGradesbyStudent(self,request):
 
        try:
            user = request.user.profile
            notas = TareaEstudiante.objects.filter(estudiante=user)
            serializer = TareaEstudianteSerializer(notas,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)},status=status.HTTP_400_BAD_REQUEST) 

    @query_debugger
    @action(methods=["get"],detail=False)
    def SumOfAllTheAssigmentsByCourse(self,request):
        try:
            tareas=[]
            asignaciones=None
            student = request.user.profile.estudiante
            asignacionesEstudiantes = AsignacionEstudiante.objects.filter(
                estudiante=student
                ).select_related(
                    'asignacion'
                    ).select_related(
                        'asignacion__curso'
                    ).prefetch_related(
                        'asignacion__tarea'
                        ).prefetch_related(
                            'asignacion__tarea__estudiante'
                        ).annotate(
                            sumatoria_notas = Sum('asignacion__tarea__estudiante__calificacion')
                        )
            for asignacionEstudiante in asignacionesEstudiantes:
                datos={
                    'materia':asignacionEstudiante.asignacion.curso.nombre_curso,
                    'sumatoria_notas':asignacionEstudiante.sumatoria_notas
                }
                tareas.append(datos)

            return Response(tareas,status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'detail':str(e)},status=status.HTTP_400_BAD_REQUEST)    
