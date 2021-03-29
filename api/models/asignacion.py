from django.db import models
from api.models.estudiante import Estudiante

class Asignacion(models.Model):
    ciclo_Escolar = models.ForeignKey('Ciclo',on_delete=models.CASCADE,related_name='asignacion')
    grado = models.ForeignKey('Grado',on_delete=models.CASCADE,related_name='asignacion')
    seccion = models.ForeignKey('Seccion',on_delete=models.CASCADE,related_name='asignacion')
    curso = models.ForeignKey('Curso',on_delete=models.CASCADE,related_name='asignacion')
    profesor = models.ForeignKey('Catedratico',on_delete=models.CASCADE,related_name='asignacion')
    imagen_portada = models.ImageField(upload_to='imagenes',null=True,blank=True)
    descripcion = models.CharField(max_length=300,null=True,blank=True)
    

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)