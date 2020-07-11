import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Adoption.css";
import DogsApiService from "../../services/api-service";
import AdoptionDetails from "../../Components/AdoptionDetails/AdoptionDetails";
import Modal from "react-responsive-modal";
import config from "../../config";
const CryptoJS = require("crypto-js");

class Adoption extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adoptionInfo: "",
			showImageModal: false,
			showUploadContract: false,
			error: null,
		};
	}

	toggleImageModal = () => {
		const { showImageModal } = this.state;
		this.setState({
			showImageModal: !showImageModal,
		});
	};

	toggleUploadContract = () => {
		const { showUploadContract } = this.state;
		this.setState({
			showUploadContract: !showUploadContract,
		});
	};

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
				let bytes = CryptoJS.AES.decrypt(res.data, config.SECRET);
				let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

				this.setState({
					adoptionInfo: data,
					dog_status: data.dog_status,
				});
			})
			.catch((resErr) => {
				this.setState({
					error: resErr.error,
				});
			});
	};

	renderDetails = () => {
		return this.state.error !== null ? (
			<div>
				<h2>{this.props.match.params.dogName} is now set to Current.</h2>
				<Link className='delete' to='/dogs-list'>
					Go Back To List
				</Link>
			</div>
		) : (
			<>
				<AdoptionDetails
					info={this.state.adoptionInfo}
					dogName={this.props.match.params.dogName}
					undoAdoption={this.undoAdoption}
				/>
				{this.renderImageButton()}
				{this.renderUndoAdoptionButton()}
			</>
		);
	};

	renderUndoAdoptionButton = () => {
		return (
			<>
				<button className='delete' onClick={() => this.undoAdoption()}>
					Undo Adoption
				</button>
			</>
		);
	};

	renderImageButton = () => {
		return (
			<button className='delete'>
				<a href={this.state.adoptionInfo.contract_img_url} download>
					View Contract
				</a>
			</button>
		);
	};

	renderImageModal = () => {
		return (
			<div className='adoption-img-modal'>
				<a href={this.state.adoptionInfo.contract_img_url} download>
					Download
				</a>
			</div>
		);
	};

	render() {
		return <div className='wrapper'>{this.renderDetails()}</div>;
	}
}

export default Adoption;
