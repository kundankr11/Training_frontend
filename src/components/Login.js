import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser, resetErrors } from "../actions/authentication";
import { NavLink } from "react-router-dom";
import ScriptTag from 'react-script-tag';
import "../login.css";
import ReduxFormLogin from '../components/LoginReduxForm';
import jwt_decode from "jwt-decode";
import Pusher from "pusher-js";

class Login extends Component {
    constructor() {
        super();
  
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
           return this.props.loginUser(this.props.form.MaterialUiForm.values, this.props.history, this.props.cookies);
       
    }

    render() {
        this.props.resetErrors();
        console.log(this.props, "Props");
        return (

            <body className="Body">
                <div >
                <ReduxFormLogin onSubmit = {this.handleSubmit}/>
                    </div>
            </body>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    errors: state.errors,
    auth: state.auth,
    cookies: ownProps.cookies,
    notification: state.notification,
    form: state.form,
});

export default Login = connect(
    mapStateToProps,
    { loginUser, resetErrors }
)(withRouter(Login));

