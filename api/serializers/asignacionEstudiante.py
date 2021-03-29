
# Rest Framework
from rest_framework import serializers
# Model
from api.models.asignacionEstudiante import AsignacionEstudiante

class AsignacionEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionEstudiante
        fields =(
            'id',
            'asignacion',
            'estudiante'
            )
        depth=3
class AsignacionEstudianteRegistro (serializers.ModelSerializer):
    class Meta:
        model = AsignacionEstudiante
        fields =('asignacion','estudiante')