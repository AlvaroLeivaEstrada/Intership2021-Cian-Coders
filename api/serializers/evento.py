# Rest_Framework
from rest_framework import serializers
# Models
from api.models.evento import Evento


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = (
            'id',
            'titulo',
            'ciclo',
            'descripcion',
            'fecha',
            'hora'
            )
        depth=1
class RegistroEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = (
            'ciclo',
            'titulo',
            'descripcion'
        )