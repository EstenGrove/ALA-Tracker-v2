import { test } from "./utils_env";
import { reports } from "./utils_endpoints";
import { isEmptyVal } from "./utils_types";
import { findShiftID } from "./utils_shifts";
import { findStatusID } from "./utils_status";
import { getResolutionID } from "./utils_resolution";
import { ReportsCompletionModel, ReportsExceptionModel } from "./utils_models";

/////////////////////////////////////////////
////////// REPORTS REQUEST HELPERS //////////
/////////////////////////////////////////////

const getReportInfo = async (token, facilityID = null) => {
	let url = test.base + reports.getInfo;

	if (facilityID) url += "?facilityId=" + facilityID;

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: new Headers({
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token
			})
		});
		const response = await request.json();
		const reportData = response.Data;
		console.log(reportData);
		return reportData;
	} catch (err) {
		return console.log("An error occured: " + err);
	}
};

// execute a report server side - THIS DOES NOT DOWNLOAD OR MIRROR THE REPORT - IT ONLY RUNS THE REPORT
/**
 * @description - Requests a report be run server-side while providing a series of criteria such as report type, date range, facilityID (if applicable) and any sorting criteria, like "by resident", "by status" etc. NOTE: THIS DOES NOT DOWNLOAD A REPORT FILE, ONLY TRIGGER RUNNING A REPORT ON THE SERVER.
 * @param {string} token - A base64 encode auth token.
 * @param {string} reportName - The report name(ie reportCode) (returned from fetching data from the getReportInfo API)
 * @param {object} reportModel - A "params-like" object containing params, and sorting criteria for running a report. (USE THE "ReportsModel" FOUND IN THE "utils_models.js" file)
 * @param {string} reportType - The report form (ie SSRS, PDF, etc) as a string.
 */
const executeReport = async (
	token,
	reportName,
	reportModel,
	reportType = "PDF"
) => {
	let url = test.base + reports.executeReport;

	if (!reportName)
		return console.log("executeReport - Error: No reportName provided");

	url += "?reportCode=" + reportName;
	url += "&reportType=" + reportType;

	try {
		const request = await fetch(url, {
			method: "POST",
			headers: new Headers({
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(reportModel)
		});
		const response = await request.json();
		console.log(response);

		return response;
	} catch (err) {
		return console.log("An error occured: " + err);
	}
};

/**
 * @description A helper for requesting the needed url for mirroring a server-run report.
 * @param {string} token - A base64 encoded auth token.
 * @param {string} reportName - A custom report name (ie ExceptionReport, CompletionReport etc.)
 * @param {object} reportModel - A custom report object model.
 * @param {string} reportType - The "type" of file (ie PDF, EXCEL etc.)
 */
const executeReportAsync = async (
	token,
	reportName,
	reportModel,
	reportType = "PDF"
) => {
	let url = test.base + reports.executeReportAsync;
	url += "?reportCode=" + reportName;
	url += "&reportType=" + reportType;

	try {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reportModel)
		});
		const response = await request.json();
		console.log("response", response);
		return response.Data;
	} catch (err) {
		return console.log("An error occured: " + err);
	}
};

// handles forming the url string used for report mirroring
const constructReportURL = (token, urlPath) => {
	let url = test.base + urlPath;
	url += "?securityToken=" + token;
	return url;
};

// MISC REPORT HELPERS //

// "sanitizes" a object, by removing ALL empty values
// "empty" === (undefined|null|"")
const getNonEmptyValues = values => {
	const keys = Object.keys(values);
	const vals = Object.values(values);
	return vals.reduce((all, val, idx) => {
		if (!isEmptyVal(val)) {
			return {
				...all,
				[keys[idx]]: val
			};
		}
		return all;
	});
};

///////////////////////////////////////
//////// REPORT MODEL UPDATERS ////////
///////////////////////////////////////

// ✅ FINISHED!
// populates a new ReportParms data model for a report
const createReportParams = vals => {
	switch (vals.filterBy) {
		case "By Shift": {
			const { filterByShift } = vals;
			const shiftID = findShiftID(filterByShift);
			return [{ Name: "ShiftID", Value: shiftID }];
		}
		case "By Resolution": {
			const { filterByResolution } = vals;
			const resolutionID = getResolutionID(filterByResolution);
			return [{ Name: "ResolutionID", Value: resolutionID }];
		}
		case "By Room #": {
			const { filterByRoomNum } = vals;
			return [{ Name: "RoomNumber", Value: filterByRoomNum }];
		}
		// NOT CURRENTLY IMPLEMENTED SERVER-SIDE!!
		case "By Status": {
			const { filterByStatus } = vals;
			const statusID = findStatusID(filterByStatus);
			return [{ Name: "Status", Value: statusID }];
		}
		default:
			throw new Error(
				"❌ Whoops. Invliad filter criteria for a params model:",
				vals.filterBy
			);
	}
};

