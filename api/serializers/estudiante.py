# Rest_Framework
from rest_framework import serializers
# Models
from api.models.estudiante import Estudiante
# Serializers
from api.serializers.profile import ProfileRegistroSerializer

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Estudiante
        fields=(
            'id',
            'carnet',
            'perfil',
            'contacto',
            'telefono_contacto',
            'direccion_contacto'

        )
        depth=2
class RegistroEstudianteSerializer(serializers.ModelSerializer):
    perfil = ProfileRegistroSerializer()
    class Meta:
        model=Estudiante
        fields=(
            'perfil',
            'carnet',
            'contacto',
            'direccion_contacto',
            'telefono_contacto'
        )