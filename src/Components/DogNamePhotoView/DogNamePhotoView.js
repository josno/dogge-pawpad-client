import React, { Component } from "react";
import "./DogNamePhotoView.css";

// import DogsApiService from "../../services/api-service";

class DogNamePhotoView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: "",
			tag_number: "",
			editMode: false,
		};
	}

	changeEditMode = () => {
		this.setState({
			editMode: !this.state.editMode,
		});
	};

	render() {
		// const { img } = this.state;
		return (
			<div className='dog-name'>
				<img alt='dog-name' className='info-img' src={this.props.img} />
				<button
					className='edit-pencil edit-pencil-img'
					value='gender'
					onClick={() => this.changeEditMode()}
				>
					&#9998;
				</button>
				<h1 className='dog-name-text'>{this.props.dogName}</h1>
			</div>
		);
	}
}

export default DogNamePhotoView;
