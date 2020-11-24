import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Navigation from "./Components/Navigation";
import SideNav from "./Components/SideNav";
import DogsList from "./Routes/DogsList/DogsList";
import AddNewDog from "./Routes/AddNewDog/AddNewDog";
import DogInfo from "./Routes/DogInfo/DogInfo";
import DogInfoPage from "./Routes/DogInfoPage/DogInfoPage";
import Notes from "./Routes/Notes/Notes";
import FosterAdopPage from "./Routes/FosterAdopPage/FosterAdopPage";
import Login from "./Routes/Login/Login";
import SignUp from "./Routes/SignUp/SignUp";
import PawPadContext from "./PawPadContext.js";
import TokenService from "./services/token-service";
import Footer from "./Components/Footer/Footer";
import "./App.css";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleLogInState = () => {
		setIsLoggedIn(!isLoggedIn);
	};

	const contextValue = {
		isLoggedIn: isLoggedIn,
		handleLogInState: () => handleLogInState(),
	};

	return (
		<>
			<PawPadContext.Provider value={contextValue}>
				<Navigation handleOpen={() => handleIsOpen()} open={isOpen} />
				<SideNav handleOpen={() => handleIsOpen()} open={isOpen} />

				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/sign-up" component={SignUp} />
					{TokenService.hasAuthToken() ? (
						<Route
							path="/dogs-list"
							render={(routeProps) => <DogsList {...routeProps} />}
						/>
					) : (
						<Redirect to="/" />
					)}

					{TokenService.hasAuthToken() ? (
						<Route path="/add-new-dog" component={AddNewDog} />
					) : (
						<Redirect to="/" />
					)}

					{TokenService.hasAuthToken() ? (
						<Route
							exact
							path="/dog-info/:dogId"
							render={(routeProps) => (
								<DogInfo
									dogId={routeProps.match.params.dogId}
									history={routeProps.history}
									{...routeProps}
								/>
							)}
						/>
					) : (
						<Redirect to="/" />
					)}

					{TokenService.hasAuthToken() ? (
						<Route
							exact
							path="/dog/:dogId/:dogName"
							render={(routeProps) => <DogInfoPage {...routeProps} />}
						/>
					) : (
						<Redirect to="/" />
					)}

					{TokenService.hasAuthToken() ? (
						<Route
							exact
							path="/notes-:dogName/:dogId"
							render={(routeProps) => (
								<Notes
									dogName={routeProps.match.params.dogName}
									dogId={routeProps.match.params.dogId}
									history={routeProps.history}
									{...routeProps}
								/>
							)}
						/>
					) : (
						<Redirect to="/" />
					)}

					{TokenService.hasAuthToken() ? (
						<Route
							exact
							path="/adoption-details-:dogName/:dogId"
							render={(routeProps) => (
								<FosterAdopPage {...routeProps} type="adoption" />
							)}
						/>
					) : (
						<Redirect to="/" />
					)}

					{TokenService.hasAuthToken() ? (
						<Route
							exact
							path="/foster-details-:dogName/:dogId"
							render={(routeProps) => (
								<FosterAdopPage {...routeProps} type="foster" />
							)}
						/>
					) : (
						<Redirect to="/" />
					)}
				</Switch>
			</PawPadContext.Provider>
			<Footer />
		</>
	);
};

export default App;
