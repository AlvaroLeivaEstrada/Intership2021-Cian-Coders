import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListaNotasEstudiante extends Component {
	componentWillMount = () => {
		const { listarNotas,SumaNotasCurso } = this.props;
		listarNotas();
		SumaNotasCurso();
	};
	render() {
		const { grades, loader, onPageChange, onSortChange,asignacion } = this.props;

		return (
			<React.Fragment>
		
				<div className="row">
				<h4 align="center"><strong>Listado de calificaciones por tarea</strong></h4>
					<Grid
						hover
						striped
						data={grades}
						loading={loader}
						onPageChange={onPageChange}
						onSortChange={onSortChange}
					>
						<TableHeaderColumn
							isKey
							dataField="tarea"
							dataSort
							dataFormat={(cell, row) => {
								return cell.asignacion.curso.nombre_curso;
							}}
						>
							Materia
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField="tarea"
							dataSort
							dataFormat={(cell, row) => {
								return cell.nombre;
							}}
						>
							Tarea
						</TableHeaderColumn>

						<TableHeaderColumn dataField="calificacion" dataSort>
							Nota
						</TableHeaderColumn>
					</Grid>
				</div>
				<div className="row">
					<h4 align="center"><strong>Sumatoria de calificaciones por curso</strong></h4>
				<Grid
						hover
						striped
						data={asignacion}
						loading={loader}
						onPageChange={onPageChange}
						onSortChange={onSortChange}
					>
						<TableHeaderColumn
							isKey
							dataField="materia"
							dataSort
							
						>
							Materia
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField="sumatoria_notas"
							dataSort	
						>
							Nota acumulada
						</TableHeaderColumn>

						
					</Grid>

				</div>
			</React.Fragment>
		);
	}
}

export default ListaNotasEstudiante;
