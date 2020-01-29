import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import {
	UnscheduledSubTaskModel,
	ScheduledSubTaskModel
} from "../../helpers/utils_models";
import { isEmptyArray, isEmptyObj } from "../../helpers/utils_types";
import {
	getSubtaskByShiftID,
	createEmptyScheduledSubtask
} from "../../helpers/utils_subtasks";
import { findTaskRecordByProp } from "../../helpers/utils_tasks";
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

const SubtaskList = ({
	currentUser = {},
	currentResident = {}, // might not be needed
	task = {},
	subtasks = [],
	dispatch
}) => {
	const [subtaskList, setSubtaskList] = useState([...subtasks]);

	const addNewSubtask = (task, currentUser) => {
		const newSubtask = createEmptyScheduledSubtask(task, currentUser);
		console.group("Adding new subtask...");
		console.log("newSubtask", newSubtask);
		console.groupEnd();
		setSubtaskList([newSubtask, ...subtaskList]);
		return dispatch({
			type: "CREATE_SUBTASK"
		});
	};

	if (isEmptyArray(subtasks)) {
		return (
			<section className={styles.SubtaskList}>
				<h4 className={styles.SubtaskList_EMPTY}>No subtasks</h4>
				<ButtonSM handleClick={() => addNewSubtask(task, currentUser)}>
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
				{!isEmptyArray(getSubtaskByShiftID(subtaskList, 1)) &&
					getSubtaskByShiftID(subtaskList, 1).map((subtask, index) => (
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
				{!isEmptyArray(getSubtaskByShiftID(subtaskList, 2)) &&
					getSubtaskByShiftID(subtaskList, 2).map((subtask, index) => (
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
				{!isEmptyArray(getSubtaskByShiftID(subtaskList, 3)) &&
					getSubtaskByShiftID(subtaskList, 3).map((subtask, index) => (
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
	currentResident: {},
	currentUser: {},
	task: {},
	subtasks: []
};

SubtaskList.propTypes = {
	currentResident: PropTypes.object,
	currentUser: PropTypes.object,
	task: PropTypes.object,
	subtasks: PropTypes.arrayOf(PropTypes.object),
	dispatch: PropTypes.func
};
