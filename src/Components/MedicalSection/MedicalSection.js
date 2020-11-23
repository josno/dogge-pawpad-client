import React, { useState, useLayoutEffect } from "react";
import ShotDetailsView from "../../Components/ShotDetailsView/ShotDetailsView";
import EditShots from "../../Components/EditShots/EditShots";
import DatePicker from "react-datepicker";
import { Modal } from "react-responsive-modal";

import styled from "styled-components";
import NewEditButtons from "../NewEditButtons/NewEditButtons";
import BatchShotForm from "../BatchUpdateForms/BatchShotForm";
import Button from "../../Components/Button";

import DogsApiService from "../../services/api-service";
import { GrEdit } from "react-icons/gr";

const MedicalSection = ({ dogId }) => {
	const [shots, setShots] = useState([]);
	const [spayedNeutered, setSpayedNeutered] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [date, setDate] = useState(null);
	const [shotName, setShotName] = useState("");
	const [error, setError] = useState(null);
	const [addMode, setAddMode] = useState(false);
	const [newShot, setNewShot] = useState("");

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
				<EditShots dogId={dogId} />
			) : (
				<ShotDetailsView
					dogId={dogId}
					shots={shots}
					spayedNeutered={spayedNeutered}
				/>
			)}
			<EditContainerStyles>
				{!editMode ? (
					<NewEditButtons
						type="edit"
						handleClick={() => setEditMode(!editMode)}
					/>
				) : (
					<>
						<NewEditButtons type="submit" handleClick={() => updateShots()} />
						<NewEditButtons type="cancel" handleClick={() => updateShots()} />
					</>
				)}

				<NewEditButtons
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
