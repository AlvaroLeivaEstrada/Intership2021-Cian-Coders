import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import {handleActions} from 'redux-actions';
import { initialize, initialize as initializeForm } from 'redux-form';
import {createReducer} from "../baseReducer/baseReducer";

const baseReducer = createReducer(
    "AsigEstud", // Identificador dentro del estado
    "AsigEstudiantes", // Endpoint a donde se realizaran las peticiones
    "AsignacionEstudianteForm",//Formulario que utiliza
    "/AsigEstudiantes", //Ruta a la que se ira una vez que ejecute las peticiones
);
const registro = (data)=>(dispatch)=>{
    console.log(data)
    const formData = {
        asignacion : data.asignacion.value,
        estudiante : data.estudiante.value
    }
    return api.post("AsigEstudiantes",formData).then(()=>{
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push('/gestCursosCatedList'));
    }).catch((err)=>{});
};
const leer=id=>dispatch=>{
    api.get(`AsigEstudiantes/${id}`).then((response)=>{
        console.log(response)
        const formData = {
            asignacion:{
                value:response.asignacion.id,
                label:response.asignacion.curso.nombre_curso
            },
            estudiante:{
                value:response.estudiante.id,
                label: response.estudiante.perfil.nombre+" "+response.estudiante.perfil.apellidos
            }
        }
        dispatch(initialize("AsignarEstudianteForm",formData))
    })
}
const editar = (data)=>(dispatch)=>{
    console.log(data)
    const formData = {
        asignacion : data.asignacion.value,
        estudiante : data.estudiante.value
    }
    return api.post(`AsigEstudiantes/${data.id}`,formData).then(()=>{
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push('/gestCursosCatedList'));
    }).catch((err)=>{});
};
export const actions={
    ...baseReducer.actions,
    registro,
    leer,
    editar
   
}
export const reducers={
    ...baseReducer.reducers,

}
export const initialState={
    ...baseReducer.initialState,
    ciclo:null
}

export default handleActions(reducers, initialState);