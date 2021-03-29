import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class CursoList extends Component {
	componentWillMount = () => {
		console.log('PROPS Curso ',this.props)
		const { listar } = this.props;
		listar();
	};
	render() {
        const {data,loader,eliminar,onPageChange,onSortChange} = this.props;
		return (
			<React.Fragment>
				<h1>Lista de Cursos</h1>
                <a className="btn btn-success" href="#/curso/crear">
                    Crear Curso
                </a>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					onPageChange={onPageChange}
					onSortChange={onSortChange}
				>
					<TableHeaderColumn  dataField="nombre_curso" dataSort>
						Nombre Curso
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="descripcion" dataSort>
						Descripción 
					</TableHeaderColumn>
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'curso', ver: 'curso', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default CursoList;