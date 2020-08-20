import React, { Component } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import PawPadContext from "../../PawPadContext";
import ValidationError from "../../Components/ValidationError/ValidationError";
import "./Login.css";

class Login extends Component {
	static contextType = PawPadContext;
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			loading: false,
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			loading: true,
		});

		const { username, password } = e.target;

		AuthApiService.postLogin({
			user_name: username.value.toLowerCase(),
			password: password.value,
		})
			.then((res) => {
				username.value = "";
				password.value = "";
				TokenService.saveAuthToken(res.authToken);
				TokenService.saveShelterToken(res.shelterId);
			})
			.then((res) => {
				this.context.handleLogInState();
				this.props.history.push("/");
			})
			.catch((res) => {
				this.setState({ error: res.error });
			});
	};

	render() {
		return (
			<div className='login-container'>
				<form className='input-form' onSubmit={this.handleSubmit}>
					<h2 className='login-title'> Account Login</h2>
					<ul className='demo-info'>
						<li className='demo-info'>Username: demo</li>
						<li className='demo-info'>Password: !password123</li>
					</ul>

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
						required
					/>
					{this.state.error !== null && (
						<ValidationError
							message={`${this.state.error}. Refresh and try again.`}
						/>
					)}
					<button
						aria-label='login'
						type='submit'
						className='input-submit-button'
					>
						Login
					</button>
					{this.state.loading && this.state.error === null && (
						<div className='login-loader-container'>
							<div className='loader'></div>
						</div>
					)}
				</form>
			</div>
		);
	}
}

export default Login;
