import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DogImage from '../../assets/ken-reid-Cnrxu_Za30M-unsplash-removebg-preview.png';
import PawPadContext from '../../PawPadContext';
import TokenService from '../../services/token-service';
import './Home.css';

class Home extends Component {
	static contextType = PawPadContext;
	render() {
		return (
			<main className="homepage">
				<header className="header-title" role="banner">
					<h1 className="home-page-title"> PawPad </h1>
					<img
						className="homepage-image"
						src={DogImage}
						alt="dog"
					></img>
				</header>
				<section className="intro-details">
					<h3> An animal shelter intake application.</h3>

					<p>
						Check on your doggos and update essential information.
						Stay more organized and stay on track - doggo
						appreciates it!
					</p>
				</section>

				{TokenService.hasAuthToken() ? (
					<section>
						<div className="options">
							<ul>
								<li className="form-tab">
									<Link to={'/dogs-list'}>See Dogs</Link>
								</li>

								<li className="form-tab">
									<Link to={'add-new-dog'}>Add A Dog</Link>
								</li>
							</ul>
						</div>
					</section>
				) : (
					<section className="form-tab">
						<Link to={'login'}>Login To See Dogs</Link>
					</section>
				)}
			</main>
		);
	}
}

export default Home;
