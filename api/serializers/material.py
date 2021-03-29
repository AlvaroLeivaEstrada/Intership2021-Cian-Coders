
# Rest Framework
from rest_framework import serializers
# Models
from api.models.material import MaterialClase

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialClase
        fields = (
            'id',
            'titulo',
            'asignacion',
            'descripcion',
            'archivo'
            )
        depth = 3

class RegistroMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialClase
        fields = (
            'titulo',
            'asignacion',
            'descripcion'
        )