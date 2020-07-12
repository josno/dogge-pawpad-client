import React, { Component } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

class CountrySelect extends Component {
	constructor(props) {
		super(props);

		this.options = countryList().getData();

		this.state = {
			options: this.options,
			value: null,
		};
	}

	changeHandler = (value) => {
		this.setState({ value });
		this.props.onChange(value.label);
	};

	render() {
		return (
			<Select
				className={this.props.styleClass}
				options={this.state.options}
				value={this.state.value}
				onChange={this.changeHandler}
			/>
		);
	}
}

export default CountrySelect;