// ✅ FINISHED!
const createReportSorts = vals => {
	switch (vals.sortBy) {
		case "By Shift": {
			return [{ Name: "SortByShift", Value: true }];
		}
		case "By Reason": {
			return [{ Name: "SortByReason", Value: true }];
		}
		case "By Resident": {
			const { sortByResident } = vals; // Ascending/Descending
			return [
				{ Name: "SortByResident", Value: true },
				{ Name: `Is${sortByResident}`, Value: true }
			];
		}
		case "By Room #": {
			// ascending/descending
			const { sortByRoomNum } = vals;
			return [
				{ Name: "SortByRoomNum", Value: true },
				{ Name: `Is${sortByRoomNum}`, Value: true }
			];
		}
		case "By TimeStamp": {
			const { sortByTimeStamp } = vals;
			return [{ Name: "SortByTimeStamp", Value: sortByTimeStamp }];
		}
		case "By Staff": {
			const { sortByStaff } = vals; // Ascending/Descending
			return [
				{ Name: "SortByStaff", Value: true },
				{ Name: `Is${sortByStaff}`, Value: true }
			];
		}
		case "By Resolution": {
			return { ...vals };
		}
		case isEmptyVal(vals.sortBy): {
			return { ...vals };
		}
		default:
			throw new Error("❌ Whoops. Invalid sorting type/criteria:", vals.sortBy);
	}
};

// ✅ FINISHED!
const createReportModel = vals => {
	// COMPLETION MODEL
	if (vals.reportType === "Completion Report") {
		const base = new ReportsCompletionModel();
		base.setFacilityID(vals.facilityID);
		base.setStartAndEndDate(vals.startDate, vals.endDate);
		// NO PARAMS & NO SORTS
		if (isEmptyVal(vals.filterBy) && isEmptyVal(vals.sortBy))
			return base.getModel();
		const params = createReportParams(vals); // get params helper
		base.setParamsMany(params);
		// ONLY PARAMS & NO SORTS
		if (isEmptyVal(vals.sortBy)) return base.getModel();
		const sorts = createReportSorts(vals); // get sorts helper
		base.setSortsMany(sorts);
		return base.getModel();
	} else {
		const base = new ReportsExceptionModel();
		base.setFacilityID(vals.facilityID);
		base.setStartAndEndDate(vals.startDate, vals.endDate);
		// NO PARAMS & NO SORTS
		if (isEmptyVal(vals.filterBy) && isEmptyVal(vals.sortBy))
			return base.getModel();
		const params = createReportParams(vals);
		base.setParamsMany(params);
		// ONLY PARAMS & NO SORTS
		if (isEmptyVal(vals.sortBy)) return base.getModel();
		const sorts = createReportSorts(vals);
		base.setSortsMany(sorts);
		return base.getModel();
	}
	// EXCEPTION MODEL
};

// handles formatting the "reportRangeType" value
const getRangeDescription = vals => {
	console.log("vals (getRangeDesc)", vals);
	switch (vals.reportRangeType) {
		case "Last 30 days": {
			return ` for the last 30 days `;
		}
		case "By Month": {
			return ` for ${vals.byMonth} `;
		}
		case "By Quarter": {
			return ` for ${vals.byQuarter} `;
		}
		case "Specific Date": {
			return ` for ${vals.byDate} `;
		}
		case "Custom Date Range": {
			return ` for ${vals.startDate} to ${vals.endDate} `;
		}
		default:
			throw new Error("❌ Oops. Invalid 'reportRangeType' value.");
	}
};

// handles formatting the "filterBy" value
const getFilterDescription = vals => {
	switch (vals.filterBy) {
		case "By Shift": {
			return ` that's sorted by the ${vals.filterByShift} shift `;
		}
		case "By Resident": {
			return ` that's sorted by resident `;
		}
		case "By Status": {
			return ` that's sorted by ${vals.filterByStatus} status `;
		}
		case "ByResolution": {
			return ` that's sorted by the "${vals.filterByResolution}" resolution `;
		}
		case "By Room #": {
			return ` that's sorted from room #${vals.filterByRoomNumStart} to room #${vals.filterByRoomNumEnd} `;
		}
		case "By Staff": {
			return ` that's sorted by staff/employee name `;
		}
		case "By TimeStamp": {
			return;
		}
		default:
			throw new Error("❌ Oops. Invalid 'filterBy' value.");
	}
};

const createReportDescription = vals => {
	const base = "You've requested a ";
	const { reportType } = vals;
	let desc = base + reportType;
	desc += getRangeDescription(vals);
	// return early without filters/sorts
	if (isEmptyVal(vals.filterBy)) return desc;
	desc += getFilterDescription(vals);

	return desc;
};

// REPORT REQUEST/DOWNLOAD HELPERS //
export { getReportInfo, executeReport, executeReportAsync, constructReportURL };

// REPORT HELPERS //
export { createReportParams, createReportSorts, createReportModel };

// CREATE REPORT DESCRIPTIONS //
export { getRangeDescription, getFilterDescription, createReportDescription };

// HELPERS
export { getNonEmptyValues };
