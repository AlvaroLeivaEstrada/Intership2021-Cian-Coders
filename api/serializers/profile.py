# Django Rest Framework
from api.serializers.nivel import NivelSerializer,NivelRegistroSerializer
from django.db import models
from django.db.models import fields
from rest_framework import serializers

# Model
from api.models.profile import Profile

class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = (
            'id',
            'nombre',
            'apellidos',
            'rol',
            'user'
        )
        

class ProfileRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'nombre',
            'apellidos',
            'rol',
            'phone',
            'address',
            'gender'
        )