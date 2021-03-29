# Rest_Framework
from rest_framework import serializers
# Models
from api.models.catedratico import Catedratico
# Serializers
from api.serializers.profile import ProfileRegistroSerializer

class CatedraticoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Catedratico
        fields=(
            'id',
            'profesion',
            'profile',
            'creado'
        )
        depth=2
class RegistroCatedraticoSerializer(serializers.ModelSerializer):
    profile = ProfileRegistroSerializer()
    class Meta:
        model=Catedratico
        fields=(
            'profesion',
            'profile'
        )