import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendEmail, resetErrors } from '../actions/authentication';
import { NavLink } from "react-router-dom";
import "../nRegister.css";
const emailRegex = RegExp( /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
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
class emailReset extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
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
      }

      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }

    handleSubmit(e) {
        e.preventDefault();


            const user ={
            email: this.state.email,
          }  

        this.props.sendEmail(user, this.props.history);
      }
    render() {
        
     
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
                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                </div>
            </form>
            <div><h6 style={{ color: 'red' }}>{this.props.errors}{console.log(this.props.errors, "saf errorssss dsf")} {this.state.conf} sajfndskjfoksdogfids</h6></div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors,
})

export  default connect(mapStateToProps, { sendEmail, resetErrors })(emailReset)