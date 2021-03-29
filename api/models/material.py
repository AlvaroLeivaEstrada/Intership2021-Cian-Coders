
# Models
from django.db import models

class MaterialClase(models.Model):
    asignacion = models.ForeignKey('Asignacion',on_delete=models.CASCADE,related_name="material")
    titulo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=300)
    archivo = models.FileField(upload_to="archivos",blank=True,null=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo
