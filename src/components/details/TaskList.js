import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { isEmptyArray } from "../../helpers/utils_types";
import styles from "../../css/details/TaskList.module.scss";
import TaskItem from "./TaskItem";
import ModalSM from "../shared/ModalSM";
import VoiceRecorder from "../shared/VoiceRecorder";
import Textarea from "../shared/Textarea";
import { useForm } from "../../utils/useForm";
import { useSpeechRecognition } from "../../utils/useSpeechRecognition";

const TaskList = ({
	isEditing, // true is EditTask modal is open
	tasks = [],
	vals,
	viewDetails,
	handleSubtask,
	handleShiftStatus
}) => {
	const {
		isListening,
		isSupported,
		start,
		stop,
		final
	} = useSpeechRecognition({ continuous: true, interimResults: true });
	const { formState, handleChange } = useForm({
		voiceNote: "",
		taskNote: ""
	});

	const [showAddNote, setShowAddNote] = useState(false); // add note modal
	// CONSIDER LIFTING THIS UP INTO <TasksPanel/>
	const addNote = task => {
		setShowAddNote(true);
		console.log("adding note...");
		// dispatch action to update task add task note
	};

	if (isEmptyArray(tasks)) {
		return (
			<article className={styles.EMPTY}>
				<h4 className={styles.EMPTY_MSG}>No tasks found.</h4>
			</article>
		);
	}
	return (
		<>
			<article className={styles.TaskList}>
				{tasks &&
					tasks.map((task, index) => (
						<TaskItem
							task={task}
							key={`${task?.AssessmentTrackingTaskId ??
								task?.AssessmentUnscheduleTaskId}_${index}`}
							values={vals}
							handleSubtask={handleSubtask}
							handleShiftStatus={handleShiftStatus}
							viewDetails={() => viewDetails(task)}
							addNote={() => addNote(task)}
						/>
					))}
			</article>

			{showAddNote && !isEditing && (
				<ModalSM title="Add a Note" closeModal={() => setShowAddNote(false)}>
					<VoiceRecorder
						isListening={isListening}
						isSupported={isSupported}
						start={start}
						stop={stop}
						recording={final}
					>
						<Textarea
							name="voiceNote"
							id="voiceNote"
							val={formState.values.voiceNote}
							handleChange={handleChange}
							enableCharCount={true}
							maxChar={250}
							addRequiredFlag={true}
							label="Record a task note"
							placeholder={`Click *start* to begin recording a note. \nClick *stop* to stop the recording.`}
						/>
					</VoiceRecorder>
					{!isSupported && (
						<Textarea
							name="taskNote"
							id="taskNote"
							label="Add a task note"
							placeholder={`Enter any notes or comments \nAll previous notes will NOT be overwritten.`}
							val={formState.values.taskNote}
							handleChange={handleChange}
							enableCharCount={true}
							maxChar={250}
							addRequiredFlag={true}
						/>
					)}
				</ModalSM>
			)}
		</>
	);
};

export default TaskList;

TaskList.defaultProps = {
	tasks: []
};

TaskList.propTypes = {
	tasks: PropTypes.arrayOf(PropTypes.object),
	vals: PropTypes.object,
	handleSubtask: PropTypes.func
	// addNote: PropTypes.func.isRequired // NO LONGER NEEDED???
};
