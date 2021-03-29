import React,{Component, useEffect, useState} from 'react'
import { Field,reduxForm } from 'redux-form'
import { onSubmit } from '../../../redux/modules/cuenta/login';
import {renderField,} from '../Utils/renderField/renderField'
import { api } from "../../../utility/api";

import {
    AsyncSelectField,
    SelectField,
} from "Utils/renderField/renderField";


const roles = [
    {"label": "CATEDRATICO", "value": "CATED"},
    {"label": "ESTUDIANTE", "value": "ESTUD"},
];
const genero = [
    {"label": "MALE", "value": 0},
    {"label": "FEMALE", "value": 1},
];
const cargarProfesiones = (search) => {
    let profesiones = [];
    return api
        .get("profesiones", { search })
        .then((response) => {
            profesiones = response.results.map((profesion) => ({
                value: profesion.id,
                label: profesion.nombre,
            }));
            return profesiones;
        })
        .catch((err) => {
            return profesiones;
        });
};
const validate = values => {
    const errors = {}
    if (values.password && values.confirmation_password) {
      if(values.password !== values.confirmation_password){
          errors.confirmation_password = 'La contraseña no coincide'
      }
    }
  
    return errors
  }


class Formulario extends Component{

    render(){
        const {handleSubmit,crear} = this.props;
        const editar = window.location.href.includes('editar');
        let disabled = false;
        let titulo = editar ? 'Editar Catedratico':'Registrar Catedratico';
      
        if(crear == false && editar==false){
            disabled = true; 
            titulo = 'Ver Catedratico'
        }

        return(
            <form onSubmit={handleSubmit} className="col-10">
                <h2>{titulo}</h2>
                <label>Nombre </label>
                <Field name="nombre" component={renderField} disabled={disabled}/>
                <br/>
                <label>Apellidos </label>
                <Field name="apellidos" component={renderField} disabled={disabled}/>
                <br/>
                <label>Correo Electronico </label>
                <Field name="email" component={renderField} disabled={disabled}/>
                <br/>
                <label>Usuario </label>
                <Field name="username" component={renderField} disabled={disabled}/>
                <br/>
                <label>Profesión</label>
                <Field
                    name="profesion"
                    loadOptions={cargarProfesiones}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <br/>
                <label htmlFor="select_field">Rol</label>
                <Field
                    disabled={disabled}
                    name="rol"
                    options={roles}
                    component={SelectField}
                />
                <br/>
                <label>Telefono</label>
                <Field name="phone" component={renderField} disabled={disabled}/>
                <br/>
                <label>Dirección</label>
                <Field name="adress" component={renderField} disabled={disabled}/>
                <br/>
                <label htmlFor="select_field">Genero</label>
                <Field
                    disabled={disabled}
                    name="gender"
                    options={genero}
                    component={SelectField}
                />
                <label htmlFor="normal_field">Contraseña</label>
                            <Field
                                disabled={disabled}
                                name="password"
                                type="password"
                                placeholder="Password Field"
                                component={renderField}
                            />
                <br/>
                <label htmlFor="normal_field">Confirmar Contraseña</label>
                            <Field
                                disabled={disabled}
                                name="confirmation_password"
                                type="password"
                                placeholder="Password Field"
                                component={renderField}
                            />
                
                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a className="btn btn-secondary btn-sm mr-2" href='/#/catedraticos'>
                        Cancelar
                    </a>
                    {disabled == false &&
                        <button className={`btn ${editar ? 'btn-info' :'btn-success'} btn-sm`} type="submit">
                            {editar ? 'Editar' : 'Registrar'}
                        </button>
                    }
                </div> 
            </form>
        );
    }
}
//export default Formulario
export default reduxForm({
    form : 'CatedraticoForm',//identificado unico de formulario
    validate
})(Formulario)