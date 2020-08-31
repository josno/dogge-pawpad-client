import React, { useState, useContext } from "react";
import styled from "styled-components";
import config from "../../config";
import TokenService from "../../services/token-service";
import PawPadContext from "../../PawPadContext";

const statusList = ["Current", "Archived"];

const UpdateStatusForm = (props) => {
	const [status, setStatus] = useState("");
	const [error, setError] = useState(null);

	const onSubmit = (e) => {
		e.preventDefault();
		let list = props.selectedDogs.map((dogId) => {
			return {
				fetchUrl: `${config.API_ENDPOINT}/dogs/${dogId}`,
				updatedObj: {
					dog_status: status,
				},
			};
		});

		Promise.all(
			list.map((item) =>
				fetch(item.fetchUrl, {
					method: "PATCH",
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${TokenService.getAuthToken()}`,
					},
					body: JSON.stringify(item.updatedObj),
				})
			)
		).then((response) => {
			if (!response) {
				setError("Something wrong happened. Try again later.");
			}
			props.updateDogs();

			props.setModal(false);
		});
	};

	return (
		<UpdateStatusFormStyles onSubmit={(e) => onSubmit(e)}>
			<label>
				Select Status
				<div className='button-selection-container'>
					{statusList.map((s, index) => (
						<input
							key={index}
							type='button'
							value={s}
							className='status-button'
							onClick={() => setStatus(s)}
						/>
					))}
				</div>
			</label>

			<ButtonWrapperStyles>
				<button onClick={() => props.setModal(false)}>Cancel</button>
				<button>Submit</button>
			</ButtonWrapperStyles>
		</UpdateStatusFormStyles>
	);
};

const UpdateStatusFormStyles = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px 0px 10px 0px;
	justify-content: space-between;
	height: 150px;
	label {
		display: flex;
		flex-direction: column;
	}
	.button-selection-container {
		margin-top: 10px;
		display: flex;
		justify-content: space-evenly;
		width: 270px;
	}
`;

const ButtonWrapperStyles = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export default UpdateStatusForm;
