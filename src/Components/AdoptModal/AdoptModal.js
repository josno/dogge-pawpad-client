import React, { Component } from "react";
import "./AdoptModal.css";

class AdoptModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adopter_name: "",
			adoption_date: "",
			email: "",
			phone: "",
			address: "",
			country: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onChange = (e) => {
		const { value, name } = e.target;

		this.setState({
			[name]: value,
		});
	};

	handleSubmit = () => {
		const {
			adopter_name,
			adoption_date,
			email,
			phone,
			address,
			country,
		} = this.state;

		const adoptionObj = {
			adopter_name,
			adoption_date,
			email,
			phone,
			address,
			country,
		};

		console.log(adoptionObj);
	};
	render(props) {
		const {
			adopter_name,
			adoption_date,
			email,
			phone,
			address,
			country,
		} = this.state;

		return (
			<div className='modal-inner'>
				<h1> Adoption Info</h1>
				<form className='adopter-grid'>
					<label className='name'>
						Adopter Name
						<input
							name='adopter_name'
							value={adopter_name}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>
					<label className='adoption-date'>
						Adoption Date
						<input
							name='adoption_date'
							value={adoption_date}
							onChange={(e) => this.onChange(e)}
							type='date'
						/>
					</label>
					<label className='email'>
						Adopter Email
						<input
							name='email'
							value={email}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>
					<label className='phone'>
						Adopter Phone
						<input
							name='phone'
							value={phone}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>

					<label className='address'>
						Adopter Address
						<input
							name='address'
							value={address}
							onChange={(e) => this.onChange(e)}
							type='text'
						/>
					</label>
					<label className='country'>
						Adopter Country
						<input
							name='country'
							value={country}
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
