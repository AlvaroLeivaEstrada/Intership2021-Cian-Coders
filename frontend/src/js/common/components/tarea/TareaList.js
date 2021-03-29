import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class TareaList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		const id =window.location.hash.split("=")[1]
		listar(id);
	};
	render() {
        const {data,loader,eliminar,onPageChange,onSortChange} = this.props;
		

		return (
			<React.Fragment>
				<h1>LISTADO DE TAREAS</h1>
               
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					
					onPageChange={onPageChange}
					onSortChange={onSortChange}
				>
					<TableHeaderColumn  dataField="asignacion" dataSort dataFormat={(cell,row)=>{
						return `  ${cell.curso.nombre_curso}`;
					}}>
						Curso
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="nombre" dataSort >
						Nombre 
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="descripcion" dataSort>
						Descripcion  
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="fecha" dataSort >
						Fecha de Entrega 
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="hora" dataSort >
						Hora 
					</TableHeaderColumn>
					<TableHeaderColumn
						
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ calificar:'tareaEstudiantes'})}
					>
						Revisar respuestas
					</TableHeaderColumn>
					
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'tarea', ver: 'tarea', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default TareaList;