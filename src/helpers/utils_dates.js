import {
	isToday,
	format,
	isPast,
	distanceInWordsToNow,
	differenceInDays,
	distanceInWords,
	startOfDay,
	endOfDay,
	startOfMonth,
	endOfMonth,
	startOfQuarter,
	endOfQuarter,
	subDays
} from "date-fns";
import { isEmptyVal } from "./utils_types";
import { isScheduledTask } from "./utils_tasks";

export const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];

const formatDate = (date = null) => {
	if (!date) return "No date";
	const day = format(date, "ddd");
	const dayDate = format(date, "D");
	const month = format(date, "MMM");
	const year = format(date, "YYYY");
	return `${day}, ${month} ${dayDate} ${year}`;
};

// used specifically for handling the LOA return date.
// DOES NOT accept an actual date but rather a stringifyied date
const formatReturnDate = loaList => {
	const [current] = loaList;
	const { ReturnDate } = current;
	const weekDay = format(new Date(ReturnDate), "ddd"); // dddd for full weekDay
	const month = format(new Date(ReturnDate), "MMMM");
	const day = format(new Date(ReturnDate), "Do");
	const year = format(new Date(ReturnDate), "YYYY");
	return `${weekDay} ${month}, ${day} ${year}`;
};

const formatTime = time => {
	let hours = time.getHours();
	let mins = time.getMinutes();
	let timeOfDay = "AM";
	if (hours > 12) {
		hours = hours - 12;
		timeOfDay = "PM";
	}
	if (mins < 10) {
		mins = "0" + mins;
	}
	return `${hours}:${mins} ${timeOfDay}`;
};

// returns string: 3 days ago, 4 hours ago...
const formatTimeToNow = date => {
	if (!isToday(date)) {
		return `${distanceInWords(date, new Date())}`;
	}
	return "";
};

// returns boolean
const isPastDue = dueDate => {
	if (isPast(dueDate)) return true;
	return false;
};

// return
const formatPastDate = date => {
	if (!isPast(date)) return;
	return `${distanceInWordsToNow(date)} ago`;
};

const formatDifferenceInDays = date => {
	if (!isToday(date)) {
		return `${differenceInDays(date)} days`;
	}
	return "today";
};

// matches day ("Monday", "Tuesday")
const matchDayOfWeek = dateStr => {
	const dayOfWeek = format(new Date(), "dddd");
	if (dayOfWeek === dateStr) {
		return true;
	}
	return false;
};

// matches day & date (ie "Monday" & "12/19/2019")
const matchDayAndDate = (day, dateStr) => {
	const dayOfWeek = format(new Date(), "dddd");
	if (dayOfWeek === day && isToday(dateStr)) {
		return true;
	}
	return false;
};

// returns 0-6 (ie. "Sunday" = 0, "Monday" = 1, ...)
const getZeroBasedDayOfWeek = (day = new Date()) => {
	const dayOfWeek = format(day, "d");
	return dayOfWeek;
};

const checkForPastDue = task => {
	// if unscheduled task
	if (!isScheduledTask(task)) {
		return isPast(task.EntryDate)
			? formatPastDate(task.EntryDate)
			: formatDate(task.EntryDate);
	}
	return isPast(task.TrackDate)
		? formatPastDate(task.TrackDate)
		: formatDifferenceInDays(task.TrackDate);
};

const formatNum = num => {
	if (num < 2 && num.length !== 2) {
		return `0${num}`;
	}
	return num.toString();
};

//////////////////////////////////
////// DATE PICKER HELPERS //////
//////////////////////////////////

// handles "By Month" selection
// deps: months array
const getRangeFromMonth = selection => {
	if (isEmptyVal(selection)) return;
	const mo = selection.split(" ")[0].trim();
	const yr = Number(selection.split(" ")[1].trim());

	const monthIdx = months.indexOf(mo);
	const monthStart = format(
		startOfMonth(new Date(yr, monthIdx, 1)),
		"MM/DD/YYYY"
	);
	const monthEnd = format(endOfMonth(new Date(yr, monthIdx, 1)), "MM/DD/YYYY");
	return {
		startDate: monthStart,
		endDate: monthEnd
	};
};

// handles "By Quarter" selection
const getRangeFromQuarter = selection => {
	if (isEmptyVal(selection)) return;
	const qtr = selection.split(" ")[0].trim();
	const yr = Number(selection.split(" ")[1].trim());
	if (qtr === "Q1") {
		return {
			startDate: format(startOfQuarter(new Date(yr, 0, 1)), "MM/DD/YYYY"),
			endDate: format(endOfQuarter(new Date(yr, 0, 1)), "MM/DD/YYYY")
		};
	}
	if (qtr === "Q2") {
		return {
			startDate: format(startOfQuarter(new Date(yr, 3, 1)), "MM/DD/YYYY"),
			endDate: format(endOfQuarter(new Date(yr, 3, 1)), "MM/DD/YYYY")
		};
	}
	if (qtr === "Q3") {
		return {
			startDate: format(startOfQuarter(new Date(yr, 6, 1)), "MM/DD/YYYY"),
			endDate: format(endOfQuarter(new Date(yr, 6, 1)), "MM/DD/YYYY")
		};
	}
	if (qtr === "Q4") {
		return {
			startDate: format(startOfQuarter(new Date(yr, 9, 1)), "MM/DD/YYYY"),
			endDate: format(endOfQuarter(new Date(yr, 9, 1)), "MM/DD/YYYY")
		};
	}
	throw new Error("❌ Oops. Invalid quarter given", qtr);
};

