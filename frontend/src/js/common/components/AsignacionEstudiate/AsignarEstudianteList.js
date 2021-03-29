import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class AsignarEstudianteList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		listar();
	};
	render() {
        const {data,loader,eliminar} = this.props;
		return (
			<React.Fragment>
				<h1>Listado de estudiantes</h1>
                <a className="btn btn-success" href="#/asigEstud/crear">
                    Asignar nuevo estudiante
                </a>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					//onPageChange={onPageChange}
					//onSortChange={onSortChange}
				>
					<TableHeaderColumn isKey dataField="asignacion" dataSort dataFormat={(cell,row)=>{
						return `${cell.grado.nombre_grado}  ${cell.curso.nombre_curso}`;
					}}>
						Asignacion
					</TableHeaderColumn>
					<TableHeaderColumn dataField="estudiante" dataSort dataFormat={(cell,row)=>{
						return `${cell.perfil.nombre}  ${cell.perfil.apellidos}`
					}}>
						Estudiante
					</TableHeaderColumn>	
					<TableHeaderColumn
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'asigEstud', ver: 'asigEstud', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default AsignarEstudianteList;
