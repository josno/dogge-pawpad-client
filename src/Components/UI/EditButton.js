import React from "react";
import styled from "styled-components";

import { GrEdit, GrAddCircle } from "react-icons/gr";
import { FaRegCheckCircle, FaRegTimesCircle, FaTrashAlt } from "react-icons/fa";

const EditButton = ({ type, styles, handleClick, containerStyle }) => {
	return (
		<EditStyles containerStyle={containerStyle}>
			{type === "edit" ? (
				<GrEdit className={`${styles} icon`} onClick={() => handleClick()} />
			) : type === "add" ? (
				<GrAddCircle
					className={`${styles} icon`}
					onClick={() => handleClick()}
				/>
			) : type === "cancel" ? (
				<FaRegTimesCircle
					className={`${styles} icon`}
					onClick={() => handleClick()}
				/>
			) : type === "delete" ? (
				<FaTrashAlt
					className={`${styles} icon`}
					onClick={() => handleClick()}
				/>
			) : (
				<FaRegCheckCircle
					className={`${styles} icon`}
					onClick={() => handleClick()}
				/>
			)}
		</EditStyles>
	);
};

const EditStyles = styled.div`
	${(props) => (props.containerStyle ? props.containerStyle : "")};
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
