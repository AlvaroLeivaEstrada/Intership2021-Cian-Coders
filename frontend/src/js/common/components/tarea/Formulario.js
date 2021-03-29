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
	componentWillUnmount = () => {
		const { clearArchivo } = this.props;
		clearArchivo();
	};

	render() {
		const { handleSubmit, crear, setArchivo, archivo,validarPunteo} = this.props;
		const editar = window.location.href.includes('editar');
		let disabled = false;
		let titulo = editar ? 'Editar Tarea de Clase' : 'Registrar Nueva Tarea';
		let ver=false
		if (crear == false && editar == false) {
			disabled = true;
			ver = true
			titulo = 'Ver Tarea de Clase';
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
				<Field name="asignacion"  component={renderField} disabled={disabled} type="hidden"/>
				<br />
				<label>Nombre</label>
				<Field name="nombre" component={renderField} disabled={disabled} />
				<br />
				<label>Descripcion</label>
				<Field name="descripcion" component={renderField} disabled={disabled} />
				<br />
                {ver?null:<label>Punteo</label>}
				<Field name="nota" placeholder="Ponderacion Tarea" component={ver ? renderField:renderNumber} disabled={disabled} type={ver ? "hidden":"text"}/>
                <br/>
				{ver?null:<label>Fecha Entrega</label>}
				<Field name="fecha" component={ver?renderField:renderDayPicker} disabled={disabled} type={ver ? "hidden":"text"} />
				<br />

				{ver?null:<label>Hora Entrega</label>}
				<Field
					name="hora"
					decimalScale={2}
					numberFormat="## ## ##"
					prefix="Q "
					placeholder="hh:mm:ss"
					component={ver ? renderField:renderNumber}
					disabled={disabled}
					type={ver ? "hidden":"text"}
				/>
				<div className="d-flex flex-row justify-content-end mt-3">

					{ver?null:<a className="btn btn-secondary btn-sm mr-2" href={'/#/gestCursosCatedList'}>
						Cancelar
					</a>}
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
	form: 'TareaForm' //identificado unico de formulario
})(Formulario);

///#/tareas/?id=${id}