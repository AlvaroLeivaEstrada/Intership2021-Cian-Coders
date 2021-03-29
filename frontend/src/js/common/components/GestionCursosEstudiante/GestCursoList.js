import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class AsignacionList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;	
		listar();
	};

	render() {
        const {data,loader,onPageChange,onSortChange} = this.props;
	
		
		return (
			<React.Fragment>
				<h1 align="center">CURSOS ASIGNADOS</h1>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					
					onPageChange={onPageChange}
					onSortChange={onSortChange}
				>
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={(cell,row)=>{
							return <img className="user-avatar " width="50" height="50" src={row.imagen_portada ? row.imagen_portada  : null} />
						}}
					>
						Portada
					</TableHeaderColumn>

					<TableHeaderColumn  dataField="curso" dataSort dataFormat={(cell,row)=>{
						return cell.nombre_curso
					}}>
						Curso 
					</TableHeaderColumn>

					<TableHeaderColumn  dataField="profesor" dataSort dataFormat={(cell,row)=>{
						return cell.profile.nombre+" "+cell.profile.apellidos;
					}}>
						Profesor
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="grado" dataSort dataFormat={(cell,row)=>{
						return cell.nombre_grado +" "+ row.seccion.tipo_seccion ;
					}}>
						Grado Seccion
					</TableHeaderColumn>
					
					<TableHeaderColumn
						
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ listaAsigEstud:'listadoTareasEstud'})}
					>
						Tareas
					</TableHeaderColumn>
					

					<TableHeaderColumn
						
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ material:'materiales'})}
					>
						 Materiales
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default AsignacionList;