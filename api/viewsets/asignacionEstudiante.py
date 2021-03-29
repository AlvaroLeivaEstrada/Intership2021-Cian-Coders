from itertools import chain

#Rest Framework
from rest_framework import viewsets,filters,status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated

#Model
from api.models.asignacionEstudiante import AsignacionEstudiante
from api.models.permission import IsCated,IsEstud
from api.models.asignacion import Asignacion
from api.models.estudiante import Estudiante
from api.models.tarea import Tarea

#Serializers
from api.serializers.asignacionEstudiante import AsignacionEstudianteRegistro,AsignacionEstudianteSerializer
from api.serializers.tarea import TareaSerializer

# Django
from django_filters.rest_framework import DjangoFilterBackend

class AsignacionEstudianteViewSet(viewsets.ModelViewSet):
    queryset = AsignacionEstudiante.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante",)
    search_fields = ("estudiante",)
    ordering_fields = ("estudiante",)
    permission_classes = (IsCated,)
   
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionEstudianteSerializer
        else:
            return AsignacionEstudianteRegistro

    def create(self,request):
        data = request.data
        serializer = AsignacionEstudianteRegistro(data=data)
        if serializer.is_valid():
            id_asignacion = data.get("asignacion")
            id_estudiante = data.get("estudiante")

            asignacion = Asignacion.objects.get(pk=id_asignacion)
            estudiante = Estudiante.objects.get(pk=id_estudiante)
            AsignacionEstudiante.objects.create(
                asignacion=asignacion,
                estudiante=estudiante
            )
            return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class StudentEnrollmentsAndHomeWork(viewsets.ModelViewSet):
    queryset = AsignacionEstudiante.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante",)
    search_fields = ("estudiante",)
    ordering_fields = ("estudiante",)
    permission_classes = (IsEstud,)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionEstudianteSerializer
        else:
            return AsignacionEstudianteRegistro

    @action(methods=["get"],detail=False)
    def obtenerAsignacionesEstudiante(self,request):
        
        estudiante = request.user.profile.estudiante
        asignaciones = AsignacionEstudiante.objects.filter(estudiante=estudiante)
        serializer = AsignacionEstudianteSerializer(asignaciones,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
            
    #Solo Estudiantes pueden acceder a este metodo
    @action(methods=["get"],detail=False)
    def obtenerTareas(self,request):
        estudiante = request.user.profile.estudiante
        asignacionesEstudiantes = AsignacionEstudiante.objects.filter(estudiante=estudiante)
        #asignaciones = map(lambda asignacionEstud:asignacionEstud.asignacion,asignacionesEstudiante)
        #tareas = map(lambda asignacion:asignacion.tarea,asignaciones)
        #serializerTarea=TareaSerializer(tareas)
        #print(list(serializerTarea))
        tareas = None
        for asignacionEstudiante in asignacionesEstudiantes:
            queryset = Tarea.objects.filter(asignacion=asignacionEstudiante.asignacion) 
            if tareas is None:
	            tareas = queryset
            else:
	            tareas = sorted(chain(tareas,queryset),key=lambda tarea:tarea.fecha,reverse=False)[:7]
        serializer = TareaSerializer(tareas,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
