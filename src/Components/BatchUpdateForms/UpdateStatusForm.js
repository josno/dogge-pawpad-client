import React, { useState } from "react";
import styled from "styled-components";
import config from "../../config";
import TokenService from "../../services/token-service";
import Button from "../Button";

const statusList = ["Current", "Archived"];

const UpdateStatusForm = (props) => {
	const [status, setStatus] = useState("");
	const [error, setError] = useState(null);

	const onSubmit = () => {
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

			props.resetSelected([]);
			props.setModal(false);
			props.updateDogs();
		});
	};

	const closeUpdateStatusForm = () => {
		props.resetSelected([]);
		props.setModal(false);
		props.setChecked(false);
	};

	return (
		<UpdateStatusFormStyles>
			<label>
				Select Status
				<div className='button-selection-container'>
					{statusList.map((s, index) => (
						<input
							key={index}
							type='button'
							value={s}
							className={`status-button ${status === s ? "clicked" : ""}`}
							onClick={() => setStatus(s)}
						/>
					))}
				</div>
			</label>

			<ButtonWrapperStyles>
				<Button handleClick={() => closeUpdateStatusForm()}>Cancel</Button>
				<Button handleClick={() => onSubmit()}>Submit</Button>
			</ButtonWrapperStyles>
		</UpdateStatusFormStyles>
	);
};

const UpdateStatusFormStyles = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px 0px 10px 0px;
	justify-content: space-between;
	max-width: 250px;

	.status-button {
		font-weight: bold;
		padding: 5px;
		font-size: 1em;
		width: 50%;
		color: #f7567c;
		border: 2px solid #f7567c;
		background-color: white;
		margin: 10px;
		:focus {
			display: none;
		}
		:hover {
			cursor: pointer;
		}
	}

	.clicked {
		color: white;
		background-color: #f7567c;
	}

	label {
		display: flex;
		flex-direction: column;
	}
	.button-selection-container {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		padding-top: 10px;
		padding-bottom: 20px;
		align-items: center;
		justify-content: space-evenly;
		width: 200px;
	}
`;

const ButtonWrapperStyles = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export default UpdateStatusForm;
