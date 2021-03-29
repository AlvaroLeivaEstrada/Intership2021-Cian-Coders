from rest_framework import serializers
# Models
from api.models.profesion import Profesion

class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Profesion
        fields=(
            'id',
            'nombre',
            'descripcion'
        )
class RegistroProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields=(
            'nombre',
            'descripcion'
        )