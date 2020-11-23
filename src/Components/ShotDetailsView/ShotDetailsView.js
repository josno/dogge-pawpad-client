import React from "react";
import moment from "moment";

const ShotDetailsView = ({ shots, spayedNeutered }) => {
	const formatDate = (date) => {
		let formattedDate = moment(date).format("LL");
		if (formattedDate === "Invalid date") {
			return "Not Available";
		} else {
			return formattedDate;
		}
	};

	const renderShots = (shot) => {
		return (
			<li className="shot-checkbox" key={shot.shot_name + "-one"}>
				{shot.shot_iscompleted ? (
					<span className="indicator-yes">&#10004; </span>
				) : (
					<span className="indicator-no">&#10008; </span>
				)}
				{shot.shot_name}
				<span className="last-shot-text">
					Date Completed: {formatDate(shot.shot_date)}
				</span>
			</li>
		);
	};

	return (
		<ul className="dog-info-text shot-container">
			<div>
				{spayedNeutered ? (
					<span className="indicator-yes">&#10004; </span>
				) : (
					<span className="indicator-no">&#10008; </span>
				)}
				Spayed/Neutered
			</div>
			{shots &&
				shots
					.sort((a, b) => (a.shot_name > b.shot_name ? 1 : -1))
					.map((i, index) => <div key={index}>{renderShots(i)}</div>)}
		</ul>
	);
};

export default ShotDetailsView;
