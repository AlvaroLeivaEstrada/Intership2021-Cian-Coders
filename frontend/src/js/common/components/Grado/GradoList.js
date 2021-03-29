import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid/';
import { standardActions } from '../Utils/Grid/StandardActions';

class GradoList extends Component {
	componentWillMount = () => {
		//console.log("PROPS NIVEL LIST",this.props)
		//console.log("state NIVEL LIST",this.state)
		const { listarGrado } = this.props;
		listarGrado();
	};
	render() {
		//console.log("Render Nivel List")
        const {grados,loader,eliminarGrado} = this.props;
		console.log('GradoList ',grados)
		return (
			<React.Fragment>
				<h1>Lista de Grados</h1>
                <a className="btn btn-success" href="#/grado/crear">
                    Crear Grado
                </a>
				<Grid
					hover
					striped
					data={grados}
					loading={loader}
					
					//onPageChange={onPageChange}
					//onSortChange={onSortChange}
				>
					<TableHeaderColumn  dataField="nombre_grado" dataSort>
						Nombre Grado
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="nivel" dataSort dataFormat={(cell,row)=>{
						return cell.nombre;
					}}>
						Nivel 
					</TableHeaderColumn>	
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'grado', ver: 'grado', eliminar: eliminarGrado })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default GradoList;