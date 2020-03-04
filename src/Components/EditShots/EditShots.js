import React, { Component } from 'react';
import './EditShots.css';
import DogsApiService from '../../services/api-service';
import Validate from '../../Utils/validation';
import ValidationError from '../../Components/ValidationError/ValidationError';

class EditShots extends Component {
	constructor(props) {
		super(props);
		this.state = {
			otherShots: '',
			renderAddShot: false,
			newShot: {
				value: '',
				touched: false
			}
		};

		this.renderMandatoryShots = this.renderMandatoryShots.bind(this);
		this.handleChecks = this.handleChecks.bind(this);
		this.renderOptionShots = this.renderOptionShots.bind(this);
		this.renderTextbox = this.renderTextBox.bind(this);
		this.handleAddShot = this.handleAddShot.bind(this);
		this.submitNewShot = this.submitNewShot.bind(this);
		this.deleteShot = this.deleteShot.bind(this);
	}

	renderMandatoryShots(shotsArray) {
		const requiredShots = ['Rabies', 'Complex I', 'Complex II'];

		var shotsToMap = shotsArray.filter(a =>
			requiredShots.some(b => a.shot_name === b)
		);
		return shotsToMap.map(i => (
			<li key={i.id}>
				<label htmlFor={i.id}>
					<input
						id={i.id}
						type="checkbox"
						name={i.shot_name}
						value={i.shot_iscompleted}
						checked={i.shot_iscompleted}
						onChange={this.handleChecks}
					/>
					{i.shot_name}
				</label>
			</li>
		));
	}

	renderOptionShots(shotsArray) {
		const requiredShots = ['Rabies', 'Complex I', 'Complex II'];

		var shotsToMap = shotsArray.filter(
			a => !requiredShots.some(b => a.shot_name === b)
		);

		return shotsToMap.map(i => (
			<div key={i.id}>
				<input
					id={i.id}
					type="checkbox"
					name={i.shot_name}
					value={i.shot_iscompleted}
					checked={i.shot_iscompleted}
					onChange={this.deleteShot}
				/>
				<label key={i.id} htmlFor={i.shot_name}>
					{i.shot_name}
				</label>
				<br />
			</div>
		));
	}

	handleAddShot(newShotName) {
		this.setState({
			newShot: { value: newShotName, touched: true }
		});
	}

	renderTextBox() {
		this.setState({
			renderAddShot: !this.state.renderAddShot
		});
	}

	submitNewShot() {
		const shot = {
			shot_name: this.state.newShot.value,
			shot_iscompleted: true,
			dog_id: this.props.dogId
		};

		DogsApiService.insertNewShot(shot).then(res => {
			this.setState({
				shots: [...this.state.shots, res],
				newShot: {
					value: '',
					touched: false
				},
				renderAddShot: false
			});
		});
	}

	handleChecks(e) {
		const { name, id, value } = e.target;

		const shot = {
			shot_name: name,
			id: id,
			shot_iscompleted: value === 'false' ? true : false
		};

		DogsApiService.updateDogShot(shot, id).then(response =>
			DogsApiService.getShots(this.props.dogId)
				.then(shots => {
					shots.sort((a, b) => a.id - b.id);
					return shots;
				})
				.then(sortedShots =>
					this.setState({
						shots: sortedShots
					})
				)
		);
	}

	deleteShot(e) {
		const { id } = e.target;
		DogsApiService.deleteDogShot(id).then(response =>
			DogsApiService.getShots(this.props.dogId)
				.then(shots => {
					shots.sort((a, b) => a.id - b.id);
					return shots;
				})
				.then(sortedShots =>
					this.setState({
						shots: sortedShots
					})
				)
		);
	}

	componentDidMount() {
		DogsApiService.getShots(this.props.dogId).then(shots => {
			shots.sort((a, b) => a.id - b.id);
			this.setState({
				shots: shots
			});
		});
	}

	render() {
		const { shots } = this.state;

		return (
			<>
				<fieldset className="field-item">
					<legend className="bold">Required Shots Completed</legend>
					{shots !== undefined && this.renderMandatoryShots(shots)}
				</fieldset>

				<fieldset>
					<legend className="bold">Add Optional Shots</legend>
					{shots !== undefined && this.renderOptionShots(shots)}

					{this.state.renderAddShot ? (
						<>
							<input
								className="block new-shot-box"
								id="name"
								type="text"
								name="newShot"
								value={this.state.newShot.value}
								onChange={e =>
									this.handleAddShot(e.target.value)
								}
								required
							/>
							{this.state.newShot.touched && (
								<ValidationError
									message={Validate.validateShotName(
										this.state.newShot.value
									)}
								/>
							)}
							<button
								type="button"
								className="add-shot-name"
								onClick={this.submitNewShot}
								disabled={Validate.validateShotName(
									this.state.newShot.value
								)}
							>
								Add
							</button>
						</>
					) : (
						<>
							<button
								type="button"
								className="add-shot-name"
								onClick={this.renderTextbox}
							>
								Add A Shot
							</button>
						</>
					)}
				</fieldset>
			</>
		);
	}
}

export default EditShots;
