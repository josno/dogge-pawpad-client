import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Navigation from "./Components/Navigation";
import SideNav from "./Components/SideNav";
import DogsList from "./Routes/DogsList/DogsList";
import AddNewDog from "./Routes/AddNewDog/AddNewDog";
import DogInfo from "./Routes/DogInfo/DogInfo";
import Notes from "./Routes/Notes/Notes";
import Adoption from "./Routes/Adoption/Adoption";
import Login from "./Routes/Login/Login";
import SignUp from "./Routes/SignUp/SignUp";
import PawPadContext from "./PawPadContext.js";
import TokenService from "./services/token-service";
import Footer from "./Components/Footer/Footer";
import "./App.css";

class App extends Component {
	static contextType = PawPadContext;
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			isOpen: false,
		};
	}

	handleIsOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	handleLogInState = () => {
		this.setState({
			isLoggedIn: !this.state.isLoggedIn,
		});
	};

	render() {
		const contextValue = {
			isLoggedIn: this.state.isLoggedIn,
			handleLogInState: this.handleLogInState,
		};

		return (
			<>
				<PawPadContext.Provider value={contextValue}>
					<Navigation
						handleOpen={() => this.handleIsOpen()}
						open={this.state.isOpen}
					/>
					<SideNav
						handleOpen={() => this.handleIsOpen()}
						open={this.state.isOpen}
					/>

					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/login' component={Login} />
						<Route path='/signup' component={SignUp} />
						{TokenService.hasAuthToken() ? (
							<Route path='/dogs-list' component={DogsList} />
						) : (
							<Redirect to='/' />
						)}

						{TokenService.hasAuthToken() ? (
							<Route path='/add-new-dog' component={AddNewDog} />
						) : (
							<Redirect to='/' />
						)}

						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/dog-info/:dogId'
								render={(routeProps) => (
									<DogInfo
										dogId={routeProps.match.params.dogId}
										history={routeProps.history}
										{...routeProps}
									/>
								)}
							/>
						) : (
							<Redirect to='/' />
						)}

						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/notes-:dogName/:dogId'
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
							<Redirect to='/' />
						)}

						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/adoption-details-:dogName/:dogId'
								render={(routeProps) => <Adoption {...routeProps} />}
							/>
						) : (
							<Redirect to='/' />
						)}
					</Switch>
				</PawPadContext.Provider>
				<Footer />
			</>
		);
	}
}

export default App;
