import React, { Component } from "react";
import DogsApiService from "../../services/api-service";
import styled from "styled-components";
import "./DogDetailsView.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";

class DogDetailsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dog_name: "",
			age: { value: "", editMode: false },
			gender: { value: "", editMode: true },
			microchip: { value: "", editMode: false },
			tag_number: { value: "", editMode: false },
			arrival_date: { value: "", editMode: false },
		};
	}

	formatDate(date) {
		let formattedDate = moment(date).format("LL");
		if (formattedDate === "Invalid date") {
			return moment(date, "DD-MM-YYYY").format("LL");
		} else {
			return formattedDate;
		}
	}

	handleDateChange = (name, date) => {
		console.log(date);
		const curVal = this.state[name];

		this.setState({
			[name]: { ...curVal, newVal: date },
		});
	};

	renderSpayedNeutered(boolean) {
		if (boolean) {
			return (
				<>
					{" "}
					<span className="indicator-yes">&#10004; </span>
				</>
			);
		} else {
			return (
				<>
					{" "}
					<span className="indicator-no"> &#10008; </span>
				</>
			);
		}
	}

	changeEditMode = () => {
		this.setState({
			editMode: !this.state.editMode,
		});
	};

	changeEditMode = (e) => {
		const { value } = e.target;
		const curVal = this.state[value].value;
		const mode = this.state[value].editMode;
		this.setState({
			[value]: {
				value: curVal,
				editMode: !mode,
			},
		});
	};

	handleChange = (e) => {
		const { value, name } = e.target;

		const curVal = this.state[name];
		this.setState({
			[name]: { ...curVal, newVal: value },
		});
	};

	updateValue = (e) => {
		const { value } = e.target;
		const newStateValue = this.state[value].newVal
			? this.state[value].newVal
			: this.state[value].value;
		const currMode = this.state[value].editMode;

		const dateString = moment(newStateValue).format("YYYY-MM-DD");

		const newObj = {
			[value]: dateString,
			dog_name: this.state.dog_name,
		};

		DogsApiService.updateDog(newObj, this.props.dogId).then(
			(response) =>
				this.setState({
					[value]: {
						value: dateString,
						editMode: !currMode,
					},
				})
			//set error handling
		);
	};

	updateSpayedNeutered = () => {
		const newObj = {
			spayedneutered: this.state.spayedneutered.value,
			dog_name: this.state.dog_name,
		};

		DogsApiService.updateDog(newObj, this.props.dogId).then(
			(response) =>
				this.setState({
					spayedneutered: {
						value: this.state.spayedneutered.value,
						editMode: !this.state.spayedneutered.editMode,
					},
				})
			//set error handling
		);
	};

	renderDetails = (str) => {
		return str.editMode === true ? (
			<div className={`${str}-value align-details`}>
				<input
					className="fade-in edit-input"
					type="text"
					name={str}
					defaultValue={str.value}
					onChange={(e) => this.handleChange(e)}
				/>
				<button value={str} onClick={(e) => this.changeEditMode(e)}>
					&#10008;{" "}
				</button>
				<button value={str} onClick={(e) => this.updateValue(e)}>
					&#10004;{" "}
				</button>
			</div>
		) : (
			<div className={`${str}-value align-details`}>
				{str.value}
				<button
					className="edit-pencil"
					value={str}
					onClick={(e) => this.changeEditMode(e)}
				>
					&#9998;
				</button>
			</div>
		);
	};

	async componentDidMount() {
		const { dogId } = this.props;
		const res = await DogsApiService.getDogInfo(dogId);

		this.setState({
			dog_name: res.dog_name,
			age: { value: res.age, editMode: false },
			gender: { value: res.gender, editMode: false },
			microchip: { value: res.microchip, editMode: false },
			tag_number: { value: res.tag_number, editMode: false },
			arrival_date: { value: res.arrival_date, editMode: false },
			spayedneutered: { value: res.spayedneutered, editMode: false },
		});
	}

	render() {
		const {
			age,
			gender,
			microchip,
			tag_number,
			arrival_date,
			spayedneutered,
		} = this.state;

		return (
			<DogDetailsStyles>
				<h3 className="info-title">Basic Details </h3>
				<ul className="dog-info-text details-grid-container">
					<li className="gender align-details">
						Gender:
						{gender.editMode === true ? (
							<div className="gender-value align-details">
								<label htmlFor="male">
									<input
										type="radio"
										name="gender"
										value="Male"
										onChange={(e) => this.handleChange(e)}
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
										onChange={(e) => this.handleChange(e)}
										id="female"
									/>
									Female
								</label>
								<button value="gender" onClick={(e) => this.changeEditMode(e)}>
									&#10008;{" "}
								</button>
								<button value="gender" onClick={(e) => this.updateValue(e)}>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className="gender-value align-details">
								{gender.value}
								<button
									className="edit-pencil"
									value="gender"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>
					<li className="age align-details">
						Birthdate:
						{age.editMode === true ? (
							<div className="age-value align-details">
								<DatePicker
									dateFormat="dd/MM/yyyy"
									selected={this.state.age.newVal}
									placeholderText="dd/mm/yyyy"
									onChange={(date) => this.handleDateChange("age", date)}
									className="fade-in edit-input"
								/>

								<button value="age" onClick={(e) => this.changeEditMode(e)}>
									&#10008;{" "}
								</button>
								<button value="age" onClick={(e) => this.updateValue(e)}>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className="age-value align-details">
								{this.formatDate(age.value)}

								<button
									className="edit-pencil"
									value="age"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>
					<li className="arrival_date align-details">
						Arrival Date:
						{arrival_date.editMode === true ? (
							<div className="arrival_date-value align-details">
								<DatePicker
									dateFormat="dd/MM/yyyy"
									selected={this.state.arrival_date.newVal}
									placeholderText="dd/mm/yyyy"
									onChange={(date) =>
										this.handleDateChange("arrival_date", date)
									}
									className="fade-in edit-input"
								/>
								<button
									value="arrival_date"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#10008;{" "}
								</button>
								<button
									value="arrival_date"
									onClick={(e) => this.updateValue(e)}
								>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className="arrival_date-value align-details">
								{this.formatDate(arrival_date.value)}
								<button
									className="edit-pencil"
									value="arrival_date"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>
					<li className="tag_number align-details">
						Tag:
						{tag_number.editMode === true ? (
							<div className="tag_number-value align-details">
								<input
									className="fade-in edit-input"
									type="text"
									name="tag_number"
									defaultValue={tag_number.value}
									onChange={(e) => this.handleChange(e)}
								/>
								<button
									value="tag_number"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#10008;{" "}
								</button>
								<button value="tag_number" onClick={(e) => this.updateValue(e)}>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className="tag_number-value align-details">
								{tag_number.value}
								<button
									className="edit-pencil"
									value="tag_number"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>

					<li className="microchip align-details">
						Microchip:
						{microchip.editMode === true ? (
							<div className="microchip-value align-details">
								<input
									className="fade-in edit-input"
									type="text"
									name="microchip"
									defaultValue={microchip.value}
									onChange={(e) => this.handleChange(e)}
								/>
								<button
									value="microchip"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#10008;{" "}
								</button>
								<button value="microchip" onClick={(e) => this.updateValue(e)}>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className="microchip-value align-details">
								{microchip.value}
								<button
									className="edit-pencil"
									value="microchip"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>

					<li className="spayedneutered align-details">
						Spayed/Neutered:
						{spayedneutered.editMode === true ? (
							<div className="spayedneutered-value align-details">
								<label htmlFor="yes">
									<input
										id="yes"
										type="radio"
										name="spayedneutered"
										onChange={(e) => this.handleSpayedNeuteredCheckbox(e)}
										required
									/>
									Yes
								</label>

								<label htmlFor="no">
									<input
										id="no"
										type="radio"
										name="spayedneutered"
										onChange={(e) => this.handleSpayedNeuteredCheckbox(e)}
									/>
									No
								</label>
								{/* <input
									className='fade-in edit-input'
									type='text'
									name='spayedneutered'
									defaultValue={spayedneutered.value}
									onChange={(e) => this.handleChange(e)}
								/> */}
								<button
									value="spayedneutered"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#10008;{" "}
								</button>
								<button
									value="spayedneutered"
									onClick={(e) => this.updateValue(e)}
								>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className="spayedneutered-value align-details">
								{this.renderSpayedNeutered(spayedneutered.value)}
								<button
									className="edit-pencil"
									value="spayedneutered"
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>
				</ul>
			</DogDetailsStyles>
		);
	}
}

const DogDetailsStyles = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fcfcfc;
	margin: 20px;
	border: 2px solid;

	.info-title {
		color: #5d576b;
		margin: 5px;
	}

	.dog-info-text {
		line-height: 25px;
		margin: 20px;
		text-align: left;
	}

	@media (min-width: 800px) {
		.align-details {
			align-content: flex-start;
			align-items: center;
			display: flex;
			font-size: 0.7em;
		}
	}

	@media (min-width: 1200px) {
		.dog-info-text {
			font-size: 0.8em;
		}
	}
`;

export default DogDetailsView;
