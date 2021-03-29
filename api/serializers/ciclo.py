# Rest Framework
from rest_framework import serializers

# Models
from api.models.ciclo import Ciclo

class CicloSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Ciclo
        fields =('id','anio')



class RegistroCicloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo
        fields = ('anio',)