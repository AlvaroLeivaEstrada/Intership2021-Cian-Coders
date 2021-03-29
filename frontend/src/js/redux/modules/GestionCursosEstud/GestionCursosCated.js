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
    "gestCursosCated", // Identificador dentro del estado
    "asignaciones", // Endpoint a donde se realizaran las peticiones
    "AsignacionForm",//Formulario que utiliza
    "/asignaciones", //Ruta a la que se ira una vez que ejecute las peticiones
);
const GUARDAR_IMAGEN = "GUARDAR_IMAGEN"
const GUARDAR_DATA = "GUARDAR_DATA"


const setImagen = img =>({
    type:GUARDAR_IMAGEN,
    img
})
const setData = data =>({
    type:GUARDAR_DATA,
    data
})
const listar=()=>(dispatch)=>{
    api.get('studentEnrollments/getSubjectsbyStudent').then((response)=>{
        console.log("listar",response)
        dispatch(setData(response))
    }).catch(()=>{
        NotificationManager.error('Error en la lista', 'ERROR', 0);
    })
}


const leerAsignacion = (id) => (dispatch) => {
    api.get(`studentEnrollments/${id}`).then((response) => {
        const formData = {
            id : response.id,
            descripcion : response.descripcion,
            avatar : response.imagen_portada
        }
        dispatch(setImagen(response.imagen_portada))
      
        dispatch(initializeForm("GestCursoCatedForm", formData));
    }).catch(() => {
    }).finally(() => {
    });
};

export const actions={
    ...baseReducer.actions,
    listar,
    leerAsignacion
}
export const reducers={
    ...baseReducer.reducers,
    [GUARDAR_IMAGEN]:(state,{img})=>{
        return{
            ...state,
            img
        }
    },
    [GUARDAR_DATA]:(state,{data})=>{
        return{
            ...state,
            data:{
                results:data,
                count:0
            }
        }
    }
}
export const initialState={
    ...baseReducer.initialState,
    img:null,
    data:{
        results:[],
        count:0
    }
}

export default handleActions(reducers, initialState);
