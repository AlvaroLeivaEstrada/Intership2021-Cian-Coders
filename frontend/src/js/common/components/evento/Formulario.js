import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { onSubmit } from '../../../redux/modules/cuenta/login';
import { api } from '../../../utility/api';
import { renderField,
     renderDayPicker, 
     renderDatePicker,
     renderNumber,
     AsyncSelectField,
    } from '../Utils/renderField/renderField';

const cargarCiclo =()=>{
    let ciclos = [];
    return api.get('ciclos').then((response)=>{
        ciclos = response.results.map((ciclo)=>({
            value : ciclo.id,
            label : ciclo.anio,
        }));
        return ciclos;
    }).catch((error)=>{
        return ciclos;
    });
}
class Formulario extends Component {
	render() {
		const { handleSubmit, crear } = this.props;
		const editar = window.location.href.includes('editar');
		let titulo = editar ? 'Editar Evento' : 'Registrar Evento';

		let disabled = false;
		if (crear == false && editar == false) {
			disabled = true;
			titulo = 'Ver Evento';
		}
		return (
			<form onSubmit={handleSubmit} className="w-25">
				<h3>{titulo}</h3>
                <label>Ciclo</label>
				<Field
                    name="ciclo"
                    loadOptions={cargarCiclo}
                    component={AsyncSelectField}
                    disabled={true}
                />
				<label>Nombre</label>
				<Field name="titulo" component={renderField} disabled={disabled} />
				<br />
				<label>Descripcion</label>
				<Field name="descripcion" component={renderField} disabled={disabled} />
				<br />
				<label>Fecha</label>
				<Field name="fecha" component={renderDayPicker} disabled={disabled}/>
                <br/>
				<label>Hora</label>
				<Field
					name="hora"
					decimalScale={2}
					numberFormat="## ##"
					prefix="Q "
					placeholder="HH MM"
					disabled={disabled}
					component={renderNumber}
				/>
				<br />
				<div className="d-flex flex-row justify-content-end mt-3">
					<a className="btn btn-secondary btn-sm mr-2" href="/#/eventos">
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
	form: 'EventoForm' //identificado unico de formulario
})(Formulario);
