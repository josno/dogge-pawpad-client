import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Adoption.css";
import DogsApiService from "../../services/api-service";
import AdoptionDetails from "../../Components/AdoptionDetails/AdoptionDetails";
import Modal from "react-responsive-modal";
const CryptoJS = require("crypto-js");

class Adoption extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adoptionInfo: "",
			showImageModal: false,
			error: null,
		};
	}

	toggleImageModal = () => {
		const { showImageModal } = this.state;
		this.setState({
			showImageModal: !showImageModal,
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
				let bytes = CryptoJS.AES.decrypt(res.data, "my-secret-key@123");
				let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
				console.log(data.contract_img_url);
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
			<AdoptionDetails
				info={this.state.adoptionInfo}
				dogName={this.props.match.params.dogName}
				undoAdoption={this.undoAdoption}
			/>
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
			<button className='delete' onClick={() => this.toggleImageModal()}>
				View Contract
			</button>
		);
	};

	renderImageModal = () => {
		return (
			<Modal
				open={this.state.showImageModal}
				onClose={() => this.toggleImageModal()}
				center
				className='adoption-modal-container'
			>
				<div className='adoption-img-modal'>
					<img
						id='adoption-img'
						src={this.state.adoptionInfo.contract_img_url}
						alt='contract'
					/>
				</div>
			</Modal>
		);
	};

	render() {
		return (
			<div className='wrapper'>
				{this.renderDetails()}
				{this.renderImageButton()}
				{this.renderUndoAdoptionButton()}
				{this.renderImageModal()}
			</div>
		);
	}
}

export default Adoption;
