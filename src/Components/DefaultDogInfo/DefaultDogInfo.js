import React, { Component } from "react";
import DogsApiService from "../../services/api-service";
import "./DefaultDogInfo.css";
import moment from "moment";

class DefaultDogInfoView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			age: { value: "", editMode: false },
			gender: { value: "", editMode: true },
			microchip: { value: "", editMode: false },
			tag: { value: "", editMode: false },
			arrival_date: { value: "", editMode: false },
			spayed_neutered: { value: "", editMode: false },
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

		this.setState({
			[value]: {
				value: newStateValue,
				editMode: !currMode,
			},
		});
	};

	async componentDidMount() {
		const { dogId } = this.props;
		const res = await DogsApiService.getDogInfo(dogId);

		this.setState({
			age: { value: res.age, editMode: false },
			gender: { value: res.gender, editMode: false },
			microchip: { value: res.microchip, editMode: false },
			tag: { value: res.tag_number, editMode: false },
			arrival_date: { value: res.arrival_date, editMode: false },
			spayed_neutered: { value: res.spayedneutered, editMode: false },
		});
	}

	render() {
		const {
			age,
			gender,
			microchip,
			tag,
			arrival_date,
			spayed_neutered,
		} = this.state;
		return (
			<div className='basic-dog-details box-flex'>
				<h3 className='info-title'>Basic Details </h3>
				<ul className='dog-info-text details-grid-container'>
					<li className='gender align-details'>Gender: </li>
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

					<li className='age align-details'>Age: </li>
					{age.editMode === true ? (
						<input value={age.value} />
					) : (
						<div
							className='age-value align-details'
							onDoubleClick={(e) => this.changeEditMode("age")}
						>
							{age.value}
						</div>
					)}

					<li className='arrival align-details'>Arrival Date: </li>

					{arrival_date.editMode === true ? (
						<input value={arrival_date.value} />
					) : (
						<div
							className='arrival-value align-details'
							onDoubleClick={(e) => this.changeEditMode("arrival_date")}
						>
							{this.formatDate(arrival_date.value)}
						</div>
					)}

					<li className='tag align-details'>Tag: </li>

					{tag.editMode === true ? (
						<input value={tag.value} />
					) : (
						<div
							className='tag-value align-details'
							onDoubleClick={(e) => this.changeEditMode("tag")}
						>
							{tag.value}
						</div>
					)}

					<li className='microchip align-details'>Microchip: </li>
					{microchip.editMode === true ? (
						<input value={microchip.value} />
					) : (
						<div
							className='microchip-value align-details'
							onDoubleClick={(e) => this.changeEditMode("microchip")}
						>
							{microchip.value}
						</div>
					)}

					<li className='spayed-neutered align-details'>
						{spayed_neutered.editMode === true ? (
							<input value={spayed_neutered.value} />
						) : (
							this.renderSpayedNeutered(spayed_neutered.value)
						)}
					</li>
				</ul>
			</div>
		);
	}
}

export default DefaultDogInfoView;
