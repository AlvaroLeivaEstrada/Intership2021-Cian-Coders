import React,{Component, useEffect, useState} from 'react'
import { Field,reduxForm } from 'redux-form'
import {renderField, renderFilePicker} from '../../Utils/renderField/renderField';


const validate = values => {
    const errors = {}
    if (values.password && values.confirmatio_password) {
      if(values.password !== values.confirmatio_password){
          errors.confirmatio_password = 'La contraseña no coincide'
      }
    }
  
    return errors
  }



class Formulario extends Component{

    
    render(){
        //console.log("Formulario",this.props)
        const {handleSubmit,id} = this.props;


        return(
           
            <form onSubmit={handleSubmit} className="w-25">    
                <label htmlFor="normal_field">Nueva Contraseña</label>
                            <Field
                                name="password"
                                type="password"
                                placeholder="Password Field"
                                component={renderField}
                            />
               
                <br/>
                <label htmlFor="normal_field">Confirmacion Contraseña</label>
                            <Field
                                name="confirmatio_password"
                                type="password"
                                placeholder="Password Field"
                                component={renderField}
                            />
               
                <br/>
                <button className="btn btn-success btn-sm" type="submit">
                        Enviar
                </button>
            </form>
        );
    }
}
//export default Formulario
export default reduxForm({
    form : 'CambiarClaveForm',//identificado unico de formulario
    validate
})(Formulario)
