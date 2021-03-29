from django.db import models


class Empresa(models.Model):

    nombre = models.CharField(max_length=250,null=True,blank=True)
    direccion = models.CharField(max_length=250,null=True,blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateField(auto_now_add=True)
    modificado = models.DateField(auto_now=True)

   # def delete(self,*args):
    #    self.activo=False
     #   self.save()
      #  return True
