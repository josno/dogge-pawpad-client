import React, { Component } from "react";
import "./ArchiveModal.css";

class ArchiveModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: "",
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		return (
			<div>
				<form>
					<label>
						Once you archive {this.props.dogName}, you can't undo it.
						<br />
						What is your reason for archiving?
						<textarea
							name='note'
							value={this.state.note}
							onChange={(e) => this.handleChange(e)}
						/>
					</label>
				</form>
				<button>Archive {this.props.dogName}</button>
			</div>
		);
	}
}

export default ArchiveModal;
