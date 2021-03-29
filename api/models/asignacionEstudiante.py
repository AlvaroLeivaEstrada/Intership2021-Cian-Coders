from django.db import models

class AsignacionEstudiante(models.Model):
    asignacion = models.ForeignKey('Asignacion',on_delete=models.CASCADE,related_name="asig_estud")
    estudiante = models.ForeignKey('Estudiante',on_delete=models.CASCADE,related_name="asig_estud")


    def __str__(self):
        return self.asignacion.curso.nombre_curso