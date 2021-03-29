import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class TareaListEstudiante extends Component {
	componentWillMount = () => {
		const { listar, match } = this.props;
		const id = match.params.id;
		listar(id);
	};
	render() {
		const { data, loader, onPageChange, onSortChange } = this.props;

		return (
			<React.Fragment>
				<h1>TAREAS</h1>
				<div className="row">
					
				</div>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					onPageChange={onPageChange}
					onSortChange={onSortChange}
				>
					<TableHeaderColumn
						dataField="asignacion"
						dataSort
						dataFormat={(cell, row) => {
							return `${cell.curso.nombre_curso}`;
						}}
					>
						Curso
					</TableHeaderColumn>
					<TableHeaderColumn dataField="nombre" dataSort>
						Nombre
					</TableHeaderColumn>

					<TableHeaderColumn dataField="fecha" dataSort>
						Fecha de Entrega
					</TableHeaderColumn>
					<TableHeaderColumn dataField="hora" dataSort>
						Hora
					</TableHeaderColumn>
					
					<TableHeaderColumn
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ subir: 'tareaEstudiante' })}
					>
						Subir respuesta
					</TableHeaderColumn>

					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ ver: 'tarea' })}
					>
						Descripcion de tarea
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default TareaListEstudiante;
