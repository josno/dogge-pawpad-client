import React, { Component, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import DogListItem from "../../Components/DogListItem/DogListItem";
import DogsApiService from "../../services/api-service";
import "./DogsList.css";
import TokenService from "../../services/token-service";

const DogList = (props) => {
	const [error, setError] = useState("");
	const [dogs, setDogs] = useState([]);
	const [dogSearch, setDogSearch] = useState("");
	const [view, setView] = useState("Current");

	let filteredDogs = dogs.filter((d) => {
		return d.dog_name.toLowerCase().indexOf(dogSearch.toLowerCase()) !== -1;
	});

	useLayoutEffect((filteredDogs) => {
		const shelterId = TokenService.getShelterToken();
		DogsApiService.getDogs(shelterId)
			.then((responsejson) => {
				if (responsejson.length === 0) {
					setError("Something went wrong, try again");
				}

				setDogs([...responsejson]);
			})
			.catch((err) => {
				setError(err.message);
			});
	}, []);

	const handleChange = (e) => {
		const { value } = e.target;
		setDogSearch(value);
	};

	const setFilter = (e) => {
		setView(e.target.value);
	};

	return (
		<main className='dogslist'>
			<section className='search-filter-container'>
				<label className='search-box ' aria-label='search'>
					<input
						className='search-dog dog-list-actions'
						type='text'
						name='dogSearch'
						value={dogSearch}
						onChange={handleChange}
						placeholder='Search by name...'
					/>
				</label>

				<ul className='filter-links'>
					{["Current", "Adopted", "Archived"].map((i, index) => (
						<li key={index}>
							<button value={i} onClick={(e) => setFilter(e)}>
								{i}
							</button>
						</li>
					))}
				</ul>
			</section>
			<section className='list-container'>
				<div className='dogs-list'>
					{!error &&
						filteredDogs.map((d) => {
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
};

export default DogList;
