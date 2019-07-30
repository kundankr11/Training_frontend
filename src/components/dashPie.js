import React, { Component } from "react";
import Highcharts from "highcharts";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import isEmpty from "../validation/is-empty";
import isAdmin from "../validation/isAdmin";
import { pieData, dataLoadingReset } from "../actions/dataCharts";
import Taskbar from "../components/tasknavbar";
import { statusSearch, statusUpdate } from "../actions/taskactions";
import { Dots } from "react-activity";
import "../components/Dots.css";
import "../components/styling/piechart.css"
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

import "../task.css";

class dashPie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dat: "safasf",
			series: [
				{
					name: "Task Status",
					data: [
						{
							name: "Completed On Time",
							y: 0.9,
							color: "#3498db"
						},
						{
							name: "Completed After Deadline",
							y: 78.1,
							color: "#9b59b6"
						},
						{
							name: "Overdues",
							y: 20.9,
							color: "#2ecc71"
						},
						{
							name: "In-Progress",
							y: 0.1,
							color: "#f1c40f"
						},
						{
							name: "No Activities",
							y: 0.1,
							color: "#f542a4"
						}
					]
				}
			]
		};
	}

	high() {
		let itemList = this.state.series[0].data;
		itemList[0].y = this.props.data.completed_on_time;
		itemList[1].y = this.props.data.completed_after_deadline;
		itemList[2].y = this.props.data.overdues;
		itemList[3].y = this.props.data.progress;
		itemList[4].y = this.props.data.noActivities;
	}
	highChartsRender() {
		Highcharts.chart({
			chart: {
				type: "pie",
				renderTo: "Task"
			},
			title: {
				verticalAlign: "middle",
				floating: true,
				text: "",
				style: {
					fontSize: "15px"
				}
			},
			credits: {
				enabled: false,
				text: Highcharts.com
			},
			plotOptions: {
				pie: {
					dataLabels: {
						format: "{point.name}: {point.percentage:.1f} %"
					},
					innerSize: "60%",
					colors: ['#fff', '#ED561B', '#DDDF00', '#24CBE5', '#64E572']
				}
			},
			series: this.state.series
		});
	}
	componentDidMount() {
		const task = {
			pie: 1
		};
		this.props.pieData();
		this.props.statusSearch(task);
	}
	componentDidUpdate() {
		if (!this.props.result.dataloading) {
			this.high();
			this.highChartsRender();
			this.props.dataLoadingReset();
		}
	}

	render() {
		const filter = this.props.result.fetched_data;
		console.log("PieDATa", this.props.loader);
		return (
			<div>
				{console.log("Dashboard")}
				{console.log(this.state.pieD)}
				<Taskbar cookies={this.props.cookies} />
				<div style={{ position: "relative" }}>
					{this.props.result.dataloading ? (
						<div
							style={{
								position: "absolute",
								marginLeft: "750px"
							}}
						>
							{" "}
							<Dots />
						</div>
					) : null}

					{!this.props.result.dataloading ? (
						<label
							style={{
								color: "#053787",
								position: "relative",
								left: "380px",
								fontSize: "30px",
								top: "30px",
								color: "#053787",
								fontWeight: "bold",
								zIndex: "100"
							}}
						>
							{" "}
							Tasks For Today
						</label>
					) : null}
					{!this.props.result.dataloading ? (
						<label
							style={{
								color: "#053787",
								position: "relative",
								left: "780px",
								fontSize: "30px",
								top: "30px",
								color: "#053787",
								fontWeight: "bold"
							}}
						>
							Task History
						</label>
					) : null}

					{!this.props.result.dataloading ? (
						<Table
							className="tableinfo"
							striped
							bordered
							hover
							size="lg"
							variant="dark"
							style={{
								position: "relative",
								left: "180px",
								width: "45%",
								backgroundColor: "#053787"
							}}
						>
							<thead>
								<tr>
									<td>Title</td>
									<td>Assigner</td>
									<td>Status</td>
									<td>Due Date</td>
									<td>Task Description</td>
								</tr>
							</thead>
							{filter.map((detail, index) => {
								return (
									<tr>
										<td>{detail.taskTitle}</td>
										<td>{detail.assigned_by.name}</td>
										<td>{detail.taskStatus}</td>
										<td>{detail.dueDate}</td>
										<td>{detail.taskDes}</td>
									</tr>
								);
							})}
						</Table>
					) : null}
					<div
						id="Task"
						style={{
							position: "relative",
							left: "500px",

						}}
					>
						<div></div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	data: state.pieData,
	errors: state.errors,
	result: state.result1,
	auth: state.auth,
	resultInfo: state.resultInfo,
	paginationPage: state.paginationPage,
	dataLoading: state.dataLoading
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
		statusUpdate,
		pieData,
		dataLoadingReset
	}
)(dashPie);
