import React,{Component} from 'react'
import Formulario from './Formulario'


class SeccionCrear extends Component{
    state={
        creacion: true,
    } 
    componentWillMount=()=>{
        console.log("COMPONENTWILLMOUNT",this.props)
        const {leer,match}=this.props;
        const id = match.params.id;
        if(id){
            this.setState({creacion:false});
            leer(id);
        }

    }
    render(){
        const {creacion} = this.state
        const {crear,editarSeccion} = this.props;
        const functionEnvio = creacion ? crear : editarSeccion;

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
export default SeccionCrear