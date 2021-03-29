import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import {handleActions} from 'redux-actions';
import { initialize as initializeForm } from 'redux-form';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------


const baseReducer = createReducer(
    "catedratico", // Identificador dentro del estado
    "catedraticos", // Endpoint a donde se realizaran las peticiones
    "CatedraticoForm",//Formulario que utiliza
    "/catedraticos", //Ruta a la que se ira una vez que ejecute las peticiones
);

const crearCatedratico = data => (dispatch) => {
    console.log(data)
    const formData = {
        profesion : data.profesion.value,
        user : {
            email : data.email,
            password : data.password,
            username : data.username
        },
        profile : {
            nombre : data.nombre,
            apellidos : data.apellidos,
            rol : data.rol,
            phone : data.phone,
            address : data.adress,
            gender : data.gender
        }
    }
    api.post('catedraticos', formData).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push('/catedraticos'));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
    });
};

const editarCatedratico = (data) => (dispatch) => {
  
    const formData = {
        profesion : data.profesion.value,
        user : {
            id: data.id_user,
            email : data.email,
            password : data.password,
            username : data.username
        },
        profile : {
            id : data.id_profile,
            nombre : data.nombre,
            apellidos : data.apellidos,
            rol : data.rol,
            phone : data.phone,
            address : data.adress,
            gender : data.gender
        }
    }
    api.put(`catedraticos/${data.id}`, formData).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        dispatch(push('/catedraticos'));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
    });
};


const leerCatedratico = (id) => (dispatch) => {

    api.get(`catedraticos/${id}`).then((response) => {
        const formData ={
            id : response.id,
            id_profile : response.profile.id,
            id_user : response.profile.user.id,
            password : response.profile.user.password,
            nombre : response.profile.nombre,
            apellidos : response.profile.apellidos,
            email : response.profile.user.email,
            username : response.profile.user.username,
            profesion : {value : response.profesion.id,label:response.profesion.nombre},
            rol : response.profile.rol,
            phone : response.profile.phone,
            adress: response.profile.address,
            gender : response.profile.gender
        }
      
        dispatch(initializeForm("CatedraticoForm", formData));
    }).catch(() => {
    }).finally(() => {
    });
};

export const actions={
    ...baseReducer.actions,
    crearCatedratico,
    editarCatedratico,
    leerCatedratico
}
export const reducers={
    ...baseReducer.reducers
}
export const initialState={
    ...baseReducer.initialState
}

export default handleActions(reducers, initialState);
