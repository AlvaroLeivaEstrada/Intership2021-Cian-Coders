import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { TableHeaderColumn } from "react-bootstrap-table";



const GUARDAR_LISTADO_EMPRESAS='GUARDAR_LISTADO_EMPRESAS';
const GUARDAR_REGISTRO_EMPRESA='GUARDAR_REGISTRO_EMPRESA';

export const registroEmpresa = () => (dispatch, getStore)=>{
  
    const formaData = getStore().form.empresa.values;
    console.log("FormData :" ,formaData);

    api.post('/empresa', formaData).then((response)=>{
        NotificationManager.success(
            'Empresa registrada exitosamente',
            'Exito',
            3000
            );
            dispatch(push('/empresas'));
        }).catch((error)=>{
            NotificationManager.error(
                'Ocurrio un error al registrar empresa',
                'Error',
                0
            );
        })
}

export const actualizarEmpresa = () => (dispatch, getStore)=>{
  
    const formaData = getStore().form.empresa.values;
    console.log("FormData :" ,formaData);
    const id = formaData.id;
    api.put(`/empresa/${id}`, formaData).then((response)=>{
        NotificationManager.success(
            'Empresa actualizada exitosamente',
            'Exito',
            3000
            );
            dispatch(push('/empresas'));
        }).catch((error)=>{
            NotificationManager.error(
                'Ocurrio un actualizar empresa',
                'Error',
                0
            );
        })
}

export const listar = () => (dispatch) => {
    api.get('/empresa').then((response)=>{
        console.log("response",response)
        dispatch({type: GUARDAR_LISTADO_EMPRESAS, data:response});
    }).catch((error)=>{
        console.log("Error :", error);
    })
}

export const leer = (id) =>(dispatch)=>{
    api.get(`/empresa/${id}`).then((response)=>{
        console.log("Response", response);
        dispatch({type:GUARDAR_REGISTRO_EMPRESA, registro:response});
        dispatch(initializeForm('empresa',response))
    }).catch((error)=>{
        console.log("error",error);
        NotificationManager.error(
            'Ocurrio un error al ver empresa',
            'Error',
            0
        );

    })
}
export const eliminar = (id) => (dispatch)=>{
    api.eliminar(`/empresa/${id}`).then((response)=>{
        console.log("response eliminar",response);
        NotificationManager.success(
            'Empresa eliminada correctamente ',
            'Exito',
            3000
        ); 
        dispatch(listar());
    }).catch((error)=>{
        console.log("error",error);
        NotificationManager.error(
            'Ocurrio un error al eliminar empresa',
            'Error',
            0
        );
    })
}

export const actions = {
    registroEmpresa,
    listar,
    leer,
    actualizarEmpresa,
    eliminar,
};

export const reducers = {
    [GUARDAR_LISTADO_EMPRESAS]:(state,{data})=>{
        return{
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_EMPRESA]:(state,{registro})=>{
        return{
            ...state,
            registro,
        };
    }
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
};

export default handleActions(reducers, initialState);
