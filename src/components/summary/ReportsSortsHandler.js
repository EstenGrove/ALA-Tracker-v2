import React from "react";
import styles from "../../css/summary/ReportsSortsHandler.module.scss";
import { PropTypes } from "prop-types";
import CustomDropdown from "../shared/CustomDropdown";
import { REASONS } from "../../helpers/utils_reportFilters";

// HANDLES THE SORTING DROPDOWNS AND LOGIC FOR REPORTS MODELS

const ReportsSortsHandler = ({ vals, handleSorts }) => {
	return (
		<div className={styles.ReportsSortsHandler}>
			{vals.sortBy === "By Reason" && (
				<CustomDropdown
					name="sortByReason"
					id="sortByReason"
					placeholder="Sort By Reason"
					options={REASONS}
					selection={vals.sortByReason}
					setSelection={handleSorts}
				/>
			)}
			{vals.sortBy === "By Resident" && (
				<CustomDropdown
					name="sortByResident"
					id="sortByResident"
					placeholder="Sort By Resident"
					selection={vals.sortByResident}
					options={["Ascending", "Descending"]}
					setSelection={handleSorts}
				/>
			)}
			{vals.sortBy === "By Shift" && (
				<CustomDropdown
					name="sortByShift"
					id="sortByShift"
					placeholder="Sort By Shift"
					selection={vals.sortByShift}
					options={["Ascending", "Descending"]}
					setSelection={handleSorts}
				/>
			)}
			{vals.sortBy === "By Staff" && (
				<CustomDropdown
					name="sortByStaff"
					id="sortByStaff"
					placeholder="Sort By Staff"
					selection={vals.sortByStaff}
					options={["Ascending", "Descending"]}
					setSelection={handleSorts}
				/>
			)}
		</div>
	);
};

export default ReportsSortsHandler;

ReportsSortsHandler.defaultProps = {};

ReportsSortsHandler.propTypes = {
	vals: PropTypes.object.isRequired,
	handleSorts: PropTypes.func.isRequired
};
