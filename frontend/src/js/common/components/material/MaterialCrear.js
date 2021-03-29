import React,{Component} from 'react'
import Formulario from './Formulario'


class MaterialCrear extends Component{
    state={
        creacion: true,
        archivo : null
    }

    setArchivo = (archivo) => {
        this.setState({archivo});
    };
    registro = (data) => {
        const { crearMaterial } = this.props;
        crearMaterial({...data, archivo: null}, [{file: this.state.archivo, name: "archivo"}]);
    };
    actualizar = (data)=>{
        const {editarMaterial} = this.props;
        editarMaterial({...data,archivo:null},[{file:this.state.archivo,name:"archivo"}])
    }

    componentWillMount=()=>{
        const {leerMaterial,match}=this.props;
        const id = match.params.id;
        const crear = window.location.href.includes("crear")
        if(id && crear===false){
            this.setState({creacion:false});
            leerMaterial(id);
        } 
    }
    componentWillUnmount=()=>{
        const {clearFile} = this.props
        clearFile();
    }
    render(){
        const {creacion} = this.state
        const {archivo,match} = this.props;
        const id = match.params.id
     
        const functionEnvio = creacion ?  this.registro : this.actualizar;

        return(
            <React.Fragment>  
                <Formulario
                    crear = {creacion}
                    onSubmit={functionEnvio}
                    archivo = {archivo}
                    setArchivo={this.setArchivo}
                    initialValues={{asignacion:id}}
                />
            </React.Fragment>
        );
    }
}
export default MaterialCrear;