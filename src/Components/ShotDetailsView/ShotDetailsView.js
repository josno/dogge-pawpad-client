import React, { Component } from "react";
import moment from "moment";

import DogsApiService from "../../services/api-service";

class ShotDetailsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
		};
		this.renderShots = this.renderShots.bind(this);
		this.formatDate = this.formatDate.bind(this);
		this.changeEditMode = this.changeEditMode.bind(this);
	}

	formatDate(date) {
		const formattedDate = moment(date).format("LL");
		return formattedDate;
	}

	changeEditMode = (e) => {
		const { value } = e.target;
		this.setState({
			[value]: {
				value: value,
				editMode: true,
			},
		});
	};

	renderShots = (shot) => {
		return (
			<li className='shot-checkbox' key={shot.shot_name + "-one"}>
				{shot.shot_iscompleted ? (
					<span className='indicator-yes'>&#10004; </span>
				) : (
					<span className='indicator-no'>&#10008; </span>
				)}
				{shot.shot_name}
				<span className='last-shot-text'>
					Date Completed: {this.formatDate(shot.shot_date)}
				</span>
			</li>
		);
	};

	render() {
		return (
			<div>
				<ul className='dog-info-text shot-container'>
					{this.props.shots &&
						this.props.shots
							.sort((a, b) => (a.shot_name > b.shot_name ? 1 : -1))
							.map((i) => <div>{this.renderShots(i)}</div>)}
				</ul>
			</div>
		);
	}
}

export default ShotDetailsView;
