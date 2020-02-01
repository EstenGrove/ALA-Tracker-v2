import { test } from "./utils_env";
import { scheduledTasks, unscheduledTasks } from "./utils_endpoints";
import { isEmptyArray } from "./utils_types";

const SCHEDULED_ID = "AssessmentTrackingTaskId";
const UNSCHEDULED_ID = "AssessmentUnscheduleTaskId";

// fetches ALL task notes for scheduled tasks.
const getScheduledTaskNotes = async token => {
	let url = test.base + scheduledTasks.get.note;
	url += "?" + new URLSearchParams({ index: 0, rows: 100 });

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
		return response.Data;
	} catch (err) {
		console.log("Oops. An error occurred: ", err);
		return err.message;
	}
};

// fetches ALL task notes for unscheduled tasks
const getUnscheduledTaskNotes = async token => {
	let url = test.base + unscheduledTasks.get.note;
	url += "?" + new URLSearchParams({ index: 0, rows: 100 });

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
		return response.Data;
	} catch (err) {
		console.log("Oops. An error occurred: ", err);
		return err.message;
	}
};

// handles ALL scheduled task notes
const getScheduledTaskNoteData = async (token, endpoint) => {
	let url = test.base + scheduledTasks.get[endpoint];
	url += "?" + new URLSearchParams({ index: 0, rows: 100 });

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
		return response.Data;
	} catch (err) {
		console.log("Oops. An error occurred: ", err);
		return err.message;
	}
};

// dataType(s): task, shiftSubTask, note
const getScheduledData = async (token, dataType = "task") => {
	let url = test.base + scheduledTasks.get[dataType];
	url += "?" + new URLSearchParams({ index: 0, rows: 100 });

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
		return response.Data;
	} catch (err) {
		console.log("Oops. An error occurred: ", err);
		return err.message;
	}
};

// HELPERS //
const getNotesCount = (taskID, notes) => {
	if (isEmptyArray(notes)) return 0;
	return notes.filter(entry => {
		if (entry[SCHEDULED_ID] === taskID) {
			return entry;
		}
		return null;
	}).length;
};

export {
	getScheduledTaskNotes,
	getUnscheduledTaskNotes,
	getScheduledTaskNoteData,
	getScheduledData,
	getNotesCount
};

// TASK ID HELPERS
export { SCHEDULED_ID, UNSCHEDULED_ID };
