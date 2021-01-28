import React, { useState } from "react";

import styled from "styled-components";

import EditButton from "../UI/EditButton";
import DatePicker from "react-datepicker";

const EditShotInput = ({
	id,
	shotName,
	shotDate,
	handleUpdateDateChange,
	removeShotDate,
}) => {
	const initialState = !shotDate ? "" : new Date(shotDate);
	const [input, setInput] = useState(initialState);

	const updateInput = (date) => {
		handleUpdateDateChange(shotName, date, id);
		setInput(date);
	};

	return (
		<EditShotInputStyle key={id}>
			<label htmlFor={id}>
				<EditButton
					styles="edit-date-btn"
					type="delete"
					handleClick={() => removeShotDate(id)}
					containerStyle={{ display: "inline" }}
				/>
				{shotName}

				{/* <span className="shot-date-text">
					{Format.formatDateInput(shotDate)}{" "}
				</span> */}

				<DatePicker
					dateFormat="dd/MM/yyyy"
					placeholderText="Select New Date"
					className="edit-shot-date-input"
					selected={input}
					onChange={(date) => updateInput(date)}
				/>
			</label>
		</EditShotInputStyle>
	);
};

const EditShotInputStyle = styled.li`
	display: block;
	text-align: left;
	margin: 10px 0px;

	.edit-shot-date-input {
		font-size: 0.8em;
		height: 40px;
		padding-left: 15px;
		width: 100%;
	}

	.edit-date-btn {
		display: inline;
		margin: 0px 0px 0px 5px;
		height: 0.8em;
		width: 0.8em;
	}

	.shot-date-text {
		font-size: 0.8em;
		font-style: italic;
		font-weight: bold;
		display: flex;
		flex-direction: row;
	}
`;

export default EditShotInput;
