import React,{Component} from 'react'
import Formulario from './Formulario'


class GradoCrear extends Component{
    state={
        creacion: true,
    }
  
    componentWillMount=()=>{
        
        const {leerGrado,match}=this.props;
        //console.log("GRADO ",this.props)
        const id = match.params.id;
        if(id){
            this.setState({creacion:false});
            leerGrado(id);
        } 
    }

    render(){
    
        const {creacion} = this.state
        const {crearGrado,editarGrado} = this.props;
        const functionEnvio = creacion ? crearGrado : editarGrado;

        return(
            <React.Fragment>  
                <Formulario
                    crear = {creacion}
                    onSubmit={functionEnvio}
                />
            </React.Fragment>
        );
    }
}
export default GradoCrear;