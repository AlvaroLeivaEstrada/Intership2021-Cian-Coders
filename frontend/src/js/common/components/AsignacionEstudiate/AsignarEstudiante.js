import React,{Component} from 'react'
import Formulario from './Formulario'


class AsignarEstudiante extends Component{
    state={
        creacion: true,
    }
    
    componentWillMount=()=>{
        const {leer,match}=this.props;
        const id = match.params.id;
        const crear = window.location.href.includes("crear")
        if(id&&crear===false){
            this.setState({creacion:false});
            leer(id);
        }

    }

    render(){
     
        const {creacion} = this.state
        const {registro,editar,match} = this.props;
        const id = match.params.id
        const functionEnvio = creacion ? registro : editar;

        return(
            <React.Fragment>  
                <Formulario
                    crear = {creacion}
                    onSubmit={functionEnvio}
                    initialValues={{asignacion:id}}
                />
            </React.Fragment>
        );
    }
}
export default AsignarEstudiante