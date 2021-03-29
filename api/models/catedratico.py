
from django.db import models

from api.models.profile import Profile
from api.models.profesion import Profesion


class Catedratico(models.Model):

   profesion = models.ForeignKey('Profesion',on_delete=models.CASCADE,related_name="catedratico")
   profile = models.OneToOneField(Profile,on_delete=models.CASCADE,related_name="catedratico_profile")
  
   activo = models.BooleanField(default=True)
   creado = models.DateTimeField(auto_now_add=True)
   modificado = models.DateTimeField(auto_now=True)

   def __str__(self):
      return self.profile.nombre


  