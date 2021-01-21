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
			name: {
				touched: false,
				value: "",
			},
			date: "",
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
			date: date,
		});
	};

	handleFileChange = (e) => {
		this.setState({
			contract: e.target.files[0],
		});
	};

	makeAdoptionObj = () => {
		const { name, date, email, phone, country, contract } = this.state;

		const adopterNameValue = name.value;
		const emailValue = email.value;
		const phoneValue = phone.value;

		const objectToEncrypt = {
			adopter_name: adopterNameValue,
			adoption_date: date,
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

	makeFosterObj = () => {
		const { name, date, email, phone, country, contract } = this.state;

		const fosterNameValue = name.value;
		const emailValue = email.value;
		const phoneValue = phone.value;

		const objectToEncrypt = {
			foster_name: fosterNameValue,
			foster_date: date,
			foster_email: emailValue,
			foster_phone: phoneValue,
			dog_id: this.props.dogId,
			foster_country: country,
			foster_completed_on: null,
		};

		let data = Encryption.encryptData(objectToEncrypt);

		const newFosterObj = new FormData();
		newFosterObj.append("contract", contract);
		newFosterObj.append("data", data);

		return newFosterObj;
	};

	makeFoster = async (e) => {
		e.preventDefault();
		const newFosterObj = this.makeFosterObj();

		try {
			await DogsApiService.insertFoster(newFosterObj);
			await this.makeNote();
			this.props.updateDogInfo();
			this.props.setOpenFoster(false);
		} catch (err) {
			this.setState({ error: "Something went wrong. Try again later." });
		}
	};

	makeAdoption = async (e) => {
		e.preventDefault();

		const newAdoptionObj = this.makeAdoptionObj();

		try {
			await DogsApiService.insertAdoption(newAdoptionObj);
			await this.makeNote();
			this.props.updateDogInfo();
			this.props.setOpenAdopt(false);
		} catch (err) {
			this.setState({ error: "Something went wrong. Try again later." });
		}
	};

	makeNote = async () => {
		if (this.state.comment.value === "") {
			return;
		}

		const type = this.props.type === "adopt" ? "adoption" : "foster";

		const newNote = {
			date_created: new Date(),
			notes: this.state.comment.value,
			type_of_note: type,
			dog_id: this.props.dogId,
		};

		DogsApiService.insertNewNote(newNote);
	};

	validateNameInput = () => {
		const { name } = this.state;
		if (name.touched && name.value.length > 0) {
			return (
				<ValidationError
					className="adopt-error-style"
					message={Validate.validateName(name.value)}
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
		const { name, date, email, phone, comment, country } = this.state;

		const { type } = this.props;

		const disabled =
			Validate.validateName(name.value) ||
			Validate.validateEmail(email.value) ||
			Validate.validatePhone(phone.value) ||
			!country
				? true
				: false;

		return (
			<div className="modal-inner">
				<h1>{type === "adopt" ? "Adoption" : "Foster"} Information</h1>
				{this.state.error !== null && (
					<ValidationError
						className="center-error"
						message={this.state.error}
					/>
				)}
				<form
					className="adopter-grid"
					onSubmit={(e) =>
						type === "adopt" ? this.makeAdoption(e) : this.makeFoster(e)
					}
				>
					<label className="name adopt-label">
						Name
						<input
							className="adopt-input adopt-input-style"
							name="name"
							value={name.value}
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
							selected={date}
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
							required
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
