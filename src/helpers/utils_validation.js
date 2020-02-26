import { isEmptyObj, isEmptyVal, isBool } from "./utils_types.js";

// CHECKS IF FORM IS COMPLETED
const isValidForm = vals => {
	if (isEmptyObj(vals)) return false;
	let results = [];
	for (const prop in vals) {
		if (!isBool(vals[prop]) && isEmptyVal(vals[prop])) {
			results.push(false);
		}
		results.push(true);
	}
	return results.includes(false) ? false : true;
};

// accepts an object (typically of state input values)
// removes ALL values that are empty (ie null, undefined, "")
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
	}, {});
};

// REPORTS' FORM VALIDATION HELPERS
const isFilledOut = reportVals => {
	const { reportType, reportRangeType, startDate, endDate } = reportVals;
	if (isEmptyVal(reportType)) return false;
	if (isEmptyVal(reportRangeType)) return false;
	if (isEmptyVal(startDate) && isEmptyVal(reportVals?.startDate)) return false;
	if (isEmptyVal(endDate) && isEmptyVal(reportVals?.endDate)) return false;

	return true;
};

const selectionValidator = reportVals => {
	const { reportType, reportRangeType, startDate, endDate } = reportVals;
	if (isEmptyVal(reportType))
		return `Please select a report type: Exception|Completion Report.`;
	if (isEmptyVal(reportRangeType))
		return `Please select a date range type: By Month, Quarter, etc.`;
	if (isEmptyVal(startDate) && isEmptyVal(reportVals?.startDate))
		return `Please select a start date.`;
	if (isEmptyVal(endDate) && isEmptyVal(reportVals?.endDate))
		return `Please select an end date`;
	return `Form has been filled out. Would you like to create the report, now?`;
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

const checkForRange = vals => {
	switch (vals.reportRangeType) {
		case "By Month":
			return vals.byMonth;
		case "By Quarter":
			return vals.byQuarter;
		case "Specific Date":
			return vals.byDate;
		case "Custom Date Range":
			return vals.byDateRange;

		default:
			throw new Error("❌ Missing a date range type", vals.reportRangeType);
	}
};

export {
	isValidForm,
	getNonEmptyValues,
	isFilledOut,
	selectionValidator,
	createReportDescription,
	getRangeDescription,
	getFilterDescription,
	checkForRange
};
