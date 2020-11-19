import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DogListItem = (props) => {
	return (
		<DogListStyles>
			<Link className="link" to={`/dog-info/${props.id}`} />
			<DogImgStyles>
				<input
					type="checkbox"
					className="dog-selection-checkbox"
					checked={props.checked}
					onChange={() => props.onChange(props.id)}
				/>
				<img className="dog-list-img" alt={`${props.name}`} src={props.img} />

				<p className="dogs-list-name">{props.name}</p>
			</DogImgStyles>
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
		padding: 1rem;
		background-color: #85c1ca;

		.item-inner-container {
			width: 100%;
			border: 1px solid black;
			display: flex;
		}
	}
`;

const DogImgStyles = styled.div`
	position: relative;
	width: 100%;
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

export default DogListItem;
