import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import DogListItem from "../../Components/DogListItem";
import DogItemImage from "../../Components/DogItemImage";

import DropDown from "../../Components/DropDown";
import DogsApiService from "../../services/api-service";
import TokenService from "../../services/token-service";
import UpdateBar from "../../Components/UpdateBar";
import { Modal } from "react-responsive-modal";
import UpdateStatusForm from "../../Components/BatchUpdateForms/UpdateStatusForm";
import DeleteDogForm from "../../Components/DeleteDogForm";
import BatchShotForm from "../../Components/BatchUpdateForms/BatchShotForm";

const DogList = (props) => {
	const [error, setError] = useState("");
	const [dogs, setDogs] = useState([]);
	const [dogSearch, setDogSearch] = useState("");
	const [view, setView] = useState("");
	const [selected, setSelected] = useState([]);
	const [updateType, setType] = useState();
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const getDogs = () => {
		const shelterId = TokenService.getShelterToken();
		DogsApiService.getDogs(shelterId)
			.then((responsejson) => {
				if (responsejson.length === 0) {
					setError("Something went wrong, try again");
				}

				responsejson
					.map((dog) => (dog.checked = false))
					.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

				setDogs([...responsejson]);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useLayoutEffect(() => {
		getDogs();
	}, []);

	let filteredDogs = dogs.filter((d) => {
		return d.dog_name.toLowerCase().indexOf(dogSearch.toLowerCase()) !== -1;
	});

	const updateSelected = (id) => {
		let newList;

		selected.includes(id)
			? (newList = selected.filter((i) => i !== id))
			: (newList = [...selected, id]);

		setSelected([...newList]);

		dogs.map((dog) => {
			if (dog.id === id) {
				dog.checked = !dog.checked;
			}
			return dog;
		});
	};

	const handleSort = (sortType) => {
		let sorted;
		if (sortType === "A-Z") {
			sorted = dogs.sort((a, b) =>
				a.dog_name > b.dog_name ? 1 : a.dog_name < b.dog_name ? -1 : 0
			);
		} else if (sortType === "Z-A") {
			sorted = dogs.sort((a, b) =>
				a.dog_name > b.dog_name ? -1 : a.dog_name < b.dog_name ? 1 : 0
			);
		}

		setDogs([...sorted]);
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setDogSearch(value);
	};

	const setFilter = (value) => {
		value === "None" ? setView("") : setView(value);
	};

	const setUpdateType = (type) => {
		setType(type);
		setModalIsOpen(true);
	};

	const setChecked = () => {
		dogs.map((dog) => (dog.checked = false));
	};

	return (
		<DogListStyles>
			<section className='search-filter-container'>
				{selected.length > 0 && !modalIsOpen && (
					<UpdateBar onClick={(type) => setUpdateType(type)} />
				)}

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
				<div className='filters-container'>
					<DropDown
						label='Filter'
						list={["Current", "Adopted", "Archived", "None"]}
						onClick={(value) => setFilter(value)}
					/>
					<DropDown
						label='Sort'
						list={["A-Z", "Z-A"]}
						onClick={(sortType) => handleSort(sortType)}
					/>
				</div>
			</section>

			<section className='list-container'>
				<ul className='dogs-list'>
					{/* Fix THIS */}

					{view === "" && !error
						? filteredDogs.map((d) => {
								return (
									<DogListItem
										id={d.id}
										key={d.id}
										onChange={(id) => updateSelected(id)}
										checked={d.checked}
									>
										<DogItemImage img={d.profile_img} name={d.dog_name} />
									</DogListItem>
								);
						  })
						: filteredDogs.map((d) => {
								return (
									d.dog_status === view && (
										<DogListItem
											id={d.id}
											key={d.id}
											onChange={(id) => updateSelected(id)}
											checked={d.checked}
										>
											<DogItemImage img={d.profile_img} name={d.dog_name} />
										</DogListItem>
									)
								);
						  })}
				</ul>
			</section>

			<button className='add-a-dog-button add-dog'>
				<Link className='add-dog-link' to={"/add-new-dog"}>
					Add Dog
				</Link>
			</button>

			<Modal
				open={modalIsOpen}
				onClose={() => setModalIsOpen(!modalIsOpen)}
				showCloseIcon={false}
				center
			>
				{updateType === "status" ? (
					<UpdateStatusForm
						selectedDogs={selected}
						setModal={() => setModalIsOpen()}
						updateDogs={() => getDogs()}
						setChecked={() => setChecked()}
						resetSelected={setSelected}
					/>
				) : updateType === "delete" ? (
					<DeleteDogForm
						selectedDogs={selected}
						setModal={() => setModalIsOpen()}
						updateDogs={() => getDogs()}
						setChecked={() => setChecked()}
						resetSelected={setSelected}
					/>
				) : (
					<BatchShotForm
						selectedDogs={selected}
						setModal={() => setModalIsOpen()}
						updateDogs={() => getDogs()}
						resetSelected={setSelected}
					/>
				)}
			</Modal>
		</DogListStyles>
	);
};

const DogListStyles = styled.main`
	padding-top: 60px;
	width: 100%;

	.add-a-dog-button {
		background-color: #009fb7;
		border: 2px solid black;
		border-radius: 50%;
		height: 100px;
		width: 100px;
		font-size: 1em;
		position: fixed;
		bottom: 0px;
		right: 0px;
		margin: 20px;
	}

	.add-dog-link:hover {
		color: white;
		font-weight: bolder;
	}

	.add-a-dog-button:hover {
		cursor: pointer;
	}

	.add-a-dog-button a {
		color: white;
	}

	.dog-list-container {
		padding-top: 40px;
	}

	.dogs-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.dog-list-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		height: 80vh;
	}

	.dog-list-actions {
		border: 1px solid black;
		background-color: #fcfcfc;
		padding: 10px 30px;
	}

	.search-dog {
		padding-left: 10px;
		height: 40px;
		display: block;
		margin: 0px auto 0px auto;
		width: 90%;
		font-size: 0.8em;
	}

	.filter-links {
		display: inline-block;
	}

	.filter-links li {
		display: inline-block;
		list-style: none;
		margin: 10px;
	}

	.search-filter-container {
		width: 100%;
		height: 150px;
		padding-top: 10px;
		display: flex;
		flex-direction: column;
	}

	.filters-container {
		display: flex;
		/* border: 1px solid black; */
		padding: 10px;
		justify-content: space-around;
		height: 150px;
		font-size: 0.8em;
	}

	.drop-down {
		flex-grow: 1;
		margin: 20px;
	}

	@media (min-width: 500px) {
		.search-filter-container {
			flex-direction: row;
			justify-content: space-around;
		}

		.filters-container {
			padding: 0px;
		}
	}

	@media (min-width: 768px) {
		.search-dog {
			width: 30vw;
		}
	}
`;

export default DogList;
