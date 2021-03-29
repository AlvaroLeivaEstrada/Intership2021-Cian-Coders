import React,{Component} from 'react'
import { Field,reduxForm } from 'redux-form'
import { onSubmit } from '../../../redux/modules/cuenta/login';
import {renderField,} from '../Utils/renderField/renderField'

class Formulario extends Component{
    render(){
        const {handleSubmit,crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Nivel' : 'Registrar Nivel';

        let disabled = false;
        if(crear == false && editar==false){
            disabled = true;
            titulo = 'Ver Nivel'; 
        }
        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <label>Nombre</label>
                <Field name="nombre" component={renderField} disabled={disabled}/>
                <br/>
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
export default reduxForm({
    form : 'NivelForm'//identificado unico de formulario
})(Formulario)
