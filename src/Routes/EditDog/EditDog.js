import React, { Component } from 'react';
import PawPadContext from '../../PawPadContext.js';
import './EditDog.css';
import { Link } from 'react-router-dom';
import DogsApiService from '../../services/api-service';
import EditShots from '../../Components/EditShots/EditShots';
import moment from 'moment';
import Validate from '../../Utils/validation';
import ValidationError from '../../Components/ValidationError/ValidationError';

class EditDog extends Component {
	static contextType = PawPadContext;
	constructor(props) {
		super(props);
		this.state = {
			dogName: '',
			profileImg: '',
			spayedNeutered: false,
			gender: '',
			age: { value: '', touched: false },
			arrivalDate: '',
			updatedBy: '',
			error: ''
		};
		this.formatDate = this.formatDate.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateAge = this.updateAge.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	formatDate = date => {
		const formattedDate = moment(date).format('YYYY-MM-DD');

		return formattedDate;
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	updateAge(age) {
		this.setState({
			age: { value: age, touched: true }
		});
	}

	handleCheckbox = e => {
		const { name } = e.target;

		this.setState(prevState => ({
			[name]: !prevState[name]
		}));
	};

	handleSubmit = e => {
		e.preventDefault();
		const {
			dogName,
			profileImg,
			spayedNeutered,
			gender,
			arrivalDate
		} = this.state;

		const updatedDogObj = {
			dog_name: dogName,
			profile_img: profileImg,
			spayedneutered: spayedNeutered,
			gender: gender,
			age: this.state.age.value,
			arrival_date: new Date(arrivalDate)
		};

		DogsApiService.updateDog(updatedDogObj, this.props.dogId)
			.then(res =>
				this.props.history.push(`/dog-info/${this.props.dogId}`)
			)
			.catch(error => this.setState({ error: error.message }));
	};

	componentDidMount() {
		window.scrollTo(0, 0);
		const { dogId } = this.props;

		DogsApiService.getDogInfo(dogId).then(dogInfo => {
			this.setState({
				dogName: dogInfo.dog_name,
				profileImg: dogInfo.profile_img,
				spayedNeutered: dogInfo.spayedneutered,
				gender: dogInfo.gender,
				age: { value: dogInfo.age, touched: false },
				arrivalDate: dogInfo.arrival_date
			});
		});
	}

	render() {
		return (
			<main className="edit-dog-container">
				<h1 className="form-title">Edit Dog</h1>
				<form className="form-container" onSubmit={this.handleSubmit}>
					<div className="dog-name-photo">
						<h1 htmlFor="name">{this.state.dogName}</h1>
						<img
							id="img-preview"
							src={this.state.profileImg}
							alt="your-pic"
						/>
					</div>
					<h3 className="form-title">Update Information Below </h3>
					<fieldset className="field-item">
						<legend className="bold">Gender:</legend>
						<label htmlFor="male">
							<input
								type="radio"
								name="gender"
								value="Male"
								onChange={this.handleChange}
								id="male"
								checked={
									this.state.gender === 'Male' ? true : false
								}
								required
							/>
							Male
						</label>
						<label htmlFor="female">
							<input
								type="radio"
								name="gender"
								value="Female"
								onChange={this.handleChange}
								id="female"
								checked={
									this.state.gender === 'Female'
										? true
										: false
								}
							/>
							Female
						</label>
					</fieldset>

					<label htmlFor="estimated-age" className="bold">
						Estimated Age
					</label>
					<input
						className="block"
						id="age"
						type="text"
						name="age"
						value={this.state.age.value}
						onChange={e => this.updateAge(e.target.value)}
						required
					/>

					{this.state.age.touched && (
						<ValidationError
							message={Validate.validateAge(this.state.age.value)}
						/>
					)}

					<label htmlFor="arrival" className="bold">
						Estimated Arrival
					</label>
					<input
						className="block"
						id="arrival"
						type="date"
						name="arrivalDate"
						value={this.formatDate(this.state.arrivalDate)}
						onChange={this.handleChange}
					/>

					<EditShots
						key={this.props.dogId}
						dogId={this.props.dogId}
					/>

					<fieldset className="field-item">
						<legend className="bold">Spayed/Neutered</legend>
						<label htmlFor="yes">
							<input
								id="yes"
								type="radio"
								name="spayedNeutered"
								checked={
									this.state.spayedNeutered ? true : false
								}
								onChange={this.handleCheckbox}
							/>
							Yes
						</label>

						<label htmlFor="no">
							<input
								id="no"
								type="radio"
								name="spayedNeutered"
								checked={
									this.state.spayedNeutered ? false : true
								}
								onChange={this.handleCheckbox}
							/>
							No
						</label>
					</fieldset>

					<div className="form-buttons">
						{this.state.error.length > 0 ? (
							<ValidationError
								message={
									'Something wrong happened. Refresh and try again.'
								}
							/>
						) : (
							''
						)}
						<button className="cancel" type="submit">
							<Link className="dog-link" to={'/dogs-list'}>
								Cancel
							</Link>
						</button>

						<button
							className="submit"
							type="submit"
							disabled={Validate.validateAge(
								this.state.age.value
							)}
						>
							Submit
						</button>
					</div>
				</form>
			</main>
		);
	}
}

export default EditDog;
