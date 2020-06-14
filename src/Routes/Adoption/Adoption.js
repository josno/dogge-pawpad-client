import React, { Component } from "react";
import { Link } from "react-router-dom";

import DogsApiService from "../../services/api-service";
import AdoptionDetails from "../../Components/AdoptionDetails/AdoptionDetails";

class Adoption extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adoptionInfo: "",
		};
	}

	componentDidMount = () => {
		const { dogId } = this.props.match.params;
		DogsApiService.getAdoptionInfo(dogId).then((res) => {
			console.log(res);
			this.setState({
				adoptionInfo: res,
			});
		});
	};
	render() {
		return (
			<div className='wrapper'>
				<AdoptionDetails
					info={this.state.adoptionInfo}
					dogName={this.props.match.params.dogName}
				/>
			</div>
		);
	}
}

export default Adoption;
