import React, { Component } from "react";
import PawPadContext from "../../PawPadContext.js";
import { Link } from "react-router-dom";
import DogsApiService from "../../services/api-service";
import "./AddNewDog.css";
import ValidationError from "../../Components/ValidationError/ValidationError";
import Validate from "../../Utils/validation";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class AddNewDog extends Component {
	static contextType = PawPadContext;
	constructor(props) {
		super(props);
		this.state = {
			dogName: { value: "", touched: false },
			profileImgPreview: "",
			profileImg: null,
			spayedneutered: false,
			rabies: "",
			rabiesBooster: "",
			complexOne: "",
			complexTwo: "",
			complexBooster: "",
			microchip: null,
			tagNumber: null,
			gender: null,
			loading: false,
			age: { value: null, touched: false },
			arrivalDate: null,
			error: null,
		};
		this.handleImgChange = this.handleImgChange.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setShotsObject = this.setShotsObject.bind(this);
		this.setDogObject = this.setDogObject.bind(this);
		this.setFormData = this.setFormData.bind(this);
		this.setLoading = this.setLoading.bind(this);
	}

	handleImgChange = (e) => {
		this.setState({
			profileImgPreview: URL.createObjectURL(e.target.files[0]),
			profileImg: e.target.files[0],
		});
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	stringifyDate = (date) => {
		const event = new Date(`${date}`);
		return JSON.stringify(event).slice(1, 11);
	};

	handleDateChange = (date) => {
		this.setState({
			arrivalDate: date,
		});
	};

	updateAge(date) {
		this.setState({
			age: { value: date, touched: true },
		});
	}

	updateName(str) {
		const name = str.trim();
		this.setState({
			dogName: { value: name, touched: true },
		});
	}

	handleCheckbox = (e) => {
		const { name } = e.target;

		this.setState((prevState) => ({
			[name]: !prevState[name],
		}));
	};

	setShotsObject = () => {
		const {
			rabies,
			complexOne,
			complexTwo,
			rabiesBooster,
			complexBooster,
		} = this.state;

		const shots = [
			{
				shot_name: "Rabies",
				shot_date: rabies.length > 0 ? rabies : null,
				dog_id: "",
			},
			{
				shot_name: "Rabies Yearly Booster",
				shot_date: rabiesBooster.length > 0 ? rabiesBooster : null,
				dog_id: "",
			},
			{
				shot_name: "Complex I",
				shot_date: complexOne.length > 0 ? complexOne : null,
				dog_id: "",
			},
			{
				shot_name: "Complex II",
				shot_date: complexTwo.length > 0 ? complexTwo : null,
				dog_id: "",
			},
			{
				shot_name: "Complex Yearly Booster",
				shot_date: complexBooster.length > 0 ? complexBooster : null,
				dog_id: "",
			},
		];

		shots.forEach((i) => {
			if (i.shot_date !== null) {
				i.shot_iscompleted = true;
			} else {
				i.shot_iscompleted = false;
			}
		});

		return shots;
	};

	setDogObject = (
		spayedNeutered,
		gender,
		microchip,
		tagNumber,
		arrivalDate,
		age,
		dogName
	) => {
		const arrivalDateString = this.stringifyDate(arrivalDate);
		const ageDateString = this.stringifyDate(age);
		const newDog = [
			{ dog_name: dogName },
			{ spayedneutered: spayedNeutered },
			{ gender: gender },
			{ microchip: microchip },
			{ tag_number: tagNumber },
			{ age: ageDateString },
			{ arrival_date: arrivalDateString },
		];

		return newDog;
	};

	setFormData = (newDog, profileImg) => {
		const formData = new FormData();
		formData.append("profile_img", profileImg);

		newDog.forEach((i) => {
			formData.append(Object.keys(i), Object.values(i));
		});

		return formData;
	};

	setLoading = (e) => {
		this.setState({
			loading: true,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const {
			profileImg,
			spayedNeutered,
			gender,
			arrivalDate,
			tagNumber,
			microchip,
		} = this.state;
		const dogName = this.state.dogName.value;
		const age = this.state.age.value;

		const newDog = this.setDogObject(
			spayedNeutered,
			gender,
			microchip,
			tagNumber,
			arrivalDate,
			age,
			dogName
		);
		const allCompletedShots = this.setShotsObject();
		const formData = this.setFormData(newDog, profileImg);

		DogsApiService.insertNewDog(formData)
			.then((res) => {
				allCompletedShots.map((i) => (i.dog_id = res.id));
				allCompletedShots.map((shot) => DogsApiService.insertNewShot(shot));
			})
			.then((res) => this.props.history.push("/dogs-list"))
			.catch((error) => {
				this.setState({ error: error.message });
			});
	};

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		console.log(this.state.arrivalDate);
		let imgStyle = { display: "none" };

		if (this.state.profileImgPreview.length > 0) {
			imgStyle = {
				display: "block",
			};
		}

		return (
			<main className='add-dog-container'>
				<h1 className='form-title'>Add New Dog</h1>

				<form className='form-container' onSubmit={this.handleSubmit}>
					<div className='field-item'>
						<label htmlFor='name' className='bold'>
							Name
						</label>
						<input
							id='name'
							type='text'
							name='dogName'
							className='block'
							onChange={(e) => this.updateName(e.target.value)}
							required
						/>
						{this.state.dogName.touched && (
							<ValidationError
								message={Validate.validateName(this.state.dogName.value)}
							/>
						)}
					</div>

					<div className='field-item'>
						<label htmlFor='image' className='bold'>
							Image
						</label>
						<input
							className='block'
							type='file'
							name='profileImg'
							onChange={this.handleImgChange}
							accept='image/*'
							required
						/>
						<img
							id='img-preview'
							src={this.state.profileImgPreview}
							alt='your-pic'
							style={imgStyle}
						/>
					</div>

					<fieldset className='field-item'>
						<legend className='bold'>Gender</legend>
						<label htmlFor='male'>
							<input
								type='radio'
								name='gender'
								value='Male'
								onChange={this.handleChange}
								id='male'
								required
							/>
							Male
						</label>

						<label htmlFor='female'>
							<input
								type='radio'
								name='gender'
								value='Female'
								onChange={this.handleChange}
								id='female'
							/>
							Female
						</label>
					</fieldset>

					<label htmlFor='estimated-age' className='bold'>
						Estimated Birthdate
					</label>
					<DatePicker
						dateFormat='dd/MM/yyyy'
						selected={this.state.age.value}
						onChange={(e) => this.updateAge(e)}
						placeholderText='Click to select a date'
						id='arrival'
						className='block'
						showYearDropdown
						dateFormatCalendar='MMMM'
						yearDropdownItemNumber={5}
						scrollableYearDropdown
					/>
					{/* <input
						className='block'
						id='age'
						type='text'
						name='age'
						placeholder='example: 12/14/2019 or 12/xx/2019'
						onChange={(e) => this.updateAge(e.target.value)}
						required
					/> */}
					<label htmlFor='arrival' className='bold'>
						Estimated Arrival
					</label>

					<DatePicker
						dateFormat='dd/MM/yyyy'
						selected={this.state.arrivalDate}
						placeholderText='Click to select a date'
						onChange={(e) => this.handleDateChange(e)}
						id='arrival'
						className='block'
					/>
					<label htmlFor='tag-number' className='bold'>
						Tag Number
					</label>
					<input
						className='block'
						id='tag-number'
						type='text'
						name='tagNumber'
						onChange={this.handleChange}
					/>

					<label htmlFor='microchip' className='bold'>
						Microchip Number
					</label>
					<input
						className='block'
						id='microchip'
						type='text'
						name='microchip'
						onChange={this.handleChange}
					/>

					<fieldset className='field-item'>
						<legend className='bold'>Spayed/Neutered </legend>
						<label htmlFor='yes'>
							<input
								id='yes'
								type='radio'
								name='spayedNeutered'
								onChange={this.handleCheckbox}
								required
							/>
							Yes
						</label>

						<label htmlFor='no'>
							<input
								id='no'
								type='radio'
								name='spayedNeutered'
								onChange={this.handleCheckbox}
							/>
							No
						</label>
					</fieldset>

					<fieldset className='field-item '>
						<legend className='bold'>Required Shots Completed</legend>

						<label htmlFor='rabies'>
							Rabies{" "}
							<input
								className='shot-date-input'
								id='rabies'
								type='date'
								name='rabies'
								value={this.state.rabies}
								onChange={this.handleChange}
							/>
						</label>

						<label htmlFor='rabiesBooster'>
							Rabies Yearly Booster{" "}
							<input
								className='shot-date-input'
								id='rabiesBooster'
								type='date'
								name='rabiesBooster'
								value={this.state.rabiesBooster}
								onChange={this.handleChange}
							/>
						</label>

						<label htmlFor='complexOne'>
							Complex I
							<input
								className='shot-date-input'
								id='complexOne'
								type='date'
								name='complexOne'
								value={this.state.complexOne}
								onChange={this.handleChange}
							/>
						</label>

						<label htmlFor='complexTwo'>
							Complex II
							<input
								className='shot-date-input'
								id='complexTwo'
								type='date'
								name='complexTwo'
								value={this.state.complexTwo}
								onChange={this.handleChange}
							/>
						</label>

						<label htmlFor='complexBooster'>
							Complex Yearly Booster
							<input
								className='shot-date-input'
								id='complexBooster'
								type='date'
								name='complexBooster'
								value={this.state.complexBooster}
								onChange={this.handleChange}
							/>
						</label>
					</fieldset>

					{this.state.error !== null && (
						<ValidationError
							message={"Something wrong happened. Refresh and try again."}
						/>
					)}
					<div className='form-buttons'>
						<button className='cancel'>
							<Link className='dog-link' to={"/dogs-list"}>
								Cancel
							</Link>
						</button>

						<button
							className='submit'
							type='submit'
							onClick={this.setLoading}
							disabled={Validate.validateName(this.state.dogName.value)}
						>
							Submit
						</button>
					</div>
				</form>
				{this.state.loading && (
					<div className='loader-container'>
						<div className='loader'></div>
					</div>
				)}
			</main>
		);
	}
}

export default AddNewDog;
