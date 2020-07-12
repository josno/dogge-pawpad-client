import React, { Component } from "react";
import "./AdoptModal.css";
import DogsApiService from "../../services/api-service";
import config from "../../config";
import DatePicker from "react-datepicker";
import Validate from "../../Utils/validation";
import ValidationError from "../../Components/ValidationError/ValidationError";
const CryptoJS = require("crypto-js");

class AdoptModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adopter_name: {
				touched: false,
				value: "",
			},
			adoption_date: "",
			email: {
				touched: false,
				value: "",
			},
			phone: {
				touched: false,
				value: "",
			},
			country: "",
			contract: "",
			comment: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onChange = (e) => {
		const { value, name } = e.target;

		this.setState({
			[name]: {
				touched: true,
				value: value,
			},
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

	handleSubmit = (e) => {
		e.preventDefault();
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

	validateInput = (touched, value) => {
		if (touched) {
			return <ValidationError message={Validate.validateName(value)} />;
		} else {
			return;
		}
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
				<h1> Adoption Info</h1>

				<form className='adopter-grid' onSubmit={(e) => this.handleSubmit(e)}>
					<label className='name adopt-label'>
						Adopter Name
						{this.validateInput(adopter_name.touched, adopter_name.value)}
						<input
							className='adopt-input'
							name='adopter_name'
							value={adopter_name.value}
							onChange={(e) => this.onChange(e)}
							type='text'
							required
						/>
					</label>

					<label className='adoption-date adopt-label'>
						Adoption Date
						<DatePicker
							className='adopt-input'
							selected={adoption_date}
							dateFormat='dd/MM/yyyy'
							onChange={(date) => this.handleDateChange(date)}
							required
						/>
					</label>
					<label className='email adopt-label'>
						Adopter Email
						<input
							className='adopt-input'
							name='email'
							value={email.value}
							onChange={(e) => this.onChange(e)}
							type='text'
							required
						/>
					</label>
					<label className='phone adopt-label'>
						Adopter Phone
						<input
							className='adopt-input'
							name='phone'
							value={phone.value}
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
							accept='application/pdf'
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
							required
						/>
					</label>

					<label className='comment adopt-label '>
						Comments
						<input
							className='adopt-comment-input'
							name='comment'
							value={comment}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>
					<button className='adoption-submit-button'>Submit</button>
				</form>
			</div>
		);
	}
}

export default AdoptModal;
