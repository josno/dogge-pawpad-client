import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class DogListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<DogListStyles>
				<input
					type='checkbox'
					className='dog-selection-checkbox'
					onChange={(id) => this.props.onChange(this.props.id)}
				/>
				<span className='circle-checkbox' />
				<Link className='dogs-list-button' to={`/dog-info/${this.props.id}`}>
					{this.props.children}
				</Link>
			</DogListStyles>
		);
	}
}

const DogListStyles = styled.li`
	margin: 20px;

	// .dog-img-container {
	// 	width: 100%;
	// 	height: 200px;
	// 	box-shadow: 10px 10px #5d576b;
	// 	border: 2px solid black;
	// }

	// .dog-img-container:active {
	// 	box-shadow: none;
	// }

	// .dog-list-img {
	// 	width: 200px;
	// 	height: 100%;
	// 	object-fit: cover;
	// }

	input.dog-selection-checkbox {
		position: relative;
		right: 42%;
		top: 30px;
		border: 1px solid black;
		border-radius: 10px;
	}

	// .dogs-list-name {
	// 	color: #fcfcfc;
	// 	background-color: #011627;
	// 	font-size: 24px;
	// 	font-weight: bolder;
	// 	height: 40px;
	// 	line-height: 40px;
	// 	position: relative;
	// 	top: -71px;
	// }
`;

export default DogListItem;
