import React from "react";
import styled from "styled-components";

const Button = ({ active, styles, handleClick, children }) => {
	return (
		<ButtonStyles disabled={active} style={{ ...styles }} onClick={handleClick}>
			{children}
		</ButtonStyles>
	);
};

const ButtonStyles = styled.button`
	border: 2px solid #009fb7;
	border-radius: 20px;
	padding: 7px 10px;
	background-color: white;
	color: #009fb7;
	font-weight: bold;
	box-shadow: 1px 3px 5px #c4c4c4;
	font-size: 0.8em;
	transition-duration: 0.2s;
	:hover {
		background-color: #dbe1e2;
		cursor: pointer;
	}
	:active {
		box-shadow: none;
		transform: translateY(1px);
	}
	:focus {
		border: 2px solid white;
	}
`;

export default Button;
