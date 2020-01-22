import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { isEmptyArray } from "../../helpers/utils_types";
import { getSubtaskByShiftID } from "../../helpers/utils_subtasks";
import styles from "../../css/details/SubtaskList.module.scss";
import ButtonSM from "../shared/ButtonSM";
import SubtaskItem from "./SubtaskItem";

// FINISH HANDLING SUBTASK UPDATES
// IE. IsCheck, IsCompleted, adding Notes

// CONSIDERATIONS:
// 1. DELETING AND CREATING A SUBTASK SHOULD ONLY BE IN THIS COMPONENT
// 2. ANY SUBTASKITEM LEVEL UPDATES SHOULD BE PUSHED TO THE <SUBTASKITEM/>
// 3. DESPITE ALL OF THE ABOVE THERE ARE INTERDEPENDENCIES
// 4. CONSIDER LIFTING SUBTASK UDPATES FROM <SUBTASKITEM/> IN TO <SUBTASKLIST/>

const SubtaskList = ({ task = {}, subtasks = [], dispatch }) => {
	const addNewSubtask = () => {
		console.log("Adding new subtask");
	};

	useEffect(() => {
		console.group("<SubtaskList/>");
		console.log("task", task);
		console.log("subtasks", subtasks);
		console.groupEnd();
	}, [subtasks, task]);

	if (isEmptyArray(task.ShiftTasks)) {
		return (
			<section className={styles.SubtaskList}>
				<h4 className={styles.SubtaskList_EMPTY}>No subtasks</h4>
				<ButtonSM handleClick={addNewSubtask}>
					<b>+</b> Create Subtask
				</ButtonSM>
			</section>
		);
	}
	return (
		<article className={styles.SubtaskList}>
			{/* AM */}
			<section className={styles.SubtaskList_byShift}>
				<h4 className={styles.SubtaskList_title}>AM</h4>
				{!isEmptyArray(getSubtaskByShiftID(task.ShiftTasks, 1)) &&
					getSubtaskByShiftID(task.ShiftTasks, 1).map((subtask, index) => (
						<SubtaskItem
							dispatch={dispatch}
							key={`${subtask.AssessmentTrackingTaskShiftSubTaskId}_${index}`}
							subtask={subtask}
						/>
					))}
			</section>
			{/* PM */}
			<section className={styles.SubtaskList_byShift}>
				<h4 className={styles.SubtaskList_title}>PM</h4>
				{!isEmptyArray(getSubtaskByShiftID(task.ShiftTasks, 2)) &&
					getSubtaskByShiftID(task.ShiftTasks, 2).map((subtask, index) => (
						<SubtaskItem
							dispatch={dispatch}
							key={`${subtask.AssessmentTrackingTaskShiftSubTaskId}_${index}`}
							subtask={subtask}
						/>
					))}
			</section>
			{/* NOC */}
			<section className={styles.SubtaskList_byShift}>
				<h4 className={styles.SubtaskList_title}>NOC</h4>
				{!isEmptyArray(getSubtaskByShiftID(task.ShiftTasks, 3)) &&
					getSubtaskByShiftID(task.ShiftTasks, 3).map((subtask, index) => (
						<SubtaskItem
							dispatch={dispatch}
							key={`${subtask.AssessmentTrackingTaskShiftSubTaskId}_${index}`}
							subtask={subtask}
						/>
					))}
			</section>
		</article>
	);
};

export default SubtaskList;

SubtaskList.defaultProps = {
	task: {}
};

SubtaskList.propTypes = {
	task: PropTypes.object,
	dispatch: PropTypes.func,
	addNewSubtask: PropTypes.func // create new Subtask, consider handling locally instead of lifting up into parent
};
