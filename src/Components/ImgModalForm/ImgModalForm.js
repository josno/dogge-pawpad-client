import React, { Component } from "react";
import DogsApiService from "../../services/api-service";
// import "./Modal.css";

class ImgModalForm extends Component {
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
			<form>
				<h1> Update Dog Image</h1>
				<input type='file' />
			</form>
		);
	}
}

export default ImgModalForm;
