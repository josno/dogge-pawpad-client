import React, { Component } from "react";
import "./EditDog.css";

class EditDog extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className='edit-dog basic-dog-details box-flex'>
				<h3 className='info-title'>Basic Details </h3>
				<button onClick={this.props.changeEditMode}>Save</button>
				<button onClick={this.props.changeEditMode}>Cancel</button>
				<ul className='dog-info-text details-grid-container'>
					<li className='gender align-details'>Gender: </li>
					<li className='gender-value align-details'>
						<input type='text' defaultValue={this.state.gender} />
					</li>
					<li className='age align-details'>Age: </li>
					<li className='age-value align-details'>TEST</li>
					<li className='arrival align-details'>Arrival Date: </li>
					<li className='arrival-value align-details'>TEST</li>
					<li className='tag align-details'>Tag: </li>
					<li className='tag-value align-details'>TEST</li>
					<li className='microchip align-details'>Microchip: </li>
					<li className='microchip-value align-details'>TEST</li>
					<li className='spayed-neutered align-details'>TEST</li>
				</ul>
			</div>
		);
	}
}

export default EditDog;
