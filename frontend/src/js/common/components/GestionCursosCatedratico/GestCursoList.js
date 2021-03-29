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
		console.log(data)
	
		//let num = 10;
		//const url = window.location.href+`?id=${num}`
		return (
			<React.Fragment>
				<h1>GESTION DE CURSOS</h1>
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
						dataFormat={standardActions({ editarPortada: 'gestCursosCated'})}
					>
						Portada
					</TableHeaderColumn>

					
					<TableHeaderColumn  dataField="ciclo_Escolar" dataSort dataFormat={(cell,row)=>{
						return cell.anio;
					}}>
						Ciclo Escolar
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="curso" dataSort dataFormat={(cell,row)=>{
						return cell.nombre_curso;
					}}>
						Curso 
					</TableHeaderColumn>
					<TableHeaderColumn
						
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ asignar:'asigEstud'})}
					>
						Registrar Estudiante
					</TableHeaderColumn>	
					
					<TableHeaderColumn
						
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ tareas:'tareas',crearTarea:'tarea'})}
					>
						Tareas
					</TableHeaderColumn>
					

					<TableHeaderColumn
						
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ material:'materiales',crearMaterial:'material'})}
					>
						 Materiales
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default AsignacionList;