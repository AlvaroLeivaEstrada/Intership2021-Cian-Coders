import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";





const LISTADO_CURSOS='LISTADO_CURSOS';
const LISTADO_EVENTOS='LISTADO_EVENTOS'
const LOADER = 'LOADER';
const TAREAS = 'TAREAS';
const TAREAS_PENDIENTES = 'TAREAS_PENDIENTES';

// -----------------------------------
// Pure Actions
// -----------------------------------
const setLoader = loader => ({
    type: LOADER,
    loader,
});
const setCursos = cursos => ({
    type: LISTADO_CURSOS,
    cursos,
});
const setEventos = eventos => ({
    type: LISTADO_EVENTOS,
    eventos,
});
const setTotalTareasPendientes = totalTareasPendientes =>({
    type: TAREAS_PENDIENTES,
    totalTareasPendientes
});
const setTareas = tareas =>({
    type: TAREAS,
    tareas
});

 // -----------------------------------
 // Actions
 // ----------------------------------

const listarCursos = ()=>(dispatch,getState)=>{
    //const idProfile = getState().form.profile.values.id;
    //console.log(idProfile)
    //const params={ id:idProfile}
    //api.get('asignaciones/obtenerCursos',params)
    api.get('teacherCourses/obtenerCursos')
        .then((response)=>{
            console.log("Cursos",response)
            dispatch(setCursos(response))
    }).catch((error)=>{})
}
const eventosProximos=()=>(dispatch)=>{
    api.get('eventsOperateByStudent/eventosProximos').then((response)=>{
        console.log(response)
        dispatch(setEventos(response))
    }).catch(()=>{})
}
const totalTareas = ()=>(dispatch)=>{
    api.get('tareas/totalTareasPendientes').then((response)=>{
        console.log(response)
        dispatch(setTotalTareasPendientes(response.total_pendientes))
    }).catch(()=>{})
}
const totalTareasPorCurso=()=>(dispatch)=>{
    api.get("tareas/totalTareasPendientesCurso").then((response)=>{
        dispatch(setTareas(response))
    }).catch(()=>{})
}

export const actions = {
    listarCursos,
    eventosProximos,
    totalTareas,
    totalTareasPorCurso
};

export const reducers = {

    [LISTADO_CURSOS]:(state={initialState},{cursos})=>{
        return {
            ...state,
            cursos:{
                results :cursos
            }
        }
    },
    [LOADER]: (state={initialState}, { loader }) => {
        return {
            ...state,
            loader
        };
    },
    [LISTADO_EVENTOS]:(state={initialState},{eventos})=>{
        return {
            ...state,
            eventos:{
                results:eventos
            }
        }
    },
    [TAREAS_PENDIENTES]:(state={initialState},{totalTareasPendientes})=>{
        return {
            ...state,
            totalTareasPendientes,
        }
    },
    [TAREAS]:(state={initialState},{tareas})=>{
        return {
            ...state,
            tareas:{
                results:tareas
            },
        }
    }
};

export const initialState = {

    loader : false,
    cursos:{
        results:[],
        count:0
    },
    eventos:{
        results:[],
        count:0
    },
    totalTareasPendientes:0,
    tareas:{
        results:[],
        count:0
    }
    
    
};

export default handleActions(reducers, initialState);
