import React,{Component} from 'react'
import Formulario from './Formulario'


class EventoCrear extends Component{
    state={
        creacion: true,
    }
    
    componentWillMount=()=>{
        
        const {leer,match,obtenerCicloActual}=this.props;
        console.log("This props ",this.props)
        const id = match.params.id;
        if(id){
            this.setState({creacion:false});
            leer(id);
        }
        obtenerCicloActual();
    }

    render(){
        const {creacion} = this.state
        const {crearEvento,editar,ciclo} = this.props;
        const functionEnvio = creacion ? crearEvento : editar;
     
        return(
            <React.Fragment>  
                <Formulario
                    crear = {creacion}
                    onSubmit={functionEnvio}
                    initialValues={ciclo?{ciclo:{value:ciclo.id,label:ciclo.anio}}:null}
                />
            </React.Fragment>
        );
    }
}
export default EventoCrear