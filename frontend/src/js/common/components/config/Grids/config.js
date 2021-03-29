import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';
import { api } from '../../../../utility/api';
import { search } from 'superagent';

export default class Config extends Component {
	componentWillMount = () => {
		const { listarNiveles, listarGrado, listarSecciones, totalCatedraticos,totalEstudiantes,totalUsuarios } = this.props;
		listarNiveles();
		listarGrado();
		listarSecciones();
		totalCatedraticos();
		totalEstudiantes();
		totalUsuarios();
	};

	render() {
		const { niveles, loader, grados, secciones, totalCatedratico,totalEstudiante } = this.props;
		const { eliminarNivel, eliminarGrado,totalUsers } = this.props;
		console.log(niveles);

		return (
			<div className="py-4">
				<h2 align="center">PANTALLA  PRINCIPAL  ADMINISTRADOR</h2>
				<div className="row">
					<div className="mb-4 col-lg-6">
						<div className="mb-4 card card-small">
							<div className="border-bottom card-header">
								<h6 className="m-0">NIVELES</h6>
							</div>
							<a className="btn btn-success w-25" href="#/nivel/crear">
								Crear Nivel
							</a>
							<div className="p-0 px-3 pt-3">
								<Grid
									data={niveles}
									loading={loader}
									//onPageChange={onPageChange}
									//onSortChange={onSortChange}
								>
									<TableHeaderColumn isKey dataField="nombre" dataSort>
										Niveles
									</TableHeaderColumn>
									<TableHeaderColumn
										dataField="id"
										dataAlign="center"
										dataSort
										dataFormat={standardActions({
											editar: 'nivel',
											ver: 'nivel',
											eliminar: eliminarNivel
										})}
									>
										Acciones
									</TableHeaderColumn>
								</Grid>
							</div>
						</div>
					</div>
					<div className="mb-4 col-lg-6">
						<div className="mb-4 card card-small">
							<div className="border-bottom card-header">
								<h6 className="m-0">GRADOS</h6>
							</div>
							<a className="btn btn-success w-25" href="#/grado/crear">
								Crear Grado
							</a>
							<div className="p-0 px-3 pt-3">
								<Grid
									hover
									data={grados}
									loading={loader}
									//onPageChange={onPageChange}
									//onSortChange={onSortChange}
								>
									<TableHeaderColumn isKey dataField="nombre_grado" dataSort>
										Grados
									</TableHeaderColumn>
									<TableHeaderColumn
										dataField="nivel"
										dataSort
										dataFormat={(cell, row) => {
											return cell.nombre;
										}}
									>
										Nivel
									</TableHeaderColumn>
									<TableHeaderColumn
										dataField="id"
										dataAlign="center"
										dataSort
										dataFormat={standardActions({
											editar: 'grado',
											ver: 'grado',
											eliminar: eliminarGrado
										})}
									>
										Acciones
									</TableHeaderColumn>
								</Grid>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="mb-4 col-lg-6">
						<div className="mb-4 card card-small">
							<div className="border-bottom card-header">
								<h6 className="m-0">SECCIONES</h6>
							</div>

							<div className="p-0 px-3 pt-3">
								<Grid
									hover
									data={secciones}
									loading={loader}
									//onPageChange={onPageChange}
									//onSortChange={onSortChange}
								>
									<TableHeaderColumn isKey dataField="tipo_seccion" dataSort>
										Secciones
									</TableHeaderColumn>
								</Grid>
							</div>
						</div>
					</div>
					<div className="mb-4 col-lg-6">
						<div className="mb-4 card card-small">
							<div className="border-bottom card-header">
								<h6 className="m-0">USUARIOS REGISTRADOS</h6>
							</div>
							<div className="p-0 px-3 pt-3">
								<ul>
									<li><strong>Total de Usuarios:</strong> {totalUsers}</li>
									<li><strong>Total de Catedraticos:</strong> {totalCatedratico}</li>
									<li><strong>Total de Estudiantes:</strong> {totalEstudiante}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
