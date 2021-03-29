from django.db import models

class Evento(models.Model):
    ciclo = models.ForeignKey('Ciclo',on_delete=models.CASCADE,related_name='evento')
    titulo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=300)
    fecha = models.DateField(null=True,blank=True)
    hora = models.TimeField(null=True,blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)