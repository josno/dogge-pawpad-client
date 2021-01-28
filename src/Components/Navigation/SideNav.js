import React, { useContext } from "react";
import styled from "styled-components";
import NavItem from "./NavItem";
import {
	IoMdLogIn,
	IoMdLogOut,
	IoIosPersonAdd,
	IoIosAddCircleOutline,
	IoMdHome,
} from "react-icons/io";
import TokenService from "../../services/token-service";
import PawPadContext from "../../PawPadContext";

const SideNav = (props) => {
	const context = useContext(PawPadContext);

	const handleLogoutClick = () => {
		context.handleLogInState();
		TokenService.clearAuthToken();
		TokenService.clearShelterToken();
	};

	return (
		<SideNavStyles open={props.open}>
			<NavItem to="/dogs-list" className="side-nav-item">
				<IoMdHome size={"1.5em"} fill="white" /> Home
			</NavItem>
			<NavItem to="/add-new-dog" className="side-nav-item">
				<IoIosAddCircleOutline fill="white" size={"1.5em"} /> Add Dog
			</NavItem>
			{TokenService.hasAuthToken ? (
				<NavItem to="/login" className="side-nav-item">
					<IoMdLogIn size={"1.5em"} fill="white" /> Log In
				</NavItem>
			) : (
				<NavItem to="/" onClick={handleLogoutClick} className="side-nav-item">
					<IoMdLogOut size={"1.5em"} fill="white" /> Log Out
				</NavItem>
			)}
			<NavItem to="/signup" className="side-nav-item">
				<IoIosPersonAdd size={"1.5em"} fill="white" /> Sign Up
			</NavItem>
		</SideNavStyles>
	);
};

const SideNavStyles = styled.div`
	height: 100%;
	width: 200px;
	background-color: #009fb7;
	left: 0;
	z-index: 9999;
	overflow-x: hidden;
	position: fixed;
	transition: transform 0.3s ease-in-out;
	margin-top: 50px;
	transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
	.side-nav-item {
		display: flex;
		padding-left: 10px;
		align-items: center;
		font-size: 1.15em;
		color: white;
		margin: 10px;
	}
`;

export default SideNav;
