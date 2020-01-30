import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import {
	UnscheduledSubTaskModel,
	ScheduledSubTaskModel
} from "../../helpers/utils_models";
import { isEmptyArray, isEmptyObj } from "../../helpers/utils_types";
import {
	getSubtaskByShiftID,
	createEmptyScheduledSubtask,
	removeItemByProp,
	getSubtaskDetails
} from "../../helpers/utils_subtasks";
import { findTaskRecordByProp } from "../../helpers/utils_tasks";
import styles from "../../css/details/SubtaskList.module.scss";
import ButtonSM from "../shared/ButtonSM";
import SubtaskItem from "./SubtaskItem";
import ConfirmationModal from "../shared/ConfirmationModal";

// FINISH HANDLING SUBTASK UPDATES
// IE. IsCheck, IsCompleted, adding Notes

// CONSIDERATIONS:
// 1. DELETING AND CREATING A SUBTASK SHOULD ONLY BE IN THIS COMPONENT
// 2. ANY SUBTASKITEM LEVEL UPDATES SHOULD BE PUSHED TO THE <SUBTASKITEM/>
// 3. DESPITE ALL OF THE ABOVE THERE ARE INTERDEPENDENCIES
// 4. CONSIDER LIFTING SUBTASK UDPATES FROM <SUBTASKITEM/> IN TO <SUBTASKLIST/>

const SubtaskList = ({
	currentUser = {},
	task = {},
	subtasks = [],
	dispatch
}) => {
	const [subtaskList, setSubtaskList] = useState([...subtasks]);
	const [activeSubtask, setActiveSubtask] = useState({});
	const [showConfirmation, setShowConfirmation] = useState(false);

	// finish implementing and testing
	const addNewSubtask = (task, currentUser) => {
		const newSubtask = createEmptyScheduledSubtask(task, currentUser);
		console.group("Adding new subtask...");
		console.log("newSubtask", newSubtask);
		console.groupEnd();
		setSubtaskList([newSubtask, ...subtaskList]);
		return dispatch({
			type: "CREATE_SUBTASK",
			data: {
				newSubtask: newSubtask
			}
		});
	};

	const openConfirmation = subtask => {
		if (isEmptyObj(subtask)) return;
		setShowConfirmation(true);
		setActiveSubtask(subtask);
		console.log("OPEN CONFIRMATION DIALOG SUCCESSFUL...");
		console.log("SUBTASK FROM CONFIRMATION", subtask);
		// return deleteSubtask(subtask);
	};

	// HANDLES REMOVING FROM SUBTASKLIST
	// DISPATCHES ACTION TO GLOBAL STORE
	// SUBMITTING TO SERVER FOR UPDATE
	const deleteSubtask = () => {
		if (isEmptyObj(activeSubtask)) return;
		const { AssessmentTrackingTaskShiftSubTaskId: id } = activeSubtask;
		setShowConfirmation(false);
		setSubtaskList([
			...removeItemByProp(
				id,
				subtaskList,
				"AssessmentTrackingTaskShiftSubTaskId"
			)
		]);
		// return dispatch({
		// 	type: "DELETE_SUBTASK",
		// 	data: {
		// 		updatedSubtaskList: subtaskList
		// 	}
		// });
	};

	console.log("subtaskList", subtaskList);

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
		<>
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
								deleteSubtask={() => openConfirmation(subtask)}
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
								deleteSubtask={() => openConfirmation(subtask)}
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
								deleteSubtask={() => openConfirmation(subtask)}
							/>
						))}
				</section>
			</article>

			{showConfirmation && (
				<ConfirmationModal
					handleConfirmation={() => deleteSubtask(activeSubtask)}
					closeModal={() => setShowConfirmation(false)}
					confirmText="Yes, delete item"
					cancelText="No, cancel"
					icon="delete"
					msg={
						<h1>
							Are you sure you want to <b>delete</b> this item?
						</h1>
					}
				>
					<p className={styles.SubtaskList_activeSubtask}>
						Subtask: {getSubtaskDetails(activeSubtask)}
					</p>
				</ConfirmationModal>
			)}
		</>
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
