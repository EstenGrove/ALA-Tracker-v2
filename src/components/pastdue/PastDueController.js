import React from "react";
import styles from "../../css/pastdue/PastDueController.module.scss";
import { PropTypes } from "prop-types";
import { MONTHS, RANGE_TYPES } from "../../helpers/utils_options";
import DropdownSelectSM from "../shared/DropdownSelectSM";

// REQUIREMENTS:
// 1. ENABLE VARIOUS ACTIONS: PRINT(PDF), CHANGE TYPE OF DATA
// 2. ENABLE PAST DUE RANGES: DAILY, WEEKLY, MONTHLY ETC.

const PastDueController = () => {
	return (
		<section className={styles.PastDueController}>
			<h4 className={styles.PastDueController_title}>Options</h4>
			<DropdownSelectSM
				id="range"
				name="range"
				label="Select a Range"
				placeholder="Select Range"
				options={RANGE_TYPES}
			/>
		</section>
	);
};

export default PastDueController;

PastDueController.defaultProps = {};

PastDueController.propTypes = {};
