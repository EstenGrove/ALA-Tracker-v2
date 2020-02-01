import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { withRouter, useRouteMatch, NavLink } from "react-router-dom";
import { format } from "date-fns";
import {
	getCount,
	getCompletedCount,
	getPercentage,
	getRemaining
} from "../../helpers/utils_processing";
import { isEmptyArray, isEmptyObj } from "../../helpers/utils_types";
import {
	checkCategoryNaming,
	checkForADLPoints
} from "../../helpers/utils_categories";
import sprite from "../../assets/icon-bar.svg";
import styles from "../../css/daily/DailySummaryCard.module.scss";
import DailySummaryList from "./DailySummaryList";

// ADD TOTAL ADL POINTS FROM ADLCARELEVEL array

const DailySummaryCard = ({
	hasBeenUpdated = false,
	unscheduledTasks = [],
	unscheduledTaskNotes = [],
	scheduledTasks = [],
	scheduledTaskNotes = [],
	currentUser,
	category,
	day,
	menu,
	history
}) => {
	const match = useRouteMatch();

	const [isOpen, setIsOpen] = useState(false);
	const [taskCounts, setTaskCounts] = useState({
		total: scheduledTasks.length,
		complete: getCompletedCount(scheduledTasks, "COMPLETE"),
		pending: getCount(scheduledTasks, "PENDING"),
		missedEvent: getCount(scheduledTasks, "MISSED-EVENT"),
		notComplete: getCount(scheduledTasks, "NOT-COMPLETE"),
		inProgress: getCount(scheduledTasks, "IN-PROGRESS"),
		remaining: getRemaining(scheduledTasks, "COMPLETE") // counts all tasks that are either pending or in-progress
	});

	const [percentages, setPercentages] = useState({
		total: scheduledTasks.length,
		complete: getPercentage(scheduledTasks.length, taskCounts.complete),
		pending: getPercentage(scheduledTasks.length, taskCounts.pending),
		missedEvent: getPercentage(scheduledTasks.length, taskCounts.missedEvent),
		notComplete: getPercentage(scheduledTasks.length, taskCounts.notComplete),
		inProgress: getPercentage(scheduledTasks.length, taskCounts.inProgress)
	});

	useEffect(() => {
		if (hasBeenUpdated) {
			setTaskCounts({
				total: scheduledTasks.length,
				complete: getCompletedCount(scheduledTasks, "COMPLETE"),
				pending: getCount(scheduledTasks, "PENDING"),
				missedEvent: getCount(scheduledTasks, "MISSED-EVENT"),
				notComplete: getCount(scheduledTasks, "NOT-COMPLETE"),
				inProgress: getCount(scheduledTasks, "IN-PROGRESS"),
				remaining: getRemaining(scheduledTasks, "COMPLETE")
			});
			return setPercentages({
				total: scheduledTasks.length,
				complete: getPercentage(scheduledTasks.length, taskCounts.complete),
				pending: getPercentage(scheduledTasks.length, taskCounts.pending),
				missedEvent: getPercentage(
					scheduledTasks.length,
					taskCounts.missedEvent
				),
				notComplete: getPercentage(
					scheduledTasks.length,
					taskCounts.notComplete
				),
				inProgress: getPercentage(scheduledTasks.length, taskCounts.inProgress)
			});
		}
	}, [
		hasBeenUpdated,
		taskCounts.complete,
		taskCounts.inProgress,
		taskCounts.missedEvent,
		taskCounts.notComplete,
		taskCounts.pending,
		scheduledTasks
	]);

	return (
		<NavLink
			to={{
				pathname: `${match.url}/details/${category.AdlCategoryType}`,
				state: {
					currentUser: currentUser,
					category: category
				}
			}}
			style={{ textDecoration: "none" }}
		>
			<div className={styles.DailySummaryCard}>
				<section className={styles.DailySummaryCard_top}>
					<div className={styles.DailySummaryCard_top_date}>
						<h4 className={styles.DailySummaryCard_top_date_adl}>
							{checkCategoryNaming(category.AdlCategoryType)}
						</h4>
						<time className={styles.DailySummaryCard_top_date_title}>
							{format(day, "MMM. Do, YYYY")}
						</time>
					</div>
					<svg
						className={styles.DailySummaryCard_top_icon}
						onClick={() => setIsOpen(!isOpen)}
					>
						<use xlinkHref={`${sprite}#icon-dots-three-horizontal`}></use>
					</svg>
					{/* SIDE MENU */}
					{isOpen && (
						<aside className={styles.DailySummaryCard_menu}>
							<div className={styles.DailySummaryCard_menu_close}>
								<svg
									className={styles.DailySummaryCard_menu_close_icon}
									onClick={() => setIsOpen(!isOpen)}
								>
									<use xlinkHref={`${sprite}#icon-clearclose`}></use>
								</svg>
							</div>
							<NavLink
								to={{
									pathname: `${match.url}/details/${category.AdlCategoryType}`,
									state: {
										currentUser: currentUser,
										category: category
									}
								}}
							>
								View Today's <strong>{category.AdlCategoryType}</strong> Details
							</NavLink>
							<p className={styles.DailySummaryCard_menu_item}>
								Mark all tasks complete
							</p>
						</aside>
					)}
				</section>
				<section className={styles.DailySummaryCard_inner}>
					<div className={styles.DailySummaryCard_inner_tile}>
						<h4 className={styles.DailySummaryCard_inner_tile_heading}>
							Total
						</h4>
						<h4
							className={styles.DailySummaryCard_inner_tile_val}
							value={taskCounts.total}
						>
							{!isEmptyArray(scheduledTasks) ? taskCounts.total : 0}
						</h4>
					</div>
					<div className={styles.DailySummaryCard_inner_tile}>
						<h4 className={styles.DailySummaryCard_inner_tile_heading}>
							Completed
						</h4>
						<h4
							className={styles.DailySummaryCard_inner_tile_val_green}
							value={taskCounts.total}
						>
							{!isEmptyArray(scheduledTasks) ? taskCounts.complete : 0}
						</h4>
					</div>
					<div className={styles.DailySummaryCard_inner_tile}>
						<h4 className={styles.DailySummaryCard_inner_tile_heading}>
							Pending
						</h4>
						<h4
							className={styles.DailySummaryCard_inner_tile_val_red}
							value={taskCounts.total}
						>
							{!isEmptyArray(scheduledTasks) ? taskCounts.pending : 0}
						</h4>
					</div>
					<div className={styles.DailySummaryCard_inner_tile}>
						<h4 className={styles.DailySummaryCard_inner_tile_heading}>
							Total Points
						</h4>
						<h4
							className={styles.DailySummaryCard_inner_tile_val_red}
							value={taskCounts.total}
						>
							{!isEmptyObj(category) ? checkForADLPoints(category) : 0}
						</h4>
					</div>
				</section>
				<section className={styles.DailySummaryCard_tasks}>
					<DailySummaryList
						key="SCHEDULED_TASKS"
						tasks={[...scheduledTasks, ...unscheduledTasks]}
						notes={[...scheduledTaskNotes, ...unscheduledTaskNotes]}
						category={category}
					/>
					{/* <DailySummaryList
					key="UNSCHEDULED_TASKS"
					tasks={unscheduledTasks}
					category={category}
				/> */}
				</section>
			</div>
		</NavLink>
	);
};
export default withRouter(DailySummaryCard);
DailySummaryCard.defaultProps = {
	hasBeenUpdated: false,
	scheduledTasks: [],
	scheduledTaskNotes: [],
	unscheduledTasks: [],
	unscheduledTaskNotes: []
};
DailySummaryCard.propTypes = {
	dispatch: PropTypes.func,
	hasBeenUpdated: PropTypes.bool,
	currentUser: PropTypes.object.isRequired,
	category: PropTypes.object.isRequired,
	day: PropTypes.instanceOf(Date).isRequired,
	scheduledTasks: PropTypes.array,
	scheduledTaskNotes: PropTypes.array,
	unscheduledTasks: PropTypes.array,
	unscheduledTaskNotes: PropTypes.array
};
