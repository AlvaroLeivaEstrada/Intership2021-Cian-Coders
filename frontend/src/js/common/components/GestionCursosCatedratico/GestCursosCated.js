import React,{Component} from 'react'
import Formulario from './Formulario'


class GestCursosCated extends Component{
    state={
        avatar : null
    }
    componentWillMount=()=>{
        const {leerAsignacion,match}=this.props;
        const id = match.params.id;
        if(id){
            leerAsignacion(id);
        }  
    }
    setAvatar = avatar =>{
        this.setState({avatar})
    }
    actualizar = (data) => {
        const { editarAsignacion } = this.props;
        editarAsignacion({...data, avatar: null}, [{file: this.state.avatar, name: "avatar"}]);
    }
    render(){
        const {img} = this.props;
        return(
            <React.Fragment>  
                <Formulario
                    onSubmit={this.actualizar}
                    setAvatar = {this.setAvatar}
                    img={img}
                    initialValues={{descripcion:"Prueba"}}
                />
            </React.Fragment>
        );
    }
}
export default GestCursosCated;