import { test } from "./utils_env";
import { unscheduledTasks } from "./utils_endpoints";
import { requestParams } from "./utils_params";
// helpers
import { UnscheduledTaskModel } from "./utils_models";
import { isEmptyObj, isEmptyVal } from "./utils_types";
import { getCategoryID } from "./utils_categories";
import { replaceNullWithMsg } from "./utils_processing";
import { findPriorityID } from "./utils_priority";
import { getResolutionID } from "./utils_resolution";
import { findShiftID } from "./utils_shifts";
import { findStatusID } from "./utils_status";

const UNSCHEDULED_ID = "AssessmentUnscheduleTaskId";
const UNSCHEDULED_SUBTASK_ID = "AssessmentUnscheduleTaskShiftSubTaskId";

/////////////////////////////////////////////////////////////
//////////////// UNSCHEDULED REQUEST HELPERS ////////////////
/////////////////////////////////////////////////////////////

/**
 * @description "CREATE" request to create and save one or more new task records
 * @param {string} token base64 encoded auth token
 * @param {object} params query params; includes DB and table name
 * @param {array} tasks array of AssessmentUnscheduleTask models with updated values to save to database
 */
const saveUnscheduledTasks = async (token, tasks) => {
	let url = test.base + unscheduledTasks.save.task;
	url += "?" + new URLSearchParams(requestParams.unscheduledTask);

	try {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tasks)
		});
		const response = await request.json();
		return response;
	} catch (err) {
		console.log("An error occurred", err);
		return err.message;
	}
};

/**
 * @description - Fetches a residents' unscheduled task records.
 * @param {string} token - base64 encoded SecurityToken
 * @param {object} params - request params in object form w/ key/value pairs
 * @param {number} residentID - numeric resident id
 */
const getUnscheduledTasks = async (token, residentID) => {
	let url = test.base + unscheduledTasks.get.task;
	url += "?" + new URLSearchParams(requestParams.unscheduledTask);
	url += "&residentId=" + residentID;

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
		console.log("An error occurred", err);
		return err.message;
	}
};

// returns the AssessmentUnscheduleTaskId
const updateUnscheduledTask = async (token, tasks) => {
	let url = test.base + unscheduledTasks.update.task;
	url += "?" + new URLSearchParams(requestParams.unscheduledTask);

	try {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tasks)
		});
		const response = await request.json();
		return response.Data;
	} catch (err) {
		return err.message;
	}
};

const deleteUnscheduledTask = async (token, tasks) => {
	let url = test.base + unscheduledTasks.delete.task;
	url += "?" + new URLSearchParams(requestParams.unscheduledTask);

	try {
		const request = await fetch(url, {
			method: "DELETE",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tasks)
		});

		const response = await request.json();
		return response;
	} catch (err) {
		console.log("An error occurred " + err.message);
		return err;
	}
};

// populate AssessmentUnscheduleTask model for new unscheduled task
const populateUnscheduledModel = (vals, model) => {
	if (isEmptyObj(vals)) return alert("Please complete form.");

	const handleNotes = vals => {
		if (isEmptyVal(vals.final)) {
			return vals.newTaskNote;
		}
		return vals.final;
	};

	return {
		...model,
		AssessmentCategoryId: getCategoryID(vals.newTaskADL),
		AssessmentReasonId: 9, // defaults to "FORGOTTEN"
		AssessmentResolutionId: 6, // defaults to "PENDING"
		AssessmentPriorityId: findPriorityID(vals.newTaskPriority),
		AssessmentTaskStatusId: 1, // defaults to "PENDING"
		FollowUpDate: replaceNullWithMsg(vals.newTaskFollowUpDate, ""),
		EntryDate: new Date().toUTCString(),
		SignedBy: vals.newTaskSignature,
		InitialBy: "",
		Notes: handleNotes(vals),
		Description: replaceNullWithMsg(
			vals.newTaskName,
			"No Description was added"
		),
		CompletedDate: new Date().toUTCString(),
		IsCompleted: false,
		IsFinal: false,
		IsActive: true,
		CreatedDate: new Date().toUTCString(),
		CreatedBy: "7801CC7E-4462-4442-B214-BCDFF70B3F95"
	};
};

// handles:
// 1. Creates new task model instance
// 2. sets the resident and user ids
// 3. grabs the model
// 4. updates task model w/ form values and pertinent data
// 5. returns updated new task model (ie UnscheduledTaskModel)
const mapUpdatesToModel = (formVals, residentID, userID) => {
	// init model class instance...
	const initModel = new UnscheduledTaskModel();
	initModel.setProperty("ResidentId", residentID);
	initModel.setProperty("UserId", userID);
	// exposed task model
	const model = initModel.getModel();
	// update the model and return it
	const updatedModel = populateUnscheduledModel(
		formVals, // from CreateTaskForm
		model // unscheduled model
	);
	return updatedModel;
};

