import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { initialize as initializeForm } from 'redux-form';
import { api } from 'api';
import { NotificationManager } from 'react-notifications';
import { push } from 'react-router-redux';

// ------------------------------------
// Constants
// ------------------------------------
export const { reducers, initialState, actions } = createReducer(
    "seccion", // Identificador dentro del estado
    "secciones", // Endpoint a donde se realizaran las peticiones
    "SeccionForm",//Formulario que utiliza
    "/secciones", //Ruta a la que se ira una vez que ejecute las peticiones
);
const editarSeccion = (data) => (dispatch) => {
	api.put(`secciones/${data.id}`, data).then(() => {
		NotificationManager.success('Registro actualizado', 'Éxito', 3000);	
		dispatch(push("/secciones"));
	}).catch(() => {
		NotificationManager.error('Error en la edición', 'ERROR', 0);
	}).finally(() => {
	});
};
actions["editarSeccion"] = editarSeccion
export default handleActions(reducers, initialState);
