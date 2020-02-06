import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { isEmptyArray, isEmptyObj } from "../../helpers/utils_types";
import styles from "../../css/dashboard/PastDueView.module.scss";

const PastDueView = ({ history }) => {
	const [pastDueRecords, setPastDueRecords] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className={styles.PastDueView}>
			<h1 className="title">Past Due View</h1>
			<h2 className="subtitle">Coming Soon</h2>
			{/*  */}
		</div>
	);
};

export default PastDueView;

PastDueView.defaultProps = {};

PastDueView.propTypes = {};
