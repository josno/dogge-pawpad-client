import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DogListItem from '../../Components/DogListItem/DogListItem';
import DogsApiService from '../../services/api-service';
import './DogsList.css';

class DogList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			dogs: [],
			dogSearch: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	componentDidMount() {
		DogsApiService.getDogs().then(responsejson => {
			if (responsejson.length === 0) {
				this.setState({
					error: 'Something went wrong, try again'
				});
			}

			this.setState({
				dogs: [...responsejson]
			});
		});
	}

	render() {
		let filteredDogs = this.state.dogs.filter(d => {
			return (
				d.dog_name
					.toLowerCase()
					.indexOf(this.state.dogSearch.toLowerCase()) !== -1
			);
		});

		return (
			<main className="DogList">
				<section>
					<div className="list-container">
						<h1 className="dogs-list-title"> Current Dogs </h1>
						<label>
							Search By Dog Name{' '}
							<input
								className="search-dog"
								type="text"
								name="dogSearch"
								value={this.state.dogSearch}
								onChange={this.handleChange}
							/>
						</label>
						<div className="dogs-list">
							{filteredDogs.map(d => (
								<DogListItem
									name={d.dog_name}
									id={d.id}
									key={d.id}
									img={d.profile_img}
								/>
							))}

							<li className="dog-item">
								<Link
									className="dog-img-link"
									to={'/add-new-dog'}
								>
									<div className="dog-img-container add-dog">
										<button className="add-a-dog-button">
											<h2>
												Add A <br /> New Dog
											</h2>
										</button>
									</div>
								</Link>
							</li>
						</div>
					</div>
				</section>
			</main>
		);
	}
}

export default DogList;
