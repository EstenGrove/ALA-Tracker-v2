import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { isEmptyVal, isEmptyObj } from "../../helpers/utils_types";
import styles from "../../css/details/SubtaskItem.module.scss";
import sprite from "../../assets/tasks.svg";
import sprite2 from "../../assets/notes.svg";
import sprite3 from "../../assets/buttons.svg";
import Checkbox from "../shared/Checkbox";
import { replaceNullWithMsg } from "../../helpers/utils_processing";

const SubtaskItem = ({ subtask, deleteSubtask, dispatch }) => {
	const [hasNote, setHasNote] = useState(!isEmptyVal(subtask.Notes));
	const [viewingNotes, setViewingNotes] = useState(false);
	const [subtaskNote, setSubtaskNote] = useState(
		isEmptyVal(subtask.Notes) ? "" : subtask.Notes
	);
	const [isEditing, setIsEditing] = useState(false);
	const [isChecked, setIsChecked] = useState(subtask.IsCheck);

	const handleChange = e => {
		const { value } = e.target;
		return setSubtaskNote(value);
	};

	const markSubtask = e => {
		e.persist();
		const { checked } = e.target;
		return setIsChecked(checked);
	};

	// enables showing the text input
	// to add a subtask note
	const addNote = () => {
		return setIsEditing(true);
	};

	// saves subtask note locally and to global app state.
	const handleSaveNote = e => {
		if (e.key === "Enter" || e.key === "Tab") {
			const updatedSubtask = {
				...subtask,
				Notes: subtaskNote,
				IsCheck: isChecked,
				IsCompleted: isChecked
			};
			setHasNote(true);
			setIsEditing(false);
			return dispatch({
				type: "UPDATE_SUBTASK",
				data: {
					updatedSubtask: { ...updatedSubtask }
				}
			});
		}
		return;
	};

	useEffect(() => {
		dispatch({
			type: "UPDATE_SUBTASK",
			data: {
				updatedSubtask: {
					...subtask,
					IsCheck: isChecked,
					IsCompleted: isChecked,
					Notes: subtaskNote
				}
			}
		});
	}, [isChecked, dispatch, subtask, subtaskNote]);

	return (
		<section
			className={
				isChecked ? styles.SubtaskItem_isCompleted : styles.SubtaskItem
			}
		>
			<div className={styles.SubtaskItem_inner}>
				<Checkbox
					name={subtask.AssessmentTrackingTaskShiftSubTaskId}
					id={subtask.AssessmentTrackingTaskShiftSubTaskId}
					val={isChecked}
					defaultVal={subtask.IsCheck}
					label={subtask.Description}
					handleCheckbox={markSubtask}
					addStrike={true}
				/>
				<div
					className={styles.SubtaskItem_inner_delete}
					onClick={() => deleteSubtask(subtask)}
				>
					<svg className={styles.SubtaskItem_inner_delete_icon}>
						<use xlinkHref={`${sprite3}#icon-clearclose`}></use>
					</svg>
				</div>
			</div>
			{hasNote && (
				<div
					className={styles.SubtaskItem_notesSection}
					onClick={() => setViewingNotes(!viewingNotes)}
				>
					<svg className={styles.SubtaskItem_notesSection_icon}>
						<use xlinkHref={`${sprite2}#icon-notebook-text`}></use>
					</svg>
					<span>{viewingNotes ? "Hide" : "View"} Notes</span>
				</div>
			)}
			{!hasNote && !isEditing && (
				<div className={styles.SubtaskItem_notesSection} onClick={addNote}>
					<svg className={styles.SubtaskItem_notesSection_icon}>
						<use xlinkHref={`${sprite}#icon-plus21`}></use>
					</svg>
					<span>Add Notes</span>
				</div>
			)}
			{isEditing && (
				<input
					type="text"
					value={subtaskNote}
					onKeyDown={handleSaveNote}
					onChange={e => handleChange(e)}
					placeholder="Enter a note..."
				/>
			)}
			{viewingNotes && (
				<div className={styles.SubtaskItem_viewNotes}>
					<h4 className={styles.SubtaskItem_viewNotes_header}>Notes</h4>
					<p className={styles.SubtaskItem_viewNotes_text}>{subtaskNote}</p>
				</div>
			)}
		</section>
	);
};

export default SubtaskItem;

SubtaskItem.defaultProps = {};

SubtaskItem.propTypes = {
	subtask: PropTypes.object,
	addNote: PropTypes.func
};
