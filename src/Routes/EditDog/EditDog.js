import React, { Component } from "react";
import PawPadContext from "../../PawPadContext.js";
import "./EditDog.css";
import { Link } from "react-router-dom";
import DogsApiService from "../../services/api-service";
import EditShots from "../../Components/EditShots/EditShots";
import moment from "moment";
import ValidationError from "../../Components/ValidationError/ValidationError";

class EditDog extends Component {
	static contextType = PawPadContext;
	constructor(props) {
		super(props);
		this.state = {
			dogName: "",
			profileImg: "",
			spayedNeutered: false,
			gender: "",
			age: { value: "", touched: false },
			arrivalDate: "",
			updatedBy: "",
			error: "",
			profileImgPreview: "",
			tagNumber: "",
			microchip: "",
		};
		this.formatDate = this.formatDate.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateAge = this.updateAge.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleImgChange = this.handleImgChange.bind(this);
	}

	formatDate = (date) => {
		const formattedDate = moment(date).format("YYYY-MM-DD");

		return formattedDate;
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	updateAge(age) {
		this.setState({
			age: { value: age, touched: true },
		});
	}

	handleCheckbox = (e) => {
		const { name } = e.target;

		this.setState((prevState) => ({
			[name]: !prevState[name],
		}));
	};

	handleImgChange = (e) => {
		this.setState({
			profileImgPreview: URL.createObjectURL(e.target.files[0]),
			profileImg: e.target.files[0],
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const {
			dogName,
			profileImg,
			spayedNeutered,
			gender,
			arrivalDate,
			tagNumber,
			microchip,
		} = this.state;

		const updatedDogObj = {
			dog_name: dogName,
			profile_img: profileImg,
			spayedneutered: spayedNeutered,
			gender: gender,
			age: this.state.age.value,
			arrival_date: new Date(arrivalDate),
			tag_number: tagNumber,
			microchip: microchip,
		};

		console.log("submit clicked");

		DogsApiService.updateDog(updatedDogObj, this.props.dogId)
			.then((res) => this.props.history.push(`/dog-info/${this.props.dogId}`))
			.catch((error) => this.setState({ error: error.message }));
	};

	componentDidMount() {
		window.scrollTo(0, 0);
		const { dogId } = this.props;

		DogsApiService.getDogInfo(dogId).then((dogInfo) => {
			this.setState({
				dogName: dogInfo.dog_name,
				profileImg: dogInfo.profile_img,
				spayedNeutered: dogInfo.spayedneutered,
				gender: dogInfo.gender,
				age: { value: dogInfo.age, touched: false },
				arrivalDate: dogInfo.arrival_date,
				profileImgPreview: dogInfo.profile_img,
				tagNumber: dogInfo.tag_number,
				microchip: dogInfo.microchip,
			});
		});
	}

	render() {
		let imgStyle = { display: "none" };

		if (this.state.profileImgPreview.length > 0) {
			imgStyle = {
				display: "block",
			};
		}

		return (
			<main className='edit-dog-container'>
				<h1 className='form-title'>Edit Dog</h1>
				<form className='form-container' onSubmit={this.handleSubmit}>
					<h1 htmlFor='name' className='dog-name-edit'>
						{this.state.dogName}
					</h1>
					<h3 className='form-title'>Update Information Below </h3>
					<label htmlFor='name' className='bold'>
						Name
					</label>
					<input
						id='name'
						type='text'
						name='dogName'
						className='block'
						value={this.state.dogName}
						onChange={this.handleChange}
						required
					/>

					<div className='field-item'></div>
					<label htmlFor='image' className='bold'>
						Image
					</label>
					<img
						id='img-preview'
						src={this.state.profileImgPreview}
						alt='your-pic'
						style={imgStyle}
					/>

					<input
						className='block'
						type='file'
						name='profileImg'
						onChange={this.handleImgChange}
						accept='image/*'
						required
					/>

					<fieldset className='field-item'>
						<legend className='bold'>Gender:</legend>
						<label htmlFor='male'>
							<input
								type='radio'
								name='gender'
								value='Male'
								onChange={this.handleChange}
								id='male'
								checked={this.state.gender === "Male" ? true : false}
								required
							/>
							Male
						</label>
						<label htmlFor='female'>
							<input
								type='radio'
								name='gender'
								value='Female'
								onChange={this.handleChange}
								id='female'
								checked={this.state.gender === "Female" ? true : false}
							/>
							Female
						</label>
					</fieldset>

					<label htmlFor='estimated-age' className='bold'>
						Estimated Birthdate
					</label>
					<input
						className='block'
						id='age'
						type='text'
						name='age'
						value={this.state.age.value}
						onChange={(e) => this.updateAge(e.target.value)}
						required
					/>

					<label htmlFor='arrival' className='bold'>
						Estimated Arrival
					</label>
					<input
						className='block'
						id='arrival'
						type='date'
						name='arrivalDate'
						value={this.formatDate(this.state.arrivalDate)}
						onChange={this.handleChange}
					/>

					<label htmlFor='tag-number' className='bold'>
						Tag Number
					</label>
					<input
						id='tagNumber'
						type='text'
						name='tagNumber'
						className='block'
						value={this.state.tagNumber}
						onChange={this.handleChange}
						required
					/>

					<label htmlFor='microchip' className='bold'>
						Microchip
					</label>
					<input
						id='microchip'
						type='text'
						name='microchip'
						className='block'
						value={this.state.microchip}
						onChange={this.handleChange}
						required
					/>

					<EditShots key={this.props.dogId} dogId={this.props.dogId} />

					<fieldset className='field-item'>
						<legend className='bold'>Spayed/Neutered</legend>
						<label htmlFor='yes'>
							<input
								id='yes'
								type='radio'
								name='spayedNeutered'
								checked={this.state.spayedNeutered ? true : false}
								onChange={this.handleCheckbox}
							/>
							Yes
						</label>

						<label htmlFor='no'>
							<input
								id='no'
								type='radio'
								name='spayedNeutered'
								checked={this.state.spayedNeutered ? false : true}
								onChange={this.handleCheckbox}
							/>
							No
						</label>
					</fieldset>

					<div className='form-buttons'>
						{this.state.error.length > 0 ? (
							<ValidationError
								message={"Something wrong happened. Refresh and try again."}
							/>
						) : (
							""
						)}
						<button className='cancel' type='submit'>
							<Link className='dog-link' to={"/dogs-list"}>
								Cancel
							</Link>
						</button>

						<button className='submit' type='submit'>
							Submit
						</button>
					</div>
				</form>
			</main>
		);
	}
}

export default EditDog;
