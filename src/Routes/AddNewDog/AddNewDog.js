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
			rabies: null,
			rabiesBooster: null,
			complexOne: null,
			complexTwo: null,
			complexBooster: null,
			microchip: null,
			tagNumber: null,
			gender: null,
			loading: false,
			age: { value: null, touched: false },
			arrivalDate: null,
			error: null,
		};
	}

	handleImgChange = (e) => {
		this.setState({
			profileImgPreview: URL.createObjectURL(e.target.files[0]),
			profileImg: e.target.files[0],
		});
	};

	handleDateChange = (name, date) => {
		this.setState({
			[name]: date,
		});
	};

	stringifyDate = (date) => {
		const event = new Date(`${date}`);
		return JSON.stringify(event).slice(1, 11);
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({
			[name]: value,
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
				shot_date: !rabies ? null : this.stringifyDate(rabies),
				dog_id: "",
			},
			{
				shot_name: "Rabies Yearly Booster",
				shot_date: !rabiesBooster ? null : this.stringifyDate(rabiesBooster),
				dog_id: "",
			},
			{
				shot_name: "Complex I",
				shot_date: !complexOne ? null : this.stringifyDate(complexOne),
				dog_id: "",
			},
			{
				shot_name: "Complex II",
				shot_date: !complexTwo ? null : this.stringifyDate(complexTwo),
				dog_id: "",
			},
			{
				shot_name: "Complex Yearly Booster",
				shot_date: !complexBooster ? null : this.stringifyDate(complexBooster),
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
		let imgStyle = { display: "none" };

		if (this.state.profileImgPreview.length > 0) {
			imgStyle = {
				display: "block",
			};
		}

		return (
			<main className='add-dog-container'>
				<h1 className='form-title'>Add New Dog</h1>

				<form className='form-container' onSubmit={(e) => this.handleSubmit(e)}>
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
							onChange={(e) => this.handleImgChange(e)}
							accept='image/*'
							required
						/>
						<img
							className='img-preview'
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
								onChange={(e) => this.handleChange(e)}
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
								onChange={(e) => this.handleChange(e)}
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
						onChange={(date) => this.updateAge(date)}
						placeholderText='Click to select a date'
						id='age'
						className='block'
						showYearDropdown
						dateFormatCalendar='MMMM'
						yearDropdownItemNumber={5}
						scrollableYearDropdown
					/>
					<label htmlFor='arrival' className='bold'>
						Estimated Arrival
					</label>

					<DatePicker
						dateFormat='dd/MM/yyyy'
						selected={this.state.arrivalDate}
						placeholderText='Click to select a date'
						onChange={(date) => this.handleDateChange("arrivalDate", date)}
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
						onChange={(e) => this.handleChange(e)}
					/>

					<label htmlFor='microchip' className='bold'>
						Microchip Number
					</label>
					<input
						className='block'
						id='microchip'
						type='text'
						name='microchip'
						onChange={(e) => this.handleChange(e)}
					/>

					<fieldset className='field-item'>
						<legend className='bold'>Spayed/Neutered </legend>
						<label htmlFor='yes'>
							<input
								id='yes'
								type='radio'
								name='spayedNeutered'
								onChange={(e) => this.handleCheckbox(e)}
								required
							/>
							Yes
						</label>

						<label htmlFor='no'>
							<input
								id='no'
								type='radio'
								name='spayedNeutered'
								onChange={(e) => this.handleCheckbox(e)}
							/>
							No
						</label>
					</fieldset>

					<fieldset className='field-item '>
						<legend className='bold'>Required Shots Completed</legend>

						<label htmlFor='rabies'>
							Rabies{" "}
							<DatePicker
								dateFormat='dd/MM/yyyy'
								selected={this.state.rabies}
								placeholderText='Click to select a date'
								onChange={(date) => this.handleDateChange("rabies", date)}
								name='rabies'
								className='shot-date-input'
							/>
						</label>

						<label htmlFor='rabiesBooster'>
							Rabies Yearly Booster{" "}
							<DatePicker
								dateFormat='dd/MM/yyyy'
								selected={this.state.rabiesBooster}
								placeholderText='Click to select a date'
								onChange={(date) =>
									this.handleDateChange("rabiesBooster", date)
								}
								name='rabiesBooster'
								className='shot-date-input'
							/>
						</label>

						<label htmlFor='complexOne'>
							Complex I
							<DatePicker
								dateFormat='dd/MM/yyyy'
								selected={this.state.complexOne}
								placeholderText='Click to select a date'
								onChange={(date) => this.handleDateChange("complexOne", date)}
								name='complexOne'
								className='shot-date-input'
							/>
						</label>

						<label htmlFor='complexTwo'>
							Complex II
							<DatePicker
								dateFormat='dd/MM/yyyy'
								selected={this.state.complexTwo}
								placeholderText='Click to select a date'
								onChange={(date) => this.handleDateChange("complexTwo", date)}
								name='complexTwo'
								className='shot-date-input'
							/>
						</label>

						<label htmlFor='complexBooster'>
							Complex Yearly Booster
							<DatePicker
								dateFormat='dd/MM/yyyy'
								selected={this.state.complexBooster}
								placeholderText='Click to select a date'
								onChange={(date) =>
									this.handleDateChange("complexBooster", date)
								}
								name='complexBooster'
								className='shot-date-input'
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
