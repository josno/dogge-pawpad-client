import React from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IoIosAddCircleOutline } from "react-icons/io";
import EditButtons from "../EditButtons/EditButtons";
import { FaTag } from "react-icons/fa";

import moment from "moment";

const ProfileSection = ({
	name,
	status,
	birthdate,
	gender,
	arrival,
	tag,
	profile_img,
	microchip,
	isEditting,
	handleProfileEdit,
	handleInputChange,
}) => {
	const formatDate = (date) => {
		let formattedDate = moment(date).format("LL");
		if (formattedDate === "N/A") {
			return moment(date, "DD-MM-YYYY").format("LL");
		} else {
			return formattedDate;
		}
	};

	return (
		<ProfileSectionStyles>
			<div className="img-container">
				<img src={profile_img} alt="dog" />
			</div>
			<h1 className="dog-name">{name}</h1>

			<div>
				{!isEditting ? (
					<form>
						<label className="profile-list-item">
							<span className="title">Status:</span>
							<input
								className="value input-value"
								value={status}
								type="text"
								onChange={() => handleInputChange()}
							/>
						</label>
						<label className="profile-list-item">
							<span className="title">Gender:</span>
							<input
								className="value input-value"
								value={gender}
								type="text"
								onChange={() => handleInputChange()}
							/>
						</label>
						<label className="profile-list-item">
							<span className="title">Birthdate:</span>
							<input value={birthdate} onChange={() => handleInputChange()} />
						</label>
						<label className="profile-list-item">
							<span className="title">Arrival:</span>
							<input
								className="value input-value"
								value={arrival}
								type="text"
								onChange={() => handleInputChange()}
							/>
						</label>
						<label className="profile-list-item">
							<span className="title">Tag:</span>
							<input
								className="value input-value"
								value={tag}
								type="text"
								onChange={() => handleInputChange()}
							/>
						</label>
						<label className="profile-list-item">
							<span className="title">Microchip:</span>
							<input
								className="value input-value"
								value={microchip}
								type="text"
								onChange={() => handleInputChange()}
							/>
						</label>
					</form>
				) : (
					<ul className="profile-details">
						<li className="profile-list-item">
							<span className="title">Status:</span>{" "}
							<span className="value">{status}</span>
						</li>
						<li className="profile-list-item">
							<span className="title">Gender: </span>
							<span className="value">{gender}</span>
						</li>
						<li className="profile-list-item">
							<span className="title">Birthdate:</span>
							<span className="value">{formatDate(birthdate)}</span>
						</li>
						<li className="profile-list-item">
							<span className="title">Arrival:</span>
							<span className="value">{formatDate(arrival)}</span>
						</li>
						<li className="profile-list-item">
							<span className="title">Tag:</span>
							<span className="value">{tag}</span>
						</li>
						<li className="profile-list-item">
							<span className="title">Microchip:</span>
							<span className="value">{microchip}</span>
						</li>
					</ul>
				)}
			</div>
		</ProfileSectionStyles>
	);
};

const ProfileSectionStyles = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 10px;

	align-items: center;
	.img-container {
		width: 80%;
		border-radius: 50%;
		border: 1px solid black;
		overflow: hidden;
	}
	img {
		width: 100%;
		height: auto;
	}
	.profile-list-item {
		font-size: 1rem;
		line-height: 2;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		gap: 10px 10px;
		grid-template-areas: "title value";

		.title {
			grid-area: title;
			text-align: right;
			font-weight: bold;
		}
		.value {
			grid-area: value;
			text-align: left;
		}
	}

	.input-value {
		margin: 2px;
	}

	.add-button {
		height: 2em;
		width: 2em;
		position: absolute;
		bottom: 2%;
		right: 5%;
	}

	@media (min-width: 1000px) {
		.profile-list-item {
			font-size: 1.3rem;
		}
	}
`;

export default ProfileSection;
