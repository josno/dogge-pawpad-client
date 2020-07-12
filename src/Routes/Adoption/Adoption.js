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
			showContractModal: false,
			error: null,
			contract: "",
		};
	}

	toggleUploadContract = () => {
		const { showContractModal } = this.state;
		this.setState({
			showContractModal: !showContractModal,
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
				{this.renderContractButton()}
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

	handleChange = (e) => {
		e.preventDefault();
		const { name } = e.target;

		this.setState({
			[name]: e.target.files[0],
		});
	};

	handleUploadContract = () => {
		const contractData = new FormData();
		contractData.append("contract", this.state.contract);

		DogsApiService.uploadContract(contractData, this.props.match.params.dogId)
			.then((res) =>
				DogsApiService.getAdoptionInfo(this.props.match.params.dogId)
			)
			.then((res) => {
				let bytes = CryptoJS.AES.decrypt(res.data, config.SECRET);
				let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

				this.setState({
					adoptionInfo: data,
					showContractModal: !this.state.showContractModal,
				});
			})
			.catch((err) => this.setState({ error: err }));
	};

	renderContractButton = () => {
		return this.state.adoptionInfo.contract_url != null ? (
			<button className='delete'>
				<a href={this.state.adoptionInfo.contract_url} download>
					View Contract
				</a>
			</button>
		) : (
			<button onClick={() => this.toggleUploadContract()} className='delete'>
				Upload Contract
			</button>
		);
	};

	contractForm = () => {
		return (
			<div className='adoption-contract-modal'>
				<div className='contract-upload-div'>
					<input
						className='upload-contract-input'
						name='contract'
						onChange={(e) => this.handleChange(e)}
						type='file'
						accept='application/pdf'
					/>
				</div>
				<div className='contract-upload-div'>
					<button
						className='contract-upload-button delete'
						onClick={() => this.handleUploadContract()}
					>
						Upload
					</button>
				</div>
			</div>
		);
	};

	renderContractModal = () => {
		return (
			<Modal
				open={this.state.showContractModal}
				onClose={(e) => this.toggleUploadContract()}
				center
			>
				{this.contractForm()}
			</Modal>
		);
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

	render() {
		return (
			<div className='wrapper'>
				{this.renderDetails()}
				{this.renderContractModal()}
			</div>
		);
	}
}

export default Adoption;
