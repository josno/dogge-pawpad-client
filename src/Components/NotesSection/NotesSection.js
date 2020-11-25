import React, { useState, useEffect, useLayoutEffect } from "react";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";

import NoteListItem from "../NoteListItem/NoteListItem";
import DogsApiService from "../../services/api-service";
import AddNoteForm from "../AddNoteForm";

import NewEditButtons from "../NewEditButtons/NewEditButtons";
import moment from "moment";

const NotesSection = ({ dogId }) => {
	const [notes, setNotes] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selected, setSelected] = useState("");

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

	const formatDate = (date) => {
		const formattedDate = moment(date).format("DD/MM/YYYY");
		return formattedDate;
	};

	const updateNotes = (n) => {
		setNotes([...notes, n]);
	};

	return (
		<NotesSectionStyles>
			<h3 className="notes-title">Notes</h3>
			<ul className="notes-filter">
				{["additional", "adoption", "medical", "archive", "foster", "all"].map(
					(t, index) => (
						<li key={index}>
							<button className={`${t}-title`} onClick={() => setSelected(t)}>
								{t}
							</button>
						</li>
					)
				)}
			</ul>
			<div className="notes-container">
				{notes.length > 0 &&
					notes
						.filter((n) =>
							!selected || selected === "all" ? n : n.type_of_note === selected
						)
						.map((n, index) => (
							<NoteListItem
								key={index}
								notes={n.notes}
								noteBy={n.note_updated_by}
								noteType={n.type_of_note}
								noteId={n.id}
								date={formatDate(n.date_created)}
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
					<AddNoteForm
						dogId={dogId}
						setModal={setModalIsOpen}
						updateNotes={updateNotes}
					/>
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

	.notes-container {
		max-height: 385px;
		overflow-y: scroll;
		padding: 10px 0px;
	}

	.notes-filter {
		display: flex;
		font-size: 0.7rem;
		padding: 0px 10px;
		flex-wrap: wrap;
		li button {
			border: 1px solid black;
			margin: 2px;

			background: black;
		}
		.all-title {
			color: white;
		}

		.additional-title {
			color: #bfd7ea;
		}
		.medical-title {
			color: #ff999c;
		}
		.adoption-title {
			color: #ff999c;
		}

		.foster-title {
			color: #caa6de;
		}

		.archive-title {
			color: #bcb9b3;
		}

		li button:hover {
			cursor: pointer;
			font-weight: bold;
		}
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