const findUnscheduledByADL = (tasks, adl) => {
	return tasks.filter(task => task.AssessmentCategoryId === getCategoryID(adl));
};
const findUnscheduledRecord = (active, records) => {
	if (isEmptyObj(active)) return {};
	return records.reduce((all, item) => {
		if (item[UNSCHEDULED_ID] === active[UNSCHEDULED_ID]) {
			all = item;
			return all;
		}
		return all;
	}, {});
};
// UNSCHEDULED TASK UPDATER
const findAndUpdateUnscheduledRecord = (vals, record) => {
	switch (vals.status) {
		case "COMPLETE": {
			return handleCompletion(vals, record);
		}
		case "NOT-COMPLETE": {
			return handleException(vals, record);
		}
		case "PENDING": {
			return handlePending(vals, record);
		}
		case "MISSED-EVENT": {
			return handleException(vals, record);
		}
		case "IN-PROGRESS": {
			return handlePending(vals, record);
		}
		default:
			return handlePending(vals, record);
	}
};

const determineResolution = vals => {
	if (vals.residentUnavailable) {
		return "RESIDENT-DENIED";
	}
	if (isEmptyVal(vals.followUpDate) && !vals.residentUnavailable) {
		return "TBC-NEXT-SHIFT";
	}
	if (vals.requiresMedCheck && !vals.residentUnavailable) {
		return "TBC-NEXT-SHIFT-NEEDS";
	}
	if (vals.reassess) {
		return "COMPLETED-REASSESSMENT-NEEDED";
	}
	return "PENDING";
};

const handleUnscheduledNotes = vals => {
	if (!vals.reassess) return vals.notes;
	return `${vals.notes} \nReassess Notes: ${vals.reassessNotes}`;
};

const handleCompletion = (vals, record) => {
	return {
		...record,
		CompletedAssessmentShiftId: findShiftID(vals.shift),
		AssessmentResolutionId: getResolutionID(determineResolution(vals)),
		AssessmentReasonId: 6,
		AssessmentTaskStatusId: findStatusID(vals.status),
		AssessmentPriorityId: replaceNullWithMsg(findPriorityID(vals.priority), 0),
		CompletedDate: new Date().toUTCString(),
		FollowUpDate: vals.followUpDate,
		SignedBy: vals.signature,
		InitialBy: getTaskInitials(vals.signature),
		Notes: handleUnscheduledNotes(vals),
		IsCompleted: true,
		IsFinal: isEmptyVal(vals.followUpDate) ? true : false
	};
};
// TBC
const handleException = (vals, record) => {
	return {
		...record,
		CompletedAssessmentShiftId: findShiftID(vals.shift),
		AssessmentResolutionId: getResolutionID(determineResolution(vals)),
		AssessmentReasonId: 4,
		AssessmentTaskStatusId: findStatusID(vals.status),
		AssessmentPriorityId: replaceNullWithMsg(findPriorityID(vals.priority), 0),
		CompletedDate: new Date().toUTCString(),
		FollowUpDate: vals.followUpDate,
		SignedBy: vals.signature,
		InitialBy: getTaskInitials(vals.signature),
		Notes: vals.notes,
		IsCompleted: false,
		IsFinal: false
	};
};

// TBC
const handlePending = (vals, record) => {
	return {
		...record,
		CompletedAssessmentShiftId: findShiftID(vals.shift),
		AssessmentResolutionId: getResolutionID(determineResolution(vals)),
		AssessmentReasonId: 4,
		AssessmentTaskStatusId: findStatusID(vals.status),
		AssessmentPriorityId: replaceNullWithMsg(findPriorityID(vals.priority), 0),
		CompletedDate: new Date().toUTCString(),
		FollowUpDate: vals.followUpDate,
		SignedBy: vals.signature,
		InitialBy: getTaskInitials(vals.signature),
		Notes: vals.notes,
		IsCompleted: false,
		IsFinal: false
	};
};

// used for parsing a user's name into initials.
const getTaskInitials = strUser => {
	if (isEmptyVal(strUser)) return "NA";
	const first = strUser.slice(0, 1);
	const last = strUser.split(" ")[1].slice(0, 1);
	return `${first}.${last}.`;
};

const removeStaleRecordByProp = (activeID, records, prop) => {
	return records.filter(item => item[prop] !== activeID);
};

export {
	saveUnscheduledTasks,
	getUnscheduledTasks,
	updateUnscheduledTask,
	deleteUnscheduledTask
};

// FINDING MATCHING RECORDS
export {
	findUnscheduledRecord,
	handleUnscheduledNotes,
	handleCompletion,
	handleException,
	handlePending,
	removeStaleRecordByProp,
	findAndUpdateUnscheduledRecord // UPDATER FUNCTINO FOR UNSCHEDULED TASKS
};

// new task creation (ie unscheduled tasks)
export { populateUnscheduledModel, mapUpdatesToModel, findUnscheduledByADL };
