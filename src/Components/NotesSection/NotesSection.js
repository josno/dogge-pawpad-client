import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";

import NoteListItem from "../NoteListItem/NoteListItem";
import DogsApiService from "../../services/api-service";
import AddNoteForm from "../AddNoteForm";

import NewEditButtons from "../NewEditButtons/NewEditButtons";

const NotesSection = ({ dogId }) => {
	const [notes, setNotes] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		async function getNotes() {
			const res = await DogsApiService.getDogNotes(dogId);
			setNotes([...res]);
		}
		getNotes();
	}, [dogId]);

	const handleDelete = async (noteId) => {
		await DogsApiService.deleteNote(noteId);
		const updatedNotes = await DogsApiService.getDogNotes(dogId);
		setNotes([...updatedNotes]);
	};
	return (
		<NotesSectionStyles>
			<h3 className="notes-title">Notes</h3>
			<div className="notes-container">
				{notes.length > 0 &&
					notes.map((n, index) => (
						<NoteListItem
							key={index}
							notes={n.notes}
							noteBy={n.note_updated_by}
							noteType={n.type_of_note}
							noteId={n.id}
							// date={this.formatDate(n.date_created)}
							deleteNote={(id) => handleDelete(id)}
						/>
					))}
				<EditContainerStyles>
					{!modalIsOpen ? (
						<NewEditButtons
							type="add"
							handleClick={() => setModalIsOpen(!modalIsOpen)}
						/>
					) : (
						<>
							<NewEditButtons
								type="submit"
								handleClick={() => console.log("submitted")}
							/>
							<NewEditButtons
								type="cancel"
								handleClick={() => setModalIsOpen(!modalIsOpen)}
							/>
						</>
					)}
				</EditContainerStyles>
				<Modal
					open={modalIsOpen}
					onClose={() => setModalIsOpen(!modalIsOpen)}
					center
				>
					<AddNoteForm dogId={dogId} setModal={() => setModalIsOpen(false)} />
				</Modal>
			</div>
		</NotesSectionStyles>
	);
};

const NotesSectionStyles = styled.div`
	.notes-title {
		text-align: left;
		margin: 10px 0px 10px 10px;
	}
`;

const EditContainerStyles = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	padding-right: 10px;
	position: absolute;
	top: 10px;
`;

export default NotesSection;
