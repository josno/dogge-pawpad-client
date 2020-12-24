import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";

import ArchiveModal from "./ArchiveModal/ArchiveModal";
import FosterAdopForm from "./FosterAdopForm/FosterAdopForm";
import ImgModalForm from "./ImgModalForm/ImgModalForm";
import EditButton from "./EditButton/EditButton";
import Validate from "./../Utils/validation";
import ValidationError from "./ValidationError/ValidationError";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DogsApiService from "../services/api-service";
import DropDown from "./DropDown";

import { GrEdit } from "react-icons/gr";

import moment from "moment";

const ProfileSection = ({ dogId, buttonStatus, setUpdate, update }) => {
	const [info, setInfo] = useState({});
	const [name, setName] = useState("");
	const [status, setStatus] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [arrivalDate, setArrivalDate] = useState("");
	const [gender, setGender] = useState({ male: false, female: false });
	const [tag, setTag] = useState("");
	const [microchip, setMicrochip] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [editingPhoto, setPhotoEditing] = useState(false);
	const [imgName, setImgName] = useState("");
	const [error, setError] = useState("");

	const [openAdopt, setOpenAdopt] = useState(false);
	const [openFoster, setOpenFoster] = useState(false);
	const [openArchive, setOpenArchive] = useState(false);

	useEffect(() => {
		async function getDogInfo() {
			const res = await DogsApiService.getDogInfo(dogId);
			setInfo(res);

			res.gender === "Male"
				? setGender({ male: true, female: false })
				: setGender({ male: false, female: true });

			setMicrochip(res.microchip);
			setTag(res.tag_number);
			setArrivalDate(new Date(res.arrival_date));
			setName(res.dog_name);
			setStatus(res.dog_status);
			setBirthdate(new Date(res.age));

			const s = res.profile_img.split("/");
			const name = s[s.length - 1].split(".")[0];
			setImgName(name);
		}

		if (update) {
			setUpdate(false);
		}
		getDogInfo();
	}, [dogId, update, setUpdate]);

	const formatDate = (date) => {
		let formattedDate = moment(date).format("LL");
		if (formattedDate === "N/A") {
			return moment(date, "DD-MM-YYYY").format("LL");
		} else {
			return formattedDate;
		}
	};

	async function updateDogInfo() {
		const updatedGender = gender.male === true ? "Male" : "Female";

		const newObj = {
			dog_name: name,
			age: birthdate,
			gender: updatedGender,
			arrival_date: arrivalDate,
			dog_status: status,
			tag_number: tag,
			microchip: microchip,
		};

		const res = await DogsApiService.updateDog(newObj, dogId);
		const updatedDog = await DogsApiService.getDogInfo(res.id);
		setInfo(updatedDog);
		setEditMode(!editMode);
		buttonStatus(updatedDog.dog_status);
		setUpdate(true);
	}

	const updateStatus = (status) => {
		if (status === "Archived") {
			setOpenArchive(true);
		}

		if (status === "Adopted") {
			setOpenAdopt(true);
		}

		if (status === "Fostered") {
			setOpenFoster(true);
		}

		setStatus(status);
	};

	const validateInput = (e, type) => {
		if (type === "name") {
			setError(Validate.validateName(name));
			setName(e.target.value);
		}
	};

	async function updateDogImage(e, profileImg) {
		e.preventDefault(e);
		const profile_img = profileImg;

		const formData = new FormData();
		formData.append("profile_img", profile_img);

		await DogsApiService.deleteDogImg(imgName);
		const newUrl = await DogsApiService.uploadDogImg(formData);

		const dogObj = {
			dog_name: info.dog_name,
			profile_img: newUrl,
		};

		await DogsApiService.updateDog(dogObj, dogId);

		setInfo({ ...info, profile_img: newUrl });
		setPhotoEditing(!editingPhoto);
	}

	const handleArchive = async (str) => {
		const dateObj = { archive_date: new Date() };
		const noteObj = {
			type_of_note: "archive",
			notes: str,
			dog_id: dogId,
		};

		try {
			await DogsApiService.archiveDog(dogId, dateObj);
			await DogsApiService.insertNewNote(noteObj);
			updateDogInfo();
			setOpenArchive(false);
			setUpdate(true);
		} catch {
			setError({ error: "Can't archive dog." });
		}
	};

	const renderModals = () => {
		return (
			<>
				<Modal open={openArchive} onClose={() => setOpenArchive(false)} center>
					<ArchiveModal
						dogName={name}
						dogId={dogId}
						handleArchive={(s) => handleArchive(s)}
					/>
				</Modal>
				<Modal open={openAdopt} onClose={() => setOpenAdopt(false)} center>
					<FosterAdopForm
						type="adopt"
						dogId={dogId}
						updateDogInfo={updateDogInfo}
						setOpenAdopt={setOpenAdopt}
					/>
				</Modal>
				<Modal open={openFoster} onClose={() => setOpenFoster(false)} center>
					<FosterAdopForm
						type="foster"
						dogId={dogId}
						updateDogInfo={updateDogInfo}
						setOpenFoster={setOpenFoster}
					/>
				</Modal>
			</>
		);
	};

	return (
		<ProfileSectionStyles>
			<div className="img-container">
				<Modal
					open={editingPhoto}
					onClose={() => setPhotoEditing(false)}
					center
				>
					<ImgModalForm handleUpdate={(e, path) => updateDogImage(e, path)} />
				</Modal>

				<img src={info.profile_img} alt="dog" />
			</div>
			<GrEdit
				className="icon edit-img-icon"
				onClick={() => setPhotoEditing(!editingPhoto)}
			/>

			{editMode ? (
				<>
					<h1 className="dog-name name-style">
						<input
							className="edit-name-input"
							type="text"
							value={name}
							onChange={(e, name) => validateInput(e, "name")}
						/>
					</h1>
					{error && <ValidationError message={error} />}
					{!editMode ? (
						<EditButton
							type="edit"
							handleClick={() => setEditMode(!editMode)}
						/>
					) : (
						<>
							<EditButton
								styles={"active-edit-icon cancel-button"}
								type="submit"
								handleClick={() => updateDogInfo()}
							/>
							<EditButton
								styles={"active-edit-icon check-button"}
								type="cancel"
								handleClick={() => setEditMode(!editMode)}
							/>
						</>
					)}

					<div>
						<form className="fade-in">
							<label className="profile-list-item">
								<span className="title">Status:</span>
								{status === "Adopted" ? (
									"Adopted"
								) : (
									<DropDown
										label="Pick Status"
										className="fade-in edit-input value"
										list={["Current", "Adopted", "Archived", "Fostered"]}
										onClick={(value) => updateStatus(value)}
									/>
								)}
							</label>
							<label className="profile-list-item">
								<span className="title">Gender:</span>
								<div className="value">
									<label htmlFor="male">
										<input
											type="radio"
											name="gender"
											checked={gender.male}
											onChange={(e) => setGender({ male: true, female: false })}
											id="male"
											required
										/>
										Male
									</label>

									<label htmlFor="female">
										<input
											type="radio"
											name="gender"
											checked={gender.female}
											onChange={(e) => setGender({ male: false, female: true })}
											id="female"
										/>
										Female
									</label>
								</div>
							</label>
							<label className="profile-list-item">
								<span className="title">Birthdate:</span>
								<DatePicker
									dateFormat="dd/MM/yyyy"
									selected={birthdate}
									placeholderText="dd/mm/yyyy"
									onChange={(date) => setBirthdate(date)}
									className="fade-in edit-input"
								/>
							</label>
							<label className="profile-list-item">
								<span className="title">Arrival:</span>
								<DatePicker
									dateFormat="dd/MM/yyyy"
									selected={arrivalDate}
									placeholderText="dd/mm/yyyy"
									onChange={(date) => setArrivalDate(date)}
									className="fade-in edit-input"
								/>
							</label>
							<label className="profile-list-item">
								<span className="title">Tag:</span>
								<input
									className="fade-in edit-input"
									value={tag}
									type="text"
									onChange={(e) => setTag(e.target.value)}
								/>
							</label>
							<label className="profile-list-item">
								<span className="title">Microchip:</span>
								<input
									className="fade-in edit-input"
									value={microchip}
									type="text"
									onChange={(e) => setMicrochip(e.target.value)}
								/>
							</label>
						</form>
					</div>
				</>
			) : (
				<>
					<h1 className="dog-name name-style">{info.dog_name}</h1>
					<div>
						<GrEdit
							className="icon edit-button"
							onClick={() => setEditMode(!editMode)}
						/>
						<ul className="profile-details">
							<li className="profile-list-item">
								<span className="title">Status:</span>{" "}
								<span className="value">{info.dog_status}</span>
							</li>
							<li className="profile-list-item">
								<span className="title">Gender: </span>
								<span className="value">{info.gender}</span>
							</li>
							<li className="profile-list-item">
								<span className="title">Birthdate:</span>
								<span className="value">{formatDate(info.age)}</span>
							</li>
							<li className="profile-list-item">
								<span className="title">Arrival:</span>
								<span className="value">{formatDate(info.arrival_date)}</span>
							</li>
							<li className="profile-list-item">
								<span className="title">Tag:</span>
								<span className="value">{info.tag_number}</span>
							</li>
							<li className="profile-list-item">
								<span className="title">Microchip:</span>
								<span className="value">{info.microchip}</span>
							</li>
						</ul>
					</div>
				</>
			)}
			{renderModals()}
		</ProfileSectionStyles>
	);
};

const ProfileSectionStyles = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 10px;
	max-width: 300px;
	margin: 0 auto;
	align-items: center;

	.img-container {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		border: 1px solid black;
		overflow: hidden;
		position: relative;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.edit-name-input {
		text-align: center;
		height: inherit;
		font-size: 1.2rem;
		font-weight: bold;
	}

	.name-style {
		width: 100%;
		height: 60px;
		margin: 20px;
	}

	.edit-img-icon {
		position: relative;
		top: 10px;
	}
	.profile-list-item {
		font-size: 1rem;
		padding: 2px;
		line-height: 2;
		display: grid;
		grid-template-columns: 0.5fr 1fr;
		grid-template-rows: 1fr;
		gap: 10px 10px;
		grid-template-areas: "title value";

		.title {
			grid-area: title;
			text-align: right;
			font-weight: bold;
		}
		.value {
			grid-area: value;
			text-align: left;
		}
	}

	.input-value {
		margin: 2px;
	}

	.fade-in {
		opacity: 1;
		animation-name: fadeInOpacity;
		animation-iteration-count: 1;
		animation-timing-function: ease-in;
		animation-duration: 0.5s;
	}

	.edit-input {
		width: 175px;
		padding: none;
		margin-right: 10px;
		font-size: 1em;
		border: none;
		color: #009fb7;
		font-style: italic;
		font-weight: bold;
	}

	@keyframes fadeInOpacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.edit-button {
		width: 100%;
	}

	.cancel-button,
	.check-button {
		position: absolute;
		top: 20px;
	}

	.cancel-button {
		right: 40px;
	}

	.check-button {
		right: 0px;
	}

	.icon {
		:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
		path {
			stroke: #1f8392;
		}
	}

	@media (min-width: 1000px) {
		.profile-list-item {
			font-size: 1.2rem;
		}
	}
`;

export default ProfileSection;
