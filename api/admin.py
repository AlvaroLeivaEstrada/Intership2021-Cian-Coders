
from django.contrib import admin

# Register your models here.

from api.models.empresa import Empresa
from api.models.nivel import Nivel
from api.models.seccion import Seccion
from api.models.grado import Grado
from api.models.curso import Curso
from api.models.catedratico import Catedratico

admin.site.register(Empresa)
admin.site.register(Nivel)
admin.site.register(Grado)
admin.site.register(Seccion)
admin.site.register(Curso)
admin.site.register(Catedratico)