from django.db import models


class Ciclo(models.Model):
    anio = models.IntegerField()
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.anio)
    
    