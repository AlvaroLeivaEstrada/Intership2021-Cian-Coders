import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { Link } from 'react-router-dom';
import { standardActions } from '../Utils/Grid/StandardActions';

import { search } from 'superagent';
import curso from '../../../redux/modules/curso/curso';



export default class Config extends Component {
	componentWillMount = () => {
		const { listarAsignaciones,eventosProximos,listarTareas} = this.props;
		listarAsignaciones();
		listarTareas();
		eventosProximos();
	};

	render() {
		const {asignaciones,loader,eventos,tareas } = this.props;
		
		return (
			<div className="py-4">
				<h2 align="center">PANTALLA  PRINCIPAL ESTUDIANTE</h2>
				<div className="row">
					<div className="mb-4 col-lg-6">
						<div className="mb-4 card card-small">
							<div className="border-bottom card-header">
								<h6 className="m-0">Cursos Asignados</h6>
							</div>
							<div className="p-0 px-3 pt-3">
								<Grid
									hover
									data={asignaciones}
									loading={loader}
									//onPageChange={onPageChange}
									//onSortChange={onSortChange}
								>
									<TableHeaderColumn isKey dataField="asignacion" dataSort dataFormat={(cell,row)=>{
										return `${cell.curso.nombre_curso}`;
									}}>
										Asignaciones 
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
									<TableHeaderColumn isKey dataField="titulo" dataSort dataFormat={(cell,row)=>{
										return `${cell}`+`    `+`${row.fecha}`
									}} >
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
							<div className="border-bottom card-header">
								<h6 className="m-0">Tareas Proximas</h6>
							</div>
							<div className="p-0 px-3 pt-3">
								<Grid
									hover
									data={tareas}
									loading={loader}
									//onPageChange={onPageChange}
									//onSortChange={onSortChange}
								>
									<TableHeaderColumn isKey dataField="nombre" dataSort dataFormat={(cell,row)=>{return `${cell}`+`    `+`${row.fecha}`}}>
										Tareas 
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
