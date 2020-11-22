import React, { useState, useLayoutEffect } from "react";
import ShotDetailsView from "../../Components/ShotDetailsView/ShotDetailsView";
import EditShots from "../../Components/EditShots/EditShots";

import DogsApiService from "../../services/api-service";

const MedicalSection = ({ dogId }) => {
	const [shots, setShots] = useState([]);
	const [spayedNeutered, setSpayedNeutered] = useState("");
	const [editMode, setEditMode] = useState(false);

	useLayoutEffect(() => {
		async function getDogInfo() {
			const res = await DogsApiService.getDogInfo(dogId);
			setShots([...res.shotsCompleted]);
			setSpayedNeutered(res.spayedneutered);
		}
		getDogInfo();
	}, [dogId]);

	return (
		<div>
			{editMode ? (
				<EditShots dogId={dogId} />
			) : (
				<ul className="dog-info-text shot-container">
					<ShotDetailsView shots={shots} spayedNeutered={spayedNeutered} />
				</ul>
			)}
		</div>
	);
};

export default MedicalSection;
