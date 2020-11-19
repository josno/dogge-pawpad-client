import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DogListItem = ({ info, onChange, checked, formatDate }) => {
	const { dog_name, dog_status, gender, age, tag_number, profile_img } = info;
	return (
		<DogListStyles>
			<Link className="link" to={`/dog-info/${info.id}`} />
			<DogImgStyles>
				<input
					type="checkbox"
					className="dog-selection-checkbox"
					checked={checked}
					onChange={() => onChange(info.id)}
				/>
				<img className="dog-list-img" alt={`${dog_name}`} src={profile_img} />

				<p className="dogs-list-name">{dog_name}</p>
			</DogImgStyles>
			<DetailContainerStyles>
				<li className="list-title">
					Name
					<p className="list-title-value">{dog_name}</p>
				</li>
				<li className="list-title">
					Status
					<p className="list-title-value">{dog_status}</p>
				</li>
				<li className="list-title">
					Gender
					<p className="list-title-value">{gender}</p>
				</li>
				<li className="list-title">
					Birthdate
					<p className="list-title-value birthdate">{formatDate(age)}</p>
				</li>
				<li className="list-title">
					Tag Number
					<p className="list-title-value">
						{tag_number.length <= 1 ? "N/A" : tag_number}
					</p>
				</li>
			</DetailContainerStyles>
		</DogListStyles>
	);
};

const DogListStyles = styled.li`
	margin: 20px;
	position: relative;

	.link {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0%;
		right: 0%;
		z-index: 1;
	}

	@media (min-width: 1200px) {
		width: 100%;
		display: flex;
		border-radius: 10px;
		background-color: #85c1ca;
		overflow: hidden;
		box-shadow: 3px 3px 12px rgb(0, 0, 0, 0.3);
		.item-inner-container {
			width: 100%;
			border: 1px solid black;
			display: flex;
		}
	}
`;

const DogImgStyles = styled.div`
	position: relative;
	height: 200px;
	border: 2px solid black;

	.dog-img-container:active {
		box-shadow: none;
	}

	.dog-list-img {
		width: 200px;
		height: 100%;
		object-fit: cover;
	}
	.dogs-list-name {
		color: #fcfcfc;
		background-color: #011627;
		font-size: 24px;
		font-weight: bolder;
		height: 40px;
		line-height: 40px;
		position: relative;
		top: -71px;
	}

	input.dog-selection-checkbox {
		position: absolute;
		left: 2%;
		top: 2%;
		border: 1px solid black;
		border-radius: 10px;
		width: 20px;
		height: 20px;
		z-index: 2;
	}

	@media (min-width: 1200px) {
		box-shadow: none;
		border: 0px;
		.dogs-list-name {
			display: none;
		}
	}
`;

const DetailContainerStyles = styled.ul`
	display: none;
	@media (min-width: 1200px) {
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 100%;
		padding: 20px;

		.list-title {
			position: relative;
			color: #ffffff;
			font-size: 1.5rem;
			text-align: center;
			width: 100%;
		}
		.list-title-value {
			position: absolute;
			color: #ffffff;
			font-size: 1.7rem;
			font-weight: bold;
			text-align: center;
			width: 100%;
		}
	}
`;

export default DogListItem;
