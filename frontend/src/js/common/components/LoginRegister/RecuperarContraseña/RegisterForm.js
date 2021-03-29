import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';


const RegisterForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="first_name">Correo Electronico</label>
                <Field name="email" label="Nombre" component={renderField} type="text" className="form-control" />
            </div>
        
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Restablecer</button>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'register', // a unique identifier for this form
})(RegisterForm);
