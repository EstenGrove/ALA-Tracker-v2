import React from "react";
import styles from "../../css/dashboard/PastDueView.module.scss";
import { PropTypes } from "prop-types";

const PastDueView = ({ history }) => {
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
