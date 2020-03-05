import React, { Component } from 'react';
import PawPadContext from '../../PawPadContext.js';
import { Link } from 'react-router-dom';
import DogsApiService from '../../services/api-service';
import './AddNewDog.css';
import ValidationError from '../../Components/ValidationError/ValidationError';
import Validate from '../../Utils/validation';

class AddNewDog extends Component {
	static contextType = PawPadContext;
	constructor(props) {
		super(props);
		this.state = {
			dogName: { value: '', touched: false },
			profileImgPreview: '',
			profileImg: '',
			spayedneutered: false,
			rabies: '',
			complexOne: '',
			complexTwo: '',
			gender: '',
			loading: false,
			age: { value: '', touched: false },
			arrivalDate: '',
			error: ''
		};
		this.handleImgChange = this.handleImgChange.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setShotsObject = this.setShotsObject.bind(this);
	}

	handleImgChange = e => {
		this.setState({
			profileImgPreview: URL.createObjectURL(e.target.files[0]),
			profileImg: e.target.files[0]
		});
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	updateAge(str) {
		const age = str.trim();
		this.setState({
			age: { value: age, touched: true }
		});
	}

	updateName(str) {
		const name = str.trim();
		this.setState({
			dogName: { value: name, touched: true }
		});
	}

	handleCheckbox = e => {
		const { name } = e.target;

		this.setState(prevState => ({
			[name]: !prevState[name]
		}));
	};

	setShotsObject = () => {
		const { rabies, complexOne, complexTwo } = this.state;
		const shots = [
			{
				shot_name: 'Rabies',
				shot_date: rabies.length > 0 ? rabies : null,
				dog_id: ''
			},
			{
				shot_name: 'Complex I',
				shot_date: complexOne.length > 0 ? complexOne : null,
				dog_id: ''
			},
			{
				shot_name: 'Complex II',
				shot_date: complexTwo.length > 0 ? complexTwo : null,
				dog_id: ''
			}
		];

		shots.forEach(i => {
			if (i.shot_date !== null) {
				i.shot_iscompleted = true;
			} else {
				i.shot_iscompleted = false;
			}
		});

		return shots;
	};

	handleSubmit = e => {
		e.preventDefault();
		const { profileImg, spayedNeutered, gender, arrivalDate } = this.state;
		const allCompletedShots = this.setShotsObject();
		console.log(allCompletedShots);

		const newDog = [
			{ dog_name: this.state.dogName.value },
			{ spayedneutered: spayedNeutered },
			{ gender: gender },
			{ age: this.state.age.value },
			{ arrival_date: arrivalDate }
		];

		const formData = new FormData(); //need to create and submit multi-part because of img

		formData.append('profile_img', profileImg);

		newDog.forEach(i => {
			formData.append(Object.keys(i), Object.values(i));
		});

		this.setState({
			loading: true
		});

		DogsApiService.insertNewDog(formData)
			.then(res => {
				allCompletedShots.map(i => (i.dog_id = res.id));

				allCompletedShots.map(shot =>
					DogsApiService.insertNewShot(shot)
				);
			})
			.then(res => this.props.history.push('/dogs-list'))
			.catch(error => {
				this.setState({ error: error.message });
			});
	};

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		let imgStyle = { display: 'none' };

		if (this.state.profileImgPreview.length > 0) {
			imgStyle = {
				display: 'block'
			};
		}

		return (
			<main className="add-dog-container">
				<h1 className="form-title">Add New Dog</h1>

				<form className="form-container" onSubmit={this.handleSubmit}>
					<div className="field-item">
						<label htmlFor="name" className="bold">
							Name
						</label>
						<input
							id="name"
							type="text"
							name="dogName"
							className="block"
							onChange={e => this.updateName(e.target.value)}
							required
						/>
						{this.state.dogName.touched && (
							<ValidationError
								message={Validate.validateName(
									this.state.dogName.value
								)}
							/>
						)}
					</div>
					<div className="field-item">
						<label htmlFor="image" className="bold">
							Image
						</label>
						<input
							className="block"
							type="file"
							name="profileImg"
							onChange={this.handleImgChange}
							accept="image/*"
							required
						/>
						<img
							id="img-preview"
							src={this.state.profileImgPreview}
							alt="your-pic"
							style={imgStyle}
						/>
					</div>

					<fieldset className="field-item">
						<legend className="bold">Gender</legend>
						<label htmlFor="male">
							<input
								type="radio"
								name="gender"
								value="Male"
								onChange={this.handleChange}
								id="male"
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
						onChange={e => this.updateAge(e.target.value)}
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
						onChange={this.handleChange}
						required
					/>

					<fieldset className="field-item">
						<legend className="bold">Spayed/Neutered </legend>
						<label htmlFor="yes">
							<input
								id="yes"
								type="radio"
								name="spayedNeutered"
								onChange={this.handleCheckbox}
								required
							/>
							Yes
						</label>

						<label htmlFor="no">
							<input
								id="no"
								type="radio"
								name="spayedNeutered"
								onChange={this.handleCheckbox}
							/>
							No
						</label>
					</fieldset>

					<fieldset className="field-item ">
						<legend className="bold">
							Required Shots Completed
						</legend>

						<label htmlFor="rabies">
							Rabies{' '}
							<input
								className="shot-date-input"
								id="rabies"
								type="date"
								name="rabies"
								value={this.state.rabies}
								onChange={this.handleChange}
							/>
						</label>

						<label htmlFor="complexOne">
							Complex I
							<input
								className="shot-date-input"
								id="complexOne"
								type="date"
								name="complexOne"
								value={this.state.complexOne}
								onChange={this.handleChange}
							/>
						</label>

						<label htmlFor="complexTwo">
							Complex II
							<input
								className="shot-date-input"
								id="complexTwo"
								type="date"
								name="complexTwo"
								value={this.state.complexTwo}
								onChange={this.handleChange}
							/>
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
						<button className="cancel">
							<Link className="dog-link" to={'/dogs-list'}>
								Cancel
							</Link>
						</button>

						<button
							className="submit"
							type="submit"
							disabled={
								Validate.validateName(
									this.state.dogName.value
								) || Validate.validateAge(this.state.age.value)
							}
						>
							Submit
						</button>
					</div>
				</form>
				{this.state.loading && this.state.error.length === 0 ? (
					<div className="loader-container">
						<div className="loader"></div>
					</div>
				) : (
					''
				)}
			</main>
		);
	}
}

export default AddNewDog;
