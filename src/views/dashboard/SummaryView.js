import React, { useEffect } from "react";
import styles from "../../css/dashboard/SummaryView.module.scss";
import { PropTypes } from "prop-types";
import { GlobalStateContext } from "../../state/GlobalStateContext";
import ReportPane from "../../components/summary/ReportPane";
import ReportsMirror from "../../components/summary/ReportsMirror";
import ReportsHandler from "../../components/summary/ReportsHandler";
import { useContext } from "react";
import { isEmptyVal, isEmptyObj } from "../../helpers/utils_types";

const SummaryView = () => {
	const { state, dispatch } = useContext(GlobalStateContext);
	const { app, user, globals, reports } = state;
	const { currentReport, recentlyViewed } = reports;
	const { residents } = globals;

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<section className={styles.SummaryView}>
			<ReportsHandler
				title="Create a Report"
				currentUser={user}
				residents={residents}
				dispatch={dispatch}
			/>
			<ReportPane title="Report">
				<ReportsMirror
					src={currentReport.src}
					isLoading={app.isLoading}
					status={
						!isEmptyObj(currentReport.registry)
							? currentReport.registry.Status
							: ""
					}
				/>
			</ReportPane>
		</section>
	);
};

export default SummaryView;

SummaryView.defaultProps = {};

SummaryView.propTypes = {};
