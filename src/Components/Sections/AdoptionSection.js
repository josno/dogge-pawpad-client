import React, { useState, useEffect } from "react";

import styled from "styled-components";

import DogsApiService from "../../services/api-service";
import Encryption from "../../Utils/encryption";
import AdoptionDetails from "../Views/AdoptionDetails";

const AdoptionSection = ({
	dogId,
	status,
	update,
	setUpdate,
	updateStatus,
}) => {
	const [adoption, setAdoption] = useState("");

	useEffect(() => {
		const getAdoption = async () => {
			if (status !== "Adopted") {
				return;
			}
			let data;
			const res = await DogsApiService.getAdoptionInfo(dogId);
			data = Encryption.decryptData(res.data);
			setAdoption(data);
		};
		if (update) {
			setUpdate(false);
		}
		getAdoption();
	}, [dogId, update, setUpdate, status]);

	const handleUploadContract = async (contract) => {
		const contractData = new FormData();
		contractData.append("contract", contract);

		await DogsApiService.uploadContract(contractData, dogId);
		const res = await DogsApiService.getAdoptionInfo(dogId);
		let data = Encryption.decryptData(res.data);
		setAdoption(data);
	};

	const undoAdoption = async () => {
		await DogsApiService.deleteAdoption(dogId);
		updateStatus();
		setUpdate(true);
	};

	return (
		<AdoptionSectionStyles>
			<h3 className="adoption-title">Adoption</h3>
			{status !== "Adopted" ? (
				""
			) : (
				<AdoptionDetails
					uploadContract={(c) => handleUploadContract(c)}
					undoAdoption={() => undoAdoption()}
					info={adoption}
				/>
			)}
		</AdoptionSectionStyles>
	);
};

const AdoptionSectionStyles = styled.div`
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	.adoption-title {
		text-align: left;
		margin: 10px 0px 10px 10px;
	}
`;

export default AdoptionSection;
