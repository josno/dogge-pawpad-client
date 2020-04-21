import TokenService from "../services/token-service";
import config from "../config";

const DogsApiService = {
	getDogs() {
		return fetch(`${config.API_ENDPOINT}/dogs`, {
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
	updateDogImg(data) {
		const updatedDog = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: data,
		};

		return fetch(`${config.API_ENDPOINT}/images/dogs`, updatedDog).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
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
};

export default DogsApiService;
