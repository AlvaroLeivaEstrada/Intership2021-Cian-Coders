from django.db import models

from django.contrib.auth.models import User
from api.models.rol import Rol


class Profile(models.Model):

    MALE = 0
    FEMALE = 1

    ADMINISTRADOR = 'ADMIN'
    CATEDRATICO = 'CATED'
    ESTUDIANTE = 'ESTUD'

    GENDERS = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE')
    )
    ROLES=(
        (ADMINISTRADOR,'ADMINISTRADOR'),
        (CATEDRATICO,'CATEDRATICO'),
        (ESTUDIANTE,'ESTUDIANTE')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    
    #firstTimeLogged = models.BooleanField(default=False)
   # rol = models.ForeignKey('Rol',on_delete=models.CASCADE)

   
    rol = models.CharField(max_length=5,choices=ROLES,default=ADMINISTRADOR)
    avatar = models.ImageField(upload_to='Avatar', null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    gender = models.PositiveSmallIntegerField(choices=GENDERS, null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['email','password']

    
    def __unicode__(self):
        return self.user.username

    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.active = False
        self.save()
        return True
