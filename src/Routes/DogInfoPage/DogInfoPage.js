import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import { Link } from "react-router-dom";
import styled from "styled-components";

import ProfileSection from "../../Components/ProfileSection/ProfileSection";
import MedicalSection from "../../Components/MedicalSection/MedicalSection";

const DogInfoPage = (props) => {
	const dogId = props.match.params.dogId;

	return (
		<DogInfoPageStyles>
			<div className="buttons-section">
				<div className="back-button">
					<Link className="back-button-link" to="/dogs-list">
						<IoIosArrowBack /> Back
					</Link>
				</div>
				<div className="archive">
					<button>Archive</button>
				</div>
				<div className="delete-dog">
					<button>Delete</button>
				</div>
			</div>

			<div className="details-section">
				<div className="dog-details">
					<ProfileSection dogId={dogId} history={props.history} />
				</div>
				<div className="medical">
					<MedicalSection dogId={dogId} />
				</div>
				<div className="adoption"></div>
				<div className="foster"></div>
				<div className="notes"></div>
			</div>
		</DogInfoPageStyles>
	);
};

const DogInfoPageStyles = styled.div`
	padding: 1rem;
	padding-top: 60px;
	height: 100%;
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

		button {
			background-color: #1f8392;
			color: white;
			border: 1px solid black;
			box-shadow: 0px;
			padding: 5px;
			font-weight: bold;
		}
	}

	.details-section {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 1000px) {
		padding: 3rem;

		.dog-details,
		.medical,
		.notes,
		.adoption,
		.foster {
			margin: 5px;
		}

		.details-section {
			display: grid;
			height: 700px;
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
