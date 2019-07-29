import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgetUser, resetErrors } from '../actions/authentication';
import { NavLink } from "react-router-dom";
import "../nRegister.css";
const emailRegex = RegExp( /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const re = RegExp(/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[0-9])(?=\S*[\W])\S*$/);
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
class Forget extends Component {

    constructor() {
        super();
         const urltoken = window.location.href.split('=')[1];
        console.log("My Location In react", urltoken);
        this.state = {
            email: "",
            password: "",
            confirmPassword:"",
            token:urltoken,
            conf:"",
            formErrors: {
                email: "",
                password: ""
            }
        }
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
          case "email":
          formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
          break;
          case "password":
          formErrors.password = re.test(value) ? "" : "Minimum 8 characters required with atleast 1 lower case 1 upper case 1 numeric and 1 special character";
          break;
          default:
          break;
      }

      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }

    handleSubmit(e) {
        e.preventDefault();

        if (formValid(this.state) && (this.state.password === this.state.confirmPassword )){
            const user = {
            email: this.state.email,
            password: this.state.password,
            token : this.state.token,
        }
        this.props.forgetUser(user, this.props.history);
        }
        else{
            this.setState({
                conf: "Please Confirm your Password"
            })
        }

    }

    render() {
        console.log("My Location In react", window.location.href);
        
     
        const {errors} = this.state;
        const { formErrors } = this.state;
        this.props.resetErrors();
        return(
        <div className="container" style={{ marginTop: '100px', width: '840px'}}>
            <h1 style={{marginBottom: '40px'}}>PASSWORD RESET</h1>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    className={formErrors.email.length > 0 ? "error" : null}
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                    )}
                </div>
                <div className="form-group">
                    <input
                    className={formErrors.password.length > 0 ? "error" : null}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                    )}
                </div>
                 <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={ this.handleInputChange }
                    value={ this.state.confirmPassword }
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                </div>
            </form>
            <div><h6 style={{ color: 'red' }}>{this.props.errors} {this.state.conf}</h6></div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors,
})

export  default connect(mapStateToProps, { forgetUser, resetErrors })(Forget)