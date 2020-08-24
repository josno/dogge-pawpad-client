import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import styled from "styled-components";

const NavItem = (props) => {
	return (
		<NavItemStyles>
			<Link
				className={`${props.className}`}
				onClick={props.onClick}
				to={props.to}
			>
				{props.children}
			</Link>
		</NavItemStyles>
	);
};

NavItem.propTypes = {
	className: propTypes.string,
	onClick: propTypes.func,
	to: propTypes.string,
	children: propTypes.any.isRequired,
};

const NavItemStyles = styled.div`
	@media (min-width: 768px) {
		flex-direction: row;
		display: flex;
		justify-content: space-evenly;
		margin: 10px;
		a {
			display: flex;
			align-items: center;
		}
		.nav-icon {
			width: 1.15em;
			height: 1.15em;
		}
		.nav-icon:hover {
			transform: scale(1.2);
		}
	}
`;

export default NavItem;
