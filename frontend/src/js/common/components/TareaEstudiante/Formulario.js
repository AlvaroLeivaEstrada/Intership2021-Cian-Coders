import React, { Component, useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';

import { api } from '../../../utility/api';
import {
	renderField,
	renderDayPicker,
	renderDatePicker,
	renderNumber,
	AsyncSelectField,
	renderFilePicker
} from '../Utils/renderField/renderField';
import { search } from 'superagent';

class Formulario extends Component {
	/*
	componentWillUnmount = () => {
		const { clearArchivo } = this.props;
		clearArchivo();
	};*/

	render() {
		const { handleSubmit, crear, setArchivo, archivo, tareas,estudiantes } = this.props;
		const editar = window.location.href.includes('editar');
		let disabled = false;
		let ver = false;
		let titulo = editar ? 'Editar Tarea de Clase' : 'Subir Tarea';

		if (crear == false && editar == false) {
			disabled = true;
			ver=true;
			titulo = 'Resultado de tarea';
		}

		return (
			<form onSubmit={handleSubmit} className="col-10">
				<h2>{titulo}</h2>

				<label>Archivo</label>
				<Field
					accept=".pdf,document/*"
					setFile={setArchivo}
					photo={archivo}
					name="archivo"
					component={renderFilePicker}
				/>
				<a href={archivo} target="_blank" >Descargar Tarea</a>
			
				<Field name="tarea" component={renderField} disabled={disabled} type="hidden"/>
				<br />

				<Field name="estudiante"  component={renderField} disabled={disabled} type="hidden"/>
				<br />
				<label>Texto</label>
				<Field name="texto" component={renderField} disabled={disabled} />
				<br />
                {crear?null:<label>Calificacion</label>}
				<Field name="calificacion" component={renderField} type={crear?"hidden":null}disabled={disabled} />
				<br />
				<label>Fecha Entrega</label>
				<Field name="fecha" component={renderDayPicker} />
				<br />
				<div className="d-flex flex-row justify-content-end mt-3">
					{crear?
					<a className="btn btn-secondary btn-sm mr-2" href="/#/gestCursosEstudList">
						Cancelar
					</a>:null}
					{disabled == false && (
						<button className={`btn ${editar ? 'btn-info' : 'btn-success'} btn-sm`} type="submit">
							{editar ? 'Editar' : 'Registrar'}
						</button>
					)}
				</div>
			</form>
		);
	}
}
//export default Formulario
export default reduxForm({
	form: 'TareaEstudianteForm' //identificado unico de formulario
})(Formulario);
