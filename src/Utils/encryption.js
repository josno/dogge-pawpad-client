import config from "../config";
const CryptoJS = require("crypto-js");

const Encryption = {
	encryptData(data) {
		let encrypted = CryptoJS.AES.encrypt(
			JSON.stringify(data),
			config.SECRET
		).toString();

		return encrypted;
	},
	decryptData(data) {
		let bytes = CryptoJS.AES.decrypt(data, config.SECRET);
		let decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

		return decrypted;
	},
};

export default Encryption;
