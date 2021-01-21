import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import "react-responsive-modal/styles.css";

import { Link } from "react-router-dom";
import styled from "styled-components";

import DogsApiService from "../../services/api-service";

import ProfileSection from "../../Components/Sections/ProfileSection";
import MedicalSection from "../../Components/Sections/MedicalSection";
import NotesSection from "../../Components/Sections/NotesSection";
import AdoptionSection from "../../Components/Sections/AdoptionSection";
import FosterSection from "../../Components/Sections/FosterSection";

const DogInfoPage = (props) => {
	const dogId = props.match.params.dogId;
	const [status, setStatus] = useState("");
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		async function getStatus() {
			const res = await DogsApiService.getDogStatus(dogId);

			setStatus(res.dog_status);
		}
		setUpdate(false);
		getStatus();
	}, [dogId, update]);

	const updateStatus = async () => {
		const res = await DogsApiService.getDogStatus(dogId);
		setStatus(res.dog_status);
	};

	return (
		<DogInfoPageStyles>
			<div className="buttons-section">
				<div className="back-button">
					<Link className="back-button-link" to="/dogs-list">
						<IoIosArrowBack /> Back
					</Link>
				</div>

				{/* <button className="delete-dog">Delete</button> */}
			</div>

			<div className="details-section">
				<div className="dog-details">
					<ProfileSection
						dogId={dogId}
						history={props.history}
						buttonStatus={(s) => setStatus(s)}
						setUpdate={setUpdate}
						update={update}
					/>
				</div>
				<div className="medical">
					<MedicalSection dogId={dogId} />
				</div>
				<div className="notes">
					<NotesSection dogId={dogId} update={update} setUpdate={setUpdate} />
				</div>
				<div className="adoption">
					<AdoptionSection
						dogId={dogId}
						status={status}
						updateStatus={() => updateStatus()}
						update={update}
						setUpdate={setUpdate}
					/>
				</div>
				<div className="foster">
					<FosterSection dogId={dogId} update={update} setUpdate={setUpdate} />
				</div>
			</div>
		</DogInfoPageStyles>
	);
};

const DogInfoPageStyles = styled.div`
	padding: 1rem;
	padding-top: 60px;
	height: 100%;
	max-width: 500px;
	margin: 0 auto;
	.dog-details,
	.medical,
	.adoption,
	.foster,
	.notes {
		position: relative;
		border: 1px solid black;
		margin: 10px 0px;
	}

	.buttons-section {
		display: flex;
		align-items: center;
	}
	.back-button {
		flex-grow: 1;
		.back-button-link {
			text-align: left;
		}
	}

	.archive,
	.delete-dog {
		margin: 0.8rem;
		position: relative;
		:hover {
			cursor: pointer;
		}

		background-color: #1f8392;
		color: white;
		border: 1px solid black;
		box-shadow: 0px;
		padding: 5px;
		font-weight: bold;
	}

	.details-section {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 1000px) {
		padding: 3rem;
		max-width: 1500px;

		.dog-details,
		.medical,
		.notes,
		.adoption,
		.foster {
			margin: 5px;
		}

		.details-section {
			display: grid;
			max-height: 800px;
			grid-template-columns: 0.8fr 1.1fr 1.1fr;
			grid-template-rows: 1.4fr 0.6fr;

			grid-template-areas:
				"dog-details medical notes"
				"dog-details adoption foster";

			.dog-details {
				grid-area: dog-details;
				display: flex;
				justify-content: center;
			}
			.medical {
				grid-area: medical;
				display: flex;
				flex-direction: column;
				position: relative;
			}
			.notes {
				grid-area: notes;
			}
			.adoption {
				grid-area: adoption;
			}
			.foster {
				grid-area: foster;
			}
		}
		.buttons-section {
			grid-area: buttons-section;
			display: flex;
		}
	}
`;

export default DogInfoPage;
