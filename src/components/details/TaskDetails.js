import React from "react";
import { PropTypes } from "prop-types";
import { format, isPast } from "date-fns";

import { isEmptyObj } from "../../helpers/utils_types";
import { getCategoryNameFromID } from "../../helpers/utils_categories";
import {
	formatDate,
	formatPastDate,
	checkForPastDue
} from "../../helpers/utils_dates";
import { isScheduledTask } from "../../helpers/utils_scheduled";
import { findStatusNameFromID } from "../../helpers/utils_status";
import styles from "../../css/details/TaskDetails.module.scss";
import sprite from "../../assets/tasks.svg";

import StatusBadge from "../shared/StatusBadge"; // updated component
import Dictaphone from "../shared/Dictaphone";
import Textarea from "../shared/Textarea";
import VoiceRecorder from "../shared/VoiceRecorder";

const TaskDetails = ({ task = {}, children }) => {
	if (isEmptyObj(task)) {
		return <h1>No task found</h1>;
	}
	return (
		<div className={styles.TaskDetails}>
			<section className={styles.TaskDetails_top}>
				<h1 className={styles.TaskDetails_top_title}>{task.ADLCategory}</h1>
				<div className={styles.TaskDetails_top_date}>
					<h6 className={styles.TaskDetails_top_date_label}>DUE DATE</h6>
					<svg className={styles.TaskDetails_top_date_icon}>
						<use xlinkHref={`${sprite}#icon-calendar_today`}></use>
					</svg>
					<h6
						className={styles.TaskDetails_top_date_dateString}
						style={
							isPast(isScheduledTask(task) ? task.TrackDate : task.FollowUpdate)
								? { color: "hsla(352, 70%, 50%, 1)" }
								: null
						}
					>
						{checkForPastDue(task)}
					</h6>
				</div>
			</section>
			<main className={styles.TaskDetails_main}>
				<div className={styles.TaskDetails_main_content}>
					<h4 className={styles.TaskDetails_main_content_label}>Notes</h4>
					<p className={styles.TaskDetails_main_content_notes}>
						{isScheduledTask(task) ? task.TaskDescription : task.Notes}
					</p>
				</div>
				<div className={styles.TaskDetails_main_status}>
					<StatusBadge
						size="SM"
						status={
							isScheduledTask(task)
								? task.TaskStatus
								: findStatusNameFromID(task.AssessmentTaskStatusId)
						}
					>
						{isScheduledTask(task)
							? task.TaskStatus
							: findStatusNameFromID(task.AssessmentTaskStatusId)}
					</StatusBadge>
				</div>
			</main>
			<section className={styles.TaskDetails_addNote}>{children}</section>
		</div>
	);
};

export default TaskDetails;

TaskDetails.defaultProps = {
	task: {}
};
TaskDetails.propTypes = {
	task: PropTypes.object
};
