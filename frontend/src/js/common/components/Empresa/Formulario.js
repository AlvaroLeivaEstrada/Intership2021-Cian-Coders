import React,{Component} from 'react'
import { Field,reduxForm } from 'redux-form'
import { onSubmit } from '../../../redux/modules/cuenta/login';
import {renderField,} from '../Utils/renderField/renderField'

class Formulario extends Component{
    render(){
        const {handleSubmit,crear} = this.props;
        const editar = window.location.href.includes('editar');
        let disabled = false;
        if(crear == false && editar==false){
            disabled = true; 
        }
        return(
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <Field name="nombre" component={renderField} disabled={disabled}/>
                <br/>
                <label>Direccion</label>
                <Field name="direccion" component={renderField} disabled={disabled}/>
                <br/>
                <a className="btn btn-secondary btn-sm mr-2" href='/#/empresas'>
                    Cancelar
                </a>
                {disabled == false &&
                     <button className={`btn ${editar ? 'btn-info' :'btn-success'} btn-sm`} type="submit">
                         {editar ? 'Editar' : 'Registrar'}
                    </button>
                }
           
            </form>
        );
    }
}
export default reduxForm({
    form : 'empresa'//identificado unico de formulario
})(Formulario)
