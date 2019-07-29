import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import Taskbar from "../components/tasknavbar";
import { updateSearch, taskUpdate } from "../actions/taskactions";
import classnames from "classnames";
import "../components/tupdate.css";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";
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
import "../search.css";

class creatorupdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskTitle: null,
			taskDes: null,
			status: null,
			assignee: null,
			dueDate: null,
			beforedate: null,
			page: 1,
			showme: false,
			hideme: false,
			taskID: null,
			taskTitle_U: null,
			taskDes_U: null,
			dueDate_U: null
		};
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			assignee: this.state.assignee
		};
		this.props.updateSearch(task);
	}

	handleClick = event => {
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			assignee: this.state.assignee,
			page: this.state.page
		};
		const pageData = {
			curr_page: this.props.paginationPage,
			max_page: this.props.resultInfo.last_page
		};
		this.props.paginatePageReset(pageData);
		this.props.updateSearch(task);
	}

	handleClick1 = event => {
		console.log("A row has been clicked", event);
		this.setState(
			{
				taskID: event,
				showme: true
			},

			() => {
				const task = {
					taskTitle: this.state.taskTitle,
					taskDes: this.state.taskDes,
					status: this.state.status,
					dueDate: this.state.dueDate,
					beforedate: this.state.beforedate,
					page: this.state.page,
					assignee: this.state.assignee,
					taskID: this.state.taskID
				};
				this.props.updateSearch(task);
			}
		);
	}

	handleNext = event => {
		const { taskTitle, taskDes } = this.state;
		const pageData = {
			curr_page: this.props.paginationPage,
			max_page: this.props.resultInfo.last_page
		};
		this.props.paginatePageNext(pageData);
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			page: this.props.paginationPage + 1,
			assignee: this.state.assignee
		};
		if (this.props.resultInfo.last_page !== 1) {
			this.props.updateSearch(task);
		}
	};

	handleClick4 = event => {
		const task = {
			taskTitle: this.state.taskTitle_U,
			taskDes: this.state.taskDes_U,
			dueDate: this.state.dueDate_U,
			taskID: this.state.taskID
		};
		this.props.taskUpdate(task, this.props.history);
		console.log("task Update", task);
	}

	handlePrev = event => {
		const pageData = {
			curr_page: this.props.paginationPage,
			max_page: this.props.resultInfo.last_page
		};
		this.props.paginatePagePrev(pageData);
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			assignee: this.state.assignee,
			page: this.props.paginationPage
		};
		if(this.props.paginationPage>1)
		this.props.updateSearch(task);
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
				[event.target.id]: event.target.value,
				showme: false
			},

			() => {
				const pageData = {
					curr_page: this.props.paginationPage,
					max_page: this.props.resultInfo.last_page
				};
				const task = {
					taskTitle: this.state.taskTitle,
					taskDes: this.state.taskDes,
					status: this.state.status,
					dueDate: this.state.dueDate,
					beforedate: this.state.beforedate,
					page: this.state.page,
					assignee: this.state.assignee
				};

				this.props.paginatePageReset(pageData);
				this.props.updateSearch(task);
			}
		);
	};

	handleChange1 = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	render() {
		const filter = this.props.result.fetched_data;
		console.log("FETCHED DATA", this.props.result.dataloading);
		return (
			<div>
				<Navbar1 />
				<Taskbar cookies={this.props.cookies} />
				{!this.state.showme ? (
					<h3
						className="text-center"
						style={{
							color: "#053787",
							paddingLeft: "150px",
							marginTop: "10px"
						}}
					>
						{" "}
						Select a Task for Update
					</h3>
				) : null}
				    {(this.props.result.dataloading) ?(<div style = {{position: "relative", marginLeft: "750px"}}><Dots /></div>):null}
					<div className="UserListing">
						<div
							class="text-center"
							style={{ marginLeft: "250px" }}
						>
							<Form onSubmit={this.handleSubmit}>
								<Form.Row
									style={{
										marginTop: "0px",
										marginRight: "70px"
									}}
								>
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
								</Form.Row>
							</Form>
						</div>

						<div
							class="col5 text-center"
							style={{ padding: "0px" }}
						>
							<Button
								style={{
									marginLeft: "150px",
									marginTop: "5px",
									backgroundColor: "#053787",
									borderColor: "#053787"
								}}
								type="submit"
								onClick={event => this.handleClick(event)}
							>
								Search
							</Button>
						</div>

						<div>
							<div
								class="col5 text-center "
								style={{
									marginTop: "13px",
									marginLeft: "155px"
								}}
							>
								<Button
									type="submit"
									style={{
										marginRight: "20px",
										padding: "8pxpx 16px",
										backgroundColor: "#053787",
										borderColor: "#053787"
									}}
									onClick={event => this.handlePrev(event)}
								>
									Prev
								</Button>

								<Button
									type="submit"
									style={{
										marginLeft: "20px",
										padding: "8pxpx 16px",
										backgroundColor: "#053787",
										borderColor: "#053787"
									}}
									onClick={event => this.handleNext(event)}
								>
									Next
								</Button>
							</div>
							{(!this.props.result.dataloading) ?(
							<div
								class="container1"
								style={{ padding: "0px 0px 0px 0px" }}
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

										width: "80%",
										marginRight: "0px",
										marginLeft: "225px",
										marginTop: "20px",
										backgroundColor: "#053787"
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
											<td></td>
										</tr>
									</thead>
									{filter.map((detail, index) => {
										return (
											<thead>
												<tr
													value={detail.email}
													onClick={() =>
														this.handleClick1(
															detail.id
														)
													}
												>
													<td>{detail.taskTitle}</td>
													<td>{detail.assigned_by.name}</td>
													<td>{detail.assigned_to.name}</td>
													<td>{detail.taskStatus}</td>
													<td>{detail.dueDate}</td>
													<td>{detail.taskDes}</td>
													{!this.state.showme ? (
														<td>
															<Button type="submit">
																Select
															</Button>
														</td>
													) : null}
												</tr>
											</thead>
										);
									})}
								</Table>
								<h6 style={{ color: "blue" }}>
									{this.props.errors}
								</h6>
							</div>):null}
						</div>
					</div>
				
				{this.state.showme ? (
					<div style={{ marginLeft: "500px", marginRight: "300px" }}>
					{(!this.props.result.dataloading) ?(
						<h4
							className="text-center"
							style={{ color: "#053787" }}
						>
							Update Task
						</h4>):null}
					{(!this.props.result.dataloading) ?(
					<div>
						<Form.Group controlId="taskTitle_U">
							<Form.Label
								style={{ color: "#053787", fontWeight: "bold" }}
							>
								Task Title
							</Form.Label>
							<Form.Control
								style={{ color: "#053787" }}
								type="text"
								placeholder="TITLE"
								value={this.state.taskTitle_U}
								onChange={this.handleChange1}
							/>
						</Form.Group>
						<Form.Group
							controlId="taskDes_U"
							placeholder="Enter Description Here"
						>
							<Form.Label
								style={{ color: "#053787", fontWeight: "bold" }}
							>
								Task Description
							</Form.Label>
							<Form.Control
								as="textarea"
								rows="2"
								value={this.state.taskDes_U}
								onChange={this.handleChange1}
							/>
						</Form.Group>
						
						<Form.Group controlId="dueDate_U">
							<Form.Label
								style={{ color: "#053787", fontWeight: "bold" }}
							>
								Due Date
							</Form.Label>
							<Form.Control
								type="date"
								placeholder="YYYY/MM/DD"
								value={this.state.dueDate_U}
								onChange={this.handleChange1}
							/>
						</Form.Group>
						</div>):null}
					{(!this.props.result.dataloading) ?(
						<div
							class="col5 text-center"
							style={{ padding: "0px" }}
						>
							<Button
								style={{
									marginTop: "5px",
									backgroundColor: "#053787",
									borderColor: "#053787"
								}}
								type="submit"
								onClick={event => this.handleClick4(event)}
							>
								Update Task
							</Button>
						</div>):null}
					</div>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	errors: state.errors,
	result: state.result1,
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
		updateSearch,
		taskUpdate
	}
)(creatorupdate);
