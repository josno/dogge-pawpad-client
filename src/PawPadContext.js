import React from 'react';

const PawPadContext = React.createContext({
	isLoggedIn: '',
	handleLogInState: () => {},
	firstName: '',
	saveFirstName: () => {}
});

export default PawPadContext;
