import React, { Component } from "react";
import DogsApiService from "../../services/api-service";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// import "./Modal.css";

class ImgModalForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileImgPreview: null,
			profileImg: null,
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	renderPreview = () => {
		const { profileImgPreview } = this.state;
		return profileImgPreview !== null ? (
			<div>
				<img src={profileImgPreview} alt='preview of profile' />
			</div>
		) : (
			""
		);
	};

	handleImgChange = (e) => {
		this.setState({
			profileImgPreview: URL.createObjectURL(e.target.files[0]),
			profileImg: e.target.files[0],
		});
	};

	handleSubmit = (e) => {
		//DogsApiService.delete
	};

	render() {
		return (
			<form>
				<h2> Update Dog Image</h2>
				{this.renderPreview()}
				<input
					className='block'
					type='file'
					name='img'
					onChange={(e) => this.handleImgChange(e)}
					accept='image/*'
				/>
				<button
					onClick={(e) => this.props.handleUpdate(e, this.state.profileImg)}
				>
					Submit
				</button>
			</form>
		);
	}
}

export default ImgModalForm;
