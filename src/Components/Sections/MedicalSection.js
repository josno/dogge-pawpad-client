import React, { useState, useLayoutEffect, useCallback } from "react";
import ShotDetailsView from "../Views/ShotDetailsView";
import EditShots from "../Views/EditShots";
import { Modal } from "react-responsive-modal";

import DogsApiService from "../../services/api-service";

import styled from "styled-components";
import EditButton from "../UI/EditButton";
import BatchShotForm from "../BatchUpdateForms/BatchShotForm";

const MedicalSection = ({ dogId }) => {
	const [shots, setShots] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [updateShotList, setUpdateShotList] = useState([]);
	const [currentShotNames, setCurrentShotName] = useState([]);

	const getShots = useCallback(async () => {
		const res = await DogsApiService.getDogInfo(dogId);
		setShots([...res.shotsCompleted]);
		const shotNameList = res.shotsCompleted.map((obj) => obj.shot_name);
		setCurrentShotName(shotNameList);
	}, [dogId]);

	useLayoutEffect(() => {
		getShots();
	}, [getShots]);

	const updateShots = () => {
		if (updateShotList.length > 0) {
			updateShotList.map((shotObj) =>
				DogsApiService.updateDogShot(shotObj, shotObj.id)
			);
		}
		getShots();
		setEditMode(false);
	};

	const updateList = (shot) => {
		setUpdateShotList((prevState) => [...prevState, shot]);
	};

	return (
		<>
			<MedicalTitleStyle>Medical</MedicalTitleStyle>
			{editMode ? (
				<EditShots dogId={dogId} updateShotList={updateList} />
			) : (
				<ShotDetailsView dogId={dogId} shots={shots} />
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
					currentShotNames={currentShotNames}
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
