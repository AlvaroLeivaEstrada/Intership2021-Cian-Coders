from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets
from api.viewsets import nivel,empresa,profesion,estudiante,asignacion,ciclo,evento,material,user
from api.viewsets import tarea,asignacionEstudiante,catedratico,grado,curso,seccion,TareaEstudiante

router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'setPassword',user.SetNewPassword)

router.register(r'grados', grado.GradoViewset)
router.register(r'cursos',curso.CursoViewSet)
router.register(r'secciones',seccion.SeccionViewset)
router.register(r'catedraticos',catedratico.CatedraticoViewset)
router.register(r'niveles', nivel.NivelViewset)
router.register(r'profesiones', profesion.ProfesionViewSet)
router.register(r'estudiantes', estudiante.EstudianteViewset)

router.register(r'listStudents', estudiante.ListStudents)
router.register(r'asignaciones',asignacion.AsignacionViewset)
router.register(r'studentEnrollments',asignacion.StudentEnrollments)
router.register(r'teacherCourses',asignacion.TeacherCourses)
router.register(r'asignaciones',asignacion.AsignacionViewset)
router.register(r'ciclos',ciclo.CicloViewset)

router.register(r'eventos',evento.EventoViewset)
router.register(r'eventsOperateByStudent',evento.OperateByUsers)

router.register(r'AsigEstudiantes',asignacionEstudiante.AsignacionEstudianteViewSet)
router.register(r'StudentEnrollmentsAndHomeWork',asignacionEstudiante.StudentEnrollmentsAndHomeWork)

router.register(r'materiales',material.MaterialViewSet)
router.register(r'ReadByStudentMaterial',material.ReadByStudent)

router.register(r'tareas',tarea.TareaViewset)
router.register(r'tareasOperateByStudent',tarea.OperateStudent)
router.register(r'tareaEstudiante',TareaEstudiante.TareaEstudianteViewSet)
router.register(r'tareaEstudianteOperateByStudent',TareaEstudiante.OperateStudentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
