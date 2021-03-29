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
    "estudiante", // Identificador dentro del estado
    "estudiantes", // Endpoint a donde se realizaran las peticiones
    "EstudianteForm",//Formulario que utiliza
    "/estudiantes", //Ruta a la que se ira una vez que ejecute las peticiones
);

const crearEstudiante = data => (dispatch) => {
  
    const formData = {
        user : {
            email : data.email,
            password : data.password,
            username : data.username
        },
        perfil : {
            nombre : data.nombre,
            apellidos : data.apellidos,
            rol : data.rol,
            phone : data.phone,
            address : data.adress,
            gender : data.gender
        },
        
        carnet : data.carnet,
        contacto : data.contacto,
        telefono_contacto : data.telefono_contacto,
        direccion_contacto : data.direccion_contacto
        
    }
    api.post('estudiantes', formData).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push('/estudiantes'));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
    });
};

const editarEstudiante = (data) => (dispatch) => {
  
    const formData = {
        user : {
            id: data.id_user,
            email : data.email,
            password : data.password,
            username : data.username
        },
        perfil : {
            id : data.id_profile,
            nombre : data.nombre,
            apellidos : data.apellidos,
            rol : data.rol,
            phone : data.phone,
            address : data.adress,
            gender : data.gender
        },
        carnet : data.carnet,
        contacto : data.contacto,
        telefono_contacto : data.telefono_contacto,
        direccion_contacto : data.direccion_contacto
    }
    api.put(`estudiantes/${data.id}`, formData).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        dispatch(push('/estudiantes'));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {

    });
};


const leerEstudiante= (id) => (dispatch) => {
    
    api.get(`estudiantes/${id}`).then((response) => {
        console.log("Leer Response",response)
        const formData ={
            id : response.id,
            id_user : response.perfil.user.id,
            id_profile : response.perfil.id,
            password : response.perfil.user.password,
            nombre : response.perfil.nombre,
            apellidos : response.perfil.apellidos,
            email : response.perfil.user.email,
            username : response.perfil.user.username,
            rol : response.perfil.rol,
            phone : response.perfil.phone,
            adress: response.perfil.address,
            gender : response.perfil.gender,
            carnet : response.carnet,
            contacto : response.contacto,
            direccion_contacto : response.direccion_contacto,
            telefono_contacto : response.telefono_contacto,
            confirmation_password : response.perfil.user.password
        }
       
        dispatch(initializeForm("EstudianteForm", formData));
    }).catch(() => {
    }).finally(() => {
    });
};

export const actions={
    ...baseReducer.actions,
    crearEstudiante,
    editarEstudiante,
    leerEstudiante
}
export const reducers={
    ...baseReducer.reducers
}
export const initialState={
    ...baseReducer.initialState
}

export default handleActions(reducers, initialState);
