import { isEmptyArray } from "./utils_types";
import { test } from "./utils_env";
import { downloads } from "./utils_endpoints";

// downloads a single file.
const downloadFile = async (token, id, filename = null) => {
	let url = test.base + downloads.getFile;
	url += "?id=" + id;

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			}
		});
		console.log("REQUEST(downloadFile)", request);
		const blob = await request.blob();
		console.log("BLOB", blob);
		return blob;
		// return saveFile(blob, filename);
	} catch (err) {
		console.log("There was an error " + err.message);
		return err;
	}
};

// downloads multiple files
const downloadFileMany = async (token, ids) => {
	let url = test.base + downloads.getFile;
	url += "?" + serializeWithKey(ids, "id");

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token
			}
		});
		const resClone = request.clone();
		const resBlob = await resClone.blob(); // creates file blob
		console.log("BLOB", resBlob);
		return resBlob;
	} catch (err) {
		console.log("There was an error " + err.message);
		return err;
	}
};

// serialize an object into a query string
const serializer = params => {
	if (!params) return console.log("Empty params data", params);
	return Object.keys(params)
		.map((key, index) => {
			return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
		})
		.join("&");
};

// takes an array of values and a custom key
// creates the query strings for each item in the array and joins it with a the "customKey"
const serializeWithKey = (paramsList, customKey) => {
	if (isEmptyArray(paramsList)) return console.warn("NO paramsList PROVIDED");
	return paramsList
		.map(
			param => encodeURIComponent(customKey) + "=" + encodeURIComponent(param)
		)
		.join("&");
};

// MUST TRANSFORM THE RESPONSE OBJECT IMMEDIATELY IN FETCH RETURN,
//  THEN PASS BLOB TO THIS HELPER
const saveFile = (blob, filename) => {
	const fileURL = window.URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = fileURL;
	link.download = filename; // INCLUDES FILE EXTENSION
	link.click();
	window.URL.revokeObjectURL(fileURL);
};

const createFileURL = blob => {
	return window.URL.createObjectURL(blob);
};

// DOWNLOAD & FILE HELPERS //
export { serializer, serializeWithKey };

export { saveFile, downloadFile, downloadFileMany, createFileURL };
