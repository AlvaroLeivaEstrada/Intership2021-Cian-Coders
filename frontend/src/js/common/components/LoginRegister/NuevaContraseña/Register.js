import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoadMask from "../../Utils/LoadMask/LoadMask";

class Registro extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    componentWillMount=()=>{
        const {setIdUser,match} = this.props;
        setIdUser(match.params.id)
    }

    render() {
        const { registerNewPassword,loader } = this.props;

        if (localStorage.getItem('token')) {
            return (<Redirect to="/" />);
        }
        return (
            <div className="blue-gradient-bg">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center">Bienvenido a CianStarter</h1>
                    <p>Ingrese nueva contraseña</p>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <LoadMask loading={loader} light>
                            <RegisterForm onSubmit={registerNewPassword} />
                        </LoadMask>
                    </div>
                </div>
            </div>
        );

    }
}

export default Registro;
