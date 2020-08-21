import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
	IoMdLogIn,
	IoMdLogOut,
	IoIosAddCircleOutline,
	IoMdHome,
} from "react-icons/io";
import styled from "styled-components";
import TokenService from "../services/token-service";
import PawPadContext from "../PawPadContext";

import NavItem from "./NavItem";

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
				<IoMdHome className='top-nav-icon' size={"1.3em"} fill='white' />
			</NavItem>
			<NavItem to='/add-new-dog'>
				<IoIosAddCircleOutline
					className='top-nav-icon'
					size={"1.3em"}
					fill='white'
				/>
			</NavItem>
			<NavItem to={"/"} onClick={handleLogoutClick}>
				<IoMdLogOut className='top-nav-icon' size={"1.3em"} fill='white' />
			</NavItem>
		</>
	);

	const loggedOutNavIcons = (
		<>
			<NavItem to={"/login"}>
				<IoMdLogIn className='top-nav-icon' size={"1.3em"} fill='white' />
			</NavItem>
		</>
	);

	return (
		<header>
			<NavigationStyles>
				<Hamburger
					className='hamburger'
					open={props.open}
					onClick={props.handleOpen}
				>
					<span />
					<span />
					<span />
				</Hamburger>

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
		position: fixed;
		background-color: #009fb7;
		width: 100%;
		padding-left: 10px;
		z-index: 9999;
	}
	,
	nav {
		display: flex;
		align-items: center;
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

	.top-nav-icon {
		display: none;
	}
	@media (min-width: 768px) {
		position: static;

		.top-nav-icon {
			display: flex;
		}
	}
`;

const Hamburger = styled.button`
	top: 5%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 1.5rem;
	height: 1.5rem;
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 10;
	:focus {
		outline: none;
	}
	@media (min-width: 768px) {
		display: none;
	}

	span {
		width: 28px;
		height: 0.25rem;
		background: white;
		transition: all 0.3s linear;
		position: relative;
		transform-origin: 1px;
		:first-child {
			transform: ${({ open }) => (open ? "rotate(40deg)" : "rotate(0)")};
		}
		:nth-child(2) {
			opacity: ${({ open }) => (open ? "0" : "1")};
			transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
		}
		:nth-child(3) {
			transform: ${({ open }) => (open ? "rotate(-40deg)" : "rotate(0)")};
		}
	}
`;

export default Navigation;
