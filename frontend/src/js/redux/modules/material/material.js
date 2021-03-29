import { handleActions } from 'redux-actions';
import { api } from '../../../utility/api';
import { NotificationManager } from 'react-notifications';
import { createReducer } from '../baseReducer/baseReducer';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';

const GUARDAR_ARCHIVO = 'GUARDAR_ARCHIVO';
const GUARDAR_MATERIALES = 'GUARDAR_MATERIALES';

const setArchivo = (archivo) => ({
	type: GUARDAR_ARCHIVO,
	archivo
});
const setData = (materiales) => ({
	type: GUARDAR_MATERIALES,
	materiales
});

// ------------------------------------
// Constants
// ------------------------------------
const basReducer = createReducer(
	'material', // Identificador dentro del estado
	'materiales', // Endpoint a donde se realizaran las peticiones
	'MaterialForm', //Formulario que utiliza
	'/materiales' //Ruta a la que se ira una vez que ejecute las peticiones
);
const eliminar = (id) => (dispatch) => {
	api
		.eliminar(`materiales/${id}`)
		.then((response) => {
			dispatch(listar(response.id));
			NotificationManager.success('Registro eliminado', 'Éxito', 3000);
		})
		.catch(() => {
			NotificationManager.success('Error en la transacción', 'Éxito', 3000);
		})
		.finally(() => {});
};

const listar = (id) => (dispatch) => {
	const user = localStorage.getItem('rol');
	const params = { id: id };
	{
		user == 'CATED'
			? api
					.get('materiales/registrados', params)
					.then((response) => {
						dispatch(setData(response));
					})
					.catch(() => {})
			: api
					.get('ReadByStudentMaterial/registrados', params)
					.then((response) => {
						dispatch(setData(response));
					})
					.catch(() => {});
	}
};

const crearMaterial = (data = {}, attachments = []) => (dispatch) => {
	return api
		.postAttachments('materiales', data, attachments)
		.then((response) => {
			NotificationManager.success('Registro creado', 'Éxito', 3000);
			dispatch(push('/gestCursosCatedList'));
		})
		.catch(() => {
			NotificationManager.error('Error en la creación', 'ERROR');
		})
		.finally(() => {});
};
const leerMaterial = (id) => (dispatch) => {
	const user = localStorage.getItem('rol');
	console.log('USER ', user);

	{
		user == 'CATED'
			? api
					.get(`materiales/${id}`)
					.then((response) => {
						const formData = {
							id: response.id,
							titulo: response.titulo,
							asignacion: {
								value: response.asignacion.id,
								label: response.asignacion.grado.nombre_grado
							},
							descripcion: response.descripcion,
							archivo: response.archivo
						};

						dispatch(setArchivo(response.archivo));
						dispatch(initializeForm('MaterialForm', formData));
					})
					.catch(() => {})
			: api
					.get(`ReadByStudentMaterial/${id}`)
					.then((response) => {
						const formData = {
							id: response.id,
							titulo: response.titulo,
							asignacion: {
								value: response.asignacion.id,
								label: response.asignacion.grado.nombre_grado
							},
							descripcion: response.descripcion,
							archivo: response.archivo
						};

						dispatch(setArchivo(response.archivo));
						dispatch(initializeForm('MaterialForm', formData));
					})
					.catch(() => {});
	}
};
const clearFile = () => (dispatch) => {
	dispatch(setArchivo(null));
};
const editarMaterial = (data = {}, attachments = []) => (dispatch) => {
	data.asignacion = data.asignacion.value;
	api
		.putAttachments(`/materiales/${data.id}`, data, attachments)
		.then((response) => {
			NotificationManager.success('Tarea actualizada correctamente', 'Éxito', 3000);
			dispatch(push('/gestCursosCatedList'));
		})
		.catch((error) => {
			console.log('error: ', error);
			NotificationManager.error('Ocurrió un error al actualizar la empresa', 'ERROR', 0);
		});
};
/*
    api.put(`/materiales/${data.id}`,data).then(()=>{
        NotificationManager.success('Registro creado', 'Éxito', 3000);
       // dispatch(push('/materiales'));  
    }).catch((error)=>{
        NotificationManager.error('Error en la creación', 'ERROR');
    });*/

export const reducers = {
	...basReducer.reducers,
	[GUARDAR_ARCHIVO]: (state, { archivo }) => {
		return {
			...state,
			archivo
		};
	},
	[GUARDAR_MATERIALES]: (state, { materiales }) => {
		return {
			...state,
			materiales: {
				results: materiales,
				count: 0
			}
		};
	}
};
export const actions = {
	...basReducer.actions,
	listar,
	eliminar,
	crearMaterial,
	leerMaterial,
	editarMaterial,
	clearFile
};
export const initialState = {
	...basReducer.initialState,
	archivo: null,
	materiales: {
		results: [],
		count: 0
	}
};

export default handleActions(reducers, initialState);
