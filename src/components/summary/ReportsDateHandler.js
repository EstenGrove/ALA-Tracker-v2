import React from "react";
import styles from "../../css/summary/ReportsDateHandler.module.scss";
import { PropTypes } from "prop-types";
import DatePickerSM from "../shared/DatePickerSM";
import MonthPicker from "../shared/MonthPicker";
import QuarterPicker from "../shared/QuarterPicker";
import DateRangePickerSM from "../shared/DateRangePickerSM";

const ReportsDateHandler = ({
	reportVals,
	monthHandler,
	quarterHandler,
	dateHandler,
	dateRangeHandler,
	dateRangeVals
}) => {
	return (
		<section className={styles.ReportsDateHandler}>
			{reportVals.reportRangeType === "By Month" && (
				<MonthPicker
					name="byMonth"
					id="byMonth"
					placeholder="Select a month"
					val={reportVals.byMonth}
					handleMonth={monthHandler}
					focusMode={true}
				/>
			)}
			{reportVals.reportRangeType === "By Quarter" && (
				<QuarterPicker
					name="byQuarter"
					id="byQuarter"
					placeholder="Select a quarter"
					val={reportVals.byQuarter}
					handleQuarter={quarterHandler}
					focusMode={true}
				/>
			)}
			{reportVals.reportRangeType === "Specific Date" && (
				<DatePickerSM
					name="byDate"
					id="byDate"
					placeholder="Select a date"
					val={reportVals.byDate}
					handleDate={dateHandler}
					focusMode={true}
				/>
			)}
			{reportVals.reportRangeType === "Custom Date Range" && (
				<DateRangePickerSM
					startName="startDate"
					endName="endDate"
					rangeVals={dateRangeVals}
					handleSelection={dateRangeHandler}
					focusMode={true}
				/>
			)}
		</section>
	);
};

export default ReportsDateHandler;

ReportsDateHandler.defaultProps = {};

ReportsDateHandler.propTypes = {
	reportVals: PropTypes.object.isRequired,
	dateRangeVals: PropTypes.object.isRequired,
	monthHandler: PropTypes.func.isRequired,
	quarterHandler: PropTypes.func.isRequired,
	dateHandler: PropTypes.func.isRequired,
	dateRangeHandler: PropTypes.func.isRequired
};
