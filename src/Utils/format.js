import moment from "moment";
const Format = {
	stringifyDate(date) {
		const dateString = moment(new Date(date)).format("YYYY-MM-DD");

		return dateString;
	},
};

export default Format;
