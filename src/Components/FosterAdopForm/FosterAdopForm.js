import React, { Component } from "react";
import "./FosterAdopForm.css";
import DogsApiService from "../../services/api-service";
import DatePicker from "react-datepicker";
import Validate from "../../Utils/validation";
import CountrySelect from "../CountrySelect/CountrySelect";
import ValidationError from "../ValidationError/ValidationError";

import Encryption from "../../Utils/encryption";

class FosterAdopForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adopterName: {
				touched: false,
				value: "",
			},
			adoptionDate: "",
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
			comment: {
				touched: false,
				value: "",
			},
			error: null,
		};

		this.makeAdoption = this.makeAdoption.bind(this);
		this.makeFoster = this.makeFoster.bind(this);
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

	handleCountryChange = (country) => {
		this.setState({ country: country });
	};

	handleDateChange = (date) => {
		this.setState({
			adoptionDate: date,
		});
	};

	handleFileChange = (e) => {
		this.setState({
			contract: e.target.files[0],
		});
	};

	makeAdoptionObj = () => {
		const {
			adopterName,
			adoptionDate,
			email,
			phone,
			country,
			contract,
		} = this.state;

		const adopterNameValue = adopterName.value;
		const emailValue = email.value;
		const phoneValue = phone.value;

		const objectToEncrypt = {
			adopter_name: adopterNameValue,
			adoption_date: adoptionDate,
			email: emailValue,
			phone: phoneValue,
			dog_id: this.props.dogId,
			country,
		};

		let data = Encryption.encryptData(objectToEncrypt);

		const newAdoptionObj = new FormData();
		newAdoptionObj.append("contract", contract);
		newAdoptionObj.append("data", data);

		return newAdoptionObj;
	};

	makeFoster = (e) => {
		//
	};

	makeAdoption = (e) => {
		e.preventDefault();

		const newAdoptionObj = this.makeAdoptionObj();

		const newNote = {
			date_created: new Date(),
			notes: this.state.comment.value,
			type_of_note: "adoption",
			dog_id: this.props.dogId,
		};

		Promise.all([
			(DogsApiService.insertAdoption(newAdoptionObj),
			DogsApiService.insertNewNote(newNote)),
		])
			.then((res) => this.props.updateDogInfo())
			.catch((err) =>
				this.setState({ error: "Something went wrong. Try again later." })
			);
	};

	validateNameInput = () => {
		const { adopterName } = this.state;
		if (adopterName.touched && adopterName.value.length > 0) {
			return (
				<ValidationError
					className="adopt-error-style"
					message={Validate.validateName(adopterName.value)}
				/>
			);
		}
	};

	validateEmailInput = () => {
		const { email } = this.state;
		if (email.touched && email.value.length > 0) {
			return (
				<ValidationError
					className="adopt-error-style"
					message={Validate.validateEmail(email.value)}
				/>
			);
		}
	};

	validatePhoneInput = () => {
		const { phone } = this.state;
		if (phone.touched && phone.value.length > 0) {
			return (
				<ValidationError
					className="adopt-error-style"
					message={Validate.validatePhone(phone.value)}
				/>
			);
		}
	};

	render(props) {
		const {
			adopterName,
			adoptionDate,
			email,
			phone,
			comment,
			country,
		} = this.state;

		const { type } = this.props;

		const disabled =
			Validate.validateName(adopterName.value) ||
			Validate.validateEmail(email.value) ||
			Validate.validatePhone(phone.value) ||
			!country
				? true
				: false;

		return (
			<div className="modal-inner">
				<h1>{type === "adopt" ? "Adoption" : "Foster"} Info</h1>
				{this.state.error !== null && (
					<ValidationError
						className="center-error"
						message={this.state.error}
					/>
				)}
				<form
					className="adopter-grid"
					onSubmit={(e) =>
						props.type === "adoption" ? this.makeAdoption : this.makeFoster
					}
				>
					<label className="name adopt-label">
						Name
						<input
							className="adopt-input adopt-input-style"
							name="adopterName"
							value={adopterName.value}
							onChange={(e) => this.onChange(e)}
							type="text"
							required
						/>
						{this.validateNameInput()}
					</label>
					<label className="adoption-date adopt-label">
						Date
						<DatePicker
							className="adopt-input adopt-input-style"
							selected={adoptionDate}
							dateFormat="dd/MM/yyyy"
							onChange={(date) => this.handleDateChange(date)}
							required
						/>
					</label>
					<label className="email adopt-label ">
						Email
						<input
							className="adopt-input adopt-input-style"
							name="email"
							value={email.value}
							onChange={(e) => this.onChange(e)}
							type="text"
							required
						/>
						{this.validateEmailInput()}
					</label>
					<label className="phone adopt-label">
						Phone
						<input
							className="adopt-input adopt-input-style"
							name="phone"
							value={phone.value}
							onChange={(e) => this.onChange(e)}
							type="text"
						/>
						{this.validatePhoneInput()}
					</label>
					<label className="contract adopt-label">
						Contract
						<input
							className="adopt-input"
							name="contract"
							onChange={(e) => this.handleFileChange(e)}
							type="file"
							accept="application/pdf"
						/>
					</label>
					<label className="country adopt-label">
						Country
						<CountrySelect
							onChange={this.handleCountryChange}
							styleClass={"adopt-input"}
						/>
					</label>

					<label className="comment adopt-label ">
						Comments
						<textarea
							className="adopt-comment-input adopt-input-style"
							name="comment"
							value={comment.value}
							onChange={(e) => this.onChange(e)}
						/>
					</label>
					<button className="adoption-submit-button" disabled={disabled}>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default FosterAdopForm;
