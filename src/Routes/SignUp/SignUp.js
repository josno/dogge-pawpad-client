import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./SignUp.css";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import PawPadContext from "../../PawPadContext";
import Validate from "../../Utils/validation";
import ValidationError from "../../Components/ValidationError/ValidationError";

class SignUp extends Component {
	static contextType = PawPadContext;
	constructor(props) {
		super(props);
		this.state = {
			error: "",
			password: { value: "", touched: false },
		};
		this.capitalize = this.capitalize.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	capitalize = (s) => {
		return s.charAt(0).toUpperCase() + s.slice(1);
	};

	handlePasswordChange(str) {
		str.trim();
		this.setState({ password: { value: str, touched: true } });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const {
			username,
			password,
			shelterUsername,
			firstName,
			lastName,
		} = e.target;

		const newUser = {
			shelter_username: shelterUsername.value.toLowerCase(),
			user_name: username.value.toLowerCase(),
			password: password.value,
			first_name: this.capitalize(firstName.value),
			last_name: this.capitalize(lastName.value),
		};

		AuthApiService.postUser(newUser)
			.then((res) => {
				TokenService.saveAuthToken(res.authToken);
				TokenService.saveShelterToken(res.shelter_id);
				this.context.handleLogInState();
				this.props.history.push("/");
			})
			.catch((res) => {
				this.setState({ error: res.error });
			});
	};

	render() {
		return (
			<div className='signup-container'>
				<form className='input-form' onSubmit={this.handleSubmit}>
					<h2 className='signup-title'> Make An Account</h2>

					<input
						className='form-input'
						type='text'
						aria-label='shelter-username'
						placeholder='Shelter Code'
						name='shelterUsername'
						required
					/>
					<input
						className='form-input'
						type='text'
						aria-label='firstName'
						placeholder='First Name'
						name='firstName'
						required
					/>
					<input
						className='form-input'
						type='text'
						aria-label='lastName'
						placeholder='Last Name'
						name='lastName'
						required
					/>
					<input
						className='form-input'
						type='text'
						aria-label='username'
						placeholder='username'
						name='username'
						required
					/>

					<input
						className='form-input'
						type='password'
						aria-label='password'
						placeholder='password'
						name='password'
						value={this.state.password.value}
						onChange={(e) => this.handlePasswordChange(e.target.value)}
						required
					/>
					{this.state.error && <ValidationError message={this.state.error} />}

					{this.state.password.touched && (
						<ValidationError
							message={Validate.validatePasswordNum(this.state.password.value)}
						/>
					)}

					{this.state.password.touched && (
						<ValidationError
							message={Validate.validatePasswordSymbol(
								this.state.password.value
							)}
						/>
					)}
					<button
						aria-label='signup'
						type='submit'
						className='input-submit-button'
					>
						Sign Up
					</button>
				</form>
			</div>
		);
	}
}

export default withRouter(SignUp);
