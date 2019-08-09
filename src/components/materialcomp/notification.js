import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LabelIcon from "@material-ui/icons/Label";
import WorkIcon from "@material-ui/icons/Work";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Form from "../materialcomp/form";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import ExpansionPanel from "../../components/notificationComponents/expansion";
import { connect } from "react-redux";
import {
	setIcon1,
	addNotification,
	notificationAdded
} from "../../actions/notification";
import jwt_decode from "jwt-decode";
import Pusher from "pusher-js";
import channelsClient from "pusher-js";

class notificationMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMe: false,
			anchorEl: null,
			showStatus: false,
			anchorElStatus: null,
			channelName: null,
			notificationData: []
		};
	}

	componentDidMount = () => {
		const Token = this.props.cookies.get("token");
		if (Token) {
			const decoded = jwt_decode(Token);
			const id = decoded.sub;
			const channelName = "private-login1." + id;
			const channelName1 = "login1." + id;
			console.log(channelName, "TOKENNNNNNNNNNN");
			var pusher = new Pusher("fea611aa8ced2588b8e6", {
				cluster: "ap2",
				authEndpoint: "http://localhost:8000/api/broadcasting",

			});
			var channel = pusher.subscribe(channelName);
			// var channel = pusher.subscribe(channelName1);
			this.setState({
				channelName: channel
			});

			channel.bind("Login", data => {
				this.props.addNotification(data);
			});

			channel.bind("TaskCreated", data => {
				this.props.addNotification(data);
			});
		}
	};

	componentDidUpdate = () => {
		if (this.props.newNotification.flag === true) {
			this.setState({
				notificationData: this.props.newNotification.notification_data
			});
			this.props.notificationAdded();
		}
	};

	componentWillUnmount = () => {
		const channel = this.state.channelName;
		if(channel !== null){
			channel.unbind("Login");
		}
		
	};

	handleClick = event => {
		this.setState({
			showMe: true,
			anchorEl: event.currentTarget
		});
		console.log("handleClick");
	};
	handleClickStatus = event => {
		this.setState({
			showMe: false,
			showStatus: true,
			anchorElStatus: event.currentTarget
		});
		console.log("handleClickStatus", this.state.showMe);
	};
	handleClose = event => {
		this.setState({
			showMe: false,
			anchorEl: null
		});
		console.log("handleClose");
	};

	handleCloseStatus = event => {
		this.setState({
			showMe: true,
			showStatus: false,
			anchorElStatus: null
		});

		console.log("handleCloseStatus");
	};

	useStyles = makeStyles(theme => ({
		typography: {
			padding: theme.spacing(2)
		}
	}));

	render() {
		const filter = this.props.newNotification.notification_data;
		const StyledMenu = withStyles({
			paper: {
				border: "1px solid #d3d4d5"
			}
		})(props => (
			<Menu
				elevation={0}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center"
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center"
				}}
				{...props}
			/>
		));

		const StyledMenuItem = withStyles(theme => ({
			root: {
				"&:focus": {
					backgroundColor: theme.palette.primary.main,
					"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
						color: theme.palette.common.white
					}
				}
			}
		}))(MenuItem);
		console.log("counttt", this.props.count);
		return (
			<div>
				<Button
					aria-controls="customized-menu"
					aria-haspopup="true"
					variant="contained"
					color="primary"
					style={{ padding: "5px" }}
					onClick={this.handleClick}
					style={{ backgroundColor: "#053787" }}
				>
					<Badge
						badgeContent={
							this.props.newNotification.notification_count
						}
						color="secondary"
						style={{ marginRight: "10px", marginTop: "8px" }}
					>
						<MailIcon />
					</Badge>
				</Button>
				<StyledMenu
					id="customized-menu"
					anchorEl={this.state.anchorEl}
					open={this.state.showMe}
					onClose={this.handleClose}
				>
					{filter.map((detail, index) => {
						return (
							<StyledMenuItem>
								{console.log(
									this.props.newNotification,
									"Task Creation Data"
								)}
								<ExpansionPanel notificationData={detail} />
							</StyledMenuItem>
						);
					})}
				</StyledMenu>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	errors: state.errors,
	result: state.result1,
	auth: state.auth,
	resultInfo: state.resultInfo,
	paginationPage: state.paginationPage,
	newNotification: state.count
});

export default connect(
	mapStateToProps,
	{
		setIcon1,
		addNotification,
		notificationAdded
	}
)(notificationMenu);
