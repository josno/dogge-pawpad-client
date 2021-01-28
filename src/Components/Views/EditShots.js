import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import DogsApiService from "../../services/api-service";
import EditShotInput from "../Forms/EditShotInput";

import "react-datepicker/dist/react-datepicker.css";

class EditShots extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shots: [],
		};

		this.renderShots = this.renderShots.bind(this);
		this.deleteShot = this.deleteShot.bind(this);
	}

	handleUpdateDateChange = (shotName, date, id) => {
		const dateString = moment(date).format("YYYY-MM-DD");
		const shot = {
			shot_name: shotName,
			shot_date: dateString,
			id: id,
			shot_iscompleted: true,
		};
		this.props.updateShotList(shot);
	};

	renderShots() {
		return this.state.shots.map((i, index) => (
			<EditShotInput
				key={index}
				id={i.id}
				shotStatus={i.shot_iscompleted}
				shotDate={i.shot_date}
				shotName={i.shot_name}
				handleChecks={this.handleChecks}
				handleUpdateDateChange={this.handleUpdateDateChange}
				removeShotDate={this.deleteShot}
			/>
		));
	}

	deleteShot(id) {
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
					{shots && this.renderShots()}
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

	.edit-shot-date {
		padding-left: 10px;
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
