import React, { useState } from "react";
import styles from "../../css/app/CreateTaskForm.module.scss";
import { PropTypes } from "prop-types";
import { SHIFTS, ADLS } from "../../helpers/utils_options";

import sprite from "../../assets/showhide.svg";
import TextInput from "../shared/TextInput";
import Textarea from "../shared/Textarea";
import DropdownSelect from "../shared/DropdownSelect";
import DropdownSelectSM from "../shared/DropdownSelectSM";
import ButtonSM from "../shared/ButtonSM";
import { themeColors } from "../../helpers/utils_styles";
import VoiceRecorder from "../shared/VoiceRecorder";
import StatefulButton from "../shared/StatefulButton";
import PriorityButtonGroup from "../shared/PriorityButtonGroup";
import Placeholder from "../shared/Placeholder";
import { isEmptyVal } from "../../helpers/utils_types";

// ##TODOS:
// 1. CONSIDER ADDING "RECURRING TASK" AS AN OPTION
//  1A. ENABLES CREATING A RECURRING TASK FOR A SPECIFIC TIME/DAY/CATEGORY
//  2A. ENABLE RANGE FOR RECURRING TASK TO RE-OCCUR (IE, OCCURS DAILY FOR A WEEK ETC.)
// 3. ADD FOLLOWUPDATE

const CreateTaskForm = ({
	currentResident,
	title,
	vals,
	categories,
	handleChange,
	handleCheckbox,
	handlePriority,
	addChecklist,
	saveNewTask,
	// voice recorder props
	isSupported,
	isListening,
	start,
	stop,
	final
}) => {
	const [formSections, setFormSections] = useState({
		showAdditional: false,
		addChecklist: false
	});

	if (isEmptyVal(currentResident.FirstName)) {
		return <Placeholder size="MD" color="red" msg="No Selected Resident" />;
	}
	return (
		<article className={styles.CreateTaskForm}>
			<form className={styles.CreateTaskForm_form} onSubmit={saveNewTask}>
				<h2 className={styles.CreateTaskForm_form_title}>{title}</h2>
				{/* PICK AN ADL CATEGORY - DEFAULTS TO CURRENT CATEGORY */}
				<TextInput
					val={vals.newTaskName}
					label="Create a Task Name"
					name="newTaskName"
					placeholder="Enter a name for the task..."
					handleChange={handleChange}
				/>
				<DropdownSelect
					val={vals.newTaskADL}
					label="Select an ADL"
					name="newTaskADL"
					id="newTaskADL"
					placeholder="Select ADL..."
					handleChange={handleChange}
					options={ADLS}
				/>
				{/* PICK A DATE FOR THE TASK - DEFAULTS TO TODAY - (IE FOLLOWUP DATE) */}
				{/* IF "NOT" BROWSER SUPPORT FOR VOICE RECORDER FALLBACK TO TEXTAREA FOR NOTES */}
				{isSupported && (
					<VoiceRecorder
						isSupported={isSupported}
						isListening={isListening}
						start={start}
						stop={stop}
						recording={final} // actual string value
						handleChange={handleChange}
					>
						<Textarea
							name="newTaskVoiceNote"
							id="newTaskVoiceNote"
							val={vals.newTaskVoiceNote}
							handleChange={handleChange}
							placeholder={`Click 'Start Recording' to record a note \nClick 'Stop Recording' to stop.`}
							label="Notes/Comments"
							addRequiredFlag={true}
							maxChar={1000}
							enableCharCount={true}
						/>
					</VoiceRecorder>
				)}
				{!isSupported && (
					<Textarea
						label="Add a Note"
						placeholder="Enter any notes/comments..."
						id="newTaskNote"
						name="newTaskNote"
						val={vals.newTaskNote}
						addRequiredFlag={true}
						enableCharCount={true}
						maxChar={1000}
						handleChange={handleChange}
					/>
				)}
				{/* SCHEDULED A SHIFT */}
				<DropdownSelectSM
					val={vals.newTaskShift}
					label="Schedule Shift"
					name="newTaskShift"
					id="newTaskShift"
					placeholder="Pick a shift..."
					handleChange={handleChange}
					options={SHIFTS}
				/>

				{/* ADD FOLLOW-UP DATE */}
				{/* ADD FOLLOW-UP DATE */}
				{/* ADD FOLLOW-UP DATE */}
				{/* ADD FOLLOW-UP DATE */}

				{/* TOGGLE - MORE OPTIONS */}
				<section className={styles.CreateTaskForm_form_toggleOptions}>
					<div
						className={styles.CreateTaskForm_form_toggleOptions_label}
						onClick={() =>
							setFormSections({
								...formSections,
								showAdditional: !formSections.showAdditional
							})
						}
					>
						{formSections.showAdditional ? "Hide" : "Show"} More Options
					</div>
					<svg className={styles.CreateTaskForm_form_icon}>
						<use
							xlinkHref={`${sprite}#icon-view-${
								formSections.showAdditional ? "hide" : "show"
							}`}
						></use>
					</svg>
				</section>
				{/* ADDITIONAL OPTIONS */}
				{/* ADD CHECKLIST/SUBTASK */}
				{/* ADD NOTES/COMMENTS */}
				{formSections.showAdditional && (
					<>
						<hr className="divider" />
						<section className={styles.CreateTaskForm_form_moreOptions}>
							<div className={styles.CreateTaskForm_form_moreOptions_priority}>
								<h4
									className={
										styles.CreateTaskForm_form_moreOptions_priority_title
									}
								>
									Set a Priority
								</h4>
								<PriorityButtonGroup
									val={vals.newTaskPriority}
									handleClick={handlePriority}
								/>
							</div>

							<ButtonSM
								handleClick={addChecklist}
								customStyles={{ backgroundColor: themeColors.main.green }}
							>
								<b>+</b> Add Checklist
							</ButtonSM>
							<div
								className={styles.CreateTaskForm_form_moreOptions_addChecklist}
							>
								{/*  */}
								{/*  */}
								{/*  */}
							</div>
						</section>
						<hr className="divider" />
					</>
				)}

				<TextInput
					val={vals.newTaskSignature}
					name="newTaskSignature"
					id="newTaskSignature"
					handleChange={handleChange}
					label="Signature"
					placeholder="Please sign your name..."
				/>
				<StatefulButton
					text="Save New Task"
					action="Saving task..."
					callback={saveNewTask}
					customStyles={{
						marginBottom: "4rem"
					}}
				/>
			</form>
		</article>
	);
};

export default CreateTaskForm;

CreateTaskForm.defaultProps = {};

CreateTaskForm.propTypes = {
	vals: PropTypes.object,
	handleChange: PropTypes.func,
	handleCheckbox: PropTypes.func,
	createNewTask: PropTypes.func
};
