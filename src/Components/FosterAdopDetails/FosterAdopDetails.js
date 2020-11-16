import React from "react";
import "./FosterAdopDetails.css";
import moment from "moment";

export default function FosterAdopDetails(props) {
	const formatDate = (date) => {
		const formattedDate = moment(date).format("LL");
		return formattedDate;
	};

	return (
		<div className="adoption-details-container">
			<h3 className="info-title">
				{props.info.adoption_date ? "Adoption" : "Foster"} Date Details:{" "}
				{props.dogName}{" "}
			</h3>
			<ul className="adoption-info-text">
				<li className="adoption-label adoption-date">
					{props.info.adoption_date ? "Adoption" : "Foster"} Date
					<div className="adopter-date-value adoption-value value-align">
						{formatDate(props.info.adoption_date || props.info.foster_date)}
					</div>
				</li>
				{props.info.foster_completed_on && (
					<li className="adoption-label adoption-date">
						Foster Completed Date
						<div className="adopter-date-value adoption-value value-align">
							{formatDate(props.info.foster_completed_on)}
						</div>
					</li>
				)}
				<li className="adoption-label adopt-name">
					{props.info.adoption_date ? "Adoption" : "Foster"} Name:
					<div className="adopter-name-value adoption-value value-align ">
						{props.info.adopter_name || props.info.foster_name}
					</div>
				</li>

				<li className="adoption-label adopter-email">
					{props.info.adoption_date ? "Adoption" : "Foster"} Email:
					<div className="adopter-email-value adoption-value value-align">
						{props.info.adopter_email || props.info.foster_email}
					</div>
				</li>

				<li className="adoption-label adopter-phone">
					{props.info.adoption_date ? "Adoption" : "Foster"} Phone Number:
					<div className="adopter-phone-value adoption-value value-align">
						{props.info.adopter_phone || props.info.foster_phone}
					</div>
				</li>
				{props.info.foster_address && (
					<li className="adoption-label adopter-phone">
						Foster Address:
						<div className="adopter-phone-value adoption-value value-align">
							{props.info.foster_address}
						</div>
					</li>
				)}

				<li className="adoption-label">
					{props.info.adoption_date ? "Adoption" : "Foster"} Country:
					<div className="adopter-country-value adoption-value value-align">
						{props.info.adopter_country || props.info.foster_country}
					</div>
				</li>
			</ul>
		</div>
	);
}
