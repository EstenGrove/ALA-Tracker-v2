import { residentData, forTracker } from "./utils_endpoints";
import { test } from "./utils_env";
import { format, isWithinRange } from "date-fns";
import { isEmptyVal, isEmptyObj } from "./utils_types";
import { getUnscheduledTasks } from "./utils_unscheduled";

// defaults to today's date if no date is passed
const getResidentDay = async (token, residentID, weekDate) => {
	let url = test.base + forTracker.byDay;
	url +=
		"?" +
		new URLSearchParams({
			residentId: residentID,
			dayOfWeekDate: weekDate
		});
	try {
		const request = await fetch(url, {
			method: "GET",
			headers: new Headers({
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token
			})
		});
		const response = await request.json();
		if (!response.Data) return response;
		return response.Data;
	} catch (err) {
		console.log("An error occured: " + err);
		return err.message;
	}
};
// gets entire week by passing 0-6 (Sunday-Saturday) value for the week day
const getResidentWeek = async (
	token,
	residentID,
	dayOfWeek = 0,
	weekDate = null
) => {
	let url = test.base + forTracker.byDay;
	url +=
		"?" +
		new URLSearchParams({
			residentId: residentID,
			dayOfWeek: dayOfWeek
		});
	if (weekDate) {
		url += "&dayOfWeekDate=" + weekDate;
	}

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: new Headers({
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token
			})
		});
		const response = await request.json();
		if (!response.Data) return response;
		return response.Data;
	} catch (err) {
		console.log("An error occured: " + err);
		return err.message;
	}
};

const getResidentProfile = async (token, residentID) => {
	let url = test.base + residentData.getProfile;
	url += "?residentId=" + residentID;

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: new Headers({
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token
			})
		});
		const response = await request.json();
		return response;
	} catch (err) {
		console.log("An error occured: " + err);
		return err.message;
	}
};

const getAssessmentCategories = async token => {
	let url = test.base + residentData.getCategories;

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token
			}
		});
		const response = await request.json();
		return response;
	} catch (err) {
		return console.log("An error occured: " + err);
	}
};

// returns an array of LOA entries
// includes the start/end dates, reason & other relevant data
const getResidentLOA = async (token, residentID) => {
	let url = test.base + residentData.getLOA;
	url += "?residentId=" + residentID;

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token
			}
		});
		const response = await request.json();
		return response.Data;
	} catch (err) {
		return console.log("An error occured: " + err);
	}
};

/**
 * @description - Helper that accepts a "LeaveOfAbsence" entry and checks if today is within the leave of absence range.
 * @param {object} loa - An LeaveOfAbsence data object
 * @returns boolean
 */
const isLOA = loa => {
	if (isEmptyObj(loa)) return false;
	if (!isWithinRange(new Date(), loa.LeaveDate, loa.ReturnDate)) return false;
	return true;
};

// FORMATTING DATA (RESIDENT DATA)
const formatResidentSearch = resident => {
	const { FirstName, LastName, ResidentID } = resident;
	return `${FirstName} ${LastName} ~ ALA ID# ${ResidentID}`;
};

const formatCurrentResident = val => {
	if (isEmptyVal(val)) return;
	const first = val.split(" ")[0].trim();
	const last = val.split(" ")[1].trim();
	const id = val.split("~")[1].trim();

	return {
		first: first,
		last: last,
		id: id
	};
};

const parseResidentSelection = resident => {
	if (isEmptyVal(resident)) return;
	const first = resident.split(" ")[0].trim();
	const last = resident.split(" ")[1].trim();
	const id = resident.split("#")[1].trim();

	return {
		first: first,
		last: last,
		id: id
	};
};

const parseAndFindResident = (resident, residents) => {
	const { id } = parseResidentSelection(resident);
	const [active] = residents.filter(x => x.ResidentID === id);
	return active;
};

// FETCHING RESIDENT DATA HELPERS
// token, id and day to fetch data for (ie Sunday = 0, Monday = 1, ...)
const fetchDailyResidentData = async (token, residentID, day = new Date()) => {
	const dayOfWeekDate = format(day, "MM/DD/YYYY");
	const dailyData = await getResidentDay(token, residentID, dayOfWeekDate);
	const profileData = await getResidentProfile(token, residentID);

	return { ...dailyData, ...profileData.Data };
};

// token, id, and startDay (ie start of the desired week)
// ALWAYS STARTS FROM "SUNDAY" (ie. 0)
const fetchWeeklyResidentData = async (token, residentID, startDay = 0) => {
	const weeklyData = await getResidentWeek(token, residentID, startDay);
	const profileData = await getResidentProfile(token, residentID);

	return { ...weeklyData, ...profileData.Data };
};

// params: {token: token, id: ResidentID, day: new Date()}

const mergeDailyResidentData = async (token, residentID, day = new Date()) => {
	const dailyData = await fetchDailyResidentData(token, residentID, day);
	const unscheduledTasks = await getUnscheduledTasks(token, residentID);
	const l_o_a = await getResidentLOA(token, residentID); // leave_of_absence

	const merged = {
		...dailyData,
		UnscheduledTasks: unscheduledTasks,
		LOA: [...l_o_a],
		ResidentId: residentID
	};
	return { ...merged };
};

export {
	getResidentProfile,
	getResidentDay, // forTracker
	getResidentWeek, // forTracker
	getAssessmentCategories,
	getResidentLOA,
	isLOA, // checks for active LOA status
	// formatting utils
	formatCurrentResident, // previous version
	formatResidentSearch,
	parseResidentSelection,
	parseAndFindResident,
	// fetching utils
	fetchDailyResidentData,
	fetchWeeklyResidentData,
	mergeDailyResidentData
};
