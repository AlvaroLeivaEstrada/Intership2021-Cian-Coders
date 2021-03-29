import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class CicloList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		listar();
	};
	render() {
	
        const {data,loader,eliminar} = this.props;
		return (
			<React.Fragment>
				<h1>Ciclo Listar</h1>
                <a className="btn btn-success" href="#/ciclo/crear">
                    Crear Ciclo
                </a>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					//onPageChange={onPageChange}
					//onSortChange={onSortChange}
				>
					<TableHeaderColumn isKey dataField="anio" dataSort>
						Año del Ciclo escolar
					</TableHeaderColumn>	
					<TableHeaderColumn
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'ciclo', ver: 'ciclo', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default CicloList;
