import React,{Component} from 'react'
import Formulario from './Formulario'


class EmpresaCrear extends Component{
    state={
        crear: true,
    }
    
    componentWillMount=()=>{
        const {leer,match}=this.props;
        const id = match.params.id;
        if(id){
            this.setState({crear:false});
            leer(id);
        }

    }

    render(){
        console.log("PROPS:", this.props)
        const {crear} = this.state
        const {registroEmpresa,actualizarEmpresa} = this.props;
        const functionEnvio = crear ? registroEmpresa : actualizarEmpresa;
        return(
            <React.Fragment>
                <h1>Componente Empresa</h1>
                <Formulario
                    crear = {crear}
                    onSubmit={functionEnvio}
                />
            </React.Fragment>
        );
    }
}
export default EmpresaCrear