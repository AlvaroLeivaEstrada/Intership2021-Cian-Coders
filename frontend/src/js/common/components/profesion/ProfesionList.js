import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ProfesionList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		listar();
	};
	render() {
        const {data,loader,eliminar,onPageChange,onSortChange} = this.props;
		return (
			<React.Fragment>
				<h1>Lista de Profesiónes</h1>
                <a className="btn btn-success" href="#/profesion/crear">
                    Crear Profesión
                </a>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					
					onPageChange={onPageChange}
					onSortChange={onSortChange}
				>
					<TableHeaderColumn  dataField="nombre" dataSort>
						Nombre Profesión
					</TableHeaderColumn>
						
					
					<TableHeaderColumn  dataField="descripcion" dataSort>
						Descripción
					</TableHeaderColumn>	
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'profesion', ver: 'profesion', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default ProfesionList;