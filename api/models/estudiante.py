# Django
from django.db import models
# Models
from api.models.profile import Profile

class Estudiante(models.Model):
    perfil = models.OneToOneField(Profile,on_delete=models.CASCADE,related_name="estudiante")
    carnet = models.CharField(max_length=25)
    contacto = models.CharField(max_length=50)
    direccion_contacto = models.CharField(max_length=50)
    telefono_contacto = models.CharField(max_length=20)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.perfil.nombre