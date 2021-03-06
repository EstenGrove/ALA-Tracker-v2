import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { STATUS, SHIFTS, REASONS } from "../../helpers/utils_options";
import styles from "../../css/details/EditTaskForm.module.scss";
import sprite from "../../assets/showhide.svg";
import DropdownSelect from "../shared/DropdownSelect";
import DropdownSelectSM from "../shared/DropdownSelectSM";
import Checkbox from "../shared/Checkbox";
import Textarea from "../shared/Textarea";
import TextInput from "../shared/TextInput";
import StatefulButton from "../shared/StatefulButton";
import Counter from "../shared/Counter";
import ConditionalForm from "../shared/ConditionalForm";
import PriorityButtonGroup from "../shared/PriorityButtonGroup";

// TODOS:
// 1. ADD SUB TASKS LIST
// 2. ADD TASK NOTE OPTION
// 3. ADD PRIORITY BUTTON GROUP

const EditTaskForm = ({
	title,
	vals,
	count,
	increment,
	decrement,
	saveTaskUpdate,
	handleCountChange,
	handleCountBlur,
	handleChange,
	handleCheckbox,
	handlePriority, // TBA - TO-BE-ADDED
	handleBlur // TBA - TO-BE-ADDED
}) => {
	// handles hidden sections: additional options/reassess notes
	const [taskFormSections, setTaskFormSections] = useState({
		showAdditional: false,
		showReassess: false
	});

	const statusCondition =
		vals.status === "NOT-COMPLETE" || vals.status === "MISSED-EVENT";

	return (
		<article className={styles.EditTaskForm}>
			<form className={styles.EditTaskForm_form}>
				<h2 className={styles.EditTaskForm_form_title}>{title}</h2>
				{/* SHOWS REASON DROPDOWN IF "NOT-COMPLETE"/"MISSED-EVENT" ARE CHOSEN */}
				<ConditionalForm
					condition={statusCondition}
					mainInput={
						<DropdownSelect
							val={vals.status}
							label="Select a task status"
							name="status"
							id="status"
							placeholder="Select Status"
							options={STATUS}
							handleChange={handleChange}
						/>
					}
				>
					<DropdownSelect
						val={vals.reason}
						name="reason"
						id="reason"
						options={REASONS}
						label="Please select a reason"
						placeholder="Select a Reason"
						handleChange={handleChange}
					/>
				</ConditionalForm>

				<DropdownSelectSM
					val={vals.shift}
					name="shift"
					id="shift"
					label="Shift"
					placeholder="Select shift"
					options={SHIFTS}
					handleChange={handleChange}
				/>
				{/* FOLLOW-UPS REQUIRED */}
				<section className={styles.EditTaskForm_form_checkGroup}>
					<Checkbox
						val={vals.residentUnavailable}
						label="RESIDENT UNAVAILABLE"
						id="residentUnavailable"
						name="residentUnavailable"
						handleCheckbox={handleCheckbox}
					/>
					<Checkbox
						val={vals.requiresMedCheck}
						label="MED CHECK REQUIRED"
						id="requiresMedCheck"
						name="requiresMedCheck"
						handleCheckbox={handleCheckbox}
					/>
					<Checkbox
						val={vals.reassess}
						label="REASSESS (TASK)"
						id="reassess"
						name="reassess"
						handleCheckbox={handleCheckbox}
					/>

					{vals.reassess && (
						<div className={styles.EditTaskForm_form_checkGroup_reassess}>
							<Textarea
								label="Reassess Notes (REQUIRED)"
								placeholder="Please explain *why* this task should be reassessed..."
								id="reassessNotes"
								name="reassessNotes"
								val={vals.reassessNotes}
								addRequiredFlag={true}
								enableCharCount={true}
								maxChar={250}
								handleChange={handleChange}
							/>
						</div>
					)}
				</section>
				<Textarea
					label="Notes/Comments"
					placeholder="Enter any notes or task related comments..."
					name="taskNotes"
					id="taskNotes"
					val={vals.taskNotes}
					handleChange={handleChange}
					enableCharCount={true}
					maxChar={250}
				/>
				<section className={styles.EditTaskForm_form_toggleOptions}>
					<div
						className={styles.EditTaskForm_form_toggleOptions_label}
						onClick={() =>
							setTaskFormSections({
								...taskFormSections,
								showAdditional: !taskFormSections.showAdditional
							})
						}
					>
						{taskFormSections.showAdditional ? "Hide" : "Show"} Task Options
					</div>
					<svg className={styles.EditTaskForm_form_icon}>
						<use
							xlinkHref={`${sprite}#icon-view-${
								taskFormSections.showAdditional ? "hide" : "show"
							}`}
						></use>
					</svg>
				</section>
				<hr />
				{taskFormSections.showAdditional && (
					<section className={styles.EditTaskForm_form_additionalOptions}>
						<h2 className={styles.EditTaskForm_form_subtitle}>
							Additional Task Options
						</h2>
						<article
							className={styles.EditTaskForm_form_additionalOptions_items}
						>
							{/* ---------HIDDEN BY DEFAULT--------- */}
							<Counter
								count={count}
								increment={increment}
								decrement={decrement}
								handleCountChange={handleCountChange}
								handleCountBlur={handleCountBlur}
								label="How long did it take? (mins)"
								name="minutes"
								id="minutes"
							/>
							{/* FOLLOWUP-DATE */}
							{/* PRIORITY BUTTONS???? */}
							<h4
								className={
									styles.EditTaskForm_form_additionalOptions_items_label
								}
							>
								Set Task's Priority
							</h4>
							<PriorityButtonGroup
								handleClick={handlePriority}
								val={vals.priority}
							/>

							{/* ---------HIDDEN BY DEFAULT--------- */}
						</article>
					</section>
				)}

				{/* SHIFTTASKS/SUBTASKS */}
				<TextInput
					val={vals.signature}
					label="Employee Signature"
					placeholder="Please sign your name"
					name="signature"
					id="signature"
					handleChange={handleChange}
					addRequiredFlag={true}
					isRequired={true}
				/>

				<StatefulButton
					text="Save"
					action="Saving..."
					callback={saveTaskUpdate}
				/>
			</form>
		</article>
	);
};
export default EditTaskForm;

EditTaskForm.defaultProps = {};

EditTaskForm.propTypes = {
	title: PropTypes.string.isRequired,
	vals: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	increment: PropTypes.func.isRequired,
	decrement: PropTypes.func.isRequired,
	saveTaskUpdate: PropTypes.func.isRequired,
	handleCountChange: PropTypes.func.isRequired,
	handleCountBlur: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleCheckbox: PropTypes.func.isRequired,
	handlePriority: PropTypes.func,
	handleBlur: PropTypes.func
};
