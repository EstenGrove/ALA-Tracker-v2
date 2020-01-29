import React, { useRef, useEffect, useState } from "react";
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
import TaskNotesList from "./TaskNotesList";
import {
	findTaskRecordByID,
	findTaskRecordByProp
} from "../../helpers/utils_tasks";
import { findRecordAndUpdate, deepDiff } from "../../helpers/utils_updates";
import { updateCareTaskRecord } from "../../helpers/utils_careTasks";
import { createSubtaskVals } from "../../helpers/utils_subtasks";
import {
	updateTrackingTasks,
	findTasksByADL,
	findAllTasksByADL
} from "../../helpers/utils_scheduled";
import ViewNotes from "./ViewNotes";
import Spinner from "../shared/Spinner";

const btnStyles = {
	backgroundColor: "hsla(170, 100%, 39%, 1)",
	color: "#ffffff"
};

// ## TODOS ##
// [ ] Solve creating subtask values for useForm
//    - Consider just using a single value for the current subtask
// NOTE: ONLY SHOWS TASKS FOR A SINGLE (1) CATEGORY

// FOR TASK STATUS
// HANDLE CASES OF SINGLE VALUE UPDATES SUCH AS NOTES OR OTHER METHODS
// BE SURE TO RETURN THE EXISTING DATA AND ONLY APPEND THE UPDATED VALUE(S)

const TasksPanel = ({
	state,
	dispatch,
	hasUpdated,
	scheduledTasksUpdateCount = 0, // this will likely be changed.
	scheduledTasks,
	scheduledTaskNotes,
	unscheduledTasks,
	unscheduledTaskNotes,
	trackingTasks,
	category, // string
	currentUser,
	currentResident
}) => {
	// tasks is receiving subtask updates, but not activeTask
	const [tasks, setTasks] = useState([
		...findTasksByADL(scheduledTasks, category)
	]);
	const [unscheduled, setUnscheduled] = useState([
		...findAllTasksByADL(unscheduledTasks, category)
	]);
	const [showAppliedFilters, setShowAppliedFilters] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const [activeTask, setActiveTask] = useState({});

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
		// Create task values - **REMOVE THESE VALUES**
		newTaskName: "", // ** remove - has been lifted up **
		newTaskADL: "", // ** remove - has been lifted up **
		newTaskNote: "", // ** remove - has been lifted up **
		newTaskShift: "", // ** remove - has been lifted up **
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
	const saveTaskLocally = e => {
		const { values } = formState;
		const updatedCareTask = updateCareTaskRecord(values, activeTask);
		setTasks([
			...tasks.filter(
				task =>
					task.AssessmentTrackingTaskId !== activeTask.AssessmentTrackingTaskId
			),
			updatedCareTask
		]);
		setShowModal(false);
		return saveTaskUpdate(e, updatedCareTask);
	};

	// task updater
	const saveTaskUpdate = async (e, updateCareTask) => {
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
				type: "UPDATE",
				data: {
					newState: {
						...state,
						globals: {
							...state.globals,
							scheduledTasks: [
								...scheduledTasks.filter(
									task =>
										task.AssessmentTrackingTaskId !==
										activeTask.AssessmentTrackingTaskId
								),
								updateCareTask
							]
						}
					}
				}
			});
		}
	};

	// displays pending task changes in count form
	const changeFormatter = count => {
		if (count !== 1) return `${count} task updates are pending`;
		return `${count} task update is pending`;
	};

	useEffect(() => {
		if (hasUpdated) {
			const refreshLocalTasks = () => {
				setTasks([...findTasksByADL(scheduledTasks, category)]);
				return setUnscheduled([
					...findAllTasksByADL(unscheduledTasks, category)
				]);
			};
			return refreshLocalTasks();
		}
	}, [category, hasUpdated, scheduledTasks, unscheduledTasks]);

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
				<section className={styles.TasksPanel_inner}>
					{/* SCHEDULED TASKLIST */}
					{/* SCHEDULED TASKLIST */}
					<TaskList
						key="SCHEDULED_TASKS"
						tasks={tasks}
						viewDetails={viewDetails}
						isEditing={showModal}
					/>
					{/* SCHEDULED TASKLIST */}
					{/* SCHEDULED TASKLIST */}
					<h4 className={styles.TasksPanel_inner_tasksTitle}>
						Unscheduled Tasks
					</h4>
					<hr className="divider" />
					{/* UNSCHEDULED TASKLIST */}
					{/* UNSCHEDULED TASKLIST */}
					<TaskList
						key="UNSCHEDULED_TASKS"
						tasks={findAllTasksByADL(unscheduled, category)}
						viewDetails={viewDetails}
						isEditing={showModal}
					/>
					{/* UNSCHEDULED TASKLIST */}
					{/* UNSCHEDULED TASKLIST */}
				</section>
			</main>
			{/* EDIT/UPDATE TASK MODAL */}
			{showModal && (
				<Modal title="Edit/Update Task" closeModal={() => setShowModal(false)}>
					<TaskDetails task={activeTask}>
						{/* SUBTASK ITEMS & NOTES */}
						<SubtaskList
							currentResident={currentResident}
							currentUser={currentUser}
							task={activeTask}
							subtasks={activeTask.ShiftTasks}
							dispatch={dispatch}
						/>
						<hr className="divider" />
						<ViewNotes notes={scheduledTaskNotes} />
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
