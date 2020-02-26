import React, { useState } from "react";
import styles from "../../css/dashboard/SummaryView.module.scss";
import { PropTypes } from "prop-types";
import { GlobalStateContext } from "../../state/GlobalStateContext";
import sprite from "../../assets/buttons.svg";
import ReportPane from "../../components/summary/ReportPane";
import ReportsMirror from "../../components/summary/ReportsMirror";
import ReportsHandler from "../../components/summary/ReportsHandler";
import { useContext } from "react";

const SummaryView = () => {
	const { state, dispatch } = useContext(GlobalStateContext);
	const { user, globals, reports } = state;
	const { residents } = globals;

	return (
		<section className={styles.SummaryView}>
			<ReportsHandler
				title="Create a Report"
				currentUser={user}
				residents={residents}
				dispatch={dispatch}
			/>
			<ReportPane title="Report">
				<ReportsMirror src={reports.src} />
			</ReportPane>
		</section>
	);
};

export default SummaryView;

SummaryView.defaultProps = {};

SummaryView.propTypes = {};
