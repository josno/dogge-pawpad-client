import React from "react";

const PawPadContext = React.createContext({
	isLoggedIn: "",
	handleLogInState: () => {},
});

export default PawPadContext;
