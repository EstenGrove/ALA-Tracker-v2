import { test } from "./utils_env";
import { getFileRegistry } from "./utils_endpoints";

///////////////////////////
///// REQUEST HELPERS /////
///////////////////////////

const getFileRegistryByFacility = async (token, facilityID) => {
	let url = test.base + getFileRegistry.byFacility;
	url += "?facilityId=" + facilityID;

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			}
		});
		const response = await request.json();
		console.log(response.Data);
		return response.Data;
	} catch (err) {
		console.log("An error has occurred " + err.message);
		return err;
	}
};

const getFileRegistryByResident = async (token, residentID) => {
	let url = test.base + getFileRegistry.byResident;
	url += "?residentId=" + residentID;

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			}
		});
		const response = await request.json();
		console.log(response.Data);
		return response.Data;
	} catch (err) {
		console.log("An error has occurred " + err.message);
		return err;
	}
};

const getFileRegistryByUser = async (token, userID) => {
	let url = test.base + getFileRegistry.byUser;
	url += "?userId=" + userID;

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			}
		});
		const response = await request.json();
		console.log(response.Data);
		return response.Data;
	} catch (err) {
		console.log("An error has occurred " + err.message);
		return err;
	}
};

export {
	getFileRegistryByFacility,
	getFileRegistryByResident,
	getFileRegistryByUser
};

///////////////////////////
///// REQUEST HELPERS /////
///////////////////////////
