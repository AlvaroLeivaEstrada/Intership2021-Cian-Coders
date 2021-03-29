import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import empresa from './modules/empresa/empresa';
import nivel from './modules/nivel/niveles'
import grado from './modules/grado/grado'
import seccion from './modules/seccion/seccion'
import curso from './modules/curso/curso'
import profesion from './modules/profesion/profesion'
import catedratico from './modules/catedratico/catedratico'
import estudiante from './modules/estudiante/estudiante'
import ciclo from './modules/ciclo/ciclo'
import asignacion from './modules/asignacion/asignacion'
import configuracion from './modules/config/configuracion'
import evento from './modules/evento/evento'
import material from './modules/material/material'
import AsigEstud from './modules/asignacion/asignacionEstudiante'
import tarea from './modules/tarea/tarea'
import tareaEstudiante from './modules/tareaEstudiante/tareaEstudiante'
import catedConfig from './modules/catedPantalla/configuracion'
import estudPantalla from './modules/estudPantalla/estudPantalla'
import gestCursosCated from './modules/GestionCursosCated/GestionCursosCated'
import gestCursosEstud from './modules/GestionCursosEstud/GestionCursosCated'
import newPassword from './modules/cuenta/newPassword'

export default combineReducers({
    form: formReducer,
    login,
    tarea,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    empresa,
    nivel,
    grado,
    seccion,
    curso,
    profesion,
    catedratico,
    estudiante,
    ciclo,
    asignacion,
    configuracion,
    evento,
    material,
    AsigEstud,
    tareaEstudiante,
    catedConfig,
    estudPantalla,
    gestCursosCated,
    gestCursosEstud,
    newPassword
});
