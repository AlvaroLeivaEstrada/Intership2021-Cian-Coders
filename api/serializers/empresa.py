from django.db.models import fields
from rest_framework import serializers
from api.models import Empresa


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Empresa
        fields='__all__'

class EmpresaRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model=Empresa
        fields=('nombre','direccion')