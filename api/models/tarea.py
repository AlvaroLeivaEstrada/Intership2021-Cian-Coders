from django.db import models


class Tarea(models.Model):
    asignacion = models.ForeignKey('Asignacion',on_delete=models.CASCADE,related_name='tarea')
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=160,blank=True,null=True)
    archivo = models.FileField(upload_to='tareas',blank=True,null=True)
    fecha = models.DateField(blank=True,null=True)
    hora = models.TimeField(blank=True,null=True)
    nota = models.IntegerField(blank=True,null=True,default=0)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)