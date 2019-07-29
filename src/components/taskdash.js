import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';
import Taskbar from '../components/tasknavbar';
import "../task.css";
export default class taskdash extends Component {
	render() {
		return (
			<div>
			<Navbar1 />
			<Taskbar />
			</div>   

			);
	}
}
