import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useForm } from "../../utils/useForm";
import { useCounter } from "../../utils/useCounter";
import styles from "../../css/details/TasksPanel.module.scss";
import sprite2 from "../../assets/buttons.svg";
import StatefulButton from "../shared/StatefulButton";
import Modal from "../shared/Modal";
import AppliedFilters from "./AppliedFilters";
import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import SubtaskList from "./SubtaskList";
import EditTaskForm from "./EditTaskForm";
import { findRecordAndUpdate } from "../../helpers/utils_updates";
import {
	updateCareTaskRecord,
	findCareTaskRecord
} from "../../helpers/utils_careTasks";
import { createSubtaskVals } from "../../helpers/utils_subtasks";
import { updateTrackingTasks } from "../../helpers/utils_scheduled";

const btnStyles = {
	backgroundColor: "hsla(170, 100%, 39%, 1)",
	color: "#ffffff"
};

// PROPS REQUIREMENTS:
// [x] dispatch: for pushing task updates
// [x] scheduledTaskUpdateCount: count of tasks to be updated - PROBABLY CAN REMOVE AND MAKE IT LOCAL STATE
// [x] trackingTasks: used for updates when matching records

const TasksPanel = ({
	dispatch,
	scheduledTasksUpdateCount = 0, // this will likely be changed.
	scheduledTasks,
	trackingTasks,
	currentUser,
	currentResident
}) => {
	const [tasks, setTasks] = useState([...scheduledTasks]);
	const [showAppliedFilters, setShowAppliedFilters] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeTask, setActiveTask] = useState({});
	// CUSTOM HOOKS: useCounter(minutes hook), useForm(form handler)
	const {
		count,
		increment,
		decrement,
		handleCountChange,
		handleCountBlur
	} = useCounter(0, 120);
	const { formState, setFormState, handleCheckbox, handleChange } = useForm({
		unscheduled: true,
		scheduled: true,
		am: false,
		pm: false,
		noc: false,
		any: false,
		search: "", // search by ADL, task description
		// ** task update values start here **
		status: "",
		shift: "",
		reason: "",
		taskNotes: "",
		signature: "",
		followUpDate: "",
		residentUnavailable: false,
		requiresMedCheck: false,
		reassess: false,
		reassessNotes: "",
		minutes: 0,
		priority: "",
		// ** task update values end here **
		// Create task values
		newTaskName: "",
		newTaskADL: "",
		newTaskNote: "",
		newTaskShift: "",
		// Subtask values
		...createSubtaskVals(activeTask)
	});
	const handlePriority = priority => {
		return setFormState({
			...formState,
			values: {
				...formState.values,
				priority: priority
			}
		});
	};
	// open edit task modal
	// set active task
	const viewDetails = task => {
		setShowModal(true);
		setActiveTask(task);
	};

	// update task locally before submitting to server.
	// REQUIREMENTS:
	const saveTaskLocally = e => {
		const { values } = formState;
		const updatedCareTask = updateCareTaskRecord(values, activeTask);
		console.group("<TasksPanel/>: saveTaskLocally");
		console.log("activeTask", activeTask);
		console.log("values", values);
		console.log("updatedCareTask", updatedCareTask);
		console.groupEnd();
		return;
		// const getNonActiveTasks = tasks.filter(
		// 	item => item.AssessmentTrackingTaskId !== task.AssessmentTrackingTaskId
		// );
		// // UPDATES ADLCARETASK RECORD
		// const updateCareTask = updateCareTaskRecord(values, task);
		// updated tracking task record
	};

	// task updater
	const saveTaskUpdate = async e => {
		e.persist();
		e.preventDefault();
		const { values } = formState;
		const updatedRecord = findRecordAndUpdate(
			values,
			activeTask,
			trackingTasks
		);
		// update server-side
		const success = await updateTrackingTasks(currentUser.token, [
			updatedRecord
		]);
		if (success) {
			return dispatch({
				type: "UPDATE"
			});
		}
	};

	// displays pending task changes in count form
	const changeFormatter = count => {
		if (count !== 1) return `${count} task updates are pending`;
		return `${count} task update is pending`;
	};

	return (
		<>
			<main className={styles.TasksPanel}>
				<div className={styles.TasksPanel_top}>
					<section className={styles.TasksPanel_top_actionsSection}>
						<span className={styles.TasksPanel_top_actionsSection_title}>
							Current Tasks
						</span>
						<svg
							className={styles.TasksPanel_top_actionsSection_icon}
							onClick={() => setShowAppliedFilters(!showAppliedFilters)}
						>
							<use xlinkHref={`${sprite2}#icon-tune`}></use>
						</svg>
					</section>
					{/* TASK FILTERS SECTION */}
					{showAppliedFilters && (
						<section className={styles.TasksPanel_top_filtering}>
							<div className={styles.TasksPanel_top_filtering_title}>
								Filters
							</div>
							<AppliedFilters
								vals={formState.values}
								handleCheckbox={handleCheckbox}
								handleSearch={handleChange}
							/>
						</section>
					)}
					{/* VARIOUS EDITING ACTIONS GO HERE */}
					<section className={styles.TasksPanel_top_controlsSection}>
						<div
							className={styles.TasksPanel_top_controlsSection_completedCount}
						>
							{`${changeFormatter(scheduledTasksUpdateCount)}`}
						</div>
						<section className={styles.TasksPanel_top_controlsSection_save}>
							<StatefulButton
								key="saveButton"
								action="Saving task(s)..."
								text="Save your changes?"
								customStyles={btnStyles}
								callback={saveTaskUpdate}
							/>
						</section>
					</section>
				</div>
				{/* TASKLIST & TASKS ARE PASSED AS CHILDREN */}
				<section className={styles.TasksPanel_inner}>
					<TaskList tasks={tasks} viewDetails={viewDetails} />
				</section>
			</main>
			{/* EDIT/UPDATE TASK MODAL */}
			{showModal && (
				<Modal title="Edit/Update Task" closeModal={() => setShowModal(false)}>
					<TaskDetails task={activeTask}>
						{/* SUBTASK ITEMS & NOTES */}
						<SubtaskList task={activeTask} />
						<hr className="divider" />
						<EditTaskForm
							title="Update task"
							vals={formState.values}
							handleChange={handleChange}
							handleCheckbox={handleCheckbox}
							handlePriority={handlePriority}
							saveTaskUpdate={saveTaskLocally}
							count={count}
							increment={increment}
							decrement={decrement}
							handleCountChange={handleCountChange}
							handleCountBlur={handleCountBlur}
						/>
					</TaskDetails>
				</Modal>
			)}
		</>
	);
};

export default TasksPanel;

TasksPanel.defaultProps = {
	tasks: [],
	markedForCompletion: [],
	scheduledTasksUpdateCount: 0 // this should be removed
};

TasksPanel.propTypes = {
	formState: PropTypes.object,
	authData: PropTypes.object,
	tasks: PropTypes.array, // of objects or empty array
	markComplete: PropTypes.func,
	markedForCompletion: PropTypes.array, // not needed??? may remove later???
	scheduledTasksUpdateCount: PropTypes.number,
	saveChanges: PropTypes.func
};
