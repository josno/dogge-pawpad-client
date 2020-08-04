import React, { Component } from "react";
import { Link } from "react-router-dom";
import DogListItem from "../../Components/DogListItem/DogListItem";
import DogsApiService from "../../services/api-service";
import "./DogsList.css";
import TokenService from "../../services/token-service";

class DogList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			dogs: [],
			dogSearch: "",
			view: "Current",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	componentDidMount() {
		const shelterId = TokenService.getShelterToken();
		DogsApiService.getDogs(shelterId).then((responsejson) => {
			if (responsejson.length === 0) {
				this.setState({
					error: "Something went wrong, try again",
				});
			}

			this.setState({
				dogs: [...responsejson],
			});
		});
	}

	setFilter = (e) => {
		this.setState({
			view: e.target.value,
		});
	};

	render() {
		const { view } = this.state;
		let filteredDogs = this.state.dogs.filter((d) => {
			return (
				d.dog_name.toLowerCase().indexOf(this.state.dogSearch.toLowerCase()) !==
				-1
			);
		});

		return (
			<main className='dogslist'>
				<section className='list-container'>
					<h1 className='dogs-list-title'> Current Dogs </h1>
					<div>
						<label className='search-box'>
							Search By Dog Name{" "}
							<input
								className='search-dog'
								type='text'
								name='dogSearch'
								value={this.state.dogSearch}
								onChange={this.handleChange}
							/>
						</label>
					</div>
					<div>
						<ul className='filter-links'>
							{["Current", "Adopted", "Archived"].map((i, index) => (
								<li key={index}>
									<button value={i} onClick={(e) => this.setFilter(e)}>
										{i}
									</button>
								</li>
							))}
						</ul>
					</div>
					<div className='dogs-list'>
						{filteredDogs.map((d) => {
							return (
								d.dog_status === view && (
									<DogListItem
										name={d.dog_name}
										id={d.id}
										key={d.id}
										img={d.profile_img}
									/>
								)
							);
						})}
					</div>
				</section>

				<button className='add-a-dog-button add-dog'>
					<Link className='add-dog-link' to={"/add-new-dog"}>
						Add Dog
					</Link>
				</button>
			</main>
		);
	}
}

export default DogList;