// handles "Last 30 Days" selection
const getRangeFromLast30Days = () => {
	return {
		startDate: format(subDays(new Date(), 30), "MM/DD/YYYY"),
		endDate: format(new Date(), "MM/DD/YYYY")
	};
};

// handles "Specific Date" selection
const getRangeFromDate = selection => {
	if (isEmptyVal(selection)) return;
	return {
		startDate: format(startOfDay(selection), "MM/DD/YYYY"),
		endDate: format(endOfDay(selection), "MM/DD/YYYY")
	};
};

// converts dates for the reports' model params
const getStartAndEndDates = vals => {
	switch (vals.reportRangeType) {
		case "Last 30 days": {
			const { startDate, endDate } = getRangeFromLast30Days();
			return {
				...vals,
				startDate,
				endDate
			};
		}
		case "By Month": {
			const { startDate, endDate } = getRangeFromMonth(vals.byMonth);
			return {
				...vals,
				startDate,
				endDate
			};
		}
		case "By Quarter": {
			const { startDate, endDate } = getRangeFromQuarter(vals.byQuarter);
			return {
				...vals,
				startDate,
				endDate
			};
		}
		case "Specific Date": {
			const { startDate, endDate } = getRangeFromDate(vals.byDate);
			return {
				...vals,
				startDate,
				endDate
			};
		}
		case "Custom Date Range": {
			return { ...vals };
		}
		default:
			throw new Error("❌ Oops. Invalid date range type", vals.reportRangeType);
	}
};

// PARSE QUARTER AND PARSE MONTH ARE *NOT* NEEDED
// THEY'RE CLONES OF THE "GETRANGEFROM*" HELPERS
const parseQuarter = selection => {
	if (isEmptyVal(selection)) return;
	const qtr = selection.split(" ")[0].trim();
	const yr = Number(selection.split(" ")[1].trim());
	if (qtr === "Q1") {
		return {
			startDate: format(startOfQuarter(new Date(yr, 0, 1)), "MM/DD/YYYY"),
			endDate: format(endOfQuarter(new Date(yr, 0, 1)), "MM/DD/YYYY")
		};
	}
	if (qtr === "Q2") {
		return {
			startDate: format(startOfQuarter(new Date(yr, 3, 1)), "MM/DD/YYYY"),
			endDate: format(endOfQuarter(new Date(yr, 3, 1)), "MM/DD/YYYY")
		};
	}
	if (qtr === "Q3") {
		return {
			startDate: format(startOfQuarter(new Date(yr, 6, 1)), "MM/DD/YYYY"),
			endDate: format(endOfQuarter(new Date(yr, 6, 1)), "MM/DD/YYYY")
		};
	}
	if (qtr === "Q4") {
		return {
			startDate: format(startOfQuarter(new Date(yr, 9, 1)), "MM/DD/YYYY"),
			endDate: format(endOfQuarter(new Date(yr, 9, 1)), "MM/DD/YYYY")
		};
	}
	throw new Error("❌ Oops. Invalid quarter given", qtr);
};

const parseMonth = selection => {
	if (isEmptyVal(selection)) return;
	const mo = selection.split(" ")[0].trim();
	const yr = Number(selection.split(" ")[1].trim());

	const monthIdx = months.indexOf(mo);
	const monthStart = format(
		startOfMonth(new Date(yr, monthIdx, 1)),
		"MM/DD/YYYY"
	);
	const monthEnd = format(endOfMonth(new Date(yr, monthIdx, 1)), "MM/DD/YYYY");
	return {
		startDate: monthStart,
		endDate: monthEnd
	};
};

export {
	formatNum,
	formatReturnDate,
	formatDate,
	formatTime,
	formatTimeToNow,
	isPastDue,
	formatPastDate,
	formatDifferenceInDays,
	matchDayOfWeek,
	matchDayAndDate,
	getZeroBasedDayOfWeek,
	checkForPastDue
};

//////////////////////////////////
////// DATE PICKER HELPERS //////
//////////////////////////////////

export {
	getRangeFromDate,
	getRangeFromLast30Days,
	getRangeFromMonth,
	getRangeFromQuarter,
	getStartAndEndDates,
	// parsing date selections
	parseQuarter,
	parseMonth
};
