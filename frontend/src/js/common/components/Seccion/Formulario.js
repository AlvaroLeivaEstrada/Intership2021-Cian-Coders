import React,{Component} from 'react'
import { Field,reduxForm } from 'redux-form'
import {renderField,} from '../Utils/renderField/renderField'

class Formulario extends Component{
    render(){
        const {handleSubmit,crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Seccion' : 'Registrar Seccion';

        let disabled = false;
        if(crear == false && editar==false){
            disabled = true;
            titulo = 'Ver Seccion'; 
        }
        return(
            <form onSubmit={handleSubmit} className="w-25">
                <h3>{titulo}</h3>
                <label>Nombre Seccion</label>
                <Field name="tipo_seccion" component={renderField} disabled={disabled}/>
                <br/>
                <div  className='d-flex flex-row justify-content-end mt-3'>
                    <a className="btn btn-secondary btn-sm mr-2" href='/#/secciones'>
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
    form : 'SeccionForm'//identificado unico de formulario
})(Formulario)
