import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class TareaEstudianteList extends Component {
	componentWillMount = () => {
		const { listar,match } = this.props;
		const id = match.params.id
		listar(id);
	};
	render() {
        const {tareasEntregadas,loader,eliminar,onPageChange,onSortChange} = this.props;
		
		return (
			<React.Fragment>
				<h1>LISTADO DE TAREAS</h1>
               
				<Grid
					hover
					striped
					data={tareasEntregadas}
					loading={loader}
					
					onPageChange={onPageChange}
					onSortChange={onSortChange}
				>
					
					<TableHeaderColumn  dataField="estudiante" dataSort dataFormat={(cell,row)=>{
						return cell.nombre + ' '+ cell.apellidos
					}}>
						Estudiante
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="texto" dataSort>
						Descripcion  
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="fecha" dataSort >
						Fecha de Entrega 
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="tarea" dataSort dataFormat={(cell,row)=>{
						return cell.nombre
					}} >
						Tarea
					</TableHeaderColumn>
					
					
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({
							 editar: 'tareaEstudiante'})}
					>
						Calificar Tarea
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default TareaEstudianteList;