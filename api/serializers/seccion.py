from django.db.models import fields
from rest_framework import serializers
from api.models.seccion import  Seccion


class SeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seccion
        fields=('id','tipo_seccion',)

class RegistroSeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seccion
        fields=('tipo_seccion',)
