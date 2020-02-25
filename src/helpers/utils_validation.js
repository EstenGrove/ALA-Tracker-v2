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

export { isValidForm, getNonEmptyValues, isFilledOut, selectionValidator };
