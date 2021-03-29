import React,{Component} from 'react'
import { Field,reduxForm } from 'redux-form'
import { onSubmit } from '../../../redux/modules/cuenta/login';
import {renderField, renderNumber,} from '../Utils/renderField/renderField'

class Formulario extends Component{
    render(){
        const {handleSubmit,crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Ciclo' : 'Registrar Ciclo';

        let disabled = false;
        if(crear == false && editar==false){
            disabled = true;
            titulo = 'Ver Ciclo'; 
        }
        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <label>Año Escolar</label>
               
                <Field name="anio" component={renderNumber} disabled={disabled}/>
                <br/>
                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a className="btn btn-secondary btn-sm mr-2" href='/#/ciclos'>
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
    form : 'CicloForm'//identificado unico de formulario
})(Formulario)
