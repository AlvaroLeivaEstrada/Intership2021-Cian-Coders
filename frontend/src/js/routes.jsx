import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';
import AdminHome from './common/components/config/Grids/index'
import CatedHome from './common/components/catedPantalla/index'

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

import Empresa from '../js/common/components/Empresa/EmpresaCrearContainer'
import EmpresaList from '../js/common/components/Empresa/EmpresaListContainer'
import NivelContainer from '../js/common/components/Nivel/NivelCrearContainer'
import NivelList from '../js/common/components/Nivel/NivelListContainer'
import GradoContainer from '../js/common/components/Grado/GradoCrearContainer'
import GradosList from '../js/common/components/Grado/GradoListContainer'
import SeccionListContainer from '../js/common/components/Seccion/SeccionListContainer'
import SeccionContainer from './common/components/Seccion/SeccionCrearContainer'
import CursoContainer from '../js/common/components/Curso/CursoCrearContainer'
import CursoListContainer from '../js/common/components/Curso/CursoListContainer'
import ProfesionContainer from '../js/common/components/profesion/ProfesionCrearContainer'
import ProfesionListContainer from '../js/common/components/profesion/ProfesionListContainer'
import CatedraticoContainer from '../js/common/components/catedratico/CatedraticoCrearContainer'
import CatedraticoListContainer from '../js/common/components/catedratico/CatedraticoListContainer'
import EstudianteContainer from '../js/common/components/estudiante/EstudianteCrearContainer'
import EstudianteListContainer from '../js/common/components/estudiante/EstudianteListContainer'
import CicloCrearContainer from '../js/common/components/ciclo/CicloCrearContainer'
import CicloListContainer from '../js/common/components/ciclo/CicloListContainer'
import AsignacionCrearContainer from '../js/common/components/asignacion/AsignacionCrearContainer'
import AsignacionListContainer from '../js/common/components/asignacion/AsignacionListContainer'
import ClaveModificarContainer from './common/components/LoginRegister/Profile/ClaveModificarContainer';
import EventoContainer from '../js/common/components/evento/EventoCrearContainer'
import EventoListContainer from '../js/common/components/evento/EventoListContainer'
import MaterialCrearContainer from '../js/common/components/material/MaterialCrearContainer'
import MaterialListContaines from '../js/common/components/material/MaterialListContainer'
import AsignarEstudianteContainer from '../js/common/components/AsignacionEstudiate/AsignarEstudianteContainer'
import AsignarEstudianteListContainer from '../js/common/components/AsignacionEstudiate/AsignarEstudianteListContainer'
import TareaCrearContainer from '../js/common/components/tarea/TareaCrearContainer'
import TareaListContainer from '../js/common/components/tarea/TareaListContainer'
import TareaEstudianteContainer from '../js/common/components/TareaEstudiante/TareaCrearContainer'
import TareaEstudianteListContainer from '../js/common/components/TareaEstudiante/TareaListContainer'
import EstudPantalla from '../js/common/components/estudPantalla/index'

import GestCursosCated from '../js/common/components/GestionCursosCatedratico/GestCursoCatedContainer'
import GestCursosList from '../js/common/components/GestionCursosCatedratico/GestCursoCateListContainer'

import GestCursosEstudList from '../js/common/components/GestionCursosEstudiante/GestCursoCateListContainer'
import TareaListEstudContainer from '../js/common/components/tarea/TareaListEstudContainer'
import ListaNotasContainer from '../js/common/components/tarea/ListaNotasContainer'
import setNewPassword from '../js/common/components/LoginRegister/NuevaContraseña/index'

