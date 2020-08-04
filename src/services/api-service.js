import TokenService from "../services/token-service";
import config from "../config";

const DogsApiService = {
	getDogs(shelterId) {
		return fetch(`${config.API_ENDPOINT}/dogs/?shelterId=${shelterId}`, {
			headers: {
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	deleteDog(dogId) {
		return fetch(`${config.API_ENDPOINT}/dogs/${dogId}`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		});
	},
	getDogInfo(dogId) {
		return fetch(`${config.API_ENDPOINT}/dogs/${dogId}`, {
			headers: {
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	insertNewDog(dogObj) {
		const newDog = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: dogObj,
		};

		return fetch(`${config.API_ENDPOINT}/dogs`, newDog).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getDogNotes(dogId) {
		return fetch(`${config.API_ENDPOINT}/notes/${dogId}`, {
			headers: {
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	insertNewNote(noteObj) {
		const newNote = {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(noteObj),
		};

		return fetch(`${config.API_ENDPOINT}/notes`, newNote).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	insertNewShot(shotObj) {
		const newShot = {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(shotObj),
		};

		return fetch(`${config.API_ENDPOINT}/shots`, newShot).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	updateDog(dogObj, dogId) {
		const updatedDog = {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(dogObj),
		};

		return fetch(
			`${config.API_ENDPOINT}/dogs/${dogId}`,
			updatedDog
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : null
		);
	},
	uploadDogImg(data, tagNumber) {
		const updatedDog = {
			method: "PUT",
			headers: {
				"Access-Control-Allow-Origin": "https://www.usepawpad.com",
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: data,
		};

		return fetch(
			`${config.API_ENDPOINT}/dogs/images/${tagNumber}`,
			updatedDog
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	deleteDogImg(data, tagNumber) {
		const updatedDog = {
			method: "DELETE",
			headers: {
				"Access-Control-Allow-Origin": "https://www.usepawpad.com",
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: data,
		};

		return fetch(
			`${config.API_ENDPOINT}/dogs/images/${tagNumber}`,
			updatedDog
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : null
		);
	},
	getShots(dogId) {
		return fetch(`${config.API_ENDPOINT}/shots/${dogId}`, {
			headers: {
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	updateDogShot(shot, shotId) {
		const shotToUpdate = {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(shot),
		};
		return fetch(
			`${config.API_ENDPOINT}/shots/${shotId}`,
			shotToUpdate
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : null
		);
	},
	deleteDogShot(shotId) {
		return fetch(`${config.API_ENDPOINT}/shots/${shotId}`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		});
	},
	deleteNote(noteId) {
		return fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		});
	},
	deleteNotesByDogId(dogId) {
		return fetch(`${config.API_ENDPOINT}/notes`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(dogId),
		});
	},
	deleteShotsByDogId(dogId) {
		return fetch(`${config.API_ENDPOINT}/notes`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(dogId),
		});
	},
	archiveDog(dogId, date) {
		return fetch(`${config.API_ENDPOINT}/dogs/${dogId}/archive`, {
			method: "PATCH",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(date),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	insertAdoption(obj) {
		return fetch(`${config.API_ENDPOINT}/adoption`, {
			method: "POST",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: obj,
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	deleteAdoption(dogId) {
		return fetch(`${config.API_ENDPOINT}/adoption/${dogId}`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		});
	},
	getAdoptionInfo(dogId) {
		return fetch(`${config.API_ENDPOINT}/adoption/${dogId}`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	uploadContract(data, dogId) {
		const updatedContract = {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: data,
		};

		return fetch(
			`${config.API_ENDPOINT}/adoption/contract-upload/${dogId}`,
			updatedContract
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
};

export default DogsApiService;
