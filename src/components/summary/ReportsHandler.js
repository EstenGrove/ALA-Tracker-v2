import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { themeColors } from "../../helpers/utils_styles";
import { isEmptyVal, isEmptyArray } from "../../helpers/utils_types";
import { ALERTS_MODEL } from "../../helpers/utils_alerts";
import {
	createReportDescription,
	checkForRange
} from "../../helpers/utils_validation";
import {
	REPORTS,
	FILTERS,
	SORTS,
	DATE_RANGE_TYPES as RANGE_TYPES
} from "../../helpers/utils_options";
import {
	getNonEmptyValues,
	getReportType,
	createReportModel,
	createReportMirror
} from "../../helpers/utils_reports";
import {
	saveFile,
	downloadFile,
	createFileURL,
	initReportMirror
} from "../../helpers/utils_downloads";
import { getStartAndEndDates } from "../../helpers/utils_dates";
import { getReportInfo, executeReport } from "../../helpers/utils_reports";
import styles from "../../css/summary/ReportsHandler.module.scss";
import sprite from "../../assets/carets-arrows.svg";
// SHARED COMPONENTS
import CustomDropdown from "../shared/CustomDropdown";
import LoadingButton from "../shared/LoadingButton";
import Dialog from "../shared/Dialog";
import AlertsNotifier from "../shared/AlertsNotifier";
// REPORT/SUMMARY COMPONENTS
import ReportsDateHandler from "./ReportsDateHandler";
import ReportsFiltersHandler from "./ReportsFiltersHandler";
import ReportsSortsHandler from "./ReportsSortsHandler";

const alerts = {
	...ALERTS_MODEL,
	ERROR: {
		heading: "Error",
		subheading: "Please finish filling out the form."
	}
};

// CUSTOM STYLES - BUTTONS
const loadBtn = {
	marginTop: "2rem",
	borderRadius: "5rem",
	alignItems: "flex-end",
	backgroundColor: themeColors.main.green
};
const clearBtn = {
	marginTop: "2rem",
	marginRight: "1rem",
	backgroundColor: themeColors.main.red,
	borderRadius: "5rem"
};
const cancelBtn = {
	backgroundColor: "transparent",
	color: themeColors.main.blackBlue,
	border: "1px solid #ccc",
	marginRight: "1.5rem"
};
const confirmBtn = {
	backgroundColor: themeColors.main.main,
	border: "1px solid #ccc"
};
const bg_grey = {
	backgroundColor: "#eaecef"
};

// initial input values
const initialValState = {
	reportType: "",
	reportRangeType: "",
	byQuarter: "",
	byMonth: "",
	byDate: "",
	byDateRange: "",
	startDate: "",
	endDate: "",
	filterBy: "",
	sortBy: "",
	filterByShift: "",
	filterByResolution: "",
	filterByRoomNum: "",
	sortByResident: "",
	sortByReason: "",
	sortByShift: "",
	sortByStaff: "",
	sortByTimeStamp: ""
};

// ** TODOS **
// 1. VALIDATE & PERFORM SAFE CHECKS WHEN "CREATE REPORT" BUTTON IS CLICKED

