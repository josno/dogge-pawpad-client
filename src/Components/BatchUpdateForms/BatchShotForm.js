import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import DropDown from "../DropDown";
import DatePicker from "react-datepicker";
import DogsApiService from "../../services/api-service";
import moment from "moment";
import ValidationError from "../ValidationError/ValidationError";
import Validate from "../../Utils/validation";

const BatchShotForm = ({
	selectedDogs,
	resetSelected,
	setModal,
	updateDogs,
	singleShotUpdate,
}) => {
	const [date, setDate] = useState(null);
	const [shotList, setShotList] = useState([]);
	const [shotName, setShotName] = useState("");
	const [error, setError] = useState(null);
	const [addMode, setAddMode] = useState(false);
	const [newShot, setNewShot] = useState("");

	useEffect(() => {
		DogsApiService.getShotNames().then((res) => {
			const list = res.map((item) => item.shot_name);
			list.push("Add A New Shot");
			setShotList(list);
		});
	}, []);

	const setAddShotForm = (e) => {
		setAddMode(true);
		setNewShot(e.target.value);
		setError(Validate.validateShotName(e.target.value));
	};

	const handleSelection = (shot) => {
		if (shot === "Add A New Shot") {
			setAddMode(true);
		} else {
			setShotName(shot);
		}
	};

	const updateShot = (dateString) => {
		const shotObj = {
			shot_name: shotName,
			shot_date: dateString,
		};
		return Promise.all(
			selectedDogs.map((dogId) => {
				return DogsApiService.updateDogShotByDogId(shotObj, dogId);
			})
		);
	};

	const addShot = (dateString) => {
		const newShotObj = {
			shot_name: newShot,
			shot_date: dateString,
			shot_iscompleted: true,
		};
		return Promise.all(
			selectedDogs.map((dogId) => {
				newShotObj.dog_id = dogId;
				return DogsApiService.insertNewShot(newShotObj);
			})
		);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const dateString = moment(date).format("YYYY-MM-DD");

		const request = addMode ? addShot(dateString) : updateShot(dateString);

		request.then((response) => {
			if (!response) {
				setError("Something went wrong. Try again later.");
			}

			if (singleShotUpdate) {
				updateDogs();
				setModal(false);
			} else {
				resetSelected && resetSelected([]);
				setModal(false);
				updateDogs();
			}
		});
	};

	const handleCancel = () => {
		if (singleShotUpdate) {
			setModal();
		} else {
			resetSelected([]);
			setModal(false);
			updateDogs();
		}
	};

	return (
		<BatchShotFormStyles>
			<>
				{singleShotUpdate && !addMode ? (
					<>
						<label className="label">Shot To Update</label>
						<DropDown
							modal={true}
							list={shotList}
							label="Select Shot"
							onClick={(value) => handleSelection(value)}
							required
						/>
					</>
				) : (
					<>
						<label className="label">Add Shot Name</label>
						<input
							className="input-style-custom"
							value={newShot}
							placeholder="Add A Shot Not In The List"
							onChange={(e) => setAddShotForm(e)}
							required
						/>
					</>
				)}

				<label className="label">Select A Date</label>
				<DatePicker
					selected={date}
					dateFormat="dd/MM/yyyy"
					onChange={(date) => setDate(date)}
					placeholderText="Click To Choose Date"
					className="input-style-custom"
					required
				/>

				{error && <ValidationError className="shot-error" message={error} />}

				<div className="container">
					{addMode && !singleShotUpdate && (
						<Button handleClick={() => setShotName("")}>Go Back</Button>
					)}
					<Button handleClick={() => handleCancel()}>Cancel</Button>
					<Button handleClick={(e) => onSubmit(e)}>Submit</Button>
				</div>
			</>
		</BatchShotFormStyles>
	);
};

const BatchShotFormStyles = styled.form`
	max-width: 500px;
	max-height: 300px;
	height: 250px;
	width: 300px;
	align-items: flex-start;
	justify-content: space-evenly;
	display: flex;
	flex-direction: column;
	padding: 10px;
	transition: 0.3s;

	.shot-error {
		width: 100%;
	}

	.container {
		margin: 0px 10px;
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 5px;
	}

	.label {
		text-align: center;
		width: 100%;
	}

	.input-style-custom {
		width: 100%;
		height: 40px;
		border-radius: 0px;
		border: 1px solid black;
		font-size: 1rem;
		text-align: center;
	}

	.react-datepicker-wrapper {
		width: 80%;
		margin: 0px auto;
	}
`;

export default BatchShotForm;
