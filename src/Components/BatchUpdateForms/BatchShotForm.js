import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import DropDown from "../DropDown";
import DatePicker from "react-datepicker";
import DogsApiService from "../../services/api-service";

const BatchShotForm = ({
	selectedDogs,
	resetSelected,
	setModal,
	updateDogs,
	setChecked,
	type,
}) => {
	const [updateType, setUpdateType] = useState("");
	const [date, setDate] = useState("");
	const [shotList, setShotList] = useState([]);
	const [shotName, setShotName] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		DogsApiService.getShotNames().then((res) => {
			const list = res.map((item) => item.shot_name);
			setShotList(list);
		});
	}, []);

	const onSubmit = () => {
		Promise.all(
			selectedDogs.map((dogId) => DogsApiService.deleteDog(dogId))
		).then((response) => {
			if (!response) {
				setError("Something wrong happened. Try again later.");
			}

			resetSelected([]);
			setModal(false);
			updateDogs();
		});
	};

	return (
		<BatchShotFormStyles type={updateType}>
			{updateType === "update" && (
				<>
					{" "}
					<label>Update Shot</label>
					<DropDown
						modal={true}
						list={shotList}
						label='Select Shot'
						onClick={(value) => setShotName(value)}
					/>
					<DatePicker
						selected={date}
						dateFormat='dd/MM/yyyy'
						onChange={(date) => setDate(date)}
						placeholderText='Select date'
						className='input-style-custom'
						required
					/>
					<div className='button-container'>
						<Button handleClick={() => setUpdateType("")}>Back</Button>
						<Button>Submit</Button>
					</div>
				</>
			)}
			{updateType === "add" && (
				<>
					<label>Add Shot</label>
				</>
			)}

			{!updateType && (
				<div className='button-container'>
					<Button handleClick={() => setUpdateType("add")}>Add Shot</Button>
					<Button handleClick={() => setUpdateType("update")}>
						Update Shot
					</Button>
				</div>
			)}
		</BatchShotFormStyles>
	);
};

const BatchShotFormStyles = styled.form`
	max-width: 500px;
	max-height: 600px;
	height: ${(props) => (!props.type ? "200px" : "400px")};
	width: 300px;
	align-items: center;
	justify-content: space-evenly;
	display: flex;
	flex-direction: ${(props) => (!props.type ? "row" : "column")};
	padding: 10px;
	transition: 0.3s;
	.button-container {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-evenly;
	}
	.input-style-custom {
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