const ReportsHandler = ({ title, dispatch, currentUser, residents }) => {
	const [reportIsLoading, setReportIsLoading] = useState(false); // when requesting/download report
	// shows confirmation dialog box
	const [showConfirm, setShowConfirm] = useState(false);
	// shows alert message if form is NOT valid
	const [triggerAlert, setTriggerAlert] = useState(false);
	const [alertType, setAlertType] = useState("ERROR");
	const [reportDesc, setReportDesc] = useState("");
	const [showReportOptions, setShowReportOptions] = useState(true);

	const [reportVals, setReportVals] = useState({
		// base selections
		reportType: "",
		reportRangeType: "",
		// reportRangeType(s)
		byLast30: "",
		byQuarter: "",
		byMonth: "",
		byDate: "",
		byDateRange: "",
		startDate: "",
		endDate: "",
		// sorts/filters
		filterBy: "",
		sortBy: "",
		// sort/filter selections
		filterByShift: "",
		filterByResolution: "",
		filterByRoomNum: "", // room #
		sortByResident: "", // asc/desc
		sortByReason: "", // custom choice
		sortByShift: "",
		sortByStaff: "", // asc/desc
		sortByTimeStamp: "" // asc/desc
	});

	// primary handler for <CustomDropdown/>'s
	const handleReportVals = (name, option) => {
		return setReportVals({
			...reportVals,
			[name]: option
		});
	};
	// "onChange" handler for text inputs.
	const handleChange = e => {
		const { name, value } = e.target;
		setReportVals({
			...reportVals,
			[name]: value
		});
	};
	// handles manually clearing reportVals state
	const handleReset = e => {
		e.preventDefault();
		setReportVals({ ...initialValState });
	};
	// date handler
	const handleDate = date => {
		// if empty, then set to empty string
		if (isEmptyVal(date)) {
			return setReportVals({
				...reportVals,
				byDate: ""
			});
			// extract start and end dates and set state
		} else {
			const { startDate, endDate } = getStartAndEndDates({
				...reportVals,
				byDate: date
			});
			return setReportVals({
				...reportVals,
				byDate: date,
				startDate,
				endDate
			});
		}
	};
	// month handler
	const handleMonth = month => {
		setReportVals({
			...reportVals,
			byMonth: month
		});
	};
	// quarter handler
	const handleQuarter = quarter => {
		setReportVals({
			...reportVals,
			byQuarter: quarter
		});
	};

	const handleDateRange = ({ startDate, endDate }) => {
		setReportVals({
			...reportVals,
			startDate,
			endDate
		});
	};

	const resolveReport = async model => {
		const reportName = getReportType(reportVals);
		setReportIsLoading(true);
		const fileRegistry = await executeReport(
			currentUser.token,
			reportName,
			model,
			"PDF"
		);
		console.log("fileRegistry", fileRegistry);
		if (!isEmptyArray(fileRegistry)) {
			dispatch({
				type: "GET_REPORT",
				data: {
					registry: fileRegistry[0]
				}
			});
			const urlMirror = await initReportMirror(
				currentUser.token,
				fileRegistry[0].FileRegistryID,
				fileRegistry[0].FileName
			);
			return dispatch({
				type: "INIT_MIRROR",
				data: {
					src: urlMirror
				}
			});
		}
		return fileRegistry;
	};

	// cancel report request
	const cancelReportRequest = e => {
		e.preventDefault();
		setShowConfirm(false);
		console.log("CANCELLING REPORT REQUEST...");
	};
	const confirmReportRequest = e => {
		e.preventDefault();
		const model = createReportModel({
			...reportVals,
			facilityID: currentUser.facilityID
		});
		const reportData = resolveReport(model);
		dispatch({
			type: "REQUEST_REPORT",
			data: {
				reportModel: model
			}
		});
		setShowConfirm(false);
	};

	const createDateRange = reportVals => {
		if (isEmptyVal(reportVals.reportRangeType)) return;
		const { startDate, endDate } = getStartAndEndDates(reportVals);

		return {
			startDate,
			endDate
		};
	};

	// SANITIZE, CREATE MODEL, TRIGGER CONFIRMATION, RUN REPORT
	const sanitizeAndGetModel = reportVals => {
		const { startDate, endDate } = createDateRange(reportVals);
		const sanitized = getNonEmptyValues({
			reportVals,
			facilityID: currentUser.facilityID,
			startDate: startDate,
			endDate: endDate
		});
		const model = createReportModel(sanitized);
		return {
			sanitized: sanitized,
			model: model
		};
	};

	// checks for date range
	// if has date selection, then creates the start/end dates,
	// creates description,
	// opens confirmation
	// if no date selection, then show dispatches alert message
	const handleFormValidation = e => {
		e.preventDefault();
		if (!isEmptyVal(reportVals.startDate) && !isEmptyVal(reportVals.endDate)) {
			const { sanitized } = sanitizeAndGetModel(reportVals);
			setReportDesc(createReportDescription(sanitized));
			return setShowConfirm(true);
			// NEED TO CHECK THE DATE RANGE TYPE'S VALUE
		} else if (
			!isEmptyVal(reportVals.reportRangeType) &&
			!isEmptyVal(checkForRange(reportVals))
		) {
			const { startDate, endDate } = getStartAndEndDates(reportVals);
			setReportVals({
				...reportVals,
				startDate,
				endDate
			});
			const sanitized = getNonEmptyValues({
				facilityID: currentUser.facilityID,
				...reportVals
			});
			setReportDesc(createReportDescription(sanitized));
			return setShowConfirm(true);
		} else {
			return dispatchAlert(false);
		}
	};

	// handles submitting the HTTP request to the server
	const requestCustomReport = e => {
		e.preventDefault();
		handleFormValidation(e);
	};

	const dispatchAlert = isValid => {
		if (isValid) {
			// IF VALID DON'T DISPATCH ALERT, SHOW CONFIRMATION DIALOG
			setShowConfirm(true);
			setTriggerAlert(false);
		} else {
			// SHOW ERROR ALERT
			setAlertType("ERROR");
			setTriggerAlert(true);
		}
	};

	// handles styles for the report type display
	const typeHandler = () => {
		if (reportVals.reportType === "Completion Report") {
			return { color: themeColors.main.green };
		}
		return { color: themeColors.main.red };
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		// fetches report data on inital load
		const getReportData = async () => {
			const { token, facilityID } = currentUser;
			const reportData = await getReportInfo(token, facilityID);
			return reportData;
		};

		getReportData();
		return () => {
			isMounted = false;
		};
	}, [currentUser]);

	return (
		<>
			<article className={styles.ReportsHandler}>
				<section
					className={styles.ReportsHandler_top}
					onClick={() => setShowReportOptions(!showReportOptions)}
				>
					<h2 className={styles.ReportsHandler_top_title}>{title}</h2>
					<svg className={styles.ReportsHandler_top_icon}>
						<use
							xlinkHref={`${sprite}#icon-${
								showReportOptions ? "caret-down" : "caret-up"
							}`}
						></use>
					</svg>
				</section>
				<section className={styles.ReportsHandler_selection}>
					<h2 className={styles.ReportsHandler_selection_value}>
						{!isEmptyVal(reportVals.reportType)
							? "You've requested a "
							: "Please select a report"}{" "}
						<b style={typeHandler()}>{reportVals.reportType}</b>
					</h2>
				</section>
				{showReportOptions && (
					<section className={styles.ReportsHandler_handler}>
						<form className={styles.ReportsHandler_handler_form}>
							{/* REPORT TYPE */}
							<div className={styles.ReportsHandler_handler_form_item}>
								<CustomDropdown
									name="reportType"
									id="reportType"
									placeholder="Select Report Type"
									options={REPORTS}
									customStyles={bg_grey}
									selection={reportVals.reportType}
									setSelection={handleReportVals}
								/>
							</div>
							{/* DATE RANGE TYPE */}
							<div className={styles.ReportsHandler_handler_form_item}>
								{!isEmptyVal(reportVals.reportType) && (
									<CustomDropdown
										name="reportRangeType"
										id="reportRangeType"
										placeholder="Pick a range"
										options={RANGE_TYPES}
										customStyles={bg_grey}
										selection={reportVals.reportRangeType}
										setSelection={handleReportVals}
									/>
								)}
							</div>
							{/* DATES HANDLER */}
							<div className={styles.ReportsHandler_handler_form_item}>
								<ReportsDateHandler
									reportVals={reportVals}
									dateRangeVals={reportVals}
									dateRangeHandler={handleDateRange}
									dateHandler={handleDate}
									monthHandler={handleMonth}
									quarterHandler={handleQuarter}
								/>
							</div>
							<section className={styles.ReportsHandler_handler_form_filters}>
								<hr className="divider" />
								{!isEmptyVal(reportVals.reportRangeType) && (
									<>
										<h4
											className={styles.ReportsHandler_handler_form_item_title}
										>
											Filters <i>(optional)</i>
										</h4>
										<CustomDropdown
											name="filterBy"
											id="filterBy"
											placeholder="Select a filter"
											selection={reportVals.filterBy}
											options={FILTERS}
											setSelection={handleReportVals}
										/>
									</>
								)}
							</section>
							<section
								className={styles.ReportsHandler_handler_form_filterOptions}
							>
								<ReportsFiltersHandler
									reportVals={reportVals}
									filterByVal={reportVals.filterBy}
									handleChange={handleChange}
									handleSelection={handleReportVals}
									residents={residents}
								/>
							</section>
							<section className={styles.ReportsHandler_handler_form_filters}>
								{!isEmptyVal(reportVals.reportRangeType) && (
									<>
										<hr className="divider" />
										<h4
											className={styles.ReportsHandler_handler_form_item_title}
										>
											Sorting <i>(optional)</i>
										</h4>
										<CustomDropdown
											name="sortBy"
											id="sortBy"
											placeholder="Add Sorting"
											selection={reportVals.sortBy}
											options={SORTS}
											setSelection={handleReportVals}
										/>
									</>
								)}
							</section>
							{/* SORTING OPTIONS */}
							<section
								className={styles.ReportsHandler_handler_form_filterOptions}
							>
								{!isEmptyVal(reportVals.sortBy) && (
									<ReportsSortsHandler
										vals={reportVals}
										handleSorts={handleReportVals}
									/>
								)}
							</section>
							<section className={styles.ReportsHandler_handler_form_controls}>
								<LoadingButton
									ms={0}
									customStyles={clearBtn}
									handleClick={handleReset}
								>
									<span>Clear Settings</span>
								</LoadingButton>
								<LoadingButton
									ms={0}
									customStyles={loadBtn}
									handleClick={requestCustomReport}
									isDisabled={false} // depends on user selections
								>
									<span>Create Report</span>
								</LoadingButton>
							</section>
						</form>
					</section>
				)}
			</article>

			<AlertsNotifier
				triggerAlert={triggerAlert}
				resetTrigger={setTriggerAlert}
				type={alertType}
				alerts={alerts}
			/>

			{showConfirm && (
				<Dialog
					title="Confirm Report"
					heading="Notice"
					subheading={reportDesc + `. Is this correct? `}
					icon="REPORT"
					closeModal={() => setShowConfirm(false)}
				>
					<LoadingButton
						ms={0}
						handleClick={cancelReportRequest}
						customStyles={cancelBtn}
					>
						<span>Cancel</span>
					</LoadingButton>
					<LoadingButton
						ms={5000}
						handleClick={confirmReportRequest}
						customStyles={confirmBtn}
					>
						<span>Yes, Create Report</span>
					</LoadingButton>
				</Dialog>
			)}
		</>
	);
};

export default ReportsHandler;

ReportsHandler.defaultProps = {
	residents: []
};

ReportsHandler.propTypes = {
	title: PropTypes.string,
	currentUser: PropTypes.object.isRequired,
	residents: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired
};
