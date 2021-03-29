import React,{Component} from 'react'
import Formulario from './Formulario'


class CicloCrear extends Component{
    state={
        creacion: true,
    }
    
    componentWillMount=()=>{
        const {leer,match}=this.props;
        const id = match.params.id;
        if(id){
            this.setState({creacion:false});
            leer(id);
        }

    }

    render(){
     
        const {creacion} = this.state
        const {crear,editar} = this.props;
        const functionEnvio = creacion ? crear : editar;

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
export default CicloCrear