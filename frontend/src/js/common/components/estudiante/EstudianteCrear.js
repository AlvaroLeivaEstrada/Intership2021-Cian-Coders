import React,{Component} from 'react'
import Formulario from './Formulario'


class EstudianteCrear extends Component{
    state={
        creacion: true,
    }
    componentWillMount=()=>{
        const {leerEstudiante,match}=this.props;
        const id = match.params.id;
        if(id){
            this.setState({creacion:false});
            leerEstudiante(id);
        } 
    }
    render(){
        console.log('PROPS Estudiante CREAR',this.props)
        const {creacion} = this.state
        const {crearEstudiante,editarEstudiante} = this.props;
        const functionEnvio = creacion ? crearEstudiante : editarEstudiante;

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
export default EstudianteCrear;