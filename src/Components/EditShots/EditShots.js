import React, { Component } from "react";
import moment from "moment";
import "./EditShots.css";
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
		this.handleAddShot = this.handleAddShot.bind(this);
		this.handleSubmitNewShot = this.handleSubmitNewShot.bind(this);
		this.deleteShot = this.deleteShot.bind(this);
		this.formatDate = this.formatDate.bind(this);
		this.makeDate = this.makeDate.bind(this);
	}

	handleUpdateDateChange = (shotName, date, id) => {
		// const { shots } = this.state;
		const dateString = moment(date).format("YYYY-MM-DD");

		// const updatedShots = shots.map((shot) => {
		// 	if (shot.id === id) {
		// 		shot.shot_date = dateString;
		// 	}
		// 	return shot;
		// });

		const shot = {
			shot_name: shotName,
			shot_date: dateString,
			id: id,
			shot_iscompleted: true,
		};

		// this.setState({
		// 	shots: updatedShots,
		// });

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

		// this.handleUpdateShotDate(shotName, id);
	};

	makeDate = (date) => {
		if (!date) {
			return new Date();
		} else {
			return new Date(date);
		}
	};

	renderMandatoryShots(shotsArray) {
		const { requiredShots } = this.state;

		var shotsToMap = shotsArray.filter((a) =>
			requiredShots.some((b) => a.shot_name === b)
		);

		return shotsToMap.map((i, index) => (
			<li className='edit-shot-line' key={i.id}>
				<label htmlFor={i.id}>
					<input
						id={i.id + " " + i.shot_name}
						type='checkbox'
						name={i.shot_name}
						value={i.shot_iscompleted}
						checked={i.shot_iscompleted}
						onChange={this.handleChecks}
					/>
					{i.shot_name}

					<span className='shot-date-text'>{this.formatDate(i.shot_date)}</span>
					<DatePicker
						dateFormat='dd/MM/yyyy'
						selected={this.makeDate(this.state.shots[index].shot_date)}
						className='edit-shot-date-input'
						onChange={(date) =>
							this.handleUpdateDateChange(i.shot_name, date, i.id)
						}
					/>
				</label>
			</li>
		));
	}

	handleUpdateShotDate(shotName, id) {
		const dateString = moment(this.state.shots[id].shot_date).format(
			"YYYY-MM-DD"
		);

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
	}

	renderOptionShots(shotsArray) {
		const { requiredShots } = this.state;

		var shotsToMap = shotsArray.filter(
			(a) => !requiredShots.some((b) => a.shot_name === b)
		);

		return shotsToMap.map((i) => (
			<li className='edit-shot-line' key={i.id}>
				<label key={i.id} htmlFor={i.shot_name}>
					<input
						id={i.id}
						type='checkbox'
						name={i.shot_name}
						value={i.shot_iscompleted}
						checked={i.shot_iscompleted}
						onChange={this.deleteShot}
					/>
					{i.shot_name}

					<span className='shot-date-text'>{this.formatDate(i.shot_date)}</span>
				</label>
			</li>
		));
	}

	handleAddShot(newShotName) {
		this.setState({
			newShot: { value: newShotName, touched: true },
		});
	}

	renderTextbox() {
		this.setState({
			renderAddShot: !this.state.renderAddShot,
		});
	}

	handleSubmitNewShot() {
		const shot = {
			shot_date: this.state.newShotDate,
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
			<div>
				<ul className='edit-shots-container'>
					{shots !== undefined && this.renderMandatoryShots(shots)}

					{shots !== undefined && this.renderOptionShots(shots)}
				</ul>

				{this.state.renderAddShot ? (
					<li className='edit-shot-line'>
						<input
							className='block new-shot-box'
							id='name'
							type='text'
							name='newShot'
							placeholder="example: 'Serum'"
							value={this.state.newShot.value}
							onChange={(e) => this.handleAddShot(e.target.value)}
							required
						/>

						<input
							className='edit-shot-date-input'
							type='date'
							name='newShotDate'
							onChange={this.handleDateChange}
							min='2018-01-01'
							max='2030-12-31'
						/>
						{this.state.newShot.touched && (
							<ValidationError
								message={Validate.validateShotName(this.state.newShot.value)}
							/>
						)}
						<div className='sht-btn-box'>
							<button
								type='button'
								className='shot-btn'
								onClick={this.renderTextbox}
							>
								Cancel
							</button>
							<button
								type='button'
								className='shot-btn'
								onClick={this.handleSubmitNewShot}
								disabled={Validate.validateShotName(this.state.newShot.value)}
							>
								Add
							</button>
						</div>
					</li>
				) : (
					<li className='edit-shot-line'>
						<button
							type='button'
							className='add-shot-btn'
							onClick={this.renderTextbox}
						>
							Add A Shot
						</button>
					</li>
				)}
			</div>
		);
	}
}

export default EditShots;
