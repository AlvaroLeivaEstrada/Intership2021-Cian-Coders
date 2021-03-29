# Rest Framework
from rest_framework import serializers

# Models
from api.models.asignacion import Asignacion

# Serializer
from api.serializers.estudiante import EstudianteSerializer
from api.serializers.tarea import TareaSerializer

class AsignacionSerializer(serializers.ModelSerializer):
    tarea = TareaSerializer(many=True)
   
    class Meta:
        model  = Asignacion
        fields =(
            'id',
            'ciclo_Escolar',
            'grado',
            'seccion',
            'curso',
            'profesor',
            'imagen_portada',
            'descripcion',
            'tarea',

        )
        depth = 3



class RegistroAsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignacion
        fields = (
            'ciclo_Escolar',
            'grado',
            'seccion',
            'curso',
            'profesor',
            'descripcion'
        )
class updatePortadaAsig(serializers.ModelSerializer):
    class Meta:
        model= Asignacion
        fields = (
            'imagen_portada',
        )