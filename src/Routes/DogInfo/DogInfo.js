import React, { Component } from 'react';
import PawPadContext from '../../PawPadContext.js';
import { Link } from 'react-router-dom';
import DogsApiService from '../../services/api-service';
import './DogInfo.css';
import moment from 'moment';

class DogInfo extends Component {
	static contextType = PawPadContext;
	constructor(props) {
		super(props);
		this.state = {
			dogInfo: ''
		};
		this.formatDate = this.formatDate.bind(this);
		this.renderSpayedNeutered = this.renderSpayedNeutered.bind(this);
		this.renderShotsCompleted = this.renderShotsCompleted.bind(this);
	}

	formatDate(date) {
		const formattedDate = moment(date).format('LL');
		return formattedDate;
	}

	renderSpayedNeutered(boolean) {
		if (boolean) {
			return (
				<>
					<span className="indicator-yes">&#10004; </span>
					Spayed/Neutered
				</>
			);
		} else {
			return (
				<>
					<span className="indicator-no"> &#10008; </span>
					Spayed/Neutered
				</>
			);
		}
	}

	renderShotsCompleted(list) {
		const check = list.map(i => {
			if (i.shot_iscompleted === false) {
				return (
					<li className="shot-checkbox" key={i.shot_name + 'one'}>
						<span className="indicator-no">&#10008; </span>
						{i.shot_name}
					</li>
				);
			}
			return (
				<li className="shot-checkbox" key={i.shot_name + 'one'}>
					<span className="indicator-yes">&#10004; </span>{' '}
					{i.shot_name}
					<span className="last-shot-text">
						Last {i.shot_name} Date: <br />
						{this.formatDate(i.shot_date)}
					</span>
				</li>
			);
		});

		return check;
	}

	async componentDidMount() {
		const { dogId } = this.props;
		await DogsApiService.getDogInfo(dogId).then(response =>
			this.setState({
				dogInfo: response,
				shots: this.renderShotsCompleted(response.shotsCompleted)
			})
		);
	}

	render() {
		const { dogInfo, shots } = this.state;

		return (
			<main className="dog-info">
				<div className="grid-container">
					<div className="dog-name">
						<h1 className="dog-name-text">{dogInfo.dog_name}</h1>
					</div>

					<div className="dog-img">
						<img
							alt="dog-name"
							className="info-img"
							src={dogInfo.profile_img}
						/>
					</div>

					<div className="basic-dog-details box-flex">
						<h3 className="info-title">Basic Details </h3>
						<ul className="dog-info-text">
							<li>Gender: {dogInfo.gender}</li>
							<li>Estimated Age: {dogInfo.age}</li>
							<li>
								Estimated Arrival:{' '}
								{this.formatDate(dogInfo.arrival_date)}
							</li>
							<li>Tag Number: {dogInfo.tag_number}</li>
							<li>Microchip Number: {dogInfo.microchip}</li>
							<li>
								{this.renderSpayedNeutered(
									dogInfo.spayedneutered
								)}
							</li>
						</ul>
					</div>

					<div className="shots-information box-flex">
						<h3 className="info-title">Shots Completed</h3>
						<ul className="dog-info-text shot-container">
							{shots}
						</ul>
					</div>
				</div>
				{!dogInfo.updated_by ? (
					''
				) : (
					<div className="updated-by">
						<p>
							Updated by {dogInfo.updated_by} on{' '}
							{this.formatDate(dogInfo.notes_date_modified)}
						</p>
					</div>
				)}
				<div className="nav-buttons">
					<button className="go-back">
						<Link className="dog-link" to={'/dogs-list'}>
							Back To List
						</Link>
					</button>

					<button className="see-notes">
						<Link
							className="dog-link"
							to={`/notes-${dogInfo.dog_name}/${dogInfo.id}`}
						>
							Notes On {dogInfo.dog_name}
						</Link>
					</button>

					<button className="edit cancel">
						<Link
							className="dog-link"
							to={`/edit-dog/${this.props.dogId}`}
						>
							Edit Information
						</Link>
					</button>
				</div>
			</main>
		);
	}
}

export default DogInfo;
