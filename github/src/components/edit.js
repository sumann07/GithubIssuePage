import React, { Component } from "react";
import axios from "axios";


import "./final.css";



class EditIssueForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: this.props.location.state.userName,
			data: this.props.location.state.data,
			isClosed: this.props.location.state.isClosed,
			submitButton: "Update",
		};
	}

	handleChange = e => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value,
		});
	};

	backButton = () => {
		this.props.history.push("/");
	};

	submitForm = e => {
		e.preventDefault();

		const { userName, data, isClosed } = this.state;
		const { id } = this.props.location.state;

		this.setState({ submitButton: "Updating..." });

		
			axios
				.put(`http://localhost:5000/api/update-issue/${id}`, {
					userName,
					data,
					isClosed,
				})
				.then(resp => {
				
					this.setState({
						submitButton: "Update ",
					});
				})
				.catch(err => {
					if (err && err.response && err.response.data) {
						
					} else {
						
					}
					this.setState({ submitButton: "UPDATE ISSUE" });
				});
	};

	render() {
		const { userName, data, submitButton } = this.state;
		return (
			<div className="form-container form-container-1">
				
			
				

				<div className="form-header"> Edit Issue</div>
				<form className="form-body" onSubmit={this.submitForm}>
					<input
						type="text"
						className="form-input"
						maxLength="32"
						name="userName"
						value={userName}
						
						onChange={this.handleChange}
					/>
					<textarea
						className="form-input data-textarea"
						maxLength="60"
						name="data"
						value={data}
						
						onChange={this.handleChange}
					/>
					<input className="submit-button" type="submit" value={submitButton} />
					<button onClick={this.backButton} style={{backgroundColor:"#1d2d50",
					marginTop:"20px",
					width:"120px",
					height:"40px",
					color:"white",
					borderRadius:"5px",
					textDecoration:"bolder"}}>Back</button>
				</form>
			</div>
		);
	}
}

export default EditIssueForm;