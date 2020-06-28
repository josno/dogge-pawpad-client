import React from "react";

export default function EditButtons(props) {
	return (
		<>
			<button value='gender' onClick={(e) => props.changeEditMode(e)}>
				&#10008;
			</button>

			<button value='gender' onClick={(e) => props.updateValue(e)}>
				&#10004;
			</button>
		</>
	);
}
