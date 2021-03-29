import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
//import { eliminar } from '../../../redux/modules/empresa/empresa';
import Grid from '../Utils/Grid/';
import { standardActions } from '../Utils/Grid/StandardActions';

class EmpresaList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		console.log('Algo',this.props)
		listar();
	};
	render() {
        console.log('PROPS en empresa list', this.props);
        const {data,loader,eliminar} = this.props;
		return (
			<React.Fragment>
				<h1>Empresa Listar</h1>
                <a className="btn btn-success" href="#/empresa/crear">
                    Crear Empresa
                </a>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					//onPageChange={onPageChange}
					//onSortChange={onSortChange}
				>
					<TableHeaderColumn isKey dataField="nombre" dataSort>
						Nombre
					</TableHeaderColumn>
					<TableHeaderColumn dataField="direccion" dataSort>
						Direccion
					</TableHeaderColumn>
					
					<TableHeaderColumn
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'empresa', ver: 'empresa', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default EmpresaList;
