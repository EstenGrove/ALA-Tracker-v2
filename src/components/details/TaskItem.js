import React, { useState } from "react";
import { PropTypes } from "prop-types";
import styles from "../../css/details/TaskItem.module.scss";
import sprite from "../../assets/tasks.svg";

import { adlIcons } from "../../helpers/utils_styles";
import { findStatusNameFromID } from "../../helpers/utils_status";
import {
	replaceNullWithMsg,
	addEllipsis
} from "../../helpers/utils_processing";
import {
	formatDate,
	isPastDue,
	formatTimeToNow
} from "../../helpers/utils_dates";
import { isEmptyArray, isEmptyVal } from "../../helpers/utils_types";

import ShiftTag from "../shared/ShiftTag";
import StatusBadge from "../shared/StatusBadge";
import SubtaskCount from "./SubtaskCount";
import ShiftList from "./ShiftList";
import { isScheduledTask, hasProp } from "../../helpers/utils_tasks";
import {
	getCategoryNameFromID,
	getCategoryID
} from "../../helpers/utils_categories";

// NEW REQUIREMENTS:
// 1. HANDLES BOTH SCHEDULED AND UNSCHEDULED TASK ITEMS
// 2. LEVERAGE NULLISH COALESCING AND OPTIONAL CHAINING TO HANDLE SWITCHING BETWEEN BOTH

// ## TODOS ##
// FINISH UPDATING COMPONENT TO HANDLE UNSCHEDULED TASKS
// IMPLEMENT "ADD NOTE" MODAL FOR QUICK NOTE ADDING

// checks if scheduled or unscheduled task
// then returns the formatted ADL Category
const getTaskCategory = task => {
	if (isScheduledTask(task)) {
		return replaceNullWithMsg(task.ADLCategory, "None");
	}
	return replaceNullWithMsg(
		getCategoryNameFromID(task.AssessmentCategoryId),
		"Unknown"
	);
};

// returns the task description regardless whether it's a scheduled|unscheduled task item
const getTaskDescription = task => {
	if (hasProp(task, "AssessmentUnscheduleTaskId"))
		return replaceNullWithMsg(task.Notes, "No Description");
	return replaceNullWithMsg(task.Description, "No description");
};

const getTaskStatus = task => {
	return task?.TaskStatus ?? findStatusNameFromID(task.AssessmentTaskStatusId);
};

const checkIsCompleted = task => {
	if (isScheduledTask(task)) {
		return task.TaskStatus === "COMPLETED" || task.IsCompleted ? true : false;
	}
	return findStatusNameFromID(task.AssessmentTaskStatusId) === 2 ||
		task.IsCompleted
		? true
		: false;
};

const getTaskShift = task => {
	if (isScheduledTask(task)) return task?.Shift;
	return "ANY";
};

