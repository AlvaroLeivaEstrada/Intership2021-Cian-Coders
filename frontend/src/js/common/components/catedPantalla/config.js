import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { Link } from 'react-router-dom';
import { standardActions } from '../Utils/Grid/StandardActions';

import { search } from 'superagent';

export default class Config extends Component {
	componentWillMount = () => {
		const { listarCursos, eventosProximos, totalTareas ,totalTareasPorCurso} = this.props;
		listarCursos();
		eventosProximos();
		totalTareas();
		totalTareasPorCurso();
	};

	render() {
		const { cursos, loader, eventos, totalTareasPendientes ,tareas} = this.props;

		return (
			<div className="py-4">
				<h2 align="center">PANTALLA PRINCIPAL CATEDRATICO</h2>
				<div className="row">
					<div className="mb-4 col-lg-6">
						<div className="mb-4 card card-small">
							<div className="border-bottom card-header">
								<h6 className="m-0">Cursos Asignados</h6>
							</div>
							<div className="p-0 px-3 pt-3">
								<Grid
									hover
									data={cursos}
									loading={loader}
									//onPageChange={onPageChange}
									//onSortChange={onSortChange}
								>
									<TableHeaderColumn
										isKey
										dataField="curso"
										dataSort
										dataFormat={(cell, row) => {
											return `${row.grado.nombre_grado}` + `    ` + `${cell.nombre_curso}`;
										}}
									>
										Cursos
									</TableHeaderColumn>
								</Grid>
							</div>
						</div>
					</div>
					<div className="mb-4 col-lg-6">
						<div className="mb-4 card card-small">
							<div className="border-bottom card-header">
								<h6 className="m-0">Eventos Proximos</h6>
							</div>
							<div className="p-0 px-3 pt-3">
								<Grid
									hover
									data={eventos}
									loading={loader}
									//onPageChange={onPageChange}
									//onSortChange={onSortChange}
								>
									<TableHeaderColumn
										isKey
										dataField="titulo"
										dataSort
										dataFormat={(cell, row) => {
											return `${cell}` + `    ` + `${row.fecha}`;
										}}
									>
										Eventos
									</TableHeaderColumn>
								</Grid>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="mb-4 col-lg-6">
						<div className="mb-4 card card-small">
							<h6>
								<strong>Total Tareas Pendientes Por Calificar:</strong> {totalTareasPendientes}{' '}
							</h6>
							<div className="border-bottom card-header">
								<h6 className="m-0">Tareas Pendientes de Calificar</h6>
							</div>
							<div className="p-0 px-3 pt-3">
								<Grid
									hover
									data={tareas}
									loading={loader}
									//onPageChange={onPageChange}
									//onSortChange={onSortChange}
								>
									<TableHeaderColumn
										isKey
										dataField="asignacion"
										dataSort
	
									>
										Curso
									</TableHeaderColumn>

									<TableHeaderColumn
								
										dataField="total_tareas"
										dataSort
	
									>
										Total de tareas
									</TableHeaderColumn>

									<TableHeaderColumn
							
										dataField="total_tareas_pendientes_por_curso"
										dataSort
	
									>
										Total de tareas pendiented por calificar
									</TableHeaderColumn>
								</Grid>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}
