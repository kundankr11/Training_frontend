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
import "../components/styling/piechart.css";
import "react-activity/dist/react-activity.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button1 from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { deepOrange, deepPurple, green } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import History from "@material-ui/icons/History";
import DoneIcon from "@material-ui/icons/Done";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpansionPanel from "../components/expansion";
import Container from "@material-ui/core/Container";
import Carousel from "react-bootstrap/Carousel";
import {setIcon} from "../actions/notification";
import Menu from "../components/materialcomp/menuRev";
import Pusher from "pusher-js";
import jwt_decode from "jwt-decode";
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
			showme: false,
			dat: "safasf",
			series: [
				{
					name: "Task Status",
					data: [
						{
							name: "Completed On Time",
							y: 0.9,
							color: "blue"
						},
						{
							name: "Completed After Deadline",
							y: 78.1,
							color: "#fffc45"
						},
						{
							name: "Overdues",
							y: 20.9,
							color: "red"
						},
						{
							name: "In-Progress",
							y: 0.1,
							color: "#30ca54"
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
		console.log(this.state.series[0].data, "Series data Before update");
		itemList[0].y = this.props.data.pie_fetched_data.completed_on_time;
		itemList[1].y = this.props.data.pie_fetched_data.completed_after_deadline;
		itemList[2].y = this.props.data.pie_fetched_data.overdues;
		itemList[3].y = this.props.data.pie_fetched_data.progress;
		itemList[4].y = this.props.data.pie_fetched_data.noActivities;
		if (
			itemList[0].y !== 0 ||
			itemList[1].y !== 0 ||
			itemList[2].y !== 0 ||
			itemList[3].y !== 0 ||
			itemList[4].y !== 0
		) {
			this.setState({
				showme: true
			});
		}

		console.log(itemList, "Series data");
	}
	useStyles = makeStyles(theme => ({
		root: {
			width: "100%",
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper
		},
		inline: {
			display: "inline"
		}
	}));
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
					colors: ["#fff", "#ED561B", "#DDDF00", "#24CBE5", "#64E572"]
				}
			},
			series: this.state.series
		});
	}
	componentDidMount = () => {
		const task = {
			pie: 1
		};
		this.props.statusSearch(task);     
		this.props.pieData();
    }


	
	componentDidUpdate() {
		if (!this.props.data.pie_dataloading) {
			console.log(this.state.showme,"Setting Pie data", this.props.data.pie_dataloading);
			if (!this.state.showme) {

				this.high();
			}

			if (this.state.showme) {
				this.highChartsRender();
				console.log(this.props.data, "Showmeeeee");
			}
		}
	}

	render() {
		console.log(window.state, "WINDOW STATE");
		const filter = this.props.result.fetched_data;
		console.log("New UI is here", filter);
		console.log("PieDATa", this.props.loader);
		return (
			<div id="dash">
				{console.log("Dashboard")}
				{console.log(this.state.pieD)}
				<Taskbar cookies={this.props.cookies} />
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
				{this.state.showme ? (
					<div style={{ position: "relative" }}>
						{!this.props.result.dataloading ? (
							<Chip
								icon={
									<FaceIcon
										style={{
											height: "50px",
											width: "50px"
										}}
									/>
								}
								label="Your Tasks for Today"
								clickable
								style={{
									marginLeft: "350px",
									width: "300px",
									height: "48px",
									marginTop: "25px",

									flexWrap: "wrap",
									paddingLeft: "0",
									paddingRight: "0"
								}}
								color="primary"
								deleteIcon={<DoneIcon />}
							/>
						) : null}
						{!this.props.result.dataloading ? (
							<Chip
								icon={
									<History
										style={{
											height: "50px",
											width: "50px"
										}}
									/>
								}
								label="Your Performance"
								clickable
								style={{
									marginLeft: "350px",
									width: "300px",
									height: "48px",
									marginTop: "25px",
									justifyContent: "center",
									flexWrap: "wrap",
									paddingLeft: "0",
									paddingRight: "0"
								}}
								color="primary"
								deleteIcon={<DoneIcon />}
							/>
						) : null}

						{!this.props.result.dataloading ? (
							<div style={{ width: "600px" }}>
								<List
									style={{
										marginLeft: "230px",
										marginRight: "600px",
										marginTop: "50px",
										width: "100%",
										maxWidth: 550,
										backgroundColor: "#daedff"
									}}
								>
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Menu />
										</ListItemAvatar>
										<ExpansionPanel
											style={{ marginBottom: "10px" }}
											task1={filter[0].taskTitle}
											dueDate={
												filter[0].dueDate.split(" ")[0]
											}
											details={filter[0].taskDes}
											status={filter[0].taskStatus}
										/>
									</ListItem>
									<Divider variant="inset" component="li" />
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Menu />
										</ListItemAvatar>
										<ExpansionPanel
											task1={filter[1].taskTitle}
											dueDate={
												filter[1].dueDate.split(" ")[0]
											}
											details={filter[1].taskDes}
											status={filter[1].taskStatus}
										/>
									</ListItem>
									<Divider variant="inset" component="li" />
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Menu />
										</ListItemAvatar>
										<ExpansionPanel
											task1={filter[2].taskTitle}
											dueDate={
												filter[2].dueDate.split(" ")[0]
											}
											details={filter[2].taskDes}
											status={filter[2].taskStatus}
										/>
									</ListItem>
								</List>
							</div>
						) : null}

						<div id="Task">
							<div></div>
						</div>
						<div></div>
					</div>
				) : null}
				{!this.props.result.dataloading && !this.state.showme && !this.props.data.pie_dataloading ? (
					<h2
						style={{
							color: "#111",
							marginTop: "50px",
							textAlign: "center"
						}}
					>
						ADD TASK to GET STARTED
					</h2>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	data: state.pieData,
	errors: state.errors,
	result: state.result1,
	auth: state.auth,
	resultInfo: state.resultInfo,
	paginationPage: state.paginationPage,
	dataLoading: state.dataLoading,
	cookies: ownProps.cookies,
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
		dataLoadingReset,
	}
)(dashPie);
