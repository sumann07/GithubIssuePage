import React, { Component } from "react";
import axios from "axios";

import "./final.css";


class AddIssueForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			data: "",
			submitButton: "Add",
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

		const { userName, data } = this.state;

		this.setState({ submitButton: "Adding.." });

		
			axios
				.post(`http://localhost:5000/api/add-issue`, {
					userName,
					data,
				})
				.then(resp => {
					
					this.setState({
						userName: "",
						data: "",
						submitButton: "Add",
					});
				})
				.catch(err => {
					if (err && err.response && err.response.data) {
						
					} else {
						
					}
					this.setState({ submitButton: "Add" });
				});
	};

	render() {
		const { userName, data, submitButton } = this.state;
		return (
			<div className="form-container">
			
				
			

				<div className="form-header">Add Issue</div>
				<form className="form-body" onSubmit={this.submitForm}>
					<input
						type="text"
						className="form-input"
						maxlength="32"
						name="userName"
						value={userName}
						placeholder="Issue..."
						onChange={this.handleChange}
					/>
					<textarea
						className="form-input data-textarea"
						maxlength="60"
						name="data"
						value={data}
						placeholder="Issue details..."
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

export default AddIssueForm;