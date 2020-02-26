import React, { useState } from "react";
import styles from "../../css/dashboard/SummaryView.module.scss";
import { PropTypes } from "prop-types";
import { format } from "date-fns";
import {
	isEmptyArray,
	isEmptyVal,
	isEmptyObj
} from "../../helpers/utils_types";
import sprite from "../../assets/buttons.svg";
import ReportPane from "../../components/summary/ReportPane";
import ReportsMirror from "../../components/summary/ReportsMirror";
import ReportsHandler from "../../components/summary/ReportsHandler";

const SummaryView = ({
	vals = {},
	facilityID,
	residents = [],
	handleChange,
	handleCheckbox,
	handleRadio,
	isLoading
}) => {
	const [data, setData] = useState([]);
	const [showPanel, setShowPanel] = useState(true);
	return (
		<section className={styles.SummaryView}>
			<ReportsHandler
				title="Create a Report"
				facilityID={facilityID}
				residents={residents}
			/>
			<ReportPane title="Report">
				<ReportsMirror />
			</ReportPane>
		</section>
	);
};

export default SummaryView;

SummaryView.defaultProps = {};

SummaryView.propTypes = {};
