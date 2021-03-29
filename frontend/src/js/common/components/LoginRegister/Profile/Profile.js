import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderField, renderFilePicker} from '../../Utils/renderField/renderField';
import ProfileForm from "./ProfileForm";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {avatar: null};
    }

    setAvatar = (avatar) => {
        this.setState({avatar});
    };

    update = (data) => {
        const { update } = this.props;
        update({...data, avatar: null}, [{file: this.state.avatar, name: "avatar"}]);
    };

    render() {
        const { me } = this.props;
        const profile = me.profile;
       
    
        return (
            <ProfileForm
             onSubmit={this.update} 
             me={me} 
             initialValues={profile?
                 {
                 username:me.username,
                 nombre:me.profile.nombre,
                 apellidos:me.profile.apellidos,
                 phone:me.profile.phone,
                 gender:me.profile.gender,
                 address:me.profile.address
             }:{
                username:me.username
             }
            }
             setAvatar={this.setAvatar} />
        );
    }
}

export default reduxForm({
    form: 'profile', // a unique identifier for this form
})(Profile);
