import { api } from 'api';
import { NotificationManager } from 'react-notifications';
import { push } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import { initialize } from 'redux-form';
import { createReducer } from '../baseReducer/baseReducer';

const CARGAR_ARCHIVO = 'CARGAR_ARCHIVO';
const CARGAR_DATA = 'CARGAR_DATA';
const CARGAR_ID = ' CARGAR_ID';
const LOAD_GRADES = 'LOAD_GRADES';
const SUMA_CALIFICACION = 'SUMA_CALIFICACION';
const SUMA_NOTAS = 'SUMA_NOTAS';

const setArchivo = (archivo) => ({
	type: CARGAR_ARCHIVO,
	archivo
});
const setData = (data) => ({
	type: CARGAR_DATA,
	data
});
const setId = (id) => ({
	type: CARGAR_ID,
	id
});
const setGrades = (grades) => ({
	type: LOAD_GRADES,
	grades
});
const setSumaNotas = (asignacion) => ({
	type: SUMA_CALIFICACION,
	asignacion
});
const setNotasTarea = (notas) => ({
	type: SUMA_NOTAS,
	notas
});

const baseReducer = createReducer('tarea', 'tareas', 'TareaForm', '/tareas');

const clearArchivo = () => (dispatch) => {
	dispatch(setArchivo(null));
};

const eliminar = (id) => (dispatch) => {
	api
		.eliminar(`tareas/${id}`)
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
					.get('tareas/registradas', params)
					.then((response) => {
						dispatch(setData(response));
						dispatch(setId(id));
					})
					.catch(() => {})
			: api
					.get('tareasOperateByStudent/registradas', params)
					.then((response) => {
						dispatch(setData(response));
						dispatch(setId(id));
					})
					.catch(() => {});
	}
};
const listarNotas = () => (dispatch) => {
	api
		.get('tareaEstudianteOperateByStudent/listGradesbyStudent')
		.then((response) => {
			dispatch(setGrades(response));
		})
		.catch(() => {});
};
const SumaNotasCurso = () => (dispatch) => {
	api
		.get('tareaEstudianteOperateByStudent/SumOfAllTheAssigmentsByCourse')
		.then((response) => {
			dispatch(setSumaNotas(response));
		})
		.catch(() => {});
};
const leerTarea = (id) => (dispatch) => {
	const user = localStorage.getItem('rol');
	{
		user == 'CATED'
			? api
					.get(`tareas/${id}`)
					.then((response) => {
						dispatch(setArchivo(response.archivo));
						const formData = {
							id: response.id,
							asignacion: {
								value: response.asignacion.id,
								label: response.asignacion.curso.nombre_curso
							},
							descripcion: response.descripcion,
							fecha: response.fecha,
							hora: response.hora,
							nombre: response.nombre,
							nota: response.nota
						};
						dispatch(initialize('TareaForm', formData));
					})
					.catch((error) => {
						console.log('error: ', error);
						NotificationManager.error('Ocurrió un error al consultar el registro', 'ERROR', 0);
					})
			: api
					.get(`tareasOperateByStudent/${id}`)
					.then((response) => {
						dispatch(setArchivo(response.archivo));
						const formData = {
							id: response.id,
							asignacion: {
								value: response.asignacion.id,
								label: response.asignacion.curso.nombre_curso
							},
							descripcion: response.descripcion,
							fecha: response.fecha,
							hora: response.hora,
							nombre: response.nombre,
							nota: response.nota
						};
						dispatch(initialize('TareaForm', formData));
					})
					.catch((error) => {
						NotificationManager.error('Ocurrió un error al consultar el registro', 'ERROR', 0);
					});
	}
};
const registroTarea = (data = {}, attachments = []) => (dispatch, getStore, getState) => {

	let sumNotas = 0;
	const params = { id: data.asignacion };
	api
		.get('/tareas/valorDeTareasTotal', params)
		.then((response) => {
		
			sumNotas = response.validarNota;
            console.log("Total Nota", parseInt(data.nota) + sumNotas)
			if (parseInt(data.nota) + sumNotas <= 100) {

				api
					.postAttachments('/tareas', data, attachments)
					.then((response) => {
						NotificationManager.success('Tarea registrada correctamente 📚', 'Éxito', 3000);
						dispatch(push('/gestCursosCatedList'));
					})
					.catch((error) => {
						NotificationManager.error('Ocurrió un error al registrar tarea ❌', 'ERROR', 0);
					});
			} else {
				NotificationManager.error('La nota asignada para esta tarea execede el punteo.', 'ERROR', 0);
			}
		})
		.catch(() => {});
	
};
const editarTarea = (data, attachments) => (dispatch) => {
	data.asignacion = data.asignacion.value;
	api
		.putAttachments(`/tareas/${data.id}`, data, attachments)
		.then((response) => {
			NotificationManager.success('Tarea actualizada correctamente 📚', 'Exito', 300);
			dispatch(push('/gestCursosCatedList'));
		})
		.catch((error) => {
			NotificationManager.error('Ocurrió un error al actualizar la tarea ❌', 'ERROR', 0);
		});
};
const validarNota = (asignacion) => (dispatch) => {
	const params = { id: asignacion };
	api
		.get('/tareas/valorDeTareasTotal', params)
		.then((response) => {
			dispatch(setNotasTarea(response.validarNota));
		})
		.catch(() => {});
};

export const actions = {
	...baseReducer.actions,
	listar,
	eliminar,
	registroTarea,
	clearArchivo,
	leerTarea,
	editarTarea,
	listarNotas,
	listarNotas,
	SumaNotasCurso,
	validarNota
};
export const reducers = {
	...baseReducer.reducers,

	[CARGAR_ARCHIVO]: (state, { archivo }) => {
		return {
			...state,
			archivo
		};
	},
	[CARGAR_DATA]: (state, { data }) => {
		return {
			...state,
			data: {
				results: data
			}
		};
	},
	[CARGAR_ID]: (state, { id }) => {
		return {
			...state,
			id
		};
	},
	[LOAD_GRADES]: (state, { grades }) => {
		return {
			...state,
			grades: {
				results: grades
			}
		};
	},
	[SUMA_CALIFICACION]: (state = { initialState }, { asignacion }) => {
		return {
			...state,
			asignacion: {
				results: asignacion
			}
		};
	},
	[SUMA_NOTAS]: (state = { initialState }, { notas }) => {
		console.log('Recibimiento de nota', notas);
		return {
			...state,
			notas: notas
		};
	}
};
export const initialState = {
	...baseReducer.initialState,
	archivo: null,
	data: {
		result: [],
		count: 0
	},
	grades: {
		results: [],
		count: 0
	},
	asignacion: {
		results: [],
		count: 0
	},
	notas: 0,
	id: 0
};

export default handleActions(reducers, initialState);