import Restablecer from '../js/common/components/LoginRegister/RecuperarContraseña/index'
module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <Route exact path="/restablecer" component={Restablecer}/>
                <Route exact path="/settingNewPassword/:id" component={setNewPassword}/>
                
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} /> 
                <ProtectedRoute exact path="/catedHome" component={CatedHome}/>
                <ProtectedRoute exact path="/estudHome" component = {EstudPantalla}/>
                
                <ProtectedRoute exact path="/empresa/crear" component={Empresa}/>
                <ProtectedRoute exact path="/empresa/:id" component={Empresa}/>
                <ProtectedRoute exact path="/empresa/:id/editar" component={Empresa}/>
                <ProtectedRoute exact path="/empresas" component={EmpresaList}/>
                
                <ProtectedRoute exact path="/nivel/crear" component={NivelContainer}/>
                <ProtectedRoute exact path="/nivel/:id" component={NivelContainer}/>
                <ProtectedRoute exact path="/nivel/:id/editar" component={NivelContainer}/>
                <ProtectedRoute exact path="/niveles" component={NivelList}/>

                <ProtectedRoute exact path="/grados"component={GradosList}/>
                <ProtectedRoute exact path="/grado/crear"component={GradoContainer}/>
                <ProtectedRoute exact path="/grado/:id" component={GradoContainer}/>
                <ProtectedRoute exact path="/grado/:id/editar" component={GradoContainer}/>
               
                <ProtectedRoute exact path="/secciones"component={SeccionListContainer}/>
                <ProtectedRoute exact path="/seccion/crear"component={SeccionContainer}/>
                <ProtectedRoute exact path="/seccion/:id" component={SeccionContainer}/>
                <ProtectedRoute exact path="/seccion/:id/editar" component={SeccionContainer}/>

                <ProtectedRoute exact path="/cursos"component={CursoListContainer}/>
                <ProtectedRoute exact path="/curso/crear"component={CursoContainer}/>
                <ProtectedRoute exact path="/curso/:id" component={CursoContainer}/>
                <ProtectedRoute exact path="/curso/:id/editar" component={CursoContainer}/>
               
                <ProtectedRoute exact path="/profesiones"component={ProfesionListContainer}/>
                <ProtectedRoute exact path="/profesion/crear"component={ProfesionContainer}/>
                <ProtectedRoute exact path="/profesion/:id" component={ProfesionContainer}/>
                <ProtectedRoute exact path="/profesion/:id/editar" component={ProfesionContainer}/>
               
                <ProtectedRoute exact path="/catedratico/crear"component={CatedraticoContainer}/>
                <ProtectedRoute exact path="/catedraticos"component={CatedraticoListContainer}/>
                <ProtectedRoute exact path="/catedratico/:id"component={CatedraticoContainer}/>
                <ProtectedRoute exact path="/catedratico/:id/editar" component={CatedraticoContainer}/>

                <ProtectedRoute exact path="/estudiante/crear"component={EstudianteContainer}/>
                <ProtectedRoute exact path="/estudiantes"component={EstudianteListContainer}/>
                <ProtectedRoute exact path="/estudiante/:id"component={EstudianteContainer}/>
                <ProtectedRoute exact path="/estudiante/:id/editar" component={EstudianteContainer}/>

                <ProtectedRoute exact path="/ciclo/crear" component={CicloCrearContainer}/>
                <ProtectedRoute exact path="/ciclos" component={CicloListContainer}/>
                <ProtectedRoute exact path="/ciclo/:id" component={CicloCrearContainer}/>
                <ProtectedRoute exact path="/ciclo/:id/editar" component={CicloCrearContainer}/>

                <ProtectedRoute exact path="/asignacion/crear" component={AsignacionCrearContainer}/>
                <ProtectedRoute exact path="/asignaciones" component={AsignacionListContainer}/>
                <ProtectedRoute exact path="/asignacion/:id" component={AsignacionCrearContainer}/>
                <ProtectedRoute exact path="/asignacion/:id/editar" component={AsignacionCrearContainer}/>
                
                <Route exact path="/claveModificar/:id" component={ClaveModificarContainer}/>

                <ProtectedRoute exact path="/config" component={AdminHome}/>
               
               <ProtectedRoute exact path="/evento/crear" component={EventoContainer}/>
               <ProtectedRoute exact path="/evento/:id" component={EventoContainer}/>
               <ProtectedRoute exact path="/evento/:id/editar" component={EventoContainer}/>
               <ProtectedRoute exact path="/eventos" component={EventoListContainer}/>

               <ProtectedRoute exact path="/material/crear/:id" component={MaterialCrearContainer}/>
               <ProtectedRoute exact path="/materiales/material/:id" component={MaterialCrearContainer}/>
               <ProtectedRoute exact path="/materiales/material/:id/editar" component={MaterialCrearContainer}/>
               <ProtectedRoute exact path="/materiales" component={MaterialListContaines}/>

               <ProtectedRoute exact path="/asigEstud/crear/:id" component={AsignarEstudianteContainer}/>
               <ProtectedRoute exact path="/asigEstud/:id" component={AsignarEstudianteContainer}/>
               <ProtectedRoute exact path="/asigEstud/:id/editar" component={AsignarEstudianteContainer}/>
               <ProtectedRoute exact path="/asigEstudiantes" component={AsignarEstudianteListContainer}/>

               <ProtectedRoute exact path="/tarea/crear/:id" component={TareaCrearContainer}/>
               <ProtectedRoute exact path="/tareas/tarea/:id" component={TareaCrearContainer}/>
               <ProtectedRoute exact path="/tareas/tarea/:id/editar" component={TareaCrearContainer}/>
               <ProtectedRoute exact path="/tareas" component={TareaListContainer}/>
               
               <ProtectedRoute exact path="/listadoTareasEstud/tareaEstudiante/crear/:id" component={TareaEstudianteContainer}/>
               <ProtectedRoute exact path="/listadoTareasEstud/tareaEstudiante/:id" component={TareaEstudianteContainer}/>
               <ProtectedRoute exact path="/tareas/tareaEstudiantes/tareaEstudiante/:id/editar" component={TareaEstudianteContainer}/>
               <ProtectedRoute exact path="/tareas/tareaEstudiantes/:id" component={TareaEstudianteListContainer}/>
               
               <ProtectedRoute exact path="/gestCursosCated/:id/editar" component={GestCursosCated}/>
               <ProtectedRoute exact path="/gestCursosCatedList" component={GestCursosList}/>
               <ProtectedRoute exact path ="/listGrades" component={ListaNotasContainer}/>
               
               <ProtectedRoute exact path="/gestCursosEstudList" component={GestCursosEstudList}/>
               <ProtectedRoute exact path="/listadoTareasEstud/:id" component={TareaListEstudContainer}/>
               <ProtectedRoute exact path="/listadoTareasEstud/tarea/:id" component={TareaCrearContainer}/>
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
