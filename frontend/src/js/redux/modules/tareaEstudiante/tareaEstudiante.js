import { api } from 'api';
import { NotificationManager } from 'react-notifications';
import { push } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import { initialize } from 'redux-form';
import { createReducer } from '../baseReducer/baseReducer';



const CARGAR_ARCHIVO = "CARGAR_ARCHIVO"
const CARGAR_DATA = "CARGAR_DATA"

const setArchivo = archivo =>({
    type : CARGAR_ARCHIVO,
    archivo
})
const setData = tareasEntregadas =>({
    type:CARGAR_DATA,
    tareasEntregadas
})

const baseReducer = createReducer(
    "tareaEstudiante",
    "tareaEstudiante",
    "TareaEstudianteForm",
    "/tareaEstudiantes"
)
const clearArchivo = ()=>(dispatch)=>{
    dispatch(setArchivo(null))
}
const listar = id => dispatch => {
    const paramas ={id:id}
    api.get("/tareaEstudiante/obtenerTareasEntregadas",paramas).then((response)=>{
        dispatch(setData(response))
       // NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(()=>{
        NotificationManager.success('Error en la transacción', 3000);
    })
}
const leerTarea = id => (dispatch)=>{
 
    api.get(`tareaEstudiante/${id}`).then((response)=>{
        console.log("Leer Tarea ",response)
        
        const formData={
            id:response.id,
            estudiante:response.estudiante.id,
            fecha:response.fecha,
            texto:response.texto,
            tarea:response.tarea.id,
            calificacion:response.calificacion,
            archivo:response.archivo
        }
        dispatch(setArchivo(response.archivo))
        dispatch(initialize("TareaEstudianteForm",formData))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al consultar el registro',
            'ERROR',
            0
        );
    });

}
const registroTareaEstudiante = (data={}, attachments=[]) => (dispatch, getStore) => {    

    data.estudiante = getStore().form.profile.values.profile.id
    api.postAttachments("/tareaEstudianteOperateByStudent", data, attachments).then((response)=>{
        NotificationManager.success(
            'Tarea registrada correctamente 📚',
            'Éxito',
            3000
        );
        dispatch(push('/gestCursosEstudList'));
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al registrar tarea ❌',
            'ERROR',
            0
        );
    });    
    
}
const editarTarea = (data,attachments)=>(dispatch)=>{
  
    api.putAttachments(`/tareaEstudiante/${data.id}`,data,attachments).then((response)=>{
        NotificationManager.success(
            'Tarea actualizada correctamente 📚',
            'Exito',
            300
        );
        dispatch(push('/gestCursosCatedList'));
    }).catch((error)=>{
        NotificationManager.error(
            'Ocurrió un error al actualizar la tarea ❌',
            'ERROR',
            0
        );
    });
    
}

export const actions={
    ...baseReducer.actions,
    listar,
    registroTareaEstudiante,
    clearArchivo,
    leerTarea,
    editarTarea,

}
export const reducers = {
    ...baseReducer.reducers,

    [CARGAR_ARCHIVO]:(state,{archivo})=>{
     
        return{
            ...state,
            archivo
        }
    },
    [CARGAR_DATA]:(state,{tareasEntregadas})=>{
        return{
            ...state,
            tareasEntregadas:{
                results:tareasEntregadas
            }
        }
    }
}
export const initialState={
    ...baseReducer.initialState,
    archivo:null,
    tareasEntregadas:{
        results:[],
        count:0
    }
}

export default handleActions(reducers, initialState);