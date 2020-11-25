import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import moment from "moment";

import Button from "../Button";

export default function AdoptionDetails({
	info,
	uploadContract,
	undoAdoption,
}) {
	const [showContractModal, setShowContractModal] = useState(false);
	const [contract, setContract] = useState("");

	const adopBtnStyles = {
		textAlign: "center",
		width: "150px",
		margin: "2px",
		color: "#00000",
	};

	const formatDate = (date) => {
		const formattedDate = moment(date).format("LL");
		return formattedDate;
	};

	const renderContractButton = () => {
		return info.contract_url != null ? (
			<Button styles={adopBtnStyles}>
				<a
					className="contract-link"
					href={info.contract_url}
					target="_blank"
					rel="noopener noreferrer"
					download
				>
					View Contract
				</a>
			</Button>
		) : (
			<Button
				styles={adopBtnStyles}
				handleClick={(e) => setShowContractModal(!showContractModal)}
			>
				Upload Contract{" "}
			</Button>
		);
	};

	const renderContractModal = () => {
		return (
			<Modal
				open={showContractModal}
				onClose={() => setShowContractModal(false)}
				center
			>
				{contractForm()}
			</Modal>
		);
	};

	const handleChange = (e) => {
		e.preventDefault();
		setContract(e.target.files[0]);
	};

	const handleUpload = () => {
		uploadContract(contract);
		setShowContractModal(false);
	};

	const contractForm = () => {
		return (
			<div className="adoption-contract-modal">
				<div className="contract-upload-div">
					<input
						className="upload-contract-input"
						name="contract"
						onChange={(e) => handleChange(e)}
						type="file"
						accept="application/pdf"
					/>
				</div>
				<div className="contract-upload-div">
					<button
						className="contract-upload-button delete"
						onClick={() => handleUpload()}
					>
						Upload
					</button>
				</div>
			</div>
		);
	};

	const renderUndoAdoptionButton = () => {
		return (
			<>
				<Button styles={adopBtnStyles} handleClick={() => undoAdoption()}>
					Undo Adoption
				</Button>
			</>
		);
	};

	return (
		<AdoptionDetailsStyles>
			<ul className="adoption-info-text">
				<li className="adoption-label adoption-date">
					Date:
					<div className="adopter-date-value adoption-value value-align">
						{formatDate(info.adoption_date)}
					</div>
				</li>

				<li className="adoption-label adopter-name">
					Name:
					<div className="adopter-name-value adoption-value value-align ">
						{info.adopter_name}
					</div>
				</li>

				<li className="adoption-label adopter-email">
					Email:
					<div className="adopter-email-value adoption-value value-align">
						{info.adopter_email}
					</div>
				</li>

				<li className="adoption-label adopter-phone">
					Phone Number:
					<div className="adopter-phone-value adoption-value value-align">
						{info.adopter_phone}
					</div>
				</li>

				<li className="adoption-label adopter-country">
					Country:
					<div className="adopter-country-value adoption-value value-align">
						{info.adopter_country}
					</div>
				</li>
				<li className="adoption-section-buttons">
					{renderContractButton()}
					{renderContractModal()}
					{renderUndoAdoptionButton()}
				</li>
			</ul>
		</AdoptionDetailsStyles>
	);
}

const AdoptionDetailsStyles = styled.div`
	.wrapper {
		height: 100vh;
	}

	.value-align {
		padding-left: 20px;
	}

	.adoption-label {
		font-size: 1.1rem;
		color: #000000;
		font-weight: bold;
	}

	.adoption-value {
		font-size: 1rem;
		font-weight: 500;
	}

	.adoption-section-buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2px;
	}

	a.contract-link {
		color: #009fb7;
		:hover {
			text-shadow: none;
		}
	}

	@media (min-width: 1000px) {
		.adoption-value {
			display: inline-block;
		}

		.adoption-info-text {
			text-align: left;
			margin: 0px 10px;
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr 1fr;
			gap: 0px 0px;
			grid-template-areas:
				"name adoption-date"
				"email adopt-section-buttons"
				"phone-number adopt-section-buttons"
				"country adopt-section-buttons";
		}
		.adopter-name {
			grid-area: name;
		}
		.adopter-email {
			grid-area: email;
		}
		.adopter-phone {
			grid-area: phone-number;
		}
		.adopter-country {
			grid-area: country;
		}
		.adoption-date {
			grid-area: adoption-date;
		}
		.adoption-section-buttons {
			grid-area: adopt-section-buttons;
		}
	}
`;
