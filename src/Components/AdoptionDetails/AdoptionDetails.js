import React from "react";
import "./AdoptionDetails.css";
import moment from "moment";

export default function AdoptionDetails(props) {
	const formatDate = (date) => {
		const formattedDate = moment(date).format("LL");
		return formattedDate;
	};

	return (
		<div className='adoption-details-container'>
			<h3 className='info-title'>Adoption Details: {props.dogName} </h3>
			<ul className='adoption-info-text'>
				<li className='adoption-label adoption-date'>
					Adoption Date:
					<div className='adopter-date-value adoption-value value-align'>
						{formatDate(props.info.adoption_date)}
					</div>
				</li>
				<li className='adoption-label adopt-name'>
					Adopter Name:
					<div className='adopter-name-value adoption-value value-align '>
						{props.info.adopter_name}
					</div>
				</li>

				<li className='adoption-label adopter-email'>
					Adopter Email:
					<div className='adopter-email-value adoption-value value-align'>
						{props.info.adopter_email}
					</div>
				</li>

				<li className='adoption-label adopter-phone'>
					Adopter Phone Number:
					<div className='adopter-phone-value adoption-value value-align'>
						{props.info.adopter_phone}
					</div>
				</li>
				<li className='adoption-label'>
					Adopter Country:
					<div className='adopter-country-value adoption-value value-align'>
						{props.info.adopter_country}
					</div>
				</li>
			</ul>
		</div>
	);
}
