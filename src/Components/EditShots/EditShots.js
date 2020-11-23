import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import DogsApiService from "../../services/api-service";
import Validate from "../../Utils/validation";
import ValidationError from "../../Components/ValidationError/ValidationError";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditShots extends Component {
	constructor(props) {
		super(props);
		this.state = {
			otherShots: "",
			renderAddShot: false,
			newShot: {
				value: "",
				touched: false,
			},
			newShotDate: "",
			requiredShots: [
				"Rabies",
				"Rabies Yearly Booster",
				"Complex I",
				"Complex II",
				"Complex Yearly Booster",
			],
		};

		this.renderMandatoryShots = this.renderMandatoryShots.bind(this);
		this.handleChecks = this.handleChecks.bind(this);
		this.renderOptionShots = this.renderOptionShots.bind(this);
		this.renderTextbox = this.renderTextbox.bind(this);
		// this.handleAddShot = this.handleAddShot.bind(this);
		this.handleSubmitNewShot = this.handleSubmitNewShot.bind(this);
		this.deleteShot = this.deleteShot.bind(this);
		this.formatDate = this.formatDate.bind(this);
		this.makeDate = this.makeDate.bind(this);
	}

	handleUpdateDateChange = (shotName, date, id) => {
		const dateString = moment(date).format("YYYY-MM-DD");

		const shot = {
			shot_name: shotName,
			shot_date: dateString,
			id: id,
			shot_iscompleted: true,
		};

		DogsApiService.updateDogShot(shot, id).then((response) =>
			DogsApiService.getShots(this.props.dogId).then((shots) => {
				const sortedShots = shots.sort((a, b) =>
					a.shot_name > b.shot_name ? 1 : -1
				);

				this.setState({
					shots: sortedShots,
				});
			})
		);
	};

	makeDate = (date) => {
		if (!date) {
			return new Date();
		} else {
			return new Date(date);
		}
	};

	handleNewShotDateChange(date) {
		this.setState({
			newShotDate: date,
		});
	}

	renderMandatoryShots(shotsArray) {
		const { requiredShots } = this.state;

		var shotsToMap = shotsArray.filter((a) =>
			requiredShots.some((b) => a.shot_name === b)
		);

		return shotsToMap.map((i, index) => (
			<li className="edit-shot-line" key={i.id}>
				<label htmlFor={i.id}>
					<input
						id={i.id + " " + i.shot_name}
						type="checkbox"
						name={i.shot_name}
						value={i.shot_iscompleted}
						checked={i.shot_iscompleted}
						onChange={this.handleChecks}
					/>
					{i.shot_name}

					<span className="shot-date-text">{this.formatDate(i.shot_date)}</span>

					<DatePicker
						dateFormat="dd/MM/yyyy"
						placeholderText="Select New Date"
						className="edit-shot-date-input"
						onChange={(date) =>
							this.handleUpdateDateChange(i.shot_name, date, i.id)
						}
					/>
				</label>
			</li>
		));
	}

	renderOptionShots(shotsArray) {
		const { requiredShots } = this.state;

		var shotsToMap = shotsArray.filter(
			(a) => !requiredShots.some((b) => a.shot_name === b)
		);

		return shotsToMap.map((i) => (
			<li className="edit-shot-line" key={i.id}>
				<label key={i.id} htmlFor={i.shot_name}>
					<input
						id={i.id}
						type="checkbox"
						name={i.shot_name}
						value={i.shot_iscompleted}
						checked={i.shot_iscompleted}
						onChange={this.deleteShot}
					/>
					{i.shot_name}

					<span className="shot-date-text">{this.formatDate(i.shot_date)}</span>
				</label>
			</li>
		));
	}

	// handleAddShot(newShotName) {
	// 	this.setState({
	// 		newShot: { value: newShotName, touched: true },
	// 	});
	// }

	renderTextbox() {
		this.setState({
			renderAddShot: !this.state.renderAddShot,
		});
	}

	handleSubmitNewShot() {
		const dateString = moment(this.state.newShotDate).format("YYYY-MM-DD");
		const shot = {
			shot_date: dateString,
			shot_name: this.state.newShot.value,
			shot_iscompleted: true,
			dog_id: this.props.dogId,
		};

		DogsApiService.insertNewShot(shot).then((res) => {
			const combinedShots = [...this.state.shots, res];
			const sortedShots = combinedShots.sort((a, b) =>
				a.shot_name > b.shot_name ? 1 : -1
			);

			this.setState({
				shots: sortedShots,
				newShot: {
					value: "",
					touched: false,
				},
				renderAddShot: false,
			});
		});
	}

	handleChecks(e) {
		const { name, id, value } = e.target;
		const shotId = id.split(" ")[0];

		const shot = {
			shot_name: name,
			id: shotId,
			shot_date: null,
			shot_iscompleted: value === "false" ? true : false,
		};

		DogsApiService.updateDogShot(shot, shotId).then((response) =>
			DogsApiService.getShots(this.props.dogId).then((shots) => {
				const sorted = shots.sort((a, b) =>
					a.shot_name > b.shot_name ? 1 : -1
				);

				this.setState({
					shots: sorted,
				});
			})
		);
	}

	formatDate = (date) => {
		let formattedDate = "";

		if (date === null) {
			formattedDate = "Pick A Date";
		} else {
			formattedDate = moment(date).format("LL");
		}

		return formattedDate;
	};

	deleteShot(e) {
		const { id } = e.target;
		DogsApiService.deleteDogShot(id)
			.then((response) => {
				DogsApiService.getShots(this.props.dogId)
					.then((shots) => {
						shots.sort((a, b) => (a.shot_name > b.shot_name ? 1 : -1));
						return shots;
					})
					.then((sortedShots) =>
						this.setState({
							shots: sortedShots,
						})
					);
			})
			.catch((e) =>
				this.setState({
					error: `Something went wrong. Try again later.`,
				})
			);
	}

	componentDidMount() {
		DogsApiService.getShots(this.props.dogId).then((shots) => {
			shots.sort((a, b) => (a.shot_name > b.shot_name ? 1 : -1));
			this.setState({
				shots: shots,
			});
		});
	}

	render() {
		const { shots } = this.state;

		return (
			<EditShotsStyles>
				<ul className="edit-shots-container fade-in">
					{shots !== undefined && this.renderMandatoryShots(shots)}

					{shots !== undefined && this.renderOptionShots(shots)}
				</ul>
			</EditShotsStyles>
		);
	}
}

const EditShotsStyles = styled.div`
	max-height: 385px;
	overflow-y: scroll;

	.edit-shots-container {
		padding: 0px 20px;
	}
	.add-shot-btn,
	.shot-date-button,
	.shot-btn {
		border: 2px solid black;
		box-shadow: 5px 5px gray;
		font-size: 0.8em;
		font-weight: bold;
		height: 40px;
		margin: 20px 0px 10px 0px;
		width: 100%;
	}

	.add-shot-btn:active,
	.shot-btn:active {
		box-shadow: none;
	}

	.shot-btn {
		width: 40%;
	}

	.sht-btn-box {
		display: flex;
		justify-content: space-evenly;
	}

	.new-shot-box {
		margin-top: 20px;
	}

	.edit-shot-line {
		display: block;
		text-align: left;
		font-size: 0.9rem;
		margin: 10px 0px;
	}

	.edit-shot-date {
		padding-left: 10px;
	}

	.edit-shot-date-input {
		font-size: 0.8em;
		height: 40px;
		padding-left: 15px;
		width: 100%;
	}

	.shot-date-text {
		font-size: 0.8em;
		font-style: italic;
		font-weight: bold;
		display: block;
	}

	.fade-in {
		opacity: 1;
		animation-name: fadeInOpacity;
		animation-iteration-count: 1;
		animation-timing-function: ease-in;
		animation-duration: 0.5s;
	}

	@keyframes fadeInOpacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@media (min-width: 500px) {
		.update-shot-date-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.edit-shot-line {
			max-width: 500px;
			margin: 10px 0px;
		}
	}

	@media (min-width: 1300px) {
		.update-shot-date-box {
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-evenly;
			align-items: start;
		}
	}
`;

export default EditShots;
