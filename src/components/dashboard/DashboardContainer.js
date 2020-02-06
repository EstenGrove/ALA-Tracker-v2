import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useForm } from "../../utils/useForm";
import { useSpeechRecognition } from "../../utils/useSpeechRecognition";
import {
	ScheduledTaskModel,
	ScheduledSubtaskModel
} from "../../helpers/utils_models";
import { mapUpdatesToModel } from "../../helpers/utils_unscheduled";
import styles from "../../css/dashboard/DashboardContainer.module.scss";

import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Modal from "../shared/Modal";
import CreateTaskForm from "../app/CreateTaskForm";

// REQUIREMENTS:
// 1. Needs to be aware of <Sidebar/> open/close state
// 2. Expands/Collapses based on <Sidebar/> state
// 3. CREATE TASK MODAL *HAS* TO BE HERE OTHER WISE YOU CAN'T CREATE A TASK FROM ANY VIEW (ROUTE)

const DashboardContainer = ({
	state,
	dispatch,
	isExpanded,
	viewWidth,
	handleSidebar,
	history
}) => {
	const { currentResident, scheduledTasks, unscheduledTasks } = state.globals;
	const { user } = state;
	// state clones for local use
	const [newTasks, setNewTasks] = useState({
		scheduled: scheduledTasks,
		unscheduled: unscheduledTasks
	});

	const [showModal, setShowModal] = useState(false);
	const [checklist, setChecklist] = useState([]); // for subtasks
	const {
		isListening,
		isSupported,
		start,
		stop,
		final
	} = useSpeechRecognition({ continuous: true, interimResults: true });
	const { formState, setFormState, handleChange, handleCheckbox } = useForm({
		// Create task values
		newTaskActiveCategory: "",
		newTaskName: "",
		newTaskADL: "",
		newTaskNote: "",
		newTaskVoiceNote: final,
		newTaskShift: "",
		newTaskPriority: "NONE",
		newTaskFollowUpDate: "",
		newTaskSignature: ""
	});

	const createNewTask = (e, newModel) => {
		e.preventDefault();
		setShowModal(false);
		setNewTasks({
			...newTasks,
			unscheduled: [newModel, ...newTasks.unscheduled]
		});
		console.log("createNewTask (newModel)", newModel);
		dispatch({ type: "LOADING" }); // init faux loading state
		new Promise((res, rej) => {
			return setTimeout(() => {
				res();
				return dispatch({
					type: "REFRESH_STATE"
				});
			}, 1000);
		});
	};

	const saveNewTask = e => {
		e.preventDefault();
		// create and update model from value
		const updatedModel = mapUpdatesToModel(
			{ ...formState.values, final: final },
			currentResident.ResidentId,
			user.userID
		);
		// SAVE TASK WITH SAVETASK RECORD
		dispatch({
			type: "CREATE_TASK",
			data: {
				newTask: {
					...updatedModel
				}
			}
		});

		return createNewTask(e, updatedModel);
	};

	const addChecklist = e => {
		e.preventDefault();
		return console.log("Adding checklist...");
	};

	const handlePriority = priority => {
		return setFormState({
			...formState,
			values: {
				...formState.values,
				newTaskPriority: priority
			}
		});
	};

	useEffect(() => {
		if (state.app.hasLoaded) {
			return setNewTasks({
				scheduled: scheduledTasks,
				unscheduled: unscheduledTasks
			});
		}
	}, [state.app.hasLoaded, scheduledTasks, unscheduledTasks]);

	return (
		<>
			<div className={styles.DashboardContainer}>
				<Sidebar
					isExpanded={isExpanded}
					viewWidth={viewWidth}
					handleSidebar={handleSidebar}
					setShowModal={setShowModal}
					state={state}
					dispatch={dispatch}
					currentResident={state.globals.currentResident}
					scheduledTasks={newTasks.scheduled}
					unscheduledTasks={newTasks.unscheduled}
					categories={state.globals.categories}
				/>

				<Dashboard state={state} dispatch={dispatch} />
			</div>
			{/* MODAL AND CREATETETASKFORM WAS HERE PREVIOUSLY */}

			{showModal && (
				<Modal title="Create Task" closeModal={() => setShowModal(false)}>
					<CreateTaskForm
						currentResident={currentResident}
						vals={formState.values}
						handleChange={handleChange}
						handleCheckbox={handleCheckbox}
						handlePriority={handlePriority}
						addChecklist={addChecklist}
						saveNewTask={saveNewTask}
						//
						isListening={isListening}
						isSupported={isSupported}
						start={start}
						stop={stop}
						final={final}
					/>
				</Modal>
			)}
		</>
	);
};

export default withRouter(DashboardContainer);

DashboardContainer.defaultProps = {};

DashboardContainer.propTypes = {
	state: PropTypes.object,
	dispatch: PropTypes.func,
	isExpanded: PropTypes.bool.isRequired,
	handleSidebar: PropTypes.func.isRequired,
	customStyles: PropTypes.object,
	children: PropTypes.any
};
