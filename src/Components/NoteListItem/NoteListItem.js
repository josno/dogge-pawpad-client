import React from "react";
import styled from "styled-components";

export default function NoteListItem({
	date,
	notes,
	noteBy,
	noteType,
	deleteNote,
	noteId,
}) {
	const typeColor = {
		additional: "#BFD7EA",
		adoption: "#FFE570",
		foster: "#CAA6DE",
		medical: "#FF999C",
		archive: "#BCB9B3",
	};
	return (
		<NotesListStyles typeColor={typeColor} noteType={noteType}>
			<div className="note-item note-details"> {notes}</div>

			<ul className="note-list">
				<li className="note-item note-by">
					By: <span className="note-author">{noteBy}</span>
				</li>
				<li className="note-item note-by">Written On: {date}</li>
				<li className={"note-item note-by"}>Note Type: {noteType}</li>
			</ul>

			<button className="delete-note-button" onClick={() => deleteNote(noteId)}>
				Delete
			</button>
		</NotesListStyles>
	);
}

const NotesListStyles = styled.div`
	background-color: ${(props) =>
		props.noteType === "additional"
			? props.typeColor.additional
			: props.noteType === "medical"
			? props.typeColor.medical
			: props.noteType === "adoption"
			? props.typeColor.adoption
			: props.noteType === "archive"
			? props.typeColor.archive
			: props.typeColor.foster};
	position: relative;
	margin: 10px;
	padding: 0.5rem;
	height: fit-content;
	border-radius: 10px;

	.note-item {
		text-align: left;
	}
	.note-by {
		font-style: italic;
		font-size: 0.8em;
	}

	.delete-note-button {
		border: 2px solid black;
		font-size: 0.8em;
		font-weight: bold;
		height: 30px;
		width: 6rem;
		transition: 0.2s ease-in-out;
		position: absolute;
		bottom: 10%;
		right: 10%;
	}

	.delete-note-button:hover {
		background-color: #c81d25;
		color: white;
		cursor: pointer;
		transform: scale(1.2);
	}

	@media (min-width: 1000px) {
		font-size: 1rem;
	}
`;
