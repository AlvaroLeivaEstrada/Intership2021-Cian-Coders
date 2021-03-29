import { api } from "api";
import { at } from "lodash";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import {handleActions} from 'redux-actions';
import { initialize as initializeForm } from 'redux-form';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------


const baseReducer = createReducer(
    "asignacion", // Identificador dentro del estado
    "asignaciones", // Endpoint a donde se realizaran las peticiones
    "AsignacionForm",//Formulario que utiliza
    "/asignaciones", //Ruta a la que se ira una vez que ejecute las peticiones
);
const CICLO_ACTUAL = "CICLO_ACTUAL"
const GUARDAR_IMAGEN = "GUARDAR_IMAGEN"

const setCiclo = ciclo =>({
    type:CICLO_ACTUAL,
    ciclo,
})
const setImagen = img =>({
    type:GUARDAR_IMAGEN,
    img
})

const crearAsignacion = (data,attacments) => (dispatch) => {

    const formData = {
        ciclo_Escolar : data.ciclo.value,
        grado : data.grado.value,
        seccion : data.seccion.value,
        curso : data.curso.value,
        profesor : data.profesor.value,
        descripcion : data.descripcion,  
    };
    api.postAttachments('asignaciones', formData,attacments).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000); 
        dispatch(push('/asignaciones'));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
    });
};

const editarAsignacion = (data={},attachments=[]) => (dispatch) => {
    
    const formData = {
        ciclo_Escolar : data.ciclo.value,
        grado : data.grado.value,
        seccion : data.seccion.value,
        curso : data.curso.value,
        profesor : data.profesor.value,
        descripcion : data.descripcion,   
    } 
    api.putAttachments(`asignaciones/${data.id}`,formData,attachments).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        dispatch(push('/asignaciones'));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {

    });
};
const getCurrentCiclo = ()=>(dispatch)=>{
    return api.get('ciclos/retrieveCurrent').then((response)=>{
        dispatch(setCiclo(response))
    }).catch((error)=>{})
}
const clearFile =()=>(dispatch)=>{
    dispatch(setImagen(null))
}

const leerAsignacion = (id) => (dispatch) => {
    
    api.get(`asignaciones/${id}`).then((response) => {
        const formData = {
            id : response.id,
            ciclo:{
                value:response.ciclo_Escolar.id,
                label:response.ciclo_Escolar.anio
            },
            grado : {
                value: response.grado.id,
                label: response.grado.nombre_grado
            },
            seccion :{
                value: response.seccion.id,
                label : response.seccion.tipo_seccion
            },
            curso : {
                value : response.curso.id,
                label : response.curso.nombre_curso
            },
            profesor : {
                value : response.profesor.id, 
                label : response.profesor.profile.nombre +' '+response.profesor.profile.apellidos
            },
            descripcion : response.descripcion,
            avatar : response.imagen_portada
        }
        dispatch(setImagen(response.imagen_portada))

        dispatch(initializeForm("AsignacionForm", formData));
    }).catch(() => {
    }).finally(() => {
    });
};

export const actions={
    ...baseReducer.actions,
    crearAsignacion,
    editarAsignacion,
    leerAsignacion,
    getCurrentCiclo,
    clearFile
}
export const reducers={
    ...baseReducer.reducers,
    [CICLO_ACTUAL]:(state,{ciclo})=>{
        
        return {
            ...state,
            ciclo
        }
    },
    [GUARDAR_IMAGEN]:(state,{img})=>{
        return{
            ...state,
            img
        }
    }
}
export const initialState={
    ...baseReducer.initialState,
    ciclo:null,
    img:null
}

export default handleActions(reducers, initialState);
