import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class EventoList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		listar();
	};
	render() {

        const {data,loader,eliminar} = this.props;
		return (
			<React.Fragment>
				<h1>Listar Eventos</h1>
                <a className="btn btn-success" href="#/evento/crear">
                    Crear Evento
                </a>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					//onPageChange={onPageChange}
					//onSortChange={onSortChange}
				>
					<TableHeaderColumn isKey dataField="titulo" dataSort>
						Titulo
					</TableHeaderColumn>	
					<TableHeaderColumn dataField="fecha" dataSort>
						Fecha
					</TableHeaderColumn>
					<TableHeaderColumn dataField="hora" dataSort>
						Hora
					</TableHeaderColumn>
					<TableHeaderColumn
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'evento', ver: 'evento', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default EventoList;
