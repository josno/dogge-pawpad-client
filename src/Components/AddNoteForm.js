import React, { useState } from "react";

import styled from "styled-components";
import ValidationError from "./ValidationError/ValidationError";
import DogsApiService from "../services/api-service";
import Validate from "../Utils/validation";

const AddNoteForm = ({ setModal, dogId, updateNotes }) => {
	const [noteType, setNoteType] = useState("");
	const [text, setText] = useState({
		value: "",
		touched: false,
	});
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newNote = {
			date_created: new Date(),
			notes: text.value,
			type_of_note: noteType,
			dog_id: dogId,
		};

		const res = await DogsApiService.insertNewNote(newNote);
		updateNotes(res);
		setModal(false);
	};

	return (
		<AddNoteStyles>
			<h1 className="add-note-title">Add Note</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<br />
				<select
					value={noteType}
					name="typeOfNote"
					onChange={(e) => setNoteType(e.target.value)}
					className="note-types"
					required
				>
					<option value="">Choose Note Type</option>
					<option value="medical">Medical</option>
					<option value="additional">Additional</option>
					<option value="adoption">Adoption</option>
					<option value="archive">Foster</option>
					<option value="archive">Archive</option>
				</select>

				<div className="text-area-container">
					<textarea
						className="notes-input"
						name="text"
						value={text.value}
						onChange={(e) => setText({ value: e.target.value, touched: true })}
						required
					/>
				</div>
				{text.touched && (
					<ValidationError message={Validate.validateNote(text.value)} />
				)}
				<div className="nav-buttons">
					<button
						className="notes-button"
						type="submit"
						disabled={text.touched && Validate.validateNote(text.value)}
					>
						Add Note
					</button>
				</div>
			</form>
		</AddNoteStyles>
	);
};

const AddNoteStyles = styled.div`
	width: 80vw;
	.add-note-title {
		margin-bottom: 0px;
	}
	.note-types {
		border: 2px solid black;
		font-size: 0.8em;
		height: 30px;
		margin: 10px;
		text-align: center;
		width: 200px;
	}

	.notes-input {
		border: 2px solid black;
		display: block;
		font-size: 0.9em;
		margin-left: auto;
		margin-right: auto;
		padding: 10px;
		width: 100%;
		height: 200px;
	}

	@media (min-width: 1000px) {
		width: 30vw;
	}
`;

export default AddNoteForm;
