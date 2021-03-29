# Django
from django.db import models

class TareaEstudiante(models.Model):

    tarea = models.ForeignKey('Tarea',on_delete=models.CASCADE,related_name='estudiante')
    estudiante = models.ForeignKey('Profile',on_delete=models.CASCADE,related_name='tarea')
    fecha = models.DateField(blank=True,null=True)
    archivo = models.FileField(blank=True,null=True)
    texto = models.CharField(max_length=200,blank=True,null=True)
    calificacion = models.IntegerField(default=0,blank=True,null=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)