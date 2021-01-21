import React from "react";
import styled from "styled-components";
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
			<li key={shot.shot_name + "-one"}>
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
		<ShotDetailsStyles>
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
		</ShotDetailsStyles>
	);
};

const ShotDetailsStyles = styled.ul`
	line-height: 25px;
	margin: 20px;
	text-align: left;

	.indicator-no {
		color: #872f44;
	}

	.indicator-yes {
		color: #306b34;
	}

	.last-shot-text {
		display: block;
		padding-left: 30px;
		font-size: 0.75em;
		margin: 0px;
	}

	@media (min-width: 1200px) {
		font-size: 0.8em;
	}
`;

export default ShotDetailsView;
