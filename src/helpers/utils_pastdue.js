import { test } from "./utils_env";
import { pastDue } from "./utils_endpoints";
import {
	format,
	subDays,
	startOfDay,
	endOfDay,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth
} from "date-fns";
import { isEmptyArray } from "./utils_types";

/**
 * @description - Util for fetching past due task records between a start and end date.
 * @param {string} token - A base64 encoded security token generated from the server.
 * @param {string} facilityID - An internal facilityID (ALA-specific)
 * @param {Date} startDate - Start date to grab past records from.
 * @param {Date} endDate - Ending date to grab past records from.
 * @param {number} index - The starting point in the database to begin fetching records from.
 * @param {number} rows - The number of rows(count) from fetch from the database.
 */
const getCommunityPastDue = async (
	token,
	facilityID,
	startDate = subDays(new Date(), 2),
	endDate = new Date(),
	index = 0,
	rows = 25
) => {
	let url = test.base + pastDue.get;
	url += "?facilityId=" + facilityID + "&";
	url += new URLSearchParams({
		startDate: format(startDate, "MM/DD/YYYY"),
		endDate: format(endDate, "MM/DD/YYYY"),
		index: index,
		rows: rows
	});

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
		console.log("An error occurred ", err);
		return err.message;
	}
};

// fetches the past due records for ONLY a specific day (start of day - end of day)
const getDailyPastDue = async (
	token,
	facilityID,
	startDate = startOfDay(new Date()),
	endDate = endOfDay(new Date()),
	index = 0,
	rows = 25
) => {
	const dayStart = format(startDate, "MM/DD/YYYY");
	const dayEnd = format(endDate, "MM/DD/YYYY");
	const dailyRecords = await getCommunityPastDue(
		token,
		facilityID,
		dayStart,
		dayEnd,
		index,
		rows
	);
	return dailyRecords;
};

// fetches records ONLY for a specific week-long range.
const getWeeklyPastDue = async (
	token,
	facilityID,
	startDate = startOfWeek(new Date()),
	endDate = endOfWeek(new Date()),
	index = 0,
	rows = 25
) => {
	const weekStart = format(startDate, "MM/DD/YYYY");
	const weekEnd = format(endDate, "MM/DD/YYYY");
	const weekRecords = await getCommunityPastDue(
		token,
		facilityID,
		weekStart,
		weekEnd,
		index,
		rows
	);
	return weekRecords;
};

// fetches records ONLY for a specific month
const getMonthlyPastDue = async (
	token,
	facilityID,
	startDate = startOfMonth(new Date()),
	endDate = endOfMonth(new Date()),
	index = 0,
	rows = 25
) => {
	const monthStart = format(startDate, "MM/DD/YYYY");
	const monthEnd = format(endDate, "MM/DD/YYYY");
	const monthRecords = await getCommunityPastDue(
		token,
		facilityID,
		monthStart,
		monthEnd,
		index,
		rows
	);
	return monthRecords;
};

/////////////////////////////////////////
// SORTING & PROCESSING RECORDS & DATA //
/////////////////////////////////////////

// sorts records by resident last name alphabetically.
const sortPastDueRecords = records => {
	if (isEmptyArray(records)) return [];
	return records.sort((a, b) => {
		return a.Resident[0].ResidentLastName.localeCompare(
			b.Resident[0].ResidentLastName
		);
	});
};

// counts records for each resident and returns an object with residentIDs as keys and record counts as values.
// { 123258: 18, 148471: 7, ...}
/**
 *
 * @param {Array} records - An array of past due records.
 * @param {function} iteratee - An inline function that explicitly defines a property in an object. ie x => x[prop]
 * @example countPastDueRecords(records, x => x.Resident[0].ResidentLastName)
 */
const countPastDuePerResident = (records, iteratee) => {
	return records.reduce((all, item) => {
		const keyToGroupBy = iteratee(item);
		if (!item[keyToGroupBy]) {
			all[keyToGroupBy] = {};
		}
		all[keyToGroupBy] = item.PastDueScheduleTask.length;
		return all;
	}, {});
};

/**
 * @description - Maps thru all currently "fetched" records and get's the total number of records.
 * MAY WANT TO CONSIDER SHOWING COUNT BY RESIDENT (ie showing 12 of 12 residents)
 * @param {array} records - An array of Past Due task records.
 */
const getTotalPastDueCount = records => {
	if (isEmptyArray(records)) return 0;
	return records.reduce((all, entry) => {
		const { length } = entry.PastDueScheduleTask;
		all += length;
		return all;
	}, 0);
};

// FETCHING PAST DUE RECORDS
export {
	getCommunityPastDue,
	getDailyPastDue,
	getWeeklyPastDue,
	getMonthlyPastDue
};

export { sortPastDueRecords, countPastDuePerResident, getTotalPastDueCount };
