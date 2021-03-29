import json
from api import serializers

# Django
from django.core.files import File
from django.db.models.query_utils import select_related_descend
from django_filters.rest_framework import DjangoFilterBackend

# Rest Framework
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

# Model
from api.models.catedratico import Catedratico
from api.models.asignacionEstudiante import AsignacionEstudiante
from api.models.asignacion import Asignacion
from api.models.profile import Profile
from api.models.grado import Grado
from api.models.seccion import Seccion
from api.models.curso import Curso
from api.models.ciclo import Ciclo
from api.models.permission import IsAdmin,IsCated,IsEstud
 
# Serializer
from api.serializers.asignacion import AsignacionSerializer,RegistroAsignacionSerializer,updatePortadaAsig
from api.serializers.asignacionEstudiante import AsignacionEstudianteSerializer
from api.serializers.curso import CursoSerializer

class AsignacionViewset(viewsets.ModelViewSet):
    queryset = Asignacion.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("curso__nombre_curso","profesor__profile__nombre")
    search_fields = ("curso__nombre_curso",)
    ordering_fields = ("curso__nombre_curso",)
   
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionSerializer
        else:
            return RegistroAsignacionSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]
    #Solo administrador
    def create(self,request,*args,**kwargs):

        data = request.data
        avatar = data.get("avatar")
        data = json.loads(data["data"])
        print(data)
        copy = data
        serializer = RegistroAsignacionSerializer(data=data)

        if serializer.is_valid():
           
            ciclo_escolar = Ciclo.objects.get(pk=data.get("ciclo_Escolar"))
            grado = Grado.objects.get(pk=data.get("grado"))
            seccion = Seccion.objects.get(pk=data.get("seccion"))
            curso = Curso.objects.get(pk=data.get("curso"))
            profesor = Catedratico.objects.get(pk=data.get("profesor"))
        
            
            Asignacion.objects.create(
                ciclo_Escolar=ciclo_escolar,
                grado=grado,
                seccion=seccion,
                curso=curso,
                profesor=profesor,
                descripcion=data.get("descripcion"),
                imagen_portada= File(avatar)
            )

            return Response(copy, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    #Solo administrador
    def update(self,request,pk=None):

        data = request.data
        avatar = data.get("avatar")
        data = json.loads(data["data"])
        #print(data)
        copy = data
        serializer = RegistroAsignacionSerializer(data=data)

        if serializer.is_valid():

            asignacion = Asignacion.objects.get(pk=pk)
            if asignacion.imagen_portada is not None:
                    asignacion.imagen_portada.delete()
                
            asignacion.ciclo_escolar = Ciclo.objects.get(pk=data.get("ciclo_Escolar"))
            asignacion.grado = Grado.objects.get(pk=data.get("grado"))
            asignacion.seccion = Seccion.objects.get(pk=data.get("seccion"))
            asignacion.curso = Curso.objects.get(pk=data.get("curso"))
            asignacion.profesor = Catedratico.objects.get(pk=data.get("profesor"))
            asignacion.imagen_portada = File(avatar)
            asignacion.save()
            
            return Response(copy, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    #Solo administrador
    def destroy(self, request, pk):
        try:            
            asignacion = Asignacion.objects.get(pk=pk)
            if asignacion.imagen_portada is not None:
                asignacion.imagen_portada.delete()
            asignacion.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
  
        
class StudentEnrollments(viewsets.ModelViewSet):
    queryset = Asignacion.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("curso__nombre_curso","profesor__profile__nombre")
    search_fields = ("curso__nombre_curso",)
    ordering_fields = ("curso__nombre_curso",)
   
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionSerializer
        else:
            return RegistroAsignacionSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsEstud]
        return [permission() for permission in permission_classes]

     # Solo estudiantes
    @action(methods=["get"],detail=False)
    def getSubjectsbyStudent(self,request):
        student = request.user.profile.estudiante
        asignacionesEstudiante = AsignacionEstudiante.objects.filter(estudiante=student)
        asignaciones=[]
        for asignacionEstudiante in asignacionesEstudiante:
            asignacion = asignacionEstudiante.asignacion
            serializer = AsignacionSerializer(asignacion)
            asignaciones.append(serializer.data)
        
        return Response(asignaciones,status=status.HTTP_200_OK)



class TeacherCourses(viewsets.ModelViewSet):
    queryset = Asignacion.objects.all()
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("curso__nombre_curso","profesor__profile__nombre")
    search_fields = ("curso__nombre_curso",)
    ordering_fields = ("curso__nombre_curso",)
   
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionSerializer
        else:
            return RegistroAsignacionSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsCated]
        return [permission() for permission in permission_classes]
    
    # Solo Catedaticos
    @action(methods=["get"],detail=False)
    def obtenerCursos(self,request):
        catedratico = request.user.profile.catedratico_profile
        #id_perfil = request.GET.get("id")
        #perfil = Profile.objects.get(pk=id_perfil)
        #print(perfil.catedratico_profile)
        cursos = Asignacion.objects.all().filter(profesor=catedratico)
        serializer = AsignacionSerializer(cursos,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    #Solo Catedraticos
    @action(methods=["put"],detail=False)
    def updateCated(self,request):
        data = request.data
        serializer =  updatePortadaAsig(data = data)
        if serializer.is_valid():

            avatar = data.get("avatar")
            data = json.loads(data["data"])
            asignacion = Asignacion.objects.get(pk=data.get("id"))
            asignacion.imagen_portada= File(avatar)
            asignacion.save()

            return Response(serializer.data,status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

   





        