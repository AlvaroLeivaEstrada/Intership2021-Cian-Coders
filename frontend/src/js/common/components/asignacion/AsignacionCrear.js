import React,{Component} from 'react'
import Formulario from './Formulario'


class AsignacionCrear extends Component{
    state={
        creacion: true,
        avatar : null
    }
    componentWillMount=()=>{
        const {leerAsignacion,match,getCurrentCiclo}=this.props;
        const id = match.params.id;
        if(id){
        
            this.setState({creacion:false});
            leerAsignacion(id);
        } 
        getCurrentCiclo();
    }
    setAvatar = avatar =>{
     
        this.setState({avatar})
        

    }
    registro = (data) => {

        data.avatar=null
        const { crearAsignacion } = this.props;
        crearAsignacion({...data,avatar:null}, [{file: this.state.avatar, name: "avatar"}]);
    };
    actualizar = (data) => {
        const { editarAsignacion } = this.props;
        editarAsignacion({...data, avatar: null}, [{file: this.state.avatar, name: "avatar"}]);
    };
    render(){
        
        const {creacion} = this.state

        const {ciclo,img,clearFile} = this.props;
        const functionEnvio = creacion ? this.registro : this.actualizar;

        return(
            <React.Fragment>  
                <Formulario
                    crear = {creacion}
                    onSubmit={functionEnvio}
                    setAvatar = {this.setAvatar}
                    img={img}
                    clearFile={clearFile}
                    initialValues={ciclo?{ciclo:{value:ciclo.id,label:ciclo.anio}}:null}
                />
            </React.Fragment>
        );
    }
}
export default AsignacionCrear;