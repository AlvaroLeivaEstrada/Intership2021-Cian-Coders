import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { isNull } from 'lodash';
import Swal from 'sweetalert2'

const SUBMIT = 'LOGIN_SUBMIT';
const LOADER = 'LOGIN_LOADER';
const ME = 'LOGIN_ME';

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

export const setMe = me => ({
    type: ME,
    me,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch, getStore) => {
    dispatch(setLoader(true));
   
    api.post('user/token', data).then((response) => {
        console.log("Response Onsubmit",response)
        localStorage.setItem('token', response.token);
        localStorage.setItem('id',response.user.id)
        localStorage.setItem('user',response.user.username)
        localStorage.setItem('admin',response.user.is_superuser)

        if (response.user.profile){
            localStorage.setItem('profile',response.user.profile)
            localStorage.setItem('rol',response.user.profile.rol)
        }
        
        const check = response.user.last_login 
      
        if (check === null){
            Swal.fire({
                title: 'Bienvenido',
                text: "El primer paso es cambiar tu contraseña",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result) {
                    dispatch(push(`/claveModificar/${response.user.id}`))
                }
              });
        }else{
         
            dispatch(setMe(response.user));

           
            if(response.user.profile.rol==="ADMIN"){
                
                dispatch(push("/config"))
            }
            else if (response.user.profile.rol ==='CATED'){
                
                dispatch(push("/catedHome"));
            }else {
           
                dispatch(push("/estudHome"));
            }
             
        }
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const cambiarClave=(data)=>(dispatch)=>{
    const id = localStorage.getItem("id");
    const user = localStorage.getItem("user");

    const formData = {
        password : data.password,
        username : user
    }
    
    api.put(`user/${id}`, formData).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        dispatch(push('/login'));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
    });
}
export const getMe = () => (dispatch) => {
    
    api.get('/user/me').then(me => {
       
        dispatch(initializeForm('profile', me));
        dispatch(setMe(me));
    })
        .catch(() => {
    }).finally(() => {});
};

export const logOut = () => (dispatch) => {
    api.post('/user/logout').then(() => {
    }).catch(() => {
    }).finally(() => {});
    localStorage.removeItem('token');
 
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    
    if (response.user.profile){
        localStorage.removeItem('profile')
        localStorage.removeItem('rol');
    }
    
};



export const actions = {
    onSubmit,
    logOut,
    cambiarClave
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [ME]: (state, { me }) => {
        return {
            ...state,
            me,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
};

export default handleActions(reducers, initialState);
