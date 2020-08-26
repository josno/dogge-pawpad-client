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
					value={this.props.id}
					type='checkbox'
					className='dog-selection-checkbox'
				/>
				<Link className='dogs-list-button' to={`/dog-info/${this.props.id}`}>
					<div className='dog-img-container'>
						<img
							className='dog-list-img'
							alt='Winky Doggo'
							src={this.props.img}
						/>
						<p className='dogs-list-name'>{this.props.name}</p>
					</div>
				</Link>
			</DogListStyles>
		);
	}
}

const DogListStyles = styled.li`
	margin: 20px;

	.dog-img-container {
		width: 100%;
		height: 200px;
		box-shadow: 10px 10px #5d576b;
		border: 2px solid black;
	}

	.dog-img-container:active {
		box-shadow: none;
	}

	.dog-list-img {
		width: 200px;
		height: 100%;
		object-fit: cover;
	}

	.dog-selection-checkbox {
		position: relative;
		right: 42%;
		top: 30px;
		border: 1px solid black;
		border-radius: 10px;
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

export default DogListItem;
