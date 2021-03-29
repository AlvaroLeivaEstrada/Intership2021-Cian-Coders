import React,{Component, useEffect, useState} from 'react'
import { Field,reduxForm } from 'redux-form'
import { onSubmit } from '../../../redux/modules/cuenta/login';
import {renderField,} from '../Utils/renderField/renderField'
import { api } from "../../../utility/api";

class Formulario extends Component{    
    render(){
        const {handleSubmit,crear} = this.props;
        const editar = window.location.href.includes('editar');
        let disabled = false;
        let titulo = editar ? 'Editar Curso':'Registrar Curso';
        console.log(handleSubmit);  
        if(crear == false && editar==false){
            disabled = true; 
            titulo = 'Ver Curso'
        }

        return(
           
            <form onSubmit={handleSubmit} className="w-25">
                
                <h2>{titulo}</h2>
                <label>Nombre Curso</label>
                <Field name="nombre_curso" component={renderField} disabled={disabled}/>
                <br/>
                <label>Descripcion Curso</label>
                <Field name="descripcion" component={renderField} disabled={disabled}/>
                <br/>
                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a className="btn btn-secondary btn-sm mr-2" href='/#/cursos'>
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
    form : 'CursoForm'//identificado unico de formulario
})(Formulario)
