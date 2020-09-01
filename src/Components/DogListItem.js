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
					checked={this.props.checked}
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

	input.dog-selection-checkbox {
		position: relative;
		right: 42%;
		top: 30px;
		border: 1px solid black;
		border-radius: 10px;
	}
`;

export default DogListItem;
