import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class AsignacionList extends Component {
	componentWillMount = () => {
		const { listar } = this.props;	
		listar();
	};
	//`${cell.nombre} ${cell.apellidos}`
	render() {
        const {data,loader,eliminar,onPageChange,onSortChange} = this.props;
		
		return (
			<React.Fragment>
				<h1>LISTA DE PROFESORES TITULARES DE CURSO</h1>
                <a className="btn btn-success" href="#/asignacion/crear">
                    Asignar Profesor 
                </a>
				<Grid
					hover
					striped
					data={data}
					loading={loader}
					
					onPageChange={onPageChange}
					onSortChange={onSortChange}
				>
					
					<TableHeaderColumn  dataField="ciclo_Escolar" dataSort dataFormat={(cell,row)=>{
						return cell.anio;
					}}>
						Ciclo Escolar
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="curso" dataSort dataFormat={(cell,row)=>{
						return cell.nombre_curso;
					}}>
						Curso 
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="seccion" dataSort dataFormat={(cell,row)=>{
						return cell.tipo_seccion;
					}}>
						Seccion
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="grado" dataSort dataFormat={(cell,row)=>{
						return cell.nombre_grado;
					}}>
						Grado  
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="profesor" dataSort dataFormat={(cell,row)=>{
						return `${cell.profile.nombre} ${cell.profile.apellidos}`;
					}}>
						Catedratico  
					</TableHeaderColumn>
					
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'asignacion', ver: 'asignacion', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default AsignacionList;