import React, { Component } from 'react';
import moment from 'moment';
import NoteListItem from '../../Components/NoteListItem/NoteListItem';
import DogsApiService from '../../services/api-service';
import Validate from '../../Utils/validation';
import ValidationError from '../../Components/ValidationError/ValidationError';
import './Notes.css';

class Notes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			medical: [],
			additional: [],
			typeOfNote: '',
			text: {
				value: '',
				touched: false
			},
			error: null
		};
		this.formatDate = this.formatDate.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.handleDelete = this.handleDelete.bind(this);
	}

	formatDate(date) {
		const formattedDate = moment(date).format('MM/DD/YYYY');
		return formattedDate;
	}

	handleTextChange = str => {
		this.setState({
			text: { value: str, touched: true }
		});
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleDelete = noteId => {
		DogsApiService.deleteNote(noteId)
			.then(note => {
				DogsApiService.getDogNotes(this.props.dogId).then(note => {
					const medicalNotes = note.filter(
						n => n.type_of_note === 'medical'
					);
					const additionalNotes = note.filter(
						n => n.type_of_note === 'additional'
					);

					this.setState({
						medical: medicalNotes,
						additional: additionalNotes
					});
				});
			})
			.catch(error =>
				this.setState({
					error: `Something went wrong. Try again later.`
				})
			);
	};

	handleSubmit = e => {
		e.preventDefault();

		const { text, typeOfNote } = this.state;

		const newNote = {
			date_created: new Date(),
			notes: text.value,
			type_of_note: typeOfNote,
			dog_id: this.props.dogId
		};

		DogsApiService.insertNewNote(newNote)
			.then(note => {
				note.type_of_note === 'medical'
					? this.setState({
							medical: [...this.state.medical, note],
							typeOfNote: '',
							text: { value: '', touched: false }
					  })
					: this.setState({
							additional: [...this.state.additional, note],
							typeOfNote: '',
							text: { value: '', touched: false }
					  });
			})
			.catch(error =>
				this.setState({
					error: `Something went wrong. Try again later.`
				})
			);
	};

	componentDidMount() {
		DogsApiService.getDogNotes(this.props.dogId).then(note => {
			const medicalNotes = note.filter(n => n.type_of_note === 'medical');
			const additionalNotes = note.filter(
				n => n.type_of_note === 'additional'
			);

			this.setState({
				medical: medicalNotes,
				additional: additionalNotes
			});
		});
	}
	render() {
		const { medical, additional } = this.state;

		return (
			<main className="notes-container">
				<h2>Notes On {this.props.dogName}</h2>
				{this.state.error && (
					<h2>
						<ValidationError message={this.state.error} />
					</h2>
				)}
				<section className="notes-list-container">
					<div className="medical-container">
						<h3>Medical Notes</h3>
						{medical.map(n => (
							<NoteListItem
								dogName={this.props.dogName}
								dogId={this.props.dogId}
								key={n.id + 1}
								notes={n.notes}
								noteBy={n.note_updated_by}
								date={this.formatDate(n.date_created)}
								deleteNote={() => this.handleDelete(n.id)}
							/>
						))}
					</div>

					<div className="additional-container">
						<h3>Additional Notes</h3>
						{additional.map(n => (
							<NoteListItem
								dogName={this.props.dogName}
								dogId={this.props.dogId}
								key={n.id + 1}
								notes={n.notes}
								noteBy={n.note_updated_by}
								date={this.formatDate(n.date_created)}
								deleteNote={() => this.handleDelete(n.id)}
							/>
						))}
					</div>
				</section>
				<form onSubmit={this.handleSubmit}>
					<br />
					<select
						value={this.state.typeOfNote}
						name="typeOfNote"
						onChange={this.handleChange}
						className="note-types"
						required
					>
						<option value="">Choose Note Type</option>
						<option value="medical">Medical</option>
						<option value="additional">Additional</option>
					</select>

					<div className="text-area-container">
						<textarea
							className="notes-input"
							name="text"
							value={this.state.text.value}
							onChange={e =>
								this.handleTextChange(e.target.value)
							}
							required
						></textarea>
					</div>
					{this.state.text.touched && (
						<ValidationError
							message={Validate.validateNote(
								this.state.text.value
							)}
						/>
					)}
					<div className="nav-buttons">
						<button
							className="notes-button"
							onClick={() =>
								this.props.history.push(
									`/dog-info/${this.props.dogId}`
								)
							}
						>
							Back
						</button>
						<button
							className="notes-button"
							type="submit"
							disabled={
								this.state.text.touched &&
								Validate.validateNote(this.state.text.value)
							}
						>
							Add Note
						</button>
					</div>
				</form>
			</main>
		);
	}
}

export default Notes;
