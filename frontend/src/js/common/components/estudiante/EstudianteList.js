import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class EstudianteList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		listar();
	};
	render() {
        const {data,loader,eliminar,onPageChange,onSortChange} = this.props;
		console.log('Estudiante',data)
		return (
			<React.Fragment>
				<h1>Lista de Estudiates</h1>
                <a className="btn btn-success" href="#/estudiante/crear">
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
					<TableHeaderColumn  dataField="perfil" dataSort dataFormat={(cell,row)=>{
						return `${cell.nombre} ${cell.apellidos}`;
					}}>
						Nombre Estudiante 
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="carnet" dataSort dataFormat={(cell,row)=>{
						return row.carnet;
					}}>
						No.Carnet  
					</TableHeaderColumn>

					<TableHeaderColumn  dataField="perfil" dataSort dataFormat={(cell,row)=>{
						return cell.phone;
					}}>
						No.Telefonico  
					</TableHeaderColumn>

					
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'estudiante', ver: 'estudiante', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default EstudianteList;