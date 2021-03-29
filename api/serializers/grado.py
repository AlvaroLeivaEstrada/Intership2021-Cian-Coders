# Django Rest Framework
from api.serializers.nivel import NivelSerializer,NivelRegistroSerializer
from django.db import models
from django.db.models import fields
from rest_framework import serializers

# Model
from api.models.grado import Grado

class GradoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Grado
        fields = (
            'id',
            'nombre_grado',
            'nivel'
        )
        depth=1

class GradoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = ('nivel','nombre_grado')