import React from "react";
import styled from "styled-components";

import { GrEdit, GrAddCircle } from "react-icons/gr";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const EditButton = ({ type, style, handleClick }) => {
	return (
		<EditStyles>
			{type === "edit" ? (
				<GrEdit className={`${style} icon`} onClick={() => handleClick()} />
			) : type === "add" ? (
				<GrAddCircle
					className={`${style} icon`}
					onClick={() => handleClick()}
				/>
			) : type === "cancel" ? (
				<FaRegTimesCircle
					className={`${style} icon`}
					onClick={() => handleClick()}
				/>
			) : (
				<FaRegCheckCircle
					className={`${style} icon`}
					onClick={() => handleClick()}
				/>
			)}
		</EditStyles>
	);
};

const EditStyles = styled.div`
	.icon {
		margin: 5px;
		:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
		path {
			stroke: #1f8392;
		}
		fill: #1f8392;
	}
`;

export default EditButton;
