import React,{Component} from 'react'
import { Field,reduxForm } from 'redux-form'
import { search } from 'superagent';
import { onSubmit } from '../../../redux/modules/cuenta/login';
import { api } from '../../../utility/api';
import {renderField,} from '../Utils/renderField/renderField'

import {
    AsyncSelectField,
    SelectField,
} from "Utils/renderField/renderField";


const cargarEstudiantes = (search)=>{
    let estudiantes = [];
    return api
            .get("listStudents",{search})
            .then((response)=>{
                estudiantes = response.results.map((estudiante) =>({
                    value: estudiante.id,
                    label: estudiante.perfil.nombre+' '+estudiante.perfil.apellidos,
                }));
                return estudiantes;
            }).catch((err) => {
                return estudiantes
            })
};



class Formulario extends Component{
    render(){
        const {handleSubmit,crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Asignacion' : 'Registrar';

        let disabled = false;
        if(crear == false && editar==false){
            disabled = true;
            titulo = 'Ver '; 
        }
        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>

                <Field
                    name="asignacion"
                    component={renderField}
                    disabled={disabled}
                    type="hidden"
                />

                 <label>Estudiante</label>
                <Field
                    name="estudiante"
                    loadOptions={cargarEstudiantes}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a className="btn btn-secondary btn-sm mr-2" href='/#/gestCursosCatedList'>
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
export default reduxForm({
    form : 'AsignarEstudianteForm'//identificado unico de formulario
})(Formulario)
