import React from "react";
import "./FosterAdopDetails.css";
import moment from "moment";

export default function FosterAdopDetails({ status, info, dogName }) {
	const formatDate = (date) => {
		const formattedDate = moment(date).format("LL");
		return formattedDate;
	};

	return (
		<div className="adoption-details-container">
			<h3 className="info-title">
				{status === "Adopted" ? "Adoption" : "Foster"} Date Details: {dogName}{" "}
			</h3>
			<ul className="adoption-info-text">
				<li className="adoption-label adoption-date">
					{info.adoption_date ? "Adoption" : "Foster"} Date
					<div className="adopter-date-value adoption-value value-align">
						{formatDate(info.adoption_date || info.foster_date)}
					</div>
				</li>
				{info.foster_completed_on && (
					<li className="adoption-label adoption-date">
						Foster Completed Date
						<div className="adopter-date-value adoption-value value-align">
							{formatDate(info.foster_completed_on)}
						</div>
					</li>
				)}
				<li className="adoption-label adopt-name">
					{info.adoption_date ? "Adoption" : "Foster"} Name:
					<div className="adopter-name-value adoption-value value-align ">
						{info.adopter_name || info.foster_name}
					</div>
				</li>

				<li className="adoption-label adopter-email">
					{info.adoption_date ? "Adoption" : "Foster"} Email:
					<div className="adopter-email-value adoption-value value-align">
						{info.adopter_email || info.foster_email}
					</div>
				</li>

				<li className="adoption-label adopter-phone">
					{info.adoption_date ? "Adoption" : "Foster"} Phone Number:
					<div className="adopter-phone-value adoption-value value-align">
						{info.adopter_phone || info.foster_phone}
					</div>
				</li>
				{info.foster_address && (
					<li className="adoption-label adopter-phone">
						Foster Address:
						<div className="adopter-phone-value adoption-value value-align">
							{info.foster_address}
						</div>
					</li>
				)}

				<li className="adoption-label">
					{info.adoption_date ? "Adoption" : "Foster"} Country:
					<div className="adopter-country-value adoption-value value-align">
						{info.adopter_country || info.foster_country}
					</div>
				</li>
			</ul>
		</div>
	);
}
