import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import Taskbar from "../components/tasknavbar";
import { taskSearch } from "../actions/taskactions";
import classnames from "classnames";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";
import "../taskSearch.css";
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
import axios from "axios";
import isEmpty from "../validation/is-empty";

class tasklist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskTitle: null,
			taskDes: null,
			assignee: null,
			assigner: null,
			status: null,
			dueDate: null,
			beforedate: null,
			page: 1
		};
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			assignee: this.state.assignee,
			assigner: this.state.assigner,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate
		};
		this.props.taskSearch(task);
	}

	handleClick = event => {
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			assignee: this.state.assignee,
			assigner: this.state.assigner,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			page: this.state.page
		};
		const pageData = {
			curr_page: this.props.paginationPage,
			max_page: this.props.resultInfo.last_page
		};
		this.props.paginatePageReset(pageData);
		this.props.taskSearch(task);
	}

	handleClick1 = event => {
		console.log("A row has been clicked", event);
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			assignee: this.state.assignee,
			assigner: this.state.assigner,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			page: this.state.page,
			page: this.props.paginationPage
		};
		this.props.taskSearch(task);
	}

	handleClick2(event) {
		console.log(event);
	}

	handleNext = event => {
		const pageData = {
			curr_page: this.props.paginationPage,
			max_page: this.props.resultInfo.last_page
		};

		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			assignee: this.state.assignee,
			assigner: this.state.assigner,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			page: this.props.paginationPage + 1
		};
		this.props.paginatePageNext(pageData);
		if (this.props.resultInfo.last_page !== 1) {
			this.props.taskSearch(task);
		}
	};

	handlePrev = event => {
		const pageData = {
			curr_page: this.props.paginationPage,
			max_page: this.props.resultInfo.last_page
		};

		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			assignee: this.state.assignee,
			assigner: this.state.assigner,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			page: this.props.paginationPage
		};
		this.props.paginatePagePrev(pageData);
		this.props.taskSearch(task);
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
				const task = {
					taskTitle: this.state.taskTitle,
					taskDes: this.state.taskDes,
					assignee: this.state.assignee,
					assigner: this.state.assigner,
					status: this.state.status,
					dueDate: this.state.dueDate,
					beforedate: this.state.beforedate,
					page: this.state.page
				};

				this.props.paginatePageReset(pageData);
				this.props.taskSearch(task);
			}
		);
	};
	render() {
		const filter = this.props.result.fetched_data;
		console.log("New Reducers", this.props.result);
		return (
			<div>
				<Navbar1 />
				<Taskbar data={filter} cookies={this.props.cookies} />
				{/*			<h1> Task Search</h1>*/}

				<div className="UserListing">
					<div class="col5 text-center">
						<Form onSubmit={this.handleSubmit}>
							{console.log(
								"Pagination",
								this.props.paginationPage
							)}
							{this.props.result.dataloading ? <Dots /> : null}
							<Form.Row
								className="inputForm"
								style={{
									marginRight: "-100px",
									marginLeft: "50px",
									marginTop: "0px"
								}}
							>
								<Form.Group as={Col} controlId="taskTitle">
									<label
										style={{
											color: "#053787",
											fontWeight: "bold"
										}}
									>
										Task Title
									</label>
									<FormControl
										type="text"
										value={this.state.taskTitle}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="taskDes">
									<label
										style={{
											color: "#053787",
											fontWeight: "bold"
										}}
									>
										Task Description
									</label>
									<FormControl
										type="text"
										value={this.state.taskDes}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="assigner">
									<label
										style={{
											color: "#053787",
											fontWeight: "bold"
										}}
									>
										Creator
									</label>
									<FormControl
										type="text"
										value={this.state.assigner}
										onChange={this.handleChange}
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="assignee">
									<label
										style={{
											color: "#053787",
											fontWeight: "bold"
										}}
									>
										Assignee
									</label>
									<FormControl
										type="text"
										value={this.state.assignee}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="status">
									<label
										style={{
											color: "#053787",
											fontWeight: "bold"
										}}
									>
										Status
									</label>
									<FormControl
										as="select"
										type="text"
										value={this.state.status}
										onChange={this.handleChange}
									>
										<option
											value=""
											style={{
												color: "#053787",
												fontWeight: "bold"
											}}
										>
											{" "}
											Status{" "}
										</option>
										<option value="deleted">
											{" "}
											Deleted{" "}
										</option>
										<option value="assigned">
											{" "}
											Assigned{" "}
										</option>
										<option value="in-progress">
											{" "}
											In-Progress{" "}
										</option>
										<option value="completed">
											{" "}
											Completed{" "}
										</option>
									</FormControl>
								</Form.Group>
								<Form.Group as={Col} controlId="dueDate">
									<label
										style={{
											color: "#053787",
											fontWeight: "bold"
										}}
									>
										Overdue
									</label>
									<FormControl
										type="date"
										value={this.state.dueDate}
										onChange={this.handleChange}
									/>
								</Form.Group>
								{/*<Form.Group as={Col} controlId="beforeDate">
									<label style = {{color: "#053787",
												fontWeight: "bold"}}>Before Due Date</label>
									<FormControl
										type="date"
										value={this.state.beforedate}
										onChange={this.handleChange}
									/>
								</Form.Group>*/}
							</Form.Row>
						</Form>
					</div>
					{!this.props.result.dataloading ? (
						<div>
							{console.log("Error Handling Now", filter)}
							<div
								className="table"
								style={{
									padding: "0px 30px 0px 70px",
									marginTop: "0px"
								}}
							>
								<Table
									striped
									bordered
									hover
									size="lg"
									variant="dark"
									style={{
										marginLeft: "160px",
										position: "absolute"
									}}
								>
									<thead>
										<tr>
											<td>Title</td>
											<td>Creator</td>
											<td>Assignee</td>
											<td>Status</td>
											<td>Due Date</td>
											<td>Task Description</td>
										</tr>
									</thead>
									{filter.map((detail, index) => {
										return (
											<tbody>
												<tr
													value={detail.email}
													onClick={() =>
														this.handleClick1(
															detail.email
														)
													}
												>
													<td>{detail.taskTitle}</td>
													<td>
														{
															detail.assigned_by
																.name
														}
													</td>
													<td>
														{
															detail.assigned_to
																.name
														}
													</td>
													<td>{detail.taskStatus}</td>
													<td>{detail.dueDate}</td>
													<td>{detail.taskDes}</td>
												</tr>
											</tbody>
										);
									})}
								</Table>
								<h6 style={{ color: "blue" }}>
									{this.props.errors}
								</h6>
							</div>
							<div
								class="col2 text-center"
								style={{ padding: "20px" }}
							>
								<Button
									type="submit"
									onClick={event => this.handleClick(event)}
								>
									Search
								</Button>
							</div>
							<div class="col3 text-center">
								<Button
									type="submit"
									onClick={event => this.handlePrev(event)}
								>
									Prev
								</Button>

								<Button
									type="submit"
									onClick={event => this.handleNext(event)}
								>
									Next
								</Button>
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	result: state.result1,
	auth: state.auth,
	resultInfo: state.resultInfo,
	paginationPage: state.paginationPage,
	cookies: ownProps.cookies
});

export default connect(
	mapStateToProps,
	{
		Search,
		paginatePageReset,
		paginatePageNext,
		paginatePagePrev,
		resetErrors,
		taskSearch
	}
)(tasklist);
