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
			dogs: []
		};
	}

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
		const { dogs } = this.state;

		return (
			<main className="DogList">
				<section>
					<div className="list-container">
						<h1 className="dogs-list-title"> Current Dogs </h1>
					</div>
					<div className="dogs-list">
						{dogs.map(d => (
							<DogListItem
								name={d.dog_name}
								id={d.id}
								key={d.id}
								img={d.profile_img}
							/>
						))}

						<li className="dog-item">
							<Link className="dog-img-link" to={'/add-new-dog'}>
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
				</section>
			</main>
		);
	}
}

export default DogList;
