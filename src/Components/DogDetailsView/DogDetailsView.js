import React, { Component } from "react";
import DogsApiService from "../../services/api-service";
import "./DogDetailsView.css";
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
			spayedneutered: { value: "", editMode: false },
		};
	}

	formatDate(date) {
		const formattedDate = moment(date).format("LL");
		return formattedDate;
	}

	renderSpayedNeutered(boolean) {
		if (boolean) {
			return (
				<>
					<span className='indicator-yes'>&#10004; </span> Spayed/Neutered
				</>
			);
		} else {
			return (
				<>
					<span className='indicator-no'> &#10008; </span> Spayed/Neutered
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
		// console.log(currVal);
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

		const newObj = {
			[value]: newStateValue,
			dog_name: this.state.dog_name,
		};

		DogsApiService.updateDog(newObj, this.props.dogId).then(
			(response) =>
				this.setState({
					[value]: {
						value: newStateValue,
						editMode: !currMode,
					},
				})
			//set error handling
		);
	};

	formatEditDate = (date) => {
		const formattedDate = moment(date).format("YYYY-MM-DD");

		return formattedDate;
	};

	renderDetails = (str) => {
		return str.editMode === true ? (
			<div className={`${str}-value align-details`}>
				<input
					className='fade-in edit-input'
					type='text'
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
					className='edit-pencil'
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
			<div className='basic-dog-details box-flex'>
				<h3 className='info-title'>Basic Details </h3>
				<ul className='dog-info-text details-grid-container'>
					<li className='gender align-details'>
						Gender:
						{gender.editMode === true ? (
							<div className='gender-value align-details'>
								<input
									className='fade-in edit-input'
									type='text'
									name='gender'
									defaultValue={gender.value}
									onChange={(e) => this.handleChange(e)}
								/>
								<button value='gender' onClick={(e) => this.changeEditMode(e)}>
									&#10008;{" "}
								</button>
								<button value='gender' onClick={(e) => this.updateValue(e)}>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className='gender-value align-details'>
								{gender.value}
								<button
									className='edit-pencil'
									value='gender'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>
					<li className='age align-details'>
						Age:
						{age.editMode === true ? (
							<div className='age-value align-details'>
								<input
									className='fade-in edit-input'
									type='text'
									name='age'
									defaultValue={age.value}
									onChange={(e) => this.handleChange(e)}
								/>
								<button value='age' onClick={(e) => this.changeEditMode(e)}>
									&#10008;{" "}
								</button>
								<button value='age' onClick={(e) => this.updateValue(e)}>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className='age-value align-details'>
								{age.value}
								<button
									className='edit-pencil'
									value='age'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>
					<li className='arrival_date align-details'>
						Arrival Date:
						{arrival_date.editMode === true ? (
							<div className='arrival_date-value align-details'>
								<input
									className='fade-in edit-input'
									type='date'
									name='arrival_date'
									defaultValue={this.formatEditDate(arrival_date.value)}
									onChange={(e) => this.handleChange(e)}
								/>
								<button
									value='arrival_date'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#10008;{" "}
								</button>
								<button
									value='arrival_date'
									onClick={(e) => this.updateValue(e)}
								>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className='arrival_date-value align-details'>
								{this.formatDate(arrival_date.value)}
								<button
									className='edit-pencil'
									value='arrival_date'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>
					<li className='tag_number align-details'>
						Tag:
						{tag_number.editMode === true ? (
							<div className='tag_number-value align-details'>
								<input
									className='fade-in edit-input'
									type='text'
									name='tag_number'
									defaultValue={tag_number.value}
									onChange={(e) => this.handleChange(e)}
								/>
								<button
									value='tag_number'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#10008;{" "}
								</button>
								<button value='tag_number' onClick={(e) => this.updateValue(e)}>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className='tag_number-value align-details'>
								{tag_number.value}
								<button
									className='edit-pencil'
									value='tag_number'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>

					<li className='microchip align-details'>
						Microchip:
						{microchip.editMode === true ? (
							<div className='microchip-value align-details'>
								<input
									className='fade-in edit-input'
									type='text'
									name='microchip'
									defaultValue={microchip.value}
									onChange={(e) => this.handleChange(e)}
								/>
								<button
									value='microchip'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#10008;{" "}
								</button>
								<button value='microchip' onClick={(e) => this.updateValue(e)}>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className='microchip-value align-details'>
								{microchip.value}
								<button
									className='edit-pencil'
									value='microchip'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>

					<li className='spayedneutered align-details'>
						{spayedneutered.editMode === true ? (
							<div className='spayedneutered-value align-details'>
								<input
									className='fade-in edit-input'
									type='text'
									name='spayedneutered'
									defaultValue={spayedneutered.value}
									onChange={(e) => this.handleChange(e)}
								/>
								<button
									value='spayedneutered'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#10008;{" "}
								</button>
								<button
									value='spayedneutered'
									onClick={(e) => this.updateValue(e)}
								>
									&#10004;{" "}
								</button>
							</div>
						) : (
							<div className='spayedneutered-value align-details'>
								{this.renderSpayedNeutered(spayedneutered.value)}
								<button
									className='edit-pencil'
									value='spayedneutered'
									onClick={(e) => this.changeEditMode(e)}
								>
									&#9998;
								</button>
							</div>
						)}
					</li>
				</ul>
			</div>
		);
	}
}

export default DogDetailsView;
