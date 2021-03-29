import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class CatedraticoList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		
		listar();
	};
	render() {
        const {data,loader,eliminar,onPageChange,onSortChange} = this.props;
		console.log('CatedraticoList ',data)
		return (
			<React.Fragment>
				<h1>Lista de Catedraticos</h1>
                <a className="btn btn-success" href="#/catedratico/crear">
                    Crear Catedratico
                </a>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					
					onPageChange={onPageChange}
					onSortChange={onSortChange}
				>
					<TableHeaderColumn  dataField="profile" dataSort dataFormat={(cell,row)=>{
						return `${cell.nombre} ${cell.apellidos}`;
					}}>
						Nombre Catedratico 
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="profesion" dataSort dataFormat={(cell,row)=>{
						return cell.nombre;
					}}>
						Titulo 
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="profile" dataSort dataFormat={(cell,row)=>{
						return cell.phone;
					}}>
						No.Telefonico  
					</TableHeaderColumn>
					
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'catedratico', ver: 'catedratico', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default CatedraticoList;