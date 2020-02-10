import React from "react";
import styles from "../../css/pastdue/PastDueUpdateForm.module.scss";
import { PropTypes } from "prop-types";

// REQUIREMENTS:
// 1. CURRENT RESIDENT
//    1a. RESIDENT PHOTO???
// 2. "VIEWING JOHN DOE'S PAST DUE" TITLE HEADING
// 3. ALL PAST DUE RECORDS FOR THAT RESIDENT
// 4.

const PastDueUpdateForm = ({ records = [] }) => {
	return (
		<article className={styles.PastDueUpdateForm}>
			{/*  */}
			{/*  */}
			{/*  */}
		</article>
	);
};

export default PastDueUpdateForm;

PastDueUpdateForm.defaultProps = {};

PastDueUpdateForm.propTypes = {
	records: PropTypes.arrayOf(PropTypes.object)
};
