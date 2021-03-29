import {handleActions} from 'redux-actions';
import { api } from '../../../utility/api';
import {createReducer} from "../baseReducer/baseReducer";
import { NotificationManager } from "react-notifications";
import { push } from 'react-router-redux';
import { initialize } from 'redux-form';


const CICLO_ACTUAL = "CICLO_ACTUAL";

// ------------------------------------
// Constants
// ------------------------------------
const setCiclo =ciclo=>({
    type: CICLO_ACTUAL,
    ciclo

});

const baseReducer = createReducer(
    "evento", // Identificador dentro del estado
    "eventos", // Endpoint a donde se realizaran las peticiones
    "EventoForm",//Formulario que utiliza
    "/eventos", //Ruta a la que se ira una vez que ejecute las peticiones
);

const obtenerCicloActual = () =>(dispatch)=>{
    return api.get('ciclos/retrieveCurrent').then((response)=>{
        dispatch(setCiclo(response))
    }).catch((error)=>{})
}
const crearEvento = (data)=>(dispatch)=>{
    
    data.ciclo = data.ciclo.value
    return api.post("eventos",data).then((response)=>{
        NotificationManager.success(
            'Evento creado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/eventos'))
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
    });
}
const leer =id=>(dispatch)=>{
    return api.get(`eventos/${id}`).then((response)=>{
        const formData = {
            id:response.id,
            ciclo:{
                value:response.ciclo.id,
                label:response.ciclo.anio
            },
            titulo:response.titulo,
            descripcion:response.descripcion,
            fecha:response.fecha,
            hora:response.hora
        }
        dispatch(initialize("EventoForm",formData))
    }).catch((error)=>{
        NotificationManager.error('Error en la lectura')
    })
}
const editar = data => dispatch => {
    
    data.ciclo = data.ciclo.value
    return api.put(`eventos/${data.id}`,data).then((response)=>{
        NotificationManager.success(
            'Evento actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/eventos'))
    }).catch(() => {
        NotificationManager.error('Error en la actualización', 'ERROR');
    }).finally(() => {
    });

}
export const reducers = {
    ...baseReducer.reducers,
    [CICLO_ACTUAL]:(state,{ciclo})=>{
        return {
            ...state,
            ciclo,
        }
    }  
}
export const actions = {
    ...baseReducer.actions,
    obtenerCicloActual,
    crearEvento,
    editar,
    leer
}
export const initialState = {
    ...baseReducer.initialState,
    ciclo:null
}

export default handleActions(reducers, initialState);
