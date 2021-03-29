# Rest Framework
from rest_framework import serializers
# Models
from api.models.tarea import Tarea

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = (
            'id',
            'asignacion',
            'nombre',
            'descripcion',
            'fecha',
            'hora',
            'nota',
            'archivo',
            'estudiante'
        )
        depth=2

class RegistroTareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = (
            'asignacion',
            'nombre',
            'fecha',
            'nota'
        )