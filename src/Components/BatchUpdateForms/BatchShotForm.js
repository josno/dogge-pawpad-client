import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import DropDown from "../DropDown";
import DatePicker from "react-datepicker";
import DogsApiService from "../../services/api-service";
import moment from "moment";

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
		const dateString = moment(date).format("YYYY-MM-DD");

		const shotObj = {
			shot_name: shotName,
			shot_date: dateString,
		};
		Promise.all(
			selectedDogs.map((dogId) =>
				DogsApiService.updateDogShotByDogId(shotObj, dogId)
			)
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
		<BatchShotFormStyles>
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
				<Button handleClick={() => onSubmit()}>Submit</Button>
			</>
		</BatchShotFormStyles>
	);
};

const BatchShotFormStyles = styled.form`
	max-width: 500px;
	max-height: 600px;
	height: 400px;
	width: 300px;
	align-items: center;
	justify-content: space-evenly;
	display: flex;
	flex-direction: column;
	padding: 10px;
	transition: 0.3s;

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
