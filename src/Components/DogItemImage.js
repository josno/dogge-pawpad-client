import React from "react";

import styled from "styled-components";

const DogItemImage = (props) => {
	return (
		<DogImgStyles>
			<img className='dog-list-img' alt={`${props.name}`} src={props.img} />
			<p className='dogs-list-name'>{props.name}</p>
		</DogImgStyles>
	);
};

const DogImgStyles = styled.div`
	width: 100%;
	height: 200px;
	box-shadow: 10px 10px #5d576b;
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
`;

export default DogItemImage;
