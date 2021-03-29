import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './acciones.css';
import Swal from 'sweetalert2';

class Acciones extends Component {
	constructor(props) {
		super(props);
	}

	eliminar = (id) => {
		return () => {
			Swal.fire({
				title: '¿Eliminar?',
				text: '¡No podrá revertir esta acción!',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: '¡Sí, eliminar!',
				cancelButtonText: 'No, cancelar',
				reverseButtons: true
			}).then((result) => {
				if (result.value) {
					this.props.eliminar(id);
				}
			});
		};
	};

	render() {
		const {
			id,
			ver,
			editar,
			eliminar,
			tareas,
			crearTarea,
			material,
			crearMaterial,
			calificar,
			editarPortada,
			img,
			asignar,
			listaAsigEstud,
			subir
		} = this.props;

		return (
			<div className="d-flex justify-content-center">
				{ver !== undefined && (
					<Link to={`${ver}/${id}/`} className="px-2">
						<i className="material-icons">remove_red_eye</i>
					</Link>
				)}
				{tareas !== undefined && (
					<Link to={`${tareas}/` + `?id=${id}`} >
						<i className="material-icons">view_list</i>
					</Link>
				)}
				{crearTarea !== undefined && (
					<Link to={`${crearTarea}/crear/${id}/`} >
						<i className="material-icons">add_box</i>
					</Link>
				)}
				{calificar !== undefined && (
					<Link to={`${calificar}/${id}`} >
						<i className="material-icons">fact_check</i>
					</Link>
				)}
				{subir !== undefined && (
					<Link to={`${subir}/crear/${id}`} >
						<i className="material-icons">file_upload</i>
					</Link>
				)}
				{editarPortada !== undefined && (
					<Link className="text-warning" to={`${editarPortada}/${id}/editar`}>
						<img className="user-avatar " width="50" height="50" src={img ? img : null} />
					</Link>
				)}

				{editar !== undefined && (
					<Link className="text-warning" to={`${editar}/${id}/editar`}>
						<i className="material-icons">update</i>
					</Link>
				)}
				{eliminar !== undefined && (
					<a className="px-2" style={{ cursor: 'pointer', color: '#c4183c' }} onClick={this.eliminar(id)}>
						<i className="material-icons">delete</i>
					</a>
				)}
				{material !== undefined && (
					<Link to={`${material}/` + `?id=${id}`} className="px-2">
						<i className="material-icons">view_list</i>
					</Link>
				)}
				{crearMaterial !== undefined && (
					<Link to={`${crearMaterial}/crear/${id}`} className="px-2">
						<i className="material-icons">add_box</i>
					</Link>
				)}
				{asignar !== undefined && (
					<Link to={`${asignar}/crear/${id}`} className="px-2">
						<i className="material-icons">
							🧑‍🎓
						</i>
					</Link>
				)}
				{listaAsigEstud !== undefined &&(
					<Link to={`${listaAsigEstud}/${id}`} className="px-2">
						<i className="material-icons">view_list</i>
					</Link>)}
			</div>
		);
	}
}
Acciones.propTypes = {};

export function standardActions(acciones) {
	return (cell, row) => {
		return <Acciones id={cell} img={row.imagen_portada} {...acciones} />;
	};
}
