import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser, resetErrors } from "../actions/authentication";
import "../nRegister.css";

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

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirm: "",
            errors: {},
            err: "",
            formErrors: {
                name: "",
                email: "",
                password: ""
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
        if (
            formValid(this.state) &&
            this.state.password === this.state.password_confirm
        ) {
            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirm: this.state.password_confirm
            };
            this.props.registerUser(user, this.props.history);
        } else {
            this.setState({
                err: "Please confirm your password correctly"
            });
        }
    }

    render() {
        const { formErrors } = this.state;
        console.log(this.props.errors);
        return (
            <div
                className="container"
                style={{ marginTop: "100px", width: "850px", height: "400px" }}
            >
                <h1 style={{ marginBottom: "40px" }}>REGISTRATION</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            className={
                                formErrors.name.length > 0 ? "error" : null
                            }
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {formErrors.name.length > 0 && (
                            <span className="errorMessage">
                                {formErrors.name}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className={
                                formErrors.email.length > 0 ? "error" : null
                            }
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
                                formErrors.password.length > 0 ? "error" : null
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password_confirm"
                            onChange={this.handleInputChange}
                            value={this.state.password_confirm}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register User
                        </button>
                    </div>
                </form>
                <div>
                    <h6 style={{ color: "red" }}>
                        {this.props.errors}
                        {this.state.err}{" "}
                    </h6>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser, resetErrors }
)(Register);
