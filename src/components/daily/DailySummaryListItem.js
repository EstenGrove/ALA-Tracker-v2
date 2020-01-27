import React from "react";
import { PropTypes } from "prop-types";
import {
	isEmptyObj,
	isEmptyArray,
	isEmptyVal
} from "../../helpers/utils_types";
import {
	isCompleted,
	addEllipsis,
	replaceNullWithMsg
} from "../../helpers/utils_processing";
import { getNotesCount } from "../../helpers/utils_taskNotes";
import { hasProp, getTaskID } from "../../helpers/utils_tasks";
import { statusReducer } from "../../helpers/utils_styles";
import { isScheduledTask } from "../../helpers/utils_scheduled";
import styles from "../../css/daily/DailySummaryListItem.module.scss";
import sprite from "../../assets/icon-bar.svg";

// COUNT: should be the # of notes/comments for a given task
// CONSIDER ADDING HELPER FOR GRAB THE TASK NOTES

const getSubtaskCount = task => {
	if (isEmptyObj(task)) return 0;
	if (!isScheduledTask(task)) return 0;
	if (isEmptyArray(task.ShiftTasks)) return 0;
	return task?.ShiftTasks?.length;
};

const getTaskDescription = task => {
	if (hasProp(task, "AssessmentUnscheduleTaskId")) {
		return replaceNullWithMsg(addEllipsis(task.Notes, 30), "No description");
	}
	return replaceNullWithMsg(addEllipsis(task.TaskDescription, 30), "No desc");
};

const DailySummaryListItem = ({ task, notes = [] }) => {
	console.group("<DailySummaryListItem/>");
	console.log("task", task);
	console.log("notes", notes);
	console.log("getNotesCount");
	console.groupEnd();
	return (
		<li
			className={
				isCompleted(task)
					? styles.DailySummaryListItem_isCompleted
					: styles.DailySummaryListItem
			}
			title={task.TaskDescription}
		>
			<section className={styles.DailySummaryListItem_details}>
				<div className={styles.DailySummaryListItem_details_desc}>
					{getTaskDescription(task)}
				</div>
			</section>
			<div className={styles.DailySummaryListItem_item}>
				<div
					title={task.TaskStatus}
					className={styles.DailySummaryListItem_item_status}
					style={replaceNullWithMsg(statusReducer(task.TaskStatus), "PENDING")}
				>
					<div className={styles.DailySummaryListItem_item_status_badge}></div>
				</div>
				{/* # OF SUBTASKS - CHECKMARK ICON */}
				<svg
					className={styles.DailySummaryListItem_item_icon}
					title={`${getSubtaskCount(task)} scheduled subtasks`}
				>
					<use xlinkHref={`${sprite}#icon-check_box`}></use>
				</svg>
				<span
					className={styles.DailySummaryListItem_item_count}
					title={`${getSubtaskCount(task)} scheduled subtasks`}
				>
					{getSubtaskCount(task)}
				</span>

				<svg className={styles.DailySummaryListItem_item_icon}>
					<use xlinkHref={`${sprite}#icon-comments2`}></use>
				</svg>
				{/* WILL BE THE NUMBER OF NOTES FOR A TASK ITEM */}
				<span
					className={styles.DailySummaryListItem_item_count}
					title={`There's ${getNotesCount(task[getTaskID(task)], notes)} notes`}
				>
					{getNotesCount(task[getTaskID(task)], notes)}
				</span>
			</div>
		</li>
	);
};

export default DailySummaryListItem;

DailySummaryListItem.defaultProps = {
	notes: []
};

DailySummaryListItem.propTypes = {
	notes: PropTypes.array
};
