import React,{Component} from 'react'
import Formulario from './Formulario'


class TareaCrear extends Component{
    state={
        creacion: true,
        archivo : null
    }
    
    setArchivo = archivo => {
        this.setState({archivo});
    };
   
    registro = (data) => {
        const { registroTarea } = this.props;
        registroTarea({...data, archivo: null}, [{file: this.state.archivo, name: "archivo"}]);
    };
    actualizar = (data)=>{
        const {editarTarea} = this.props;
        editarTarea({...data,archivo:null},[{file:this.state.archivo,name:"archivo"}])
    }

    componentWillMount=()=>{
        const {leerTarea,match}=this.props;
        const id = match.params.id;
        const crear = window.location.href.includes('crear');
        if(id && crear===false){
            this.setState({creacion:false})
            leerTarea(id);
        } 
      
    }
   
    render(){
        const {creacion} = this.state
        const {match,id} = this.props
       
        const Id = match.params.id
        const id_asignacion = id;
        const {archivo,clearArchivo,getState} = this.props;
        console.log("Store ")
        const functionEnvio = creacion ?  this.registro : this.actualizar;

        return(
            <React.Fragment>  
                <Formulario
                    crear = {creacion}
                    onSubmit={functionEnvio}
                    archivo = {archivo}
                    id={id_asignacion}
                    setArchivo={this.setArchivo}
                    clearArchivo = {clearArchivo}
                    initialValues={{asignacion:Id}}
                />
            </React.Fragment>
        );
    }
}
export default TareaCrear;