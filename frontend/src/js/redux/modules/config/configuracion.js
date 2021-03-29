import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import {createSeccion} from '../seccion/seccion'
import {createReducer} from "../baseReducer/baseReducer";




const LISTADO_NIVELES='LISTADO_NIVELES';
const LISTADO_GRADOS='LISTADO_GRADOS';
const LOADER = 'LOADER';
const PAGE_NIVEL = 'PAGE_NIVEL';
const TOTAL_CATEDRATICOS = 'TOTAL_CATEDRATICOS';
const TOTAL_ESTUDIANTE = 'TOTAL_ESTUDIANTE';
const LISTADO_SECCIONES = 'LISTADO_SECCIONES';
const TOTAL_USER = 'TOTAL_USER';


const setNiveles = niveles => ({
    type: LISTADO_NIVELES,
    niveles,
});
const setLoader = loader => ({
    type: LOADER,
    loader,
});
const setGrados = grados => ({
    type: LISTADO_GRADOS,
    grados,
});
const setSecciones = secciones =>({
    type: LISTADO_SECCIONES,
    secciones,
});
const setPageNivel = page =>({
    type : PAGE_NIVEL,
    page,
})
const setCatedraticos = totalCatedratico =>({
    type: TOTAL_CATEDRATICOS,
    totalCatedratico,
})
const setEstudiante = totalEstudiante =>({
    type: TOTAL_ESTUDIANTE,
    totalEstudiante,
})
const setUsuario = totalUsers =>({
    type:TOTAL_USER,
    totalUsers
})
const listarSecciones = ()=>(dispatch)=>{
    return api.get('secciones').then((response)=>{
        dispatch(setSecciones(response))
    }).catch((error)=>{})
}
const totalCatedraticos = () =>(dispatch)=>{
    return api.get('catedraticos/totalCatedraticos').then((response)=>{
        dispatch(setCatedraticos(response.totalCatedraticos))
    }).catch((error)=>{})
}
const totalEstudiantes=()=>(dispatch)=>{
    return api.get('estudiantes/totalEstudiantes').then((response)=>{
        console.log("cantidad de estudiantes",response.totalEstudiante)
        dispatch(setEstudiante(response.totalEstudiantes))
    }).catch((error)=>{})
}
const totalUsuarios=()=>(dispatch)=>{
    return api.get('user/totalUsuarios').then((response)=>{
        dispatch(setUsuario(response))
    })
}
const crearNivel = data => (dispatch) => {
 
    api.post('niveles', data).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push('/config'));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
    });
};
const listarNiveles = (page=1)=>(dispatch,getStore)=>{
    const estado = getStore().configuracion;
    const data = {
        page
    }
    return api
        .get('niveles',data)
        .then((response)=>{
            //setPageNivel(page)
            dispatch(setNiveles(response))
    }).catch((error)=>{
   
    });
}
const eliminarNivel = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`niveles/${id}`).then(() => {
        dispatch(listarNiveles());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};
const editarNivel = (data) => (dispatch) => {
    dispatch(setLoader(true));
  //  console.log("DATA ", data)
    api.put(`niveles/${data.id}`,data ).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        dispatch(push('/config'));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};
const leerNivel = (id) => (dispatch) => {
   
    api.get(`niveles/${id}`)
        .then((response) => {  
            console.log(response)
                //response.nivel = {value: response.nivel.id, label: response.nivel.nombre};
                dispatch(initializeForm("NivelForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};


const listarGrado = ()=>(dispatch)=>{
    return api.get('grados').then((response)=>{
        dispatch(setGrados(response))
    }).catch((error)=>{});
}
const eliminarGrado = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`grados/${id}`).then(() => {
        dispatch(listarGrado());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};
const editarGrado = (data) => (dispatch) => {
   
    const formData ={
        nivel:data.nivel.value,
        nombre_grado:data.nombre_grado
    }
    api.put(`grados/${data.id}`, formData).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        //dispatch(listarGrado())
        dispatch(push('/config'));

    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
    });
};
const crearGrado = data => (dispatch) => {
  
    const formData = {
        nivel: data.nivel.value,
        nombre_grado: data.nombre_grado
    }
    api.post('grados', formData).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push('/config'));
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

export const actions = {
    //...seccionReducer.actions,
    listarSecciones,
    crearNivel,
    listarNiveles,
    eliminarNivel,
    leerNivel,
    editarNivel,

    listarGrado,
    eliminarGrado,
    editarGrado,
    leerGrado,
    crearGrado,

    totalCatedraticos,
    totalEstudiantes,
    totalUsuarios
};

export const reducers = {
    //...seccionReducer.reducers,
    
  
    [LISTADO_NIVELES]:(state={initialState},{niveles})=>{
        console.log("Reducer Niveles" )
        return {
            ...state,
            niveles
        }
    },
    [LOADER]: (state={initialState}, { loader }) => {
        return {
            ...state,
            loader
        };
    },
    [LISTADO_GRADOS]:(state,{grados}) =>{
        console.log("Reducer Grado" )
        return{
            ...state,
            grados
        }
    },
    [LISTADO_SECCIONES] : (state={initialState},{secciones})=> {
        return {
            ...state,
            secciones
        }
    },
    [TOTAL_CATEDRATICOS] : (state={initialState},{totalCatedratico})=> {
        return {
            ...state,
            totalCatedratico
        }
    }, 
    [TOTAL_ESTUDIANTE] : (state={initialState},{totalEstudiante})=> {
        return {
            ...state,
            totalEstudiante
        }
    },
    [TOTAL_USER] : (state={initialState},{totalUsers})=>{
        return {
            ...state,
            totalUsers
        }
    }

};

export const initialState = {

   //...seccionReducer.initialState,
    loader : false,
    niveles: {
        results: [],
        count: 0
    },
    grados: {
        results: [],
        count: 0
    },
    secciones: {
        results: [],
        count: 0
    },
    nivelPage:1,
    totalEstudiante:0,
    totalCatedratico:0,
    totalUsers:0

};

export default handleActions(reducers, initialState);
