import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import isEmpty from "../validation/is-empty";
import isAdmin from "../validation/isAdmin";
import {
    Bootstrap,
    Form,
    Row,
    Col,
    Button,
    FormGroup,
    FormControl,
    Table,
    DropdownButton,
    Dropdown
} from "react-bootstrap";
import "../Navbar1.css";
class Navbar1 extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const role = localStorage.getItem("role");
        const authLinks = (
            <ul className="navbar-nav ml-left">
                <li className="nav-item">
                    <Link className="nav-link" to="/taskSearch">
                        List
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#home">
                        Overview
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#home">
                        Archive
                    </Link>
                </li>
            </ul>
        );

        const loginLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Log In
                    </Link>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-left">
                <li className="nav-item">
                    <Link className="nav-link" to="/taskSearch">
                        List
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#home">
                        Overview
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#home">
                        Archive
                    </Link>
                </li>
            </ul>
        );
        return (
            <div
                class="container-fluid "
                style={{ padding: "0px 0px 0px 150px" }}
                id="outer"
            >
                <nav className="navbar navbar-expand-xl" style = {{ backgroundColor: "#a2abe8"}}>
                    <Link className="navbar-brand" to="/"></Link>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        {isAdmin(localStorage.getItem("role"))
                            ? authLinks
                            : !isEmpty(localStorage.getItem("role"))
                            ? guestLinks
                            : loginLinks}
                    </div>

                    <div style={{ padding: "0px " }}>
                        <ul className="navbar-nav ml-right">
                            <li className="nav-item">
                                <Link className="nav-link" to="/newtask">
                                    New Task
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/taskupdate">
                                    Task Update
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/statusupdate">
                                    Status Update
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/taskdelete">
                                    Task Delete
                                </Link>
                            </li>
                            {/* <DropdownButton id="dropdown-basic-button" title="Task CRUD">
            <Dropdown.Item href="/newtask"> New Task</Dropdown.Item>
            <Dropdown.Item href="/taskupdate">Task Update</Dropdown.Item>
            <Dropdown.Item href="/statusupdate">Status Update</Dropdown.Item>
            <Dropdown.Item href="/taskdelete">Task Delete</Dropdown.Item>
        </DropdownButton>*/}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(Navbar1));
