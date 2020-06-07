import React, { Component } from "react";

class EditDog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gender: "",
			age: "",
			tag_number: "",
			microchip: "",
		};
	}
	render() {
		return (
			<div className='basic-dog-details box-flex'>
				<h3 className='info-title'>Basic Details </h3>
				<ul className='dog-info-text details-grid-container'>
					<button onClick={this.props.changeEditMode}>Cancel</button>
					<li className='gender align-details'>Gender: </li>

					<li className='gender-value align-details'>
						<input value={this.props.dogInfo.gender} />
					</li>
					<li className='age align-details'>Age: </li>
					<li className='age-value align-details'>{this.props.dogInfo.age}</li>
					<li className='arrival align-details'>Arrival Date: </li>
					<li className='arrival-value align-details'>
						{this.props.formatDate(this.props.dogInfo.arrival_date)}
					</li>
					<li className='tag align-details'>Tag: </li>
					<li className='tag-value align-details'>
						{this.props.dogInfo.tag_number}
					</li>
					<li className='microchip align-details'>Microchip: </li>
					<li className='microchip-value align-details'>
						{this.props.dogInfo.microchip}
					</li>
					<li className='spayed-neutered align-details'>
						{/* {props.renderSpayedNeutered(props.dogInfo.spayedneutered)} */}
					</li>
				</ul>
			</div>
		);
	}
}

export default EditDog;
