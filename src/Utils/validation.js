const Validate = {
	validateShotName(shotName) {
		if (shotName.length < 2) {
			return 'Shot name should have two or more characters';
		}
	},
	validateAge(str) {
		if (!str.includes('month') && !str.includes('year')) {
			return `Age must end in year(s) or month(s).`;
		}
	},
	validateName(str) {
		const invalidChar = str.match(/[^a-zA-Z,\s]/g);

		if (str.length <= 1) {
			return `Name should have more than one letter.`;
		} else if (invalidChar) {
			return 'Type only letters please.';
		}
	},
	validateNoteSelect(str) {
		if (str !== 'medical' || str !== 'additional') {
			return `Please select Medical or Additional.`;
		}
	},
	validateNote(str) {
		const emptyInput = str.match(/[a-zA-Z]/g);

		if (str.length <= 10) {
			return `Note should have at least 10 characters.`;
		} else if (emptyInput === null) {
			return `Note should include some letters.`;
		} else if (str.length >= 300) {
			return `You have reached the 300 character limit.`;
		}
	},
	validatePasswordNum(str) {
		const hasNumbers = str.match(/[0-9]/g);

		if (!hasNumbers || hasNumbers === null) {
			return 'Password has to include at least a number.';
		}
	},
	validatePasswordSymbol(str) {
		const hasSymbols = str.match(/[^a-zA-Z0-9]/g);

		if (!hasSymbols || hasSymbols === null) {
			return 'Password has to include at least one symbol.';
		}
	}
};

export default Validate;
