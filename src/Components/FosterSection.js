import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

import DogsApiService from "../services/api-service";
import Encryption from "../Utils/encryption";

const FosterSection = ({ dogId, status, setUpdate, update }) => {
	const [foster, setFoster] = useState("");

	useEffect(() => {
		const getAdoption = async () => {
			if (status !== "Fostered") {
				return;
			}
			let data;
			const res = await DogsApiService.getFosterInfo(dogId);
			data = Encryption.decryptData(res.data);
			setFoster(data);
		};
		if (update) {
			setUpdate(false);
		}
		getAdoption();
	}, [dogId, update, setUpdate, status]);

	const formatDate = (date) => {
		let formattedDate = moment(date).format("LL");
		if (formattedDate === "Invalid date") {
			return "N/A";
		} else {
			return formattedDate;
		}
	};

	return (
		<FosterSectionStyles>
			<h3 className="foster-title">Foster</h3>
			<FosterContainerStyles>
				<FosterItemStyles>
					<li className="list-title name">
						Name
						<p className="list-title-value">{foster.foster_name}</p>
					</li>
					<li className="list-title status">
						Status
						<p className="list-title-value">
							{!foster.foster_completed_on ? "Ongoing" : "Completed"}
						</p>
					</li>
					<li className="list-title start">
						Start
						<p className="list-title-value">{formatDate(foster.foster_date)}</p>
					</li>
					<li className="list-title end">
						End
						<p className="list-title-value birthdate">
							{formatDate(foster.foster_completed_on)}
						</p>
					</li>
					<li className="list-title foster-contract">
						<button>View Contract</button>
					</li>
				</FosterItemStyles>
			</FosterContainerStyles>
		</FosterSectionStyles>
	);
};

const FosterSectionStyles = styled.div`
	overflow: hidden;
	.foster-title {
		text-align: left;
		margin: 10px 0px 10px 10px;
	}
`;

const FosterContainerStyles = styled.div`
	overflow: hidden;
	width: 100%;
`;

const FosterItemStyles = styled.ul`
	border-radius: 10px;
	background-color: #85c1ca;
	width: 90%;
	margin: 0 auto;
	height: 100%;
	padding: 5px;

	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 0.25fr 0.25fr 0.5fr;
	grid-template-areas:
		"name start"
		"status end"
		"foster-contract foster-contract";

	.foster-contract {
		grid-area: foster-contract;
		padding: 10px 0px;
	}
	.name {
		grid-area: name;
	}
	.start {
		grid-area: start;
	}
	.end {
		grid-area: end;
	}
	.status {
		grid-area: status;
	}

	.list-title {
		position: relative;
		color: #ffffff;
		font-size: 0.8rem;
		text-align: center;
		width: 100%;
	}
	.list-title-value {
		color: #ffffff;
		font-size: 1rem;
		font-weight: bold;
		text-align: center;
		width: 100%;
		margin: 0px;
	}
`;

export default FosterSection;
