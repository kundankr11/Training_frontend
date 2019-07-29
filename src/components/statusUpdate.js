import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import Taskbar from "../components/tasknavbar";
import { statusSearch, statusUpdate } from "../actions/taskactions";
import classnames from "classnames";
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

class statusupdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskTitle: null,
			taskDes: null,
			status: null,
			assigner: null,
			dueDate: null,
			beforedate: null,
			page: 1,
			showme: false,
			hideme: false,
			taskID: null,
			taskStatus: null
		};
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			assigner: this.state.assigner
		};
		this.props.statusSearch(task);
	}

	handleClick(event) {
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			assigner: this.state.assigner,
			page: this.state.page
		};
		const pageData = {
			curr_page: this.props.paginationPage,
			max_page: this.props.resultInfo.last_page
		};
        this.props.paginatePageReset(pageData);
		this.props.statusSearch(task);
		
	}

	handleClick1(event) {
		console.log("A row has been clicked", event);
		this.setState(
			{
				taskID: event,
				showme: true
			},

			() => {
				const task = {
					taskID: this.state.taskID
				};
				this.props.statusSearch(task);
				console.log(
					"A row has been clicked and the taskId is",
					this.state.taskID
				);
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
		const task = {
			taskTitle: this.state.taskTitle,
			taskDes: this.state.taskDes,
			status: this.state.status,
			dueDate: this.state.dueDate,
			beforedate: this.state.beforedate,
			page: this.props.paginationPage + 1,
			assigner: this.state.assigner
		};
		if (this.props.resultInfo.last_page !== 1) {
			this.props.statusSearch(task);
		}
	};

	handleClick4(event) {
		const task = {
			taskStatus: this.state.taskStatus,
			taskID: this.state.taskID
		};
		this.props.statusUpdate(task, this.props.history);
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
			assigner: this.state.assigner,
			page: this.props.paginationPage
		};
		this.props.statusSearch(task);
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
					assigner: this.state.assigner
				};
                this.props.paginatePageReset(pageData);
				this.props.statusSearch(task);
				
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
						Select a Task for Status Update
					</h3>
				):null}
				{(this.props.result.dataloading) ?(<div style = {{position: "relative", marginLeft: "750px"}}><Dots /></div>):null}
				
					
					<div
						className="UserListing"
						style={{ marginLeft: "250px" }}
					>
						<Form onSubmit={this.handleSubmit}>
							<Form.Row
								style={{
									marginTop: "0px",
									marginRight: "70px"
								}}
							>
								<Form.Group as={Col} controlId="assigner">
									<label
										style={{
											color: "#053787",
											fontWeight: "bold"
										}}
									>
										Assigner
									</label>
									<FormControl
										type="text"
										value={this.state.assigner}
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
										<option value=""> Status </option>
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

						<div
							class="col5 text-center"
							style={{ padding: "0px", marginRight: "200px" }}
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
									style={{
										marginRight: "20px",
										padding: "8pxpx 16px",
										backgroundColor: "#053787",
										borderColor: "#053787"
									}}
									type="submit"
									onClick={event => this.handlePrev(event)}
								>
									Prev
								</Button>

								<Button
									style={{
										marginLeft: "20px",
										padding: "8pxpx 16px",
										backgroundColor: "#053787",
										borderColor: "#053787",
										marginRight: "200px"
									}}
									type="submit"
									onClick={event => this.handleNext(event)}
								>
									Next
								</Button>
							</div>
							{(!this.props.result.dataloading) ?(
							<div
								class="container1"
								style={{
									padding: "0px 0px 0px 0px",
									marginRight: "510px"
								}}

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

										width: "100%",
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
											<td>Status</td>
											<td>Due Date</td>
											<td>Task Description</td>
											<td></td>
										</tr>
									</thead>
									{filter.map((detail, index) => {
										return (
											<tr
												value={detail.email}
												onClick={() =>
													this.handleClick1(detail.id)
												}
											>
												<td>{detail.taskTitle}</td>
												<td>
													{detail.assigned_by.name}
												</td>
												<td>{detail.taskStatus}</td>
												<td>{detail.dueDate}</td>
												<td>{detail.taskDes}</td>
												{!this.state.showme ? (
													<td>
														<Button type="submit">
															Update
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
							</div>):null}
						</div>
					</div>
				}
				{this.state.showme ? (
					<div style={{}}>
					{(!this.props.result.dataloading) ?(

						<h1
							style={{
								color: "#053787",
								paddingLeft: "150px",
								marginTop: "10px",
								marginLeft: "30px"
							}}
						>
							Update Status
						</h1>):null}
					{(!this.props.result.dataloading) ?(
						<Form.Group
							as={Col}
							controlId="taskStatus"
							style={{
								paddingLeft: "600px",
								paddingRight: "500px",
								marginLeft: "50px"
							}}
						>
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
								value={this.state.taskStatus}
								onChange={this.handleChange1}
							>
								<option value=""> Select Status </option>
								<option value="in-progress">
									{" "}
									In-Progress{" "}
								</option>
								<option value="completed"> Completed </option>
							</FormControl>
						</Form.Group>):null}
					{(!this.props.result.dataloading) ?(
						<div
							class="col5 text-center"
							style={{ padding: "0px" }}
						>
							<Button
								style={{
									marginTop: "5px",
									backgroundColor: "#053787",
									borderColor: "#053787",
									marginLeft: "220px"
								}}
								type="submit"
								onClick={event => this.handleClick4(event)}
							>
								Update Status
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
		statusSearch,
		statusUpdate
	}
)(statusupdate);
