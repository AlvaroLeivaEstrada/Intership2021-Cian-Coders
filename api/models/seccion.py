from django.db import models

class Seccion(models.Model):
    tipo_seccion = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.tipo_seccion