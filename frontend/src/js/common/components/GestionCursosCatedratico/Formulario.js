import React, { Component, useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { onSubmit } from '../../../redux/modules/cuenta/login';
import { api } from '../../../utility/api';
import { renderField, renderFilePicker } from '../Utils/renderField/renderField';

import { AsyncSelectField, SelectField } from 'Utils/renderField/renderField';
import { search } from 'superagent';

class Formulario extends Component {
	render() {
		const { handleSubmit, setAvatar, img } = this.props;
		const editar = window.location.href.includes('editar');
		let disabled = false;
		let titulo = 'Actualizar Portada';

		return (
			<form onSubmit={handleSubmit} className="col-10">
				<h2>{titulo}</h2>
				<div className="mb-4 card card-small">
					<div className="p-0 pt-3 d-flex flex-column flex-md-row">
						<div className="form-group has-feedback flex-1 mx-3">
							<label>Portada</label>
							<Field
								accept="image/*"
								photo={img}
								setFile={setAvatar}
								name="avatar"
								component={renderFilePicker}
							/>
						</div>
					
					</div>
				</div>

				<div className="d-flex flex-row justify-content-end mt-3">
					<a className="btn btn-secondary btn-sm mr-2" href="/#/gestCursosCatedList">
						Cancelar
					</a>
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
export default reduxForm({
	form: 'GestCursoCatedForm' //identificado unico de formulario
})(Formulario);
