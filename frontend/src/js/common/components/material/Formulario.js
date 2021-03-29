import React,{Component, useEffect, useState} from 'react'
import { Field,reduxForm } from 'redux-form'
import { onSubmit } from '../../../redux/modules/cuenta/login';
import {renderField, renderFilePicker,} from '../Utils/renderField/renderField'
import { api } from "../../../utility/api";

import {
    AsyncSelectField,
    SelectField,
} from "Utils/renderField/renderField";
import { search } from 'superagent';


class Formulario extends Component{

    

    render(){
        const {handleSubmit,crear,setArchivo,archivo} = this.props;
        const editar = window.location.href.includes('editar');
        let disabled = false;
        let titulo = editar ? 'Editar Material de Clase':'Registrar Nuevo Material de Clase';
        let ver=false;
        if(crear == false && editar==false){
            disabled = true; 
            ver= true;
            titulo = 'Ver Material de Clase'
        }

        return(
            <form onSubmit={handleSubmit} className="col-10">
                <h2>{titulo}</h2>
                
                <label>Titulo</label>
                <Field name="titulo"
                        component={renderField}
                        disabled={disabled}>
                </Field>
                <br/>
                <label>Descripcion</label>
                <Field name="descripcion"
                        component={renderField}
                        disabled={disabled}>
                </Field>
                <br/>
                <Field
                    name="asignacion"
                    component={renderField}
                    disabled={disabled}
                    type="hidden"
                 
                />
                <br/>
                <label>Archivo</label>
                <Field
                    accept=".pdf,document/*"
                    setFile={setArchivo}
                    photo = {archivo}
                    name = "archivo"
                    component ={renderFilePicker}
                />   
                <a href={archivo} target="_blank" >Descargar Material</a>             
                <div className='d-flex flex-row justify-content-end mt-3'>
                   {ver== false? <a className="btn btn-secondary btn-sm mr-2" href='/#/gestCursosCatedList'>
                        Cancelar
                    </a>:null}
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
    form : 'MaterialForm'//identificado unico de formulario
})(Formulario)