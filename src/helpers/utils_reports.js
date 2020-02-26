import { isEmptyVal } from "./utils_types";
import { findShiftID } from "./utils_shifts";
import { findStatusID } from "./utils_status";
import { getResolutionID } from "./utils_resolution";
import { ReportsCompletionModel, ReportsExceptionModel } from "./utils_models";

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

// REPORT HELPERS //
export { createReportParams, createReportSorts, createReportModel };

// CREATE REPORT DESCRIPTIONS //
export { getRangeDescription, getFilterDescription, createReportDescription };

// HELPERS
export { getNonEmptyValues };
