import React,{Component, useEffect, useState} from 'react'
import { Field,reduxForm } from 'redux-form'
import { onSubmit } from '../../../redux/modules/cuenta/login';
import { api } from "../../../utility/api";
import {renderField, renderFilePicker,} from '../Utils/renderField/renderField'

import {
    AsyncSelectField,
    SelectField,
} from "Utils/renderField/renderField";
import { search } from 'superagent';


const cargarGrados = (search) => {
    let grados = [];
    return api
        .get("grados", { search })
        .then((response) => {
            grados = response.results.map((grado) => ({
                value: grado.id,
                label: grado.nombre_grado,
            }));
            return grados;
        })
        .catch((err) => {
            return grados;
        });
};


const cargarSecciones = (search) => {
    let secciones = [];
    return api
        .get("secciones", { search })
        .then((response) => {
            secciones = response.results.map((seccion) => ({
                value: seccion.id,
                label: seccion.tipo_seccion,
            }));
            return secciones;
        })
        .catch((err) => {
            return secciones;
        });
};


const cargarCursos = (search) => {
    let cursos = [];
    return api
        .get("cursos", { search })
        .then((response) => {
            cursos = response.results.map((curso) => ({
                value: curso.id,
                label: curso.nombre_curso,
            }));
            return cursos;
        })
        .catch((err) => {
            return cursos;
        });
};

const cargarCatedraticos = (search) => {
    let catedraticos = [];
    return api
        .get("catedraticos", { search })
        .then((response) => {
          
            catedraticos = response.results.map((catedratico) => ({
                value: catedratico.id,
                label: catedratico.profile.nombre+' '+catedratico.profile.apellidos
            }));
            return catedraticos;
        })
        .catch((err) => {
            return catedraticos;
        });
};
class Formulario extends Component{
    
    componentWillUnmount=()=>{
        const {clearFile} = this.props
        clearFile();
    }

    render(){
        const {handleSubmit,crear,setAvatar,img} = this.props;
        const editar = window.location.href.includes('editar');
        let disabled = false;
        let hidden = "hidden";
        let titulo = editar ? 'Editar Asignacion':'Registrar Asignacion';
        
        
      
        if(crear == false && editar==false){
            disabled = true; 
            titulo = 'Ver Asignacion'
        }

        return(
            <form onSubmit={handleSubmit} className="col-10">
                <h2>{titulo}</h2>
                <label>Portada</label>
                <Field
                    accept="image/*"
                    photo={img}
                    setFile={setAvatar}
                    name = "avatar"
                    component ={renderFilePicker}
                />  
                <label>Ciclo Escolar</label>
                <Field
                    name="ciclo"
                    loadOptions={cargarGrados}
                    component={AsyncSelectField}
                    disabled={true}
        
                />
                
                <label>Grado</label>
                <Field
                    name="grado"
                    loadOptions={cargarGrados}
                    component={AsyncSelectField}
                    disabled={disabled}
                    
                />
                <br/>
                <label>Seccion</label>
                <Field
                    name="seccion"
                    loadOptions={cargarSecciones}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <br/>
                <label>Curso</label>
                <Field
                    name="curso"
                    loadOptions={cargarCursos}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <br/>
                <label>Profesor</label>
                <Field
                    name="profesor"
                    loadOptions={cargarCatedraticos}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <br/>
                
                <label>Descripcion</label>
                <Field
                    name="descripcion"
                    component={renderField}
                    disabled={disabled}
                />
                <br/>
                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a className="btn btn-secondary btn-sm mr-2" href='/#/asignaciones'>
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
    form : 'AsignacionForm'//identificado unico de formulario
})(Formulario)