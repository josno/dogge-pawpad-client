import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import DropDown from "../DropDown";
import DatePicker from "react-datepicker";
import DogsApiService from "../../services/api-service";
import moment from "moment";
import ValidationError from "../ValidationError/ValidationError";

const BatchShotForm = ({
	selectedDogs,
	resetSelected,
	setModal,
	updateDogs,
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
	};

	const onSubmit = () => {
		const dateString = moment(date).format("YYYY-MM-DD");

		const request = addMode
			? Promise.all(
					selectedDogs.map((dogId) => {
						const newShotObj = {
							shot_name: newShot,
							shot_date: dateString,
							shot_iscompleted: true,
							dog_id: dogId,
						};

						return DogsApiService.insertNewShot(newShotObj);
					})
			  )
			: Promise.all(
					selectedDogs.map((dogId) => {
						const shotObj = {
							shot_name: shotName,
							shot_date: dateString,
						};
						return DogsApiService.updateDogShotByDogId(shotObj, dogId);
					})
			  );

		request.then((response) => {
			if (!response) {
				setError("Something went wrong. Try again later.");
			}

			resetSelected([]);
			setModal(false);
			updateDogs();
		});
	};

	const handleCancel = () => {
		resetSelected([]);
		setModal(false);
		updateDogs();
	};

	return (
		<BatchShotFormStyles>
			<>
				{shotName !== "Add A New Shot" ? (
					<>
						<label>Shot To Upate</label>
						<DropDown
							modal={true}
							list={shotList}
							label='Select Shot'
							onClick={(value) => setShotName(value)}
							required
						/>
					</>
				) : (
					<>
						<label>Add Shot Name</label>
						<input
							className='input-style-custom'
							value={newShot}
							placeholder='Add A Shot Not In The List'
							onChange={(e) => setAddShotForm(e)}
							required
						/>
					</>
				)}

				<label>Select A Date</label>
				<DatePicker
					selected={date}
					dateFormat='dd/MM/yyyy'
					onChange={(date) => setDate(date)}
					placeholderText='Click To Choose Date'
					className='input-style-custom'
					required
				/>

				{error && <ValidationError message={error} />}

				<div className='container'>
					{shotName === "Add A New Shot" && (
						<Button handleClick={() => setShotName("")}>Go Back</Button>
					)}
					<Button handleClick={() => handleCancel()}>Cancel</Button>
					<Button handleClick={() => onSubmit()}>Submit</Button>
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

	.container {
		margin: 0px 10px;
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 5px;
	}

	.input-style-custom {
		margin: 0px 10px;
		width: 100%;
		width: 100%;
		height: 40px;
		border-radius: 0px;
		border: 1px solid black;
		font-size: 1rem;
		text-align: center;
	}
`;

export default BatchShotForm;
