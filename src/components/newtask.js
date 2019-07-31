import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import Taskbar from "../components/tasknavbar";
import search from "../components/search";
import classnames from "classnames";
import axios from "axios";
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
	Table
} from "react-bootstrap";
import {
	Search,
	paginatePageReset,
	paginatePageNext,
	paginatePagePrev,
	resetErrors
} from "../actions/authentication";
import { addTask } from "../actions/taskactions";

class newtask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			name: null,
			title: null,
			taskdesc: null,
			duedate: null,
			assignee: null,
			page: 1,
			id: null,
			showme: isAdmin(localStorage.getItem("role")) ? false : true
		};
		const user = {
			email: this.state.email,
			name: this.state.name
		};
		this.props.Search(user);
	}

	handleClick = event => {
		event.preventDefault();
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
					page: this.state.page
				};

				this.props.Search(user);
				this.props.paginatePageReset(pageData);
			}
		);

		console.log(this.state.taskdesc);
	};

	handleSubmit(event) {
		event.preventDefault();
		const task = {
			taskTitle: this.state.title,
			taskDes: this.state.taskdesc,
			dueDate: this.state.duedate,
			assignee: this.state.assignee
		};

		this.props.addTask(task);
	}

	handleClick3(event) {
		event.preventDefault();

		console.log("safjhsdjfc AEYyyyyyyy", this.state.assignee);
		const task = {
			taskTitle: this.state.title,
			taskDes: this.state.taskdesc,
			dueDate: this.state.duedate,
			assignee: this.state.assignee
		};

		this.props.addTask(task);
	}
	handleClick1(event, event1) {
		this.setState(
			{
				assignee: event1,
				showme: true
			},

			() => {
				const pageData = {
					curr_page: this.props.paginationPage,
					max_page: this.props.resultInfo.last_page
				};
				const user = {
					email: event,
					name: this.state.name,
					page: this.state.page
				};
				this.props.Search(user);
				console.log("A row has been clicked", event1);
			}
		);
	}

	handleClick2(event) {
		console.log(event);
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
					page: this.state.page
				};

				this.props.Search(user);
				this.props.paginatePageReset(pageData);
			}
		);
	};

	render() {
		const filter = this.props.result;
		console.log("These are authentication details", this.props.auth);
		return (
			<div>
				<Navbar1 />
				<Taskbar cookies = {this.props.cookies} />
				<div style={{ padding: "0px 250px 0px 450px" }}>
					<div className="UserListing">
						{isAdmin(localStorage.getItem("role")) ? (
							<div
								class="col text-center"
								style={{ padding: "0px 90px 0px 90px" }}
							>
								<Form onSubmit={this.handleSubmit}>
									<Form.Row style={{ marginTop: "10px" }}>
										<Form.Group as={Col} controlId="name">
											<label
												style={{
													color: "#053787",
													fontWeight: "bold"
												}}
											>
												Name
											</label>
											<FormControl
												type="text"
												value={this.state.name}
												onChange={this.handleChange}
											/>
										</Form.Group>
									</Form.Row>
								</Form>
							</div>
						) : null}

						{isAdmin(localStorage.getItem("role")) ? (
							<div
								class="container1 text-center"
								style={{ backgroundColor: "#fff" }}
							>
								<Table
									clas
									striped
									bordered
									hover
									size="lg"
									variant="dark"
									style={{
										marginLeft: "76x",
										position: "relative",
										width: "70%",
										marginRight: "400px",
										marginLeft: "110px",
										marginTop: "20px",
										backgroundColor: "#053787"
									}}
								>
									<thead>
										<tr></tr>
									</thead>
									{filter.map((detail, index) => {
										return (
											<tr
												value={detail.email}
												onClick={() =>
													this.handleClick1(
														detail.email,
														detail.id
													)
												}
											>
												<td>{detail.name}</td>
												<td>{detail.email}</td>
												{!this.state.showme ? (
													<td>
														<Button
															type="submit"
															onClick={event =>
																this.handleClick1(
																	detail.id
																)
															}
														>
															Select
														</Button>
													</td>
												) : null}
											</tr>
										);
									})}
								</Table>
								<h6 style={{ color: "blue" }}>
									{this.props.errors}
								</h6>
							</div>
						) : null}
						{isAdmin(localStorage.getItem("role"))? (
							<div style={{ padding: "0px 329px" }}>
								<Button
									style={{
										backgroundColor: " #053787",
										borderColor: " #053787",
										padding: "5px 20px"
									}}
									type="submit"
									onClick={event => this.handleClick(event)}
								>
									Search
								</Button>
							</div>
						) : null}

						<div
							class="col4 text-center"
							style={{ padding: "0px" }}
						>
							{isAdmin(localStorage.getItem("role")) ? (
								<Button
									style={{
										marginTop: "10px",
										marginRight: "10px",
										padding: "6px 16px",
										backgroundColor: "#053787",
										borderColor: " #053787"
									}}
									type="submit"
									onClick={event => this.handlePrev(event)}
								>
									Prev
								</Button>
							) : null}
							{isAdmin(localStorage.getItem("role")) ? (
								<Button
									style={{
										marginTop: "10px",
										marginLeft: "10px",
										padding: "6px 16px",
										backgroundColor: "#053787",
										borderColor: " #053787"
									}}
									type="submit"
									onClick={event => this.handleNext(event)}
								>
									Next
								</Button>
							) : null}
							{this.state.showme ? (
								<div>
									<Form.Group
										controlId="title"
										style={{ marginTop: "20px" }}
									>
										<Form.Label
											style={{
												color: "#053787",
												fontWeight: "bold"
											}}
										>
											Task Title
										</Form.Label>
										<Form.Control
											type="text"
											placeholder="TITLE"
											value={this.state.title}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<Form.Group
										controlId="taskdesc"
										placeholder="Enter Description Here"
									>
										<Form.Label
											style={{
												color: "#053787",
												fontWeight: "bold"
											}}
										>
											Task Description
										</Form.Label>
										<Form.Control
											as="textarea"
											rows="3"
											value={this.state.taskdesc}
											onChange={this.handleChange}
										/>
									</Form.Group>

									<div
										style={{
											padding: "0px 250px 0px 250px"
										}}
									>
										<Form.Group controlId="duedate">
											<Form.Label
												style={{
													color: "#053787",
													fontWeight: "bold"
												}}
											>
												Due Date
											</Form.Label>
											<Form.Control
												type="date"
												placeholder="YYYY/MM/DD"
												value={this.state.duedate}
												onChange={this.handleChange}
											/>
										</Form.Group>
									</div>

									<div>
										<Button
											type="submit"
											style={{
												backgroundColor: "#053787",
												borderColor: "#053787"
											}}
											onClick={event =>
												this.handleClick3(event)
											}
										>
											Add Task
										</Button>
									</div>
								</div>
							) : null}
						</div>
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
	{
		Search,
		paginatePageReset,
		paginatePageNext,
		paginatePagePrev,
		resetErrors,
		addTask
	}
)(newtask);
