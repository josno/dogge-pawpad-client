import React, { useState, useLayoutEffect } from "react";
import ShotDetailsView from "./ShotDetailsView/ShotDetailsView";
import EditShots from "./EditShots/EditShots";
import { Modal } from "react-responsive-modal";

import DogsApiService from "../services/api-service";

import styled from "styled-components";
import EditButton from "./EditButton/EditButton";
import BatchShotForm from "./BatchUpdateForms/BatchShotForm";

const MedicalSection = ({ dogId }) => {
	const [shots, setShots] = useState([]);
	const [spayedNeutered, setSpayedNeutered] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	useLayoutEffect(() => {
		async function getDogInfo() {
			const res = await DogsApiService.getDogInfo(dogId);
			setShots([...res.shotsCompleted]);
			setSpayedNeutered(res.spayedneutered);
		}
		getDogInfo();
	}, [dogId]);

	const updateShots = async () => {
		const res = await DogsApiService.getDogInfo(dogId);
		setShots([...res.shotsCompleted]);
		setSpayedNeutered(res.spayedneutered);
		setEditMode(false);
	};

	return (
		<>
			<MedicalTitleStyle>Medical </MedicalTitleStyle>
			{editMode ? (
				<EditShots dogId={dogId} spayedNeutered={spayedNeutered} />
			) : (
				<ShotDetailsView
					dogId={dogId}
					shots={shots}
					spayedNeutered={spayedNeutered}
				/>
			)}
			<EditContainerStyles>
				{!editMode ? (
					<EditButton type="edit" handleClick={() => setEditMode(!editMode)} />
				) : (
					<>
						<EditButton type="submit" handleClick={() => updateShots()} />
						<EditButton type="cancel" handleClick={() => updateShots()} />
					</>
				)}

				<EditButton
					type="add"
					handleClick={() => setModalIsOpen(!modalIsOpen)}
				/>
			</EditContainerStyles>
			<Modal
				open={modalIsOpen}
				onClose={() => setModalIsOpen(!modalIsOpen)}
				center
			>
				<BatchShotForm
					singleShotUpdate={true}
					selectedDogs={[dogId]}
					setModal={() => setModalIsOpen(false)}
					updateDogs={() => updateShots()}
				/>
			</Modal>
		</>
	);
};

const MedicalTitleStyle = styled.h3`
	text-align: left;
	margin: 10px 0px 10px 10px;
`;

const EditContainerStyles = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	padding-right: 10px;
	position: absolute;
	top: 10px;
`;

export default MedicalSection;
