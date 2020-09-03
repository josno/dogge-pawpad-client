import React from "react";
import styled from "styled-components";

import { FaSyringe, FaTrashAlt, FaInfoCircle } from "react-icons/fa";

const UpdateBar = (props) => {
	return (
		<UpdateBarStyles>
			<p> Selected Actions:</p>
			<ul>
				<li>
					<button onClick={() => props.onClick("status")}>
						<FaInfoCircle fill='white' size={"20px"} />
						<span className='button-text'>Update Status</span>
					</button>
				</li>
				<li>
					<button onClick={() => props.onClick("shot")}>
						<FaSyringe fill='white' size={"20px"} />
						<span className='button-text'>Update Shots</span>
					</button>
				</li>
				<li>
					<button onClick={() => props.onClick("delete")}>
						<FaTrashAlt fill='white' size={"20px"} />
						<span className='button-text'>Delete</span>
					</button>
				</li>
			</ul>
		</UpdateBarStyles>
	);
};

const UpdateBarStyles = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px;
	font-size: 0.8em;
	background-color: #00636f;
	position: absolute;
	top: 60px;
	width: 350px;
	top: 28%;
	left: 50%;
	margin-left: -175px;
	span {
		display: none;
	}
	p,
	ul {
		color: white;
		margin: 0px;
	}
	ul {
		display: flex;
		justify-content: space-evenly;
		text-align: left;
		align-items: center;
	}
	li {
		font-size: 0.8em;
		margin: 10px;
	}
	button {
		border: none;
		color: white;
		background-color: transparent;
	}
	button:focus {
		outline: none;
	}
`;

export default UpdateBar;
