import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DeleteUser, resetErrors } from '../actions/authentication';
import classnames from 'classnames';
import {Bootstrap,Form, Row, Col, Button, FormGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';
import isEmpty from '../validation/is-empty';

 class search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_data: null,

    };
  }

  handleClick(event){
    const id = this.state.id_data;
    const user = {
      id: id,
    }
    console.log(id, "MY IDDDDDDDDD")
    this.props.DeleteUser(user);
  }


  handleSubmit = event => {
    event.preventDefault();
     this.setState(
    {
        body: this.props.result
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value
    });
  }

 
  render() {

      return (
      <div className="UserDelete" style = {{padding: "100px 600px 0px 600px"}}>
      <form onSubmit = { this.handleSubmit }>
      <FormGroup controlId = "id_data">
      <div style = {{marginBottom: "5px",color: "#053787",
                        fontWeight: "bold"}} >USER ID</div>
      <FormControl 
      type = "number"
      placeholder = "Enter UserID"
      value = {this.state.id_data}
      onChange = { this.handleChange}
      />
      </FormGroup>
     <div class="col5 text-center">
      <Button
      style = {{marginLeft: "150px",marginTop:"5px", backgroundColor: "#053787", borderColor: "#053787"}}
      type = "submit"
      onClick={(event) => this.handleClick(event)}
      >
      DELETE USER
      </Button>
      </div>
      </form>
      <div>
      <h5 style={{ color: 'blue' }}> {this.props.deleteInfo}</h5>
      <h5 style={{ color: 'red' }}> {this.props.errors}</h5>
      </div>
      </div>
      );
  }
}


const mapStateToProps = state => ({
   deleteInfo: state.deleteInfo,
   errors: state.errors
});

export default connect(mapStateToProps,{ DeleteUser, resetErrors})(search)