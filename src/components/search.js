import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Search,
  paginatePageReset,
  paginatePageNext,
  paginatePagePrev,
  resetErrors
} from "../actions/authentication";
import classnames from "classnames";
import {
  Bootstrap,
  Form,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  Table
} from "react-bootstrap";
import axios from "axios";
import isEmpty from "../validation/is-empty";
import Taskbar from '../components/tasknavbar';
import "../search.css";

class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      name: null,
      created_by: null,
      role: null,
      body: [],
      page: 1
    };
    const user = {
      email: this.state.email,
      name: this.state.name,
      created_by: this.state.created_by,
      role: this.state.role
    };
    this.props.Search(user);
  }

  handleClick = event=> {
    const user = {
      email: this.state.email,
      name: this.state.name,
      created_by: this.state.created_by,
      role: this.state.role,
      page: this.state.page
    };
    const pageData = {
      curr_page: this.props.paginationPage,
      max_page: this.props.resultInfo.last_page
    };

    this.props.Search(user);
    this.props.paginatePageReset(pageData);
  }

  handleClick1 = event => {
    console.log("A row has been clicked", event);
    const user = {
      email: event,
      name: this.state.name,
      created_by: this.state.created_by,
      role: this.state.role,
      page: this.state.page
    };
    this.props.Search(user);
  }

  handleNext = event => {
    const pageData = {
      curr_page: this.props.paginationPage,
      max_page: this.props.resultInfo.last_page
    };
    this.props.paginatePageNext(pageData);
    const user = {
      email: this.state.email,
      name: this.state.name,
      created_by: this.state.created_by,
      role: this.state.role,
      page: this.props.paginationPage + 1
    };
    if (this.props.resultInfo.last_page !== 1) {
      this.props.Search(user);
    }
  };

  handlePrev = event => {
    const pageData = {
      curr_page: this.props.paginationPage,
      max_page: this.props.resultInfo.last_page
    };
    this.props.paginatePagePrev(pageData);
    const user = {
      email: this.state.email,
      name: this.state.name,
      created_by: this.state.created_by,
      role: this.state.role,
      page: this.props.paginationPage
    };
    this.props.Search(user);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      body: this.props.result
    });
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.id]: event.target.value
      },

      () => {
        const pageData = {
          curr_page: this.props.paginationPage,
          max_page: this.props.resultInfo.last_page
        };
        const user = {
          email: this.state.email,
          name: this.state.name,
          created_by: this.state.created_by,
          role: this.state.role,
          page: this.state.page
        };

        this.props.Search(user);
        this.props.paginatePageReset(pageData);
        console.log("I am Here", this.props.paginationPage);
      }
    );
  };

  // componentDidMount(){
  //   if(isEmpty(localStorage.getItem("jwtToken")))
  //   {
  //     this.props.history.push('/login');
  //   }
  // }
  // componentDidMount(){
  //   const user= {
  //     email: this.state.email,
  //     name: this.state.name,
  //     created_by: this.state.created_by,
  //     role: this.state.role,
  //     page: this.props.paginationPage+1,
  //   }
  //   this.props.Search(user);
  // }

  render() {
    const filter = this.props.result;
    this.props.resetErrors();
    return (

      <div className="UserListing">
        <div class="col text-center" style={{ padding: "0px 0px 0px 0px" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="email">
                <label>Email</label>
                <FormControl
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="name">
                <label>Name</label>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="created_by">
                <label>CreatedBy</label>
                <FormControl
                  type="text"
                  value={this.state.created_by}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="role">
                <label>Role</label>
                <FormControl
                  as="select"
                  type="number"
                  placeholder="Enter Role you want to look for"
                  value={this.state.role}
                  onChange={this.handleChange}
                >
                  <option value="0">Select</option>
                  <option value="0"> 0 for Normal </option>
                  <option value="1"> 1 for Admin </option>
                </FormControl>
              </Form.Group>
            </Form.Row>
          </Form>
        </div>

        <div className = "table" style = {{padding:"0px 100px 0px 100px"}}>
          <Table striped bordered hover size="lg" variant="dark" >
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Created By</td>
                <td>Deleted By</td>
              </tr>
            </thead>
            {filter.map((detail, index) => {
              return (
                <tbody>
                  <tr>
                    <td
                      value={detail.name}
                      onClick={() => this.handleClick2(detail.name)}
                    >
                      {detail.name}
                    </td>
                    <td>{detail.email}</td>
                    <td>{detail.role}</td>
                    <td>{detail.created_by}</td>
                    <td>{detail.deleted_by}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <h6 style={{ color: "blue" }}>{this.props.errors}</h6>
        </div>
        <div class="col text-center" >
          <Button type="submit" onClick={event => this.handleClick(event)}>
            Search
          </Button>
        </div>

        <div>
          <div class="col1 text-center">
            <Button type="submit" onClick={event => this.handlePrev(event)}>
              Prev
            </Button>

            <Button type="submit" onClick={event => this.handleNext(event)}>
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  result: state.result,
  auth: state.auth,
  resultInfo: state.resultInfo,
  paginationPage: state.paginationPage
});

export default connect(
  mapStateToProps,
  { Search, paginatePageReset, paginatePageNext, paginatePagePrev, resetErrors }
)(search);
