import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import TokenService from "../../services/token-service";
import PawPadContext from "../../PawPadContext";

class Navigation extends Component {
	static contextType = PawPadContext;
	handleLogoutClick = () => {
		this.context.handleLogInState();
		TokenService.clearAuthToken();
		TokenService.clearShelterToken();
	};

	renderLogoutLink() {
		return (
			<>
				<Link className='link-text' to={"/dogs-list"}>
					Dogs List
				</Link>
				<Link className='link-text' onClick={this.handleLogoutClick} to={"/"}>
					Logout
				</Link>
			</>
		);
	}

	renderLoginLink() {
		return (
			<>
				<Link className='link-text' to={"/login"}>
					Log in
				</Link>
				<Link className='link-text' to={"/signup"}>
					Sign up
				</Link>
			</>
		);
	}

	render() {
		return (
			<nav className='responsive-nav-wrapper'>
				<label id='responsive-menu' htmlFor='toggle'>
					&#9776;
				</label>
				<input type='checkbox' id='toggle' />
				<div className='menu'>
					<Link id='nav-title' to='/'>
						PawPad
					</Link>
					{TokenService.hasAuthToken()
						? this.renderLogoutLink()
						: this.renderLoginLink()}
				</div>
			</nav>
		);
	}
}

export default Navigation;
