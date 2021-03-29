import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import {createSeccion} from '../seccion/seccion'
import {createReducer} from "../baseReducer/baseReducer";
import curso from '../curso/curso';




const LISTADO_ASIGNACIONES='LISTADO_ASIGNACIONES';
const LISTADO_EVENTOS='LISTADO_EVENTOS';
const LOADER = 'LOADER';
const LISTADO_TAREAS = 'LISTADO_TAREAS';

// -----------------------------------
// Pure Actions
// -----------------------------------
const setLoader = loader => ({
    type: LOADER,
    loader,
});
const setAsignaciones = asignaciones => ({
    type: LISTADO_ASIGNACIONES,
    asignaciones,
});
const setEventos = eventos => ({
    type: LISTADO_EVENTOS,
    eventos,
});
const setTareas = tareas =>({
    type: LISTADO_TAREAS,
    tareas
})

 // -----------------------------------
 // Actions
 // ----------------------------------

const listarAsignaciones = ()=>(dispatch,getState)=>{
    api.get('StudentEnrollmentsAndHomeWork/obtenerAsignacionesEstudiante')
        .then((response)=>{
            console.log("Asignaciones del Estudiante:",response)
            dispatch(setAsignaciones(response))
    }).catch((error)=>{})
};
const eventosProximos=()=>(dispatch)=>{
    api.get('eventsOperateByStudent/eventosProximos').then((response)=>{
        console.log(response)
        dispatch(setEventos(response))
    }).catch(()=>{})
};

const listarTareas = ()=>(dispatch)=>{
    api.get('StudentEnrollmentsAndHomeWork/obtenerTareas').then((response)=>{
        console.log("Tareas ",response)
        dispatch(setTareas(response))
    }).catch((error)=>{console.log("Hubo un error",error)})
}


export const actions = {
    listarAsignaciones,
    eventosProximos,
    listarTareas
};

export const reducers = {

    [LISTADO_TAREAS]:(state,{tareas})=>{
        return{
            ...state,
            tareas:{
                results:tareas,
                count:0
            }
        }
    },
    [LISTADO_ASIGNACIONES]:(state={initialState},{asignaciones})=>{
        return {
            ...state,
            asignaciones:{
                results :asignaciones,
                count:0
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
};

export const initialState = {

    loader : false,
    asignaciones:{
        results:[],
        count:0
    },
    eventos:{
        results:[],
        count:0
    },
    tareas:{
        results:[],
        count:0
    }
    
};

export default handleActions(reducers, initialState);
