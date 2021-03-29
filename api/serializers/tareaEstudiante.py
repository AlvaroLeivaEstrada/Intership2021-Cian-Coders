#Rest Framework
from rest_framework import serializers
#Model
from api.models.tareaEstudiante import TareaEstudiante

class TareaEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TareaEstudiante
        fields = (
            'id',
            'tarea',
            'estudiante',
            'fecha',
            'archivo',
            'calificacion',
            'texto'
        )
        depth = 3
class RegistroTareaEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TareaEstudiante
        fields = (
            'tarea',
            'estudiante',
            'texto'
        )