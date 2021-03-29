from django.db import models

class Nivel(models.Model):
    nombre = models.CharField(max_length=50,unique=True)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre