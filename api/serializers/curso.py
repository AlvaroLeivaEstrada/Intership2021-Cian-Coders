# Django
from django.db import models
from django.db.models import fields

# Django rest_framework
from rest_framework import serializers

# Models
from api.models.curso import Curso
from api.serializers.seccion import SeccionSerializer
from api.serializers.grado import GradoSerializer



class RegistroCursoSerializer(serializers.ModelSerializer):
  
    class Meta:
        model=Curso
        fields=(
            'id',
            'nombre_curso',
            'descripcion',
        )


class CursoSerializer(serializers.ModelSerializer):
  
    class Meta:
        model=Curso
        fields=(
            'id',
            'nombre_curso',
            'descripcion',
        )
