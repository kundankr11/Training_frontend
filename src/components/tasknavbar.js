import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import isEmpty from "../validation/is-empty";
import isAdmin from "../validation/isAdmin";
import Image from "react-bootstrap/Image";
import {
  Bootstrap,
  Form,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  Table,
  Container
} from "react-bootstrap";

import "../task.css";

class taskBar extends Component {

  
  render() {
    console.log("AuthUSer", this.props.auth);
    return (
      <div class="sidebar">
        <div>
          <Container style = {{background: "#fff", width:"75%", marginTop:"0px", padding: "0px 0px", height:"100px"}}>
            <Row>
              <Col xs={6} md={4}>
              <label style = {{color: "#111", marginLeft: "20px", marginTop:"30px", fontWeight:"bold", fontSize:"20px", textTransform: "capitalize"}}> {this.props.cookies.get('Name').split(" ")[0]}</label>
                
              </Col>
             
            </Row>
          </Container>
        </div>
        <a >
          <Link className="nav-link" to="/dash" style = {{margin:"10px"}}>
            Dashboard
          </Link>
          <Link className="nav-link" to="/taskSearch" style = {{margin:"10px"}}>
            Task Menu
          </Link>
        </a>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  cookies: ownProps.cookies,
});

const taskbar = connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(taskBar));

export default taskbar;
