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
import RadioButtonGroup from "../../components/shared/RadioButtonGroup";
import RadioButton from "../../components/shared/RadioButton";
import AreaGraph from "../../components/vendor/AreaGraph";
import BarGraph from "../../components/vendor/BarGraph";
import LineGraph from "../../components/vendor/LineGraph";

const radioGroup = {
	display: "flex",
	justifyContent: "space-evenly",
	alignItems: "center",
	flexWrap: "wrap"
};

const formatDates = (items, prop) => {
	return items.map(item => {
		return {
			...item,
			datMeasured: format(item.datMeasured, "YYYY/MM/DD")
		};
	});
};

const SummaryView = ({
	vals = {},
	handleChange,
	handleCheckbox,
	handleRadio,
	isLoading
}) => {
	const [data, setData] = useState([]);
	const [showPanel, setShowPanel] = useState(true);
	return (
		<section className={styles.SummaryView}>
			<header className={styles.SummaryView_header}>
				<section className={styles.SummaryView_header_top}>
					<div className={styles.SummaryView_header_top_controls}>
						<h1
							className={styles.SummaryView_header_top_controls_title}
							onClick={() => setShowPanel(!showPanel)}
						>
							Reports/Summary
						</h1>
						<svg className={styles.SummaryView_header_top_controls_icon}>
							<use
								xlinkHref={`${sprite}#icon-${
									showPanel ? "arrow_drop_up" : "arrow_drop_down"
								}`}
							></use>
						</svg>
						<svg className={styles.SummaryView_header_top_controls_printIcon}>
							<use xlinkHref={`${sprite}#icon-print1`}></use>
						</svg>
					</div>
					{showPanel && (
						<>
							<h4 className={styles.SummaryView_header_top_title}>
								Filter Reports
							</h4>
							<div className={styles.SummaryView_header_top_checkGroup}>
								<RadioButtonGroup
									groupName="filterType"
									handleRadio={handleRadio}
									customStyles={radioGroup}
								>
									<RadioButton val={vals.byDate} id="byDate" label="By Date" />
									<RadioButton
										val={vals.byShift}
										id="byShift"
										label="By Shift"
									/>
									<RadioButton
										val={vals.byStatus}
										id="byStatus"
										label="By Status"
									/>
									<RadioButton
										val={vals.byResolution}
										id="byResolution"
										label="By Resolution"
									/>
									<RadioButton
										val={vals.byResident}
										id="byResident"
										label="By Resident"
									/>
									<RadioButton
										val={vals.byStaff}
										id="byStaff"
										label="By Staff"
									/>
								</RadioButtonGroup>
							</div>
						</>
					)}
				</section>
				<section
					className={styles.SummaryView_header_reportSelection}
				></section>
			</header>

			<main className={styles.SummaryView_main}>
				<ReportPane isLoading={isLoading} title="Projected/Actual" size="LG">
					{!isEmptyArray(data) && (
						<BarGraph
							xKey="datMeasured"
							yKey="BloodPressureSystolic"
							bar1="BloodPressureSystolic"
							bar2="BloodPressureDystolic"
							data={data}
							tooltip={"BloodPressureSystolic/BloodPressureDystolic"}
						/>
					)}
				</ReportPane>
				{/* <ReportPane isLoading={isLoading} title="Weight" size="HALF">
					{!isEmptyArray(data) && (
						<AreaGraph
							dataProp="WeightMeasured"
							xKey="datMeasured"
							yKey="WeightMeasured"
							data={data}
						/>
					)}
				</ReportPane> */}
				<ReportPane isLoading={isLoading} title="Reports" size="LG">
					{!isEmptyArray(data) && <LineGraph />}
				</ReportPane>
			</main>
		</section>
	);
};

export default SummaryView;

SummaryView.defaultProps = {};

SummaryView.propTypes = {};
