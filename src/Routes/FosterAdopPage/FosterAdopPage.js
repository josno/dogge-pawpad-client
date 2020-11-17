import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./FosterAdopPage.css";
import DogsApiService from "../../services/api-service";
import FosterAdopDetails from "../../Components/FosterAdopDetails/FosterAdopDetails";
import Modal from "react-responsive-modal";
import Encryption from "../../Utils/encryption";

class FosterAdopPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			info: "",
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
		const { dog_id } = this.state.info;

		DogsApiService.deleteAdoption(dog_id).then((res) => {
			//refactor
			DogsApiService.getDogInfo(dog_id)
				.then((res) => {
					this.setState({
						info: res,
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

	undoFoster = () => {
		const { dog_id } = this.state.info;

		DogsApiService.deleteFoster(dog_id).then((res) => {
			//refactor
			DogsApiService.getDogInfo(dog_id)
				.then((res) => {
					this.setState({
						info: res,
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
		return this.state.dog_status === "Current" ? (
			<div>
				<h2>{this.props.match.params.dogName} is now set to Current.</h2>
				<Link className="delete" to="/dogs-list">
					Go Back To List
				</Link>
			</div>
		) : (
			<>
				<FosterAdopDetails
					info={this.state.info}
					dogName={this.props.match.params.dogName}
					undoAdoption={() => this.undoAdoption()}
					status={this.state.dog_status}
				/>
				{this.renderContractButton()}
				{this.renderUndoAdoptionButton()}
			</>
		);
	};

	renderUndoAdoptionButton = () => {
		return (
			<>
				<button
					className="delete"
					onClick={
						this.state.dog_status === "Adopted"
							? () => this.undoAdoption()
							: () => this.undoFoster()
					}
				>
					Undo {this.state.dog_status === "Adopted" ? "Adoption" : "Foster"}
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
			.then((res) => DogsApiService.getinfo(this.props.match.params.dogId))
			.then((res) => {
				let data = Encryption.decryptData(res.data);

				this.setState({
					info: data,
					showContractModal: !this.state.showContractModal,
				});
			})
			.catch((err) => this.setState({ error: err }));
	};

	renderContractButton = () => {
		return this.state.info.contract_url != null ? (
			<button className="delete">
				<a href={this.state.info.contract_url} download>
					View Contract
				</a>
			</button>
		) : (
			<button onClick={() => this.toggleUploadContract()} className="delete">
				Upload Contract
			</button>
		);
	};

	contractForm = () => {
		return (
			<div className="adoption-contract-modal">
				<div className="contract-upload-div">
					<input
						className="upload-contract-input"
						name="contract"
						onChange={(e) => this.handleChange(e)}
						type="file"
						accept="application/pdf"
					/>
				</div>
				<div className="contract-upload-div">
					<button
						className="contract-upload-button delete"
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
		this.props.type === "adoption"
			? DogsApiService.getAdoptionInfo(dogId)
					.then((res) => {
						let data = Encryption.decryptData(res.data);

						this.setState({
							info: data,
							dog_status: data.dog_status,
						});
					})
					.catch((resErr) => {
						this.setState({
							error: resErr.error,
						});
					})
			: DogsApiService.getFosterInfo(dogId)
					.then((res) => {
						let data = Encryption.decryptData(res.data);

						this.setState({
							info: data,
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
			<div className="wrapper">
				{this.renderDetails()}
				{this.renderContractModal()}
			</div>
		);
	}
}

export default FosterAdopPage;
