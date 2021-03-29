import React,{Component} from 'react'
import Formulario from './Formulario'


class ClaveModificar extends Component{

    render(){
        const {cambiarClave,me} =this.props
        const id = me.id
      
        return(
            <React.Fragment>  
                <Formulario
                    id={id}
                    onSubmit={cambiarClave}
                />
            </React.Fragment>
        );
    }
}
export default ClaveModificar;