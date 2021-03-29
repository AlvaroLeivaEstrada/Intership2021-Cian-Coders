import React,{Component} from 'react'
import Formulario from './Formulario'


class TareaEstudianteCrear extends Component{
    state={
        creacion: true,
        archivo : null
    }
    
    setArchivo = archivo => {
        this.setState({archivo});
        
    };
    registro = (data) => {
        const { registroTareaEstudiante } = this.props;
        registroTareaEstudiante({...data, archivo: null}, [{file: this.state.archivo, name: "archivo"}]);
    };
    actualizar = (data)=>{
        const {editarTarea} = this.props;
        editarTarea({...data,archivo:null},[{file:this.state.archivo,name:"archivo"}])
    }

    componentWillMount=()=>{
        const {leerTarea,match}=this.props;
        const id = match.params.id;
        const crear = window.location.href.includes("crear")
        if(id&&crear===false){
            this.setState({creacion:false})
            leerTarea(id);
        } 
      
    }
   
    render(){
       
        const {creacion} = this.state
        const {archivo,clearArchivo,match} = this.props;
        const idTarea = match.params.id
        const idUser = window.localStorage.id
        const functionEnvio = creacion ?  this.registro : this.actualizar;

        return(
            <React.Fragment>  
                <Formulario
                    crear = {creacion}
                    onSubmit={functionEnvio}
                    archivo = {archivo}
                    setArchivo={this.setArchivo}
                    clearArchivo = {clearArchivo}
                    initialValues={{estudiante:idUser,tarea:idTarea}}
                />
            </React.Fragment>
        );
    }
}
export default TareaEstudianteCrear;