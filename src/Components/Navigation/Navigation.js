import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {
	IoMdLogIn,
	IoMdLogOut,
	IoIosAddCircleOutline,
	IoMdHome,
} from "react-icons/io";
// import "./Navigation.css";
import styled from "styled-components";
import TokenService from "../../services/token-service";
import PawPadContext from "../../PawPadContext";

import NavItem from "../NavItem";

const Navigation = (props) => {
	const context = useContext(PawPadContext);

	const handleLogoutClick = () => {
		context.handleLogInState();
		TokenService.clearAuthToken();
		TokenService.clearShelterToken();
	};

	const loggedInNavIcons = (
		<>
			<NavItem to='/dogs-list'>
				<IoMdHome className='nav-icon' fill='white' />
			</NavItem>
			<NavItem to='/add-new-dog'>
				<IoIosAddCircleOutline className='nav-icon' fill='white' />
			</NavItem>
			<NavItem onClick={handleLogoutClick}>
				<IoMdLogOut className='nav-icon' width='1.15em' fill='white' />
			</NavItem>
		</>
	);

	const loggedOutNavIcons = (
		<>
			<NavItem to={"/login"}>
				<IoMdLogIn className='nav-icon' width='1.15em' fill='white' />
			</NavItem>
		</>
	);

	return (
		<header>
			<NavigationStyles>
				<GiHamburgerMenu className='menu-icon' fill='white' />
				<Link className='nav-title' to='/'>
					Pawpad
				</Link>
				<nav className='nav-wrapper'>
					{TokenService.hasAuthToken() ? loggedInNavIcons : loggedOutNavIcons}
				</nav>
			</NavigationStyles>
		</header>
	);
};

const NavigationStyles = styled.div`
	 {
		height: 50px;
		background-color: #009fb7;
		padding-left: 10px;
	}
	,
	nav {
		display: flex;
		align-items: center;
		height: 50px;
	}
	,
	.nav-title {
		padding-left: 10px;
		text-align: left;
		flex-grow: 1;
		color: #fcfcfc;
		font-family: Candal, sans-serif;
		font-size: 1.15em;
		padding-bottom: 5px;
		-webkit-text-stroke: 1px black;
	}
`;

export default Navigation;
