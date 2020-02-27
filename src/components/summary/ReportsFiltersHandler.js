import React from "react";
import { PropTypes } from "prop-types";
import { SHIFTS } from "../../helpers/utils_options";
import styles from "../../css/summary/ReportsFiltersHandler.module.scss";
import TextInput from "../shared/TextInput";
import CustomDropdown from "../shared/CustomDropdown";

// HANDLES THE FILTERS DROPDOWNS AND LOGIC FOR REPORTS MODELS

const bg_grey = {
	backgroundColor: "#eaecef"
};

const ReportsFiltersHandler = ({
	residents,
	reportVals,
	filterByVal,
	handleSelection,
	handleChange
}) => {
	return (
		<div className={styles.ReportsFiltersHandler}>
			{filterByVal === "By Resident" && (
				<CustomDropdown
					name="sortByResident"
					id="sortByResident"
					placeholder="Select a Resident"
					selection={reportVals.sortByResident}
					setSelection={handleSelection}
					customStyles={bg_grey}
					options={["Ascending", "Descending"]}
				/>
			)}
			{filterByVal === "By Room #" && (
				<section className={styles.ReportsFiltersHandler_byRoom}>
					<TextInput
						name="filterByRoomNumStart"
						id="filterByRoomNumStart"
						placeholder="Begin Room #"
						val={reportVals.filterByRoomNumStart}
						handleChange={handleChange}
					/>
					<TextInput
						name="filterByRoomNumEnd"
						id="filterByRoomNumEnd"
						placeholder="End Room #"
						val={reportVals.filterByRoomNumEnd}
						handleChange={handleChange}
					/>
				</section>
			)}
			{filterByVal === "By Shift" && (
				<CustomDropdown
					name="filterByShift"
					id="filterByShift"
					placeholder="Select Shift"
					selection={reportVals.filterByShift}
					setSelection={handleSelection}
					options={SHIFTS}
				/>
			)}
		</div>
	);
};

export default ReportsFiltersHandler;

ReportsFiltersHandler.defaultProps = {};

ReportsFiltersHandler.propTypes = {
	residents: PropTypes.arrayOf(PropTypes.object),
	reportVals: PropTypes.object.isRequired,
	filterByVal: PropTypes.string,
	handleSelection: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired
};