const TaskItem = ({ viewDetails, addNote, task = {}, values = {} }) => {
	const [isCompleted, setIsCompleted] = useState(checkIsCompleted(task));
	const [pastDue, setPastDue] = useState(isPastDue(task.TrackDate));

	return (
		<article
			className={
				isCompleted || task.IsCompleted
					? styles.TaskItem_isCompleted
					: styles.TaskItem
			}
		>
			<ShiftTag shift={getTaskShift(task)} />
			<section className={styles.TaskItem_inner}>
				{/* ADL CATEGORY - TOP LEFT */}
				<header className={styles.TaskItem_inner_category}>
					<svg
						className={styles.TaskItem_inner_category_icon}
						style={
							adlIcons[
								task?.ADLCategory ??
									getCategoryNameFromID(task?.AssessmentCategoryId)
							].styles
						}
					>
						<use
							xlinkHref={`${sprite}#icon-${
								adlIcons[
									task?.ADLCategory ??
										getCategoryNameFromID(task?.AssessmentCategoryId)
								].icon
							}`}
						></use>
					</svg>
					{/* --- ADL CATEGORY HEADING --- */}
					<h2 className={styles.TaskItem_inner_category_title}>
						{getTaskCategory(task)}
					</h2>
				</header>
				{/* ADL TASK DESCRIPTION - MIDDLE LEFT */}
				<article className={styles.TaskItem_inner_desc}>
					<h2 className={styles.TaskItem_inner_desc_title}>Description</h2>
					<p
						className={styles.TaskItem_inner_desc_text}
						title={getTaskDescription(task)}
					>
						{addEllipsis(getTaskDescription(task), 40)}
					</p>
				</article>
				{/* SHIFT - NOW HANDLES UNSCHEDULED|SCHEDULED */}
				<article className={styles.TaskItem_inner_middle}>
					<StatusBadge
						status={replaceNullWithMsg(getTaskStatus(task), "PENDING")}
						isCompleted={task.IsCompleted}
					>
						{replaceNullWithMsg(getTaskStatus(task), "PENDING")}
					</StatusBadge>
					<section className={styles.TaskItem_inner_middle_shift}>
						<i>
							Shift <b>{replaceNullWithMsg(task?.Shift, "ANY")}</b>
						</i>
					</section>
				</article>
				{/* CORRESPONDS TO SHIFTSUBTASK RECORDS */}
				{/* CORRESPONDS TO SHIFTSUBTASK RECORDS */}
				<article className={styles.TaskItem_inner_bottom}>
					<section className={styles.TaskItem_inner_bottom_left}>
						<h2 className={styles.TaskItem_inner_bottom_title}>
							Subtasks By Shift
						</h2>
						<ShiftList task={task} />
					</section>

					{/* SUB TASKLIST GOES HERE... */}
					{/* SUB TASKLIST GOES HERE... */}
					<section className={styles.TaskItem_inner_bottom_middle}>
						<h2 className={styles.TaskItem_inner_bottom_middle_title}>
							Subtasks
						</h2>
						<SubtaskCount subtasks={task.ShiftTasks} />
					</section>

					{/* DUE DATE- CHECK IS PAST DUE */}
					<section className={styles.TaskItem_inner_bottom_right}>
						<div className={styles.TaskItem_inner_bottom_right_due}>
							<h2 className={styles.TaskItem_inner_bottom_right_due_title}>
								Due Date
							</h2>
							<svg className={styles.TaskItem_inner_bottom_right_due_icon}>
								<use xlinkHref={`${sprite}#icon-event_note`}></use>
							</svg>
							<time className={styles.TaskItem_inner_bottom_right_due_date}>
								{formatDate(task?.TrackDate ?? task?.EntryDate)}
							</time>
							{pastDue && !isCompleted && (
								<span className={styles.red}>
									<b>
										{formatTimeToNow(
											task?.TrackDate ?? task?.EntryDate,
											new Date()
										)}
									</b>{" "}
									Past Due
								</span>
							)}
						</div>
						{/* CLICK ACTIONS FOR ADDING A NOTE AND EDITING/STATUSING A TASK */}
						<div className={styles.TaskItem_inner_bottom_right_menu}>
							<div
								onClick={() => addNote(task)}
								className={styles.TaskItem_inner_bottom_right_menu_action}
							>
								<svg className={styles.TaskItem_inner_bottom_right_menu_icon}>
									<use xlinkHref={`${sprite}#icon-plus21`}></use>
								</svg>
								<span>Add Note</span>
							</div>
							<div
								onClick={viewDetails}
								className={styles.TaskItem_inner_bottom_right_menu_action}
							>
								<svg className={styles.TaskItem_inner_bottom_right_menu_icon}>
									<use xlinkHref={`${sprite}#icon-caret-down`}></use>
								</svg>
								<span>Edit Task</span>
							</div>
						</div>
					</section>
				</article>
			</section>
		</article>
	);
};

export default TaskItem;

TaskItem.defaultProps = {
	task: {},
	values: {}
};

TaskItem.propTypes = {
	// markComplete: PropTypes.func.isRequired, // NO LONGER NEEDED???
	addNote: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
	values: PropTypes.object.isRequired
};
