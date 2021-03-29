import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";

// ------------------------------------
// Constants
// ------------------------------------


const baseReducer = createReducer(
    "grado", // Identificador dentro del estado
    "grados", // Endpoint a donde se realizaran las peticiones
    "GradoForm",//Formulario que utiliza
    "/grados", //Ruta a la que se ira una vez que ejecute las peticiones
);


const crearGrado = data => (dispatch) => {
  
    const formData = {
        nivel: data.nivel.value,
        nombre_grado: data.nombre_grado
    }
    api.post('grados', formData).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push('/grados'));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
    });
};

const leerGrado = (id) => (dispatch) => {
   
    api.get(`grados/${id}`)
        .then((response) => {  
                response.nivel = {value: response.nivel.id, label: response.nivel.nombre};
                dispatch(initializeForm("GradoForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};
const editarGrado = (data) => (dispatch) => {
    const formData ={
        nivel:data.nivel.value,
        nombre_grado:data.nombre_grado
    }
    api.put(`grados/${data.id}`, formData).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        dispatch(push('/grados'));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
    });
};

export const actions={
    ...baseReducer.actions,
    leerGrado,
    crearGrado,
    editarGrado
}
export const reducers={
    ...baseReducer.reducers
}
export const initialState={
    ...baseReducer.initialState
}

export default handleActions(reducers, initialState);
