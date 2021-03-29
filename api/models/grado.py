# Django
from django.db import models

# Model
from api.models.nivel import Nivel
from api.models.seccion import Seccion


class Grado(models.Model):
    nombre_grado = models.CharField(max_length=100)
    nivel = models.ForeignKey('Nivel',on_delete=models.CASCADE)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre_grado