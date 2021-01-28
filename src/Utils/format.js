import moment from "moment";
const Format = {
	stringifyDate(date) {
		const dateString = moment(new Date(date)).format("YYYY-MM-DD");

		return dateString;
	},
	formatDateInput(date) {
		let formattedDate = "";

		if (date === null) {
			formattedDate = "Pick A Date";
		} else {
			formattedDate = moment(date).format("LL");
		}

		return formattedDate;
	},
};

export default Format;
