import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "nivel", // Identificador dentro del estado
    "niveles", // Endpoint a donde se realizaran las peticiones
    "NivelForm",//Formulario que utiliza
    "/niveles", //Ruta a la que se ira una vez que ejecute las peticiones
);

export default handleActions(reducers, initialState);
