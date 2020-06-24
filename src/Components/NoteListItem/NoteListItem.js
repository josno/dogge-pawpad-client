import React from "react";

export default function NoteListItem(props) {
	return (
		<div className='notes-list'>
			<ul>
				<li className='note-item note-by'>Created On: {props.date}</li>
				<li className='note-item note-details'> {props.notes}</li>
				<li className='note-item note-by'>
					Written By: <span className='note-author'>{props.noteBy}</span>
				</li>
				<li className='note-item note-by'>Note Type: {props.noteType}</li>
				<button className='delete-note-button' onClick={props.deleteNote}>
					Delete
				</button>
			</ul>
		</div>
	);
}
