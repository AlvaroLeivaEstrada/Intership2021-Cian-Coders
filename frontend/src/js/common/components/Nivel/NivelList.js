import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
//import { eliminar } from '../../../redux/modules/empresa/empresa';
import Grid from '../Utils/Grid/';
import { standardActions } from '../Utils/Grid/StandardActions';

class NivelList extends Component {
	componentWillMount = () => {
		//console.log("PROPS NIVEL LIST",this.props)
		//console.log("state NIVEL LIST",this.state)
		const { listarNiveles } = this.props;
		listarNiveles();
	};
	render() {
		//console.log("Render Nivel List")
        const {niveles,loader,eliminarNivel} = this.props;
		return (
			<React.Fragment>
				<h1>Nivel Listar</h1>
                <a className="btn btn-success" href="#/nivel/crear">
                    Crear Nivel
                </a>
				<Grid
					hover
					striped
					data={niveles}
					loading={loader}
					//onPageChange={onPageChange}
					//onSortChange={onSortChange}
				>
					<TableHeaderColumn isKey dataField="nombre" dataSort>
						Nombre
					</TableHeaderColumn>	
					<TableHeaderColumn
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'nivel', ver: 'nivel', eliminar: eliminarNivel })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default NivelList;
