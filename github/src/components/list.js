import React, { Component } from "react";
import axios from "axios";

import "./final.css";



class IssuesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issues: [],
			numOfPages: [],
		};
	}

	redirect = () => {
		this.props.history.push("/add-issue");
	};

	pageChange = e => {
		const pageNumber = e.target.id;

		this.props.history.push(`/page/${pageNumber}`);
	};

	getSnapshotBeforeUpdate(prevProps) {
		return {
			notifyRequired:
				prevProps.match.params.pageNumber !==
				this.props.match.params.pageNumber,
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot.notifyRequired) {
			this.loadPage();
		}
	}

	componentDidMount() {
		this.getNumOfPages();
	}

	getNumOfPages = () => {
		let { numOfPages } = this.state;
		while (numOfPages.length !== 0) {
			numOfPages.pop();
		}
		
			axios
				.get(`http://localhost:5000/api/num-of-pages`)
				.then(resp => {
					for (let i = 1; i <= resp.data.numOfPages; i++) {
						numOfPages.push(i);
					}
					this.setState({
						...this.state,
						numOfPages,
					});
					this.loadPage();
				})
				.catch(err => {
					
				});
	};

	getStatusNumOfPages = isClosed => {
		let { numOfPages } = this.state;
		while (numOfPages.length !== 0) {
			numOfPages.pop();
		}
	
			axios
				.get(`http://localhost:5000/api/${isClosed}/num-of-pages`)
				.then(resp => {
					for (let i = 1; i <= resp.data.numOfPages; i++) {
						numOfPages.push(i);
					}
					this.setState({
						...this.state,
						numOfPages,
					});
				})
				.catch(err => {
					
				});
	};

	loadPage = () => {
		const { pageNumber } = this.props.match.params;
		
			axios
				.get(`http://localhost:5000/api/list-issues?offset=${(pageNumber - 1) * 5}`)
				.then(resp => {
					this.setState({
						issues: resp.data.issues,
					});
				})
				.catch(() => {
					
				});
	};

	deleteIssue = e => {
		const { id } = e.target;

		
			axios
				.delete(`http://localhost:5000/api/delete-issue/${id}`)
				.then(resp => {
					
					this.getNumOfPages();
				})
				.catch(() => {
					
				});
	};

	editIssue = e => {
		const { issues } = this.state;
		const { id } = e.target;

		const index = issues.findIndex(issue => issue._id === id);

		this.props.history.push({
			pathname: "/edit-issue",
			state: {
				id,
				userName: issues[index].userName,
				data: issues[index].data,
				isClosed: issues[index].isClosed,
			},
		});
	};

	updateStatus = e => {
		const status = e.target.options[e.target.value].innerHTML;
		const id = e.target.id;

		const isClosed = status === "Open" ? false : true;

		
			axios
				.put(`http://localhost:5000/api/update-issue-status/${id}`, {
					isClosed,
				})
				.then(resp => {
					
				})
				.catch(err => {
					if (err && err.response && err.response.data) {
						
					} else {
						
					}
				});
		
	};

	changeFilter = e => {
		const { pageNumber } = this.props.match.params;
		let isClosed = false;
		let filter = e.target.id;
		if (filter === "ALL") {
			this.getNumOfPages();
		} else {
			isClosed = filter === "OPEN" ? false : true;

			this.getStatusNumOfPages(isClosed);

			
				axios
					.get(`http://localhost:5000/api/${isClosed}/list-issues?offset=${(pageNumber - 1) * 5}`)
					.then(resp => {
						this.setState({
							issues: resp.data.issues,
						});
					})
					.catch(() => {
						
					});
			
		}
	};

	render() {
		const { issues, numOfPages } = this.state;
		return (
			<div className="issues-page-container">
				<div className="header"></div>
				
				

				<div className="add-button-container">
					<button className="add-button" onClick={this.redirect}>
						Add Issue
					</button>
					<div className="filter-buttons-container">
						<button
							className="status-button"
							id="ALL"
							onClick={this.changeFilter}>
							List
						</button>
						<button
							className="status-button"
							id="OPEN"
							onClick={this.changeFilter}>
							List - Unsolved
						</button>
						<button
							className="status-button"
							id="CLOSED"
							onClick={this.changeFilter}>
							List - Solved
						</button>
					</div>
				</div>

				<div className="all-issues-container">
					{issues.map(issue => (
						<div key={issue._id} className="issue-body">
							
							<div className="issue-data">{issue.userName}</div>
							<div className="issue-username-dropdown-wrapper">
								<div className="issue-username">{issue.data}</div>

								<select
									name="status"
									className="status-dropdown-menu"
									id={issue._id}
									onChange={this.updateStatus}>
									<option value="0" selected={issue.isClosed ? "selected" : ""}>
										Solved
									</option>
									<option
										value="1"
										selected={!issue.isClosed ? "selected" : ""}>
										Unsolved
									</option>
								</select>
							</div>

							<div className="file-time">{issue.time}</div>
							<abbr title="Delete">
								<img
									id={issue._id}
									src="https://img.icons8.com/dusk/2x/delete-sign.png"
									alt="delete logo"
									className="file-delete-icon"
									onClick={this.deleteIssue}
								/>
							</abbr>
							<abbr title="Edit">
								<img
									src="https://img.icons8.com/dusk/2x/edit-property.png"
									id={issue._id}
									alt="delete logo"
									className="file-delete-icon edit-icon"
									onClick={this.editIssue}
								/>
							</abbr>
						</div>
					))}
				</div>
				<div className="pagenation-container">
					{numOfPages.map(num => (
						<div
							key={num}
							id={num}
							className="page-number"
							onClick={this.pageChange}>
							{num}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default IssuesPage;
