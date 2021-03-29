import React,{Component, useEffect, useState} from 'react'
import { Field,reduxForm } from 'redux-form'
import { onSubmit } from '../../../redux/modules/cuenta/login';
import {renderField,} from '../Utils/renderField/renderField'
import { api } from "../../../utility/api";

import {
    AsyncSelectField,
} from "Utils/renderField/renderField";

const cargarNiveles = (search) => {
    let niveles = [];
    return api
        .get("niveles", { search })
        .then((response) => {
            niveles = response.results.map((nivel) => ({
                value: nivel.id,
                label: nivel.nombre,
            }));
            return niveles;
        })
        .catch((err) => {
            return niveles;
        });
};

class Formulario extends Component{

    
    render(){
        const {handleSubmit,crear} = this.props;
        const editar = window.location.href.includes('editar');
        let disabled = false;
        let titulo = editar ? 'Editar Grado':'Registrar Grado';
        
        if(crear == false && editar==false){
            disabled = true; 
            titulo = 'Ver Grado'
        }

        return(
           
            <form onSubmit={handleSubmit} className="w-25">
                
                <h2>{titulo}</h2>
                <label>Nombre Grado</label>
                <Field name="nombre_grado" component={renderField} disabled={disabled}/>
                <br/>
                <label>Nivel del Grado</label>
                <Field
                    name="nivel"
                    loadOptions={cargarNiveles}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a className="btn btn-secondary btn-sm mr-2" href='/#/config'>
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
    form : 'GradoForm'//identificado unico de formulario
})(Formulario)
