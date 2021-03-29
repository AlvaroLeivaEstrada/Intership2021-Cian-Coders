
# Django 
from django.db import models

class Curso(models.Model):
    
    nombre_curso= models.CharField(max_length=30)
    descripcion = models.CharField(max_length=300)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre_curso