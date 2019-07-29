import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { UpdateUser, resetErrors } from '../actions/authentication';
import classnames from 'classnames';
import {Bootstrap,Form, Row, Col, Button, FormGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';
import isEmpty from '../validation/is-empty';


 class Update extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_data: null
    };
   
  }

  handleClick(event){
    const id = this.state.id_data;
    const user = {
      id: id,
    }
    this.props.UpdateUser(user);
  }


  handleSubmit = event => {
    event.preventDefault();
  }

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value
    });
  }

 
  render() {

          return (
      <div className="UserUpdate" style = {{padding: "100px 600px 0px 600px"}}>
      <form onSubmit = { this.handleSubmit }>
      <FormGroup controlId = "id_data">
      <label style = {{marginBottom: "5px",color: "#053787",
                        fontWeight: "bold"}}>USER ID</label>
      <FormControl 
      type = "number"
      placeholder = "Enter UserID"
      value = {this.state.id_data}
      onChange = { this.handleChange}
      />
      </FormGroup>
     <div className = 'text-center'>
      <Button
       style = {{backgroundColor: "#053787", borderColor: "#053787"}}
      type = "submit"
      onClick={(event) => this.handleClick(event)}
      >
      UPDATE USER
      </Button>
      </div>
      <div>
        
      </div>
      </form>

      <div style={{ color: 'red' }}>{this.props.errors}</div>
      <div style={{ color: 'blue' }}>{this.props.updateInfo}</div>
      </div>
      );
  }
}


const mapStateToProps = state => ({
   updateInfo: state.deleteInfo,
   errors: state.errors,
});

export default connect(mapStateToProps,{ UpdateUser, resetErrors})(Update)