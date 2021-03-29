from django.db.models import fields
from rest_framework import serializers
from api.models.nivel import Nivel


class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Nivel
        fields='__all__'

class NivelRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model=Nivel
        fields=('nombre',)