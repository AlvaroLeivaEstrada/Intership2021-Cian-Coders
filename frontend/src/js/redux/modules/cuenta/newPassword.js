import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'REGISTER_SUBMIT';
const LOADER = 'REGISTER_LOADER';
let number = 0;

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

const setIdUser=(idUser)=>()=>{
    number=idUser;
}

const registerNewPassword =(data)=>(dispatch) =>{
    dispatch(setLoader(true)); 
    const params={id:number}
    api.put(`setPassword/registerNewPassword`,data,params).then((response)=>{
        console.log("Nuevo usuario",response)
        dispatch(push("/login"))
    }).catch(()=>{})
}


export const actions = {
    registerNewPassword,
    setIdUser
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
