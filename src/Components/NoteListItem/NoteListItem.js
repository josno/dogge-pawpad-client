import React from "react";

export default function NoteListItem({
	date,
	notes,
	noteBy,
	noteType,
	deleteNote,
	noteId,
}) {
	return (
		<div className="notes-list">
			<ul>
				<li className="note-item note-by">Created On: {date}</li>
				<li className="note-item note-details"> {notes}</li>
				<li className="note-item note-by">
					Written By: <span className="note-author">{noteBy}</span>
				</li>
				<li className="note-item note-by">Note Type: {noteType}</li>
				<button
					className="delete-note-button"
					onClick={() => deleteNote(noteId)}
				>
					Delete
				</button>
			</ul>
		</div>
	);
}
