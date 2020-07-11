import React, { Component } from "react";
import "./AdoptModal.css";
import DogsApiService from "../../services/api-service";
import config from "../../config";

import DatePicker from "react-datepicker";
const CryptoJS = require("crypto-js");

class AdoptModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adopter_name: "",
			adoption_date: "",
			email: "",
			phone: "",
			country: "",
			contract: "",
			comment: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onChange = (e) => {
		const { value, name } = e.target;

		this.setState({
			[name]: value,
		});
	};

	handleDateChange = (date) => {
		this.setState({
			adoption_date: date,
		});
	};

	handleFileChange = (e) => {
		this.setState({
			contract: e.target.files[0],
		});
	};

	makeAdoptionObj = () => {
		const {
			adopter_name,
			adoption_date,
			email,
			phone,
			country,
			contract,
		} = this.state;

		const objectToEncrypt = {
			adopter_name,
			adoption_date,
			email,
			phone,
			country,
			dog_id: this.props.dogId,
		};

		let ciphertext = CryptoJS.AES.encrypt(
			JSON.stringify(objectToEncrypt),
			config.SECRET
		).toString();

		const newAdoptionObj = new FormData();
		newAdoptionObj.append("contract", contract);
		newAdoptionObj.append("data", ciphertext);

		return newAdoptionObj;
	};

	handleSubmit = () => {
		const newAdoptionObj = this.makeAdoptionObj();

		const newNote = {
			date_created: new Date(),
			notes: this.state.comment,
			type_of_note: "adoption",
			dog_id: this.props.dogId,
		};

		Promise.all([
			(DogsApiService.insertAdoption(newAdoptionObj),
			DogsApiService.insertNewNote(newNote)),
		]).then((res) => this.props.updateDogInfo());
	};

	render(props) {
		const {
			adopter_name,
			adoption_date,
			email,
			phone,
			country,
			comment,
		} = this.state;

		return (
			<div className='modal-inner'>
				{console.log(this.state.contract)}
				<h1> Adoption Info</h1>
				<form className='adopter-grid'>
					<label className='name adopt-label'>
						Adopter Name
						<input
							className='adopt-input'
							name='adopter_name'
							value={adopter_name}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>
					<label className='adoption-date adopt-label'>
						Adoption Date
						<DatePicker
							className='adopt-input'
							selected={adoption_date}
							dateFormat='dd/MM/yyyy'
							onChange={(date) => this.handleDateChange(date)}
						/>
					</label>
					<label className='email adopt-label'>
						Adopter Email
						<input
							className='adopt-input'
							name='email'
							value={email}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>
					<label className='phone adopt-label'>
						Adopter Phone
						<input
							className='adopt-input'
							name='phone'
							value={phone}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>

					<label className='contract adopt-label'>
						Contract
						<input
							className='adopt-input'
							name='contract'
							onChange={(e) => this.handleFileChange(e)}
							type='file'
							// accept='image/*'
						/>
					</label>
					<label className='country adopt-label'>
						Adopter Country
						<input
							className='adopt-input'
							name='country'
							value={country}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>

					<label className='comment adopt-label'>
						Comments
						<input
							className='adopt-input'
							name='comment'
							value={comment}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>
				</form>
				<button type='submit' onClick={() => this.handleSubmit()}>
					Submit
				</button>
			</div>
		);
	}
}

export default AdoptModal;
