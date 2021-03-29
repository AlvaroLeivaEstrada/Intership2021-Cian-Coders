import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { push } from "react-router-redux";
import { api } from "api";
import { NotificationManager } from "react-notifications";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "profesion", // Identificador dentro del estado
    "profesiones", // Endpoint a donde se realizaran las peticiones
    "ProfesionForm",//Formulario que utiliza
    "/profesiones", //Ruta a la que se ira una vez que ejecute las peticiones
);
const editarProfesion = (data) => (dispatch) => {
   
    const formData = {
        nombre : data.nombre,
        descripcion : data.descripcion
    }
    api.put(`profesiones/${data.id}`, formData).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        dispatch(push("/profesiones"));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {

    });
};
actions["editarProfesion"]=editarProfesion

export default handleActions(reducers, initialState);
