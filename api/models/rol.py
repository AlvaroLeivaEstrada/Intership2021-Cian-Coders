
from django.db import models

class Rol(models.Model):
    nombre = models.CharField(max_length=45)
    descripcion = models.CharField(max_length=100)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre