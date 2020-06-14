import React from "react";
import "./AdoptionDetails.css";

export default function AdoptionDetails(props) {
	return (
		<>
			<h3 className='info-title'>Adoption Details</h3>
			<ul className='adoption-info-text adoption-details-grid-container'>
				<li className='adopter-name align-details'>
					Adoption Date
					<div className='adopter-name-value align-details'>
						{props.adoption_date}
					</div>
				</li>
				<li className='adopter-name align-details'>
					Adopter Name
					<div className='adopter-name-value align-details'>
						{props.adopter_name}
					</div>
				</li>

				<li className='adopter-name align-details'>
					Adopter Email
					<div className='adopter-name-value align-details'>
						{props.adopter_email}
					</div>
				</li>

				<li className='adopter-name align-details'>
					Adopter Phone Number
					<div className='adopter-name-value align-details'>
						{props.adopter_phone}
					</div>
				</li>
			</ul>
		</>
	);
}
