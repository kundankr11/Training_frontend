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

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMe: false,
			anchorEl: null,
			showStatus: false,
			anchorElStatus: null
		};
	}

	handleClick = event => {
		this.setState({
			showMe: true,
			anchorEl: event.currentTarget
		});
		console.log("handleClick");
	};
	handleClickStatus = event => {
		
		this.setState({
			showMe:false,
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
			showMe:true,
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
		return (
			<div>
				<Button
					aria-controls="customized-menu"
					aria-haspopup="true"
					variant="contained"
					color="primary"
					style={{ padding: "5px" }}
					onClick={this.handleClick}
				>
					<AssignmentIcon />
				</Button>
				<StyledMenu
					id="customized-menu"
					anchorEl={this.state.anchorEl}
					open={this.state.showMe}
					onClose={this.handleClose}
				>
					<StyledMenuItem>
						<ListItemIcon>
							<WorkIcon />
						</ListItemIcon>
						<ListItemText primary="Update Task " />
					</StyledMenuItem>
					<StyledMenuItem >
						<ListItemIcon>
							<LabelIcon />
						</ListItemIcon>
						<ListItemText primary="Update Task Status" />
						<Button onClick={this.handleClickStatus}>Hi</Button>
						
					</StyledMenuItem>
				</StyledMenu>
				<div>
					<Popover
							open={this.state.showStatus}
							anchorEl={this.state.anchorEl}
							onClose={this.handleCloseStatus}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center"
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "center"
							}}
						>
							<Form />
						</Popover>
				</div>
			</div>
		);
	}
}
export default App;
