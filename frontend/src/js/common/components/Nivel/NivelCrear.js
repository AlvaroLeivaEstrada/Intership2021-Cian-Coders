import React,{Component} from 'react'
import Formulario from './Formulario'


class NivelCrear extends Component{
    state={
        creacion: true,
    }
    
    componentWillMount=()=>{
        //console.log("COMPONENTWILLMOUNT",this.props)
        const {leerNivel,match}=this.props;
        const id = match.params.id;
        if(id){
            this.setState({creacion:false});
            leerNivel(id);
        }

    }

    render(){
        
      
        const {creacion} = this.state
        const {crearNivel,editarNivel} = this.props;
        const functionEnvio = creacion ? crearNivel : editarNivel;

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
export default NivelCrear