import React, { Component } from "react";
import { Link } from "react-router-dom";

import DogsApiService from "../../services/api-service";
import AdoptionDetails from "../../Components/AdoptionDetails/AdoptionDetails";

class Adoption extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adoptionInfo: "",
			error: null,
		};
		this.undoAdoption = this.undoAdoption.bind(this);
	}

	undoAdoption = () => {
		const { dog_id } = this.state.adoptionInfo;

		DogsApiService.deleteAdoption(dog_id).then((res) => {
			//refactor
			DogsApiService.getAdoptionInfo(dog_id)
				.then((res) => {
					this.setState({
						adoptionInfo: res,
						dog_status: res.dog_status,
					});
				})
				.catch((resErr) => {
					this.setState({
						error: resErr.error,
					});
				});
		});
	};

	componentDidMount = () => {
		const { dogId } = this.props.match.params;
		DogsApiService.getAdoptionInfo(dogId)
			.then((res) => {
				this.setState({
					adoptionInfo: res,
					dog_status: res.dog_status,
				});
			})
			.catch((resErr) => {
				this.setState({
					error: resErr.error,
				});
			});
	};
	render() {
		return (
			<div className='wrapper'>
				{this.state.error !== null ? (
					<div>
						<h2>{this.props.match.params.dogName} is now set to Current.</h2>
						<Link className='delete' to='/dogs-list'>
							Go Back To List
						</Link>
					</div>
				) : (
					<AdoptionDetails
						info={this.state.adoptionInfo}
						dogName={this.props.match.params.dogName}
						undoAdoption={this.undoAdoption}
					/>
				)}
			</div>
		);
	}
}

export default Adoption;
