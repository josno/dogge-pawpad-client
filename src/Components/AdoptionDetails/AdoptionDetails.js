import React from "react";
import "./AdoptionDetails.css";

export default function AdoptionDetails(props) {
	return (
		<div className='adoption-grid-container'>
			<h3 className='info-title'>Adoption Details: {props.dogName} </h3>
			<ul className='adoption-info-text adoption-details-grid-container'>
				<li className='adopter-name align-details'>
					Adoption Date
					<div className='adopter-date-value value-align align-details'>
						{props.info.adoption_name}
					</div>
				</li>
				<li className='adopter-name align-details'>
					Adopter Name
					<div className='adopter-name-value value-align align-details'>
						{props.info.adopter_name}
					</div>
				</li>

				<li className='adopter-name align-details'>
					Adopter Email
					<div className='adopter-email-value value-align align-details'>
						{props.info.adopter_email}
					</div>
				</li>

				<li className='adopter-name align-details'>
					Adopter Phone Number
					<div className='adopter-phone-value value-align align-details'>
						{props.info.adopter_phone}
					</div>
				</li>
				<li className='adopter-name align-details'>
					Adopter Country
					<div className='adopter-country-value value-align align-details'>
						{props.info.adopter_country}
					</div>
				</li>
			</ul>
		</div>
	);
}
