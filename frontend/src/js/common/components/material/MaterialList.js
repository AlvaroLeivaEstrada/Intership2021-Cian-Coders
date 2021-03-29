import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class MaterialList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		const id =window.location.hash.split("=")[1]
		listar(id);
	};
	render() {
        const {materiales,loader,eliminar,onPageChange,onSortChange} = this.props;
		console.log("LocalStorage ",localStorage);
		const rol = localStorage.getItem("rol")
		return (
			<React.Fragment>
				<h1>MATERIALES DE CLASE</h1>
				<Grid
					hover
					striped
					data={materiales}
					loading={loader}
					
					onPageChange={onPageChange}
					onSortChange={onSortChange}
				>
					<TableHeaderColumn  dataField="asignacion" dataSort dataFormat={(cell,row)=>{
						return `${cell.grado.nombre_grado}   ${cell.curso.nombre_curso}`;
					}}>
						Asignacion
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="titulo" dataSort >
						Titulo 
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="descripcion" dataSort>
						Descripcion  
					</TableHeaderColumn>
					
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={rol==="ESTUD"?standardActions({  ver: 'material'}):
							standardActions({ editar: 'material', ver: 'material', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default MaterialList;