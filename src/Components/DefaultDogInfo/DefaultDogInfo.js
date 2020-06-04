import React from "react";

export default function DefaultDogInfoView(props) {
	return (
		<div className='basic-dog-details box-flex'>
			<h3 className='info-title'>Basic Details </h3>
			<button onClick={props.changeEditMode}>Edit Details</button>
			<ul className='dog-info-text details-grid-container'>
				<li className='gender align-details'>Gender: </li>

				<li className='gender-value align-details'>{props.dogInfo.gender}</li>
				<li className='age align-details'>Age: </li>
				<li className='age-value align-details'>{props.dogInfo.age}</li>
				<li className='arrival align-details'>Arrival Date: </li>
				<li className='arrival-value align-details'>
					{props.formatDate(props.dogInfo.arrival_date)}
				</li>
				<li className='tag align-details'>Tag: </li>
				<li className='tag-value align-details'>{props.dogInfo.tag_number}</li>
				<li className='microchip align-details'>Microchip: </li>
				<li className='microchip-value align-details'>
					{props.dogInfo.microchip}
				</li>
				<li className='spayed-neutered align-details'>
					{props.renderSpayedNeutered(props.dogInfo.spayedneutered)}
				</li>
			</ul>
		</div>
	);
}
