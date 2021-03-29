import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

class SideBarAdmin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut } = this.props;
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen?'':'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a  href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                <img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                    alt="Logo" />
                            </div>
                        </a>
                        <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/config" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/ciclos" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Ciclo Escolar</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/profesiones" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Registrar Profesiones</span>
                            </NavLink>
                        </li>
                       
                        <li className="nav-item">
                            <NavLink to="/catedraticos" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Registrar Catedratico</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/asignaciones" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Asignar Catedratico</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/estudiantes" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Registrar Estudiante</span>
                            </NavLink>
                        </li>
                       
                        <li className="nav-item">
                            <NavLink to="/secciones" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Registrar Seccion</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/cursos" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Registrar Curso</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/eventos" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Registrar Evento</span>
                            </NavLink>
                        </li>
                       
                 
                        <li className="nav-item">
                            <Link to="/login" onClick={logOut} className="nav-link">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBarAdmin;
