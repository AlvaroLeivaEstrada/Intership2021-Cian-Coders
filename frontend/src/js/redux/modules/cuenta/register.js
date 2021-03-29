import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'REGISTER_SUBMIT';
const LOADER = 'REGISTER_LOADER';

export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch) => {
    dispatch(setLoader(true));
    
    api.post('user', data).then(() => {
        dispatch(push("/login"));
        NotificationManager.success('Cuenta creada con éxito, puedes iniciar sesión', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const restablecer = (data)=>()=>{
    dispatch(setLoader(true));
    const params ={email:data.email}
    api.get('user/validarEmail',params).then((response)=>{
       
    }).catch(()=>{
        NotificationManager.error('Correo electronico no existe en la base de datos','ERROR',0)
    });
};

const registerNewPassword =()=>(dispatch,match) =>{
    dispatch(setLoader(true));
    console.log( "Hola")
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    localStorage.removeItem('admin')

};


export const actions = {
    onSubmit,
    logOut,
    restablecer,
    registerNewPassword
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};

export const initialState = {
    loader: false,
};

export default handleActions(reducers, initialState);
