import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


const CICLO_ACTUAL = "CICLO_ACTUAL";

// ------------------------------------
// Constants
// ------------------------------------
const setCiclo =ciclo=>({
    type: CICLO_ACTUAL,
    ciclo,

});

const baseReducer = createReducer(
    "ciclo", // Identificador dentro del estado
    "ciclos", // Endpoint a donde se realizaran las peticiones
    "CicloForm",//Formulario que utiliza
    "/ciclos", //Ruta a la que se ira una vez que ejecute las peticiones
);

const obtenerCicloActual = () =>(dispatch)=>{
    return api.get('ciclos/retrieveCurrent').then((response)=>{
        dispatch(setCiclo(response))
    }).catch((error)=>{})
}
export const reducers = {
    ...baseReducer.reducers,
    [CICLO_ACTUAL]:(state,{ciclo})=>{
        return {
            ...state,
            ciclo,
        }
    }  
}
export const actions = {
    ...baseReducer.actions,
    obtenerCicloActual,
}
export const initialState = {
    ...baseReducer.initialState,
    ciclo:null
}


export default handleActions(reducers, initialState);
