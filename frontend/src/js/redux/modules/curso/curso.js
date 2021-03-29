import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";


const baseReducer = createReducer(
    "curso", // Identificador dentro del estado
    "cursos", // Endpoint a donde se realizaran las peticiones
    "CursoForm",//Formulario que utiliza
    "/cursos", //Ruta a la que se ira una vez que ejecute las peticiones
);


export const initialState ={
    ...baseReducer.initialState
}

export const reducers ={
    ...baseReducer.reducers
}
export const actions={
    ...baseReducer.actions
}

export default handleActions(reducers, initialState);