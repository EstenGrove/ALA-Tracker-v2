import React from "react";
import styles from "../../css/dashboard/SettingsView.module.scss";
import { PropTypes } from "prop-types";

const SettingsView = () => {
	return (
		<div className={styles.SettingsView}>
			<h1 className="title">Past Due View</h1>
			<h2 className="subtitle">Coming Soon</h2>
		</div>
	);
};

export default SettingsView;

SettingsView.defaultProps = {};

SettingsView.propTypes = {};
