import React,{Component} from 'react'
import Formulario from './Formulario'


class CatedraticoCrear extends Component{
    state={
        creacion: true,
    }
    componentWillMount=()=>{
        const {leerCatedratico,match}=this.props;
        const id = match.params.id;
        if(id){
            this.setState({creacion:false});
            leerCatedratico(id);
        } 
    }
    render(){
        console.log('PROPS CATEDRATICO CREAR',this.props)
        const {creacion} = this.state
        const {crearCatedratico,editarCatedratico} = this.props;
        const functionEnvio = creacion ? crearCatedratico : editarCatedratico;

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
export default CatedraticoCrear;