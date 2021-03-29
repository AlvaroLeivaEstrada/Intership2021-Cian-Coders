import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid/';
import { standardActions } from '../Utils/Grid/StandardActions';

class SeccionList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		listar();
	};
	render() {
        const {data,loader,eliminar} = this.props;
		return (
			<React.Fragment>
				<h1>Lista de Secciones</h1>
                <a className="btn btn-success" href="#/seccion/crear">
                    Crear Seccion
                </a>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					
					//onPageChange={onPageChange}
					//onSortChange={onSortChange}
				>
					<TableHeaderColumn  dataField="tipo_seccion" dataSort>
						Nombre Seccion
					</TableHeaderColumn>
						
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'seccion', ver: 'seccion', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default SeccionList;