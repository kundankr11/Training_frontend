import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import isEmpty from "../validation/is-empty";
import isAdmin from "../validation/isAdmin";
import Image from "react-bootstrap/Image";
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NewTaskbar from '../components/newtaskbar'

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
          <Container style = {{ width:"75%", marginTop:"0px", padding: "0px 0px", height:"100px"}}>
            <Row>
              <Col xs={6} md={4}>
             {/* <label style = {{color: "#111", marginLeft: "20px", marginTop:"30px", fontWeight:"bold", fontSize:"20px", textTransform: "capitalize"}}> {this.props.cookies.get('Name').split(" ")[0]}</label>*/}
             <Avatar style = {{color: '#fff', backgroundColor: deepPurple[300], width: "100px", height: "100px",fontWeight:"bold", fontSize:"20px", textTransform: "capitalize"}} >{this.props.cookies.get('Name').split(" ")[0]}</Avatar>
                
              </Col>
             
            </Row>
          </Container>
        </div>
        <a >
        <div className = "dash">
          <Link className="nav-link" to="/dash" >
            Dashboard
          </Link>
          </div>
          <div className = "taskSearch">
          <Link className="nav-link"  to="/taskSearch" >
            Task Menu
          </Link>
          </div>
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
