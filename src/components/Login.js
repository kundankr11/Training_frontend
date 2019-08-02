import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser, resetErrors } from "../actions/authentication";
import { NavLink } from "react-router-dom";
import ScriptTag from 'react-script-tag';
import "../login.css";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const re = RegExp(
    /^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[0-9])(?=\S*[\W])\S*$/
);
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {},
            err: "",
            formErrors: {
                email: "",
                password: "",
                conf: ""
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password = re.test(value)
                    ? ""
                    : "Minimum 8 characters required with atleast 1 lower case 1 upper case 1 numeric and 1 special character";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () =>
            console.log(this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        if (formValid(this.state)) {
            const user = {
                email: this.state.email,
                password: this.state.password
            };
            this.props.loginUser(user, this.props.history, this.props.cookies);
        } else {
            this.setState({
                err: "Please Enter correct Login details"
            });
        }
    }

    render() {
        const errors = this.props.errors;
        console.log("Errroes", errors);
        const { formErrors } = this.state;
        this.props.resetErrors();
        return (

            <body className="Body">
                <div className="container">
                    <h1 style={{ marginBottom: "40px" }}>LOGIN</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                className={
                                    formErrors.email.length > 0 ? "error" : null
                                }
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">
                                    {formErrors.email}
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                className={
                                    formErrors.password.length > 0
                                        ? "error"
                                        : null
                                }
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">
                                    {formErrors.password}
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="form-group">
                        <NavLink to="/emailreset">
                            {" "}
                            <h6>Can't remember your password?</h6>
                        </NavLink>
                    </div>
                    <div>
                        <h6 style={{ color: "white" }}>
                            {errors}
                            {this.state.err}
                        </h6>
                    </div>
                </div>
            </body>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    errors: state.errors,
    auth: state.auth,
    cookies: ownProps.cookies,
});

export default Login = connect(
    mapStateToProps,
    { loginUser, resetErrors }
)(withRouter(Login));

