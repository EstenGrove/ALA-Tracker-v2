import React, { useEffect, useContext } from "react";
import styles from "../../css/dashboard/DailyView.module.scss";
import { PropTypes } from "prop-types";
import { useHistory } from "react-router-dom";
import { GlobalStateContext } from "../../state/GlobalStateContext";

import { findAllTasksByADL } from "../../helpers/utils_scheduled"; // handles ALL tasks (scheduled|unscheduled)
import { adlColors } from "../../helpers/utils_styles";
import { formatReturnDate } from "../../helpers/utils_dates";
import Spinner from "../../components/shared/Spinner";
import ContainerLG from "../../components/shared/ContainerLG";
import Row from "../../components/shared/Row";
import CardSM from "../../components/shared/CardSM";
import DailySummaryCard from "../../components/daily/DailySummaryCard";
import { format } from "date-fns";

// REQUIRED PROPS:
// 1. resident data
// 2. ALL tasks (scheduled/unscheduled)

// ADD PLACEHOLDER FOR EMPTY DATA

const DailyView = props => {
	const history = useHistory();

	const { state } = useContext(GlobalStateContext);
	const { app, user, globals } = state;
	const { isLoading } = app;
	const {
		currentResident,
		scheduledTasks,
		scheduledTaskNotes,
		unscheduledTasks,
		unscheduledTaskNotes,
		trackingTasks,
		categories,
		loa
	} = globals;
	const { isLOA } = currentResident;

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<div className={styles.DailyView}>
			<h1 className={styles.DailyView_title}>Today's Agenda</h1>
			{isLOA && (
				<h2 className={styles.DailyView_LOA}>
					On Leave Of Absence Until {formatReturnDate(loa[0].ReturnDate)}
				</h2>
			)}
			{!isLOA && (
				<ContainerLG>
					<Row rowHeight="auto" rowSpacing="space-evenly" wrapItems="wrap">
						{categories &&
							categories.map((adl, index) => (
								<CardSM
									customStyles={{
										borderTop: `2px solid ${adlColors[adl.AdlCategoryType]}`
									}}
									key={`${adl.AdlId}_${index}`}
								>
									<DailySummaryCard
										key={`${adl.AdlId}_${adl.AdlCategoryId}`}
										scheduledTaskNotes={scheduledTaskNotes}
										scheduledTasks={findAllTasksByADL(
											scheduledTasks,
											adl.AdlCategoryType
										)}
										unscheduledTaskNotes={unscheduledTaskNotes}
										unscheduledTasks={findAllTasksByADL(
											unscheduledTasks,
											adl.AdlCategoryType
										)}
										currentUser={user}
										category={adl}
										day={new Date()}
									/>
								</CardSM>
							))}
					</Row>
				</ContainerLG>
			)}
		</div>
	);
};

export default DailyView;

DailyView.defaultProps = {
	scheduledTasks: [],
	unscheduledTasks: [],
	categories: []
};

DailyView.propTypes = {
	currentResident: PropTypes.object,
	scheduledTasks: PropTypes.arrayOf(PropTypes.object),
	unscheduledTasks: PropTypes.arrayOf(PropTypes.object),
	categories: PropTypes.arrayOf(PropTypes.object)
};
