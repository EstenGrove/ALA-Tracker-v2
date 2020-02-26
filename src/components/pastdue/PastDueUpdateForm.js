import React, { useState } from "react";
import styles from "../../css/pastdue/PastDueUpdateForm.module.scss";
import sprite from "../../assets/tasks.svg";
import showHide from "../../assets/showhide.svg";
import { PropTypes } from "prop-types";
import { useForm } from "../../utils/useForm";
import { STATUS as statuses } from "../../helpers/utils_options";
import { getUserInitials } from "../../helpers/utils_processing";
import {
	getTaskDescription,
	getTaskDueDate,
	getTaskCategory,
	getTaskShift,
	getTaskIdType
} from "../../helpers/utils_tasks";
import {
	getResidentNamePastDue,
	getPastDuePoints,
	getPastDueCount,
	getPastDueCountRaw,
	isActiveTask
} from "../../helpers/utils_pastdue";
import { adlIcons } from "../../helpers/utils_styles";
import { format } from "date-fns";
import ResidentPhoto from "../app/ResidentPhoto";
import PortableForm from "../shared/PortableForm";
import Textarea from "../shared/Textarea";
import TextInput from "../shared/TextInput";
import Checkbox from "../shared/Checkbox";
import DropdownSelect from "../shared/DropdownSelect";

// REQUIRED PROPERTIES
// 1. ADLCategory
// 2. TaskDescription
// 3. TaskNotes
// 4. PriorityName
// 5. DayOfWeek (scheduled for)
// 6. EntryUserFirstName & EntryUserLastName (initials??)
// 7. Description (secondary details)

const PastDueUpdateForm = ({ activeTask = {}, activeRecord = {} }) => {
	const {
		formState,
		handleChange,
		handleCheckbox,
		handleBlur,
		handleReset
	} = useForm({
		pastDueStatus: activeTask?.TaskStatus,
		pastDueResidentUnavailable: false,
		pastDueReason: "",
		pastDuePriority: activeTask?.PriorityName
	});
	const [activePastDueTask, setActivePastDueTask] = useState(activeTask);
	const [taskRecords, setTaskRecords] = useState(
		activeRecord.PastDueScheduleTask
	);

	const [showMoreRecords, setShowMoreRecords] = useState(false);
	const { values } = formState;

	// REQUIREMENTS:
	// 1. CHANGE SELECTED/CURRENT TASK RECORD
	// 2. RE-SET THE TASK LIST RECORDS (LOCAL STATE)
	// LOCAL STATE *SHOULD* INCLUDE THE CURRENT TASK THAT'S SELECTED. BUT SHOULD BE HIGHLIGHTED TO INDICATE IT'S ACTIVE
	const changeActiveTask = task => {
		setActivePastDueTask(task);
	};

	return (
		<>
			<article className={styles.PastDueUpdateForm}>
				<h2 className={styles.PastDueUpdateForm_title}>
					<svg
						className={styles.PastDueUpdateForm_icon}
						style={{
							fill: `${
								adlIcons[getTaskCategory(activePastDueTask)].styles.fill
							}`
						}}
					>
						<use
							xlinkHref={`${sprite}#icon-${
								adlIcons[getTaskCategory(activePastDueTask)].icon
							}`}
						/>
					</svg>
					<span>{getTaskCategory(activePastDueTask)}</span>- <b> Past Due</b>
				</h2>
				<hr className="divider" />
				<section className={styles.PastDueUpdateForm_details}>
					<div className={styles.PastDueUpdateForm_details_top}>
						<ResidentPhoto imgSize="SM" imgAlt="Resident Past Due" />
						<h4 className={styles.PastDueUpdateForm_details_top_title}>
							{getResidentNamePastDue(activeRecord)}
						</h4>
					</div>
				</section>

				<section className={styles.PastDueUpdateForm_taskDetails}>
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between"
						}}
					>
						<div className={styles.PastDueUpdateForm_taskDetails_group}>
							<h6
								className={styles.PastDueUpdateForm_taskDetails_group_heading}
							>
								Task
							</h6>
							<p className={styles.PastDueUpdateForm_taskDetails_group_text}>
								{getTaskDescription(activePastDueTask)}
							</p>
						</div>
						<div className={styles.PastDueUpdateForm_taskDetails_pointsGroup}>
							<h2
								className={styles.PastDueUpdateForm_taskDetails_group_heading}
							>
								Total ADL Points
							</h2>
							<div
								className={styles.PastDueUpdateForm_taskDetails_group_points}
							>
								<span>{getPastDuePoints(activePastDueTask)}</span>
							</div>
						</div>
					</div>
					<div className={styles.PastDueUpdateForm_taskDetails_endGroup}>
						<h2
							className={styles.PastDueUpdateForm_taskDetails_endGroup_heading}
						>
							<svg className={styles.PastDueUpdateForm_iconSM}>
								<use xlinkHref={`${sprite}#icon-event_note`} />
							</svg>
							<span>Due Date</span>
						</h2>
						<div
							className={styles.PastDueUpdateForm_taskDetails_endGroup_subgroup}
						>
							<span>Due about {getTaskDueDate(activePastDueTask)}</span>
							<span>
								Scheduled Shift: <b>{getTaskShift(activePastDueTask)}</b>
							</span>
						</div>
					</div>
				</section>

				<section className={styles.PastDueUpdateForm_records}>
					<div className={styles.PastDueUpdateForm_records_top}>
						<h2 className={styles.PastDueUpdateForm_records_top_heading}>
							Total Past Due: <i>{getPastDueCount(activeRecord)}</i>
						</h2>
						<p className={styles.PastDueUpdateForm_records_top_text}>
							Task Created by <i>{getUserInitials(activePastDueTask)}</i>
						</p>
					</div>
					<div className={styles.PastDueUpdateForm_records_viewMore}>
						<button
							className={styles.PastDueUpdateForm_records_viewMore_btn}
							onClick={() => setShowMoreRecords(!showMoreRecords)}
						>
							<svg className={styles.PastDueUpdateForm_records_viewMore_icon}>
								<use
									xlinkHref={`${showHide}#icon-view-${
										showMoreRecords ? "hide" : "show"
									}`}
								/>
							</svg>
							Show {showMoreRecords ? "Less" : "More"}
						</button>
					</div>
					{showMoreRecords && (
						<>
							<p className={styles.PastDueUpdateForm_records_count}>
								Viewing <b>{getPastDueCountRaw(activeRecord)}</b> /{" "}
								<b>{getPastDueCountRaw(activeRecord)}</b> records.
							</p>
							<p className={styles.PastDueUpdateForm_records_selection}>
								Click a record to view details
							</p>
							<ul className={styles.PastDueUpdateForm_records_list}>
								{taskRecords &&
									taskRecords.map((task, index) => (
										<li
											className={
												isActiveTask(activePastDueTask, task)
													? styles.PastDueUpdateForm_records_list_item_active
													: styles.PastDueUpdateForm_records_list_item
											}
											key={task[getTaskIdType(task)]}
											title="Click to view details"
											onClick={() => changeActiveTask(task)}
										>
											<span>{task.TaskDescription}</span>
											<span>{format(task.TrackDate, "MM/DD/YYYY")}</span>
										</li>
									))}
							</ul>
						</>
					)}
				</section>
				<hr className="divider" />
				<section className={styles.PastDueUpdateForm_update}>
					<h2 className={styles.PastDueUpdateForm_update_title}>
						Update a Past Due Record
					</h2>
					<PortableForm
						handleBlur={handleBlur}
						handleChange={handleChange}
						handleCheckbox={handleCheckbox}
					>
						<DropdownSelect
							val={values.pastDueStatus}
							label="Change status"
							name="pastDueStatus"
							id="pastDueStatus"
							placeholder="Select status"
							options={statuses}
						/>
						<Textarea
							val={values.pastDueReason}
							label="Describe why task was not completed"
							name="pastDueReason"
							id="pastDueReason"
							placeholder="Explain why the task is past due"
						/>
						<Checkbox
							name="pastDueResidentUnavailable"
							id="pastDueResidentUnavailable"
							label="Resident was Unavailable"
							val={values.pastDueResidentUnavailable}
						/>
					</PortableForm>
				</section>
			</article>
		</>
	);
};

export default PastDueUpdateForm;

PastDueUpdateForm.defaultProps = {};

PastDueUpdateForm.propTypes = {
	activeTask: PropTypes.object.isRequired,
	residents: PropTypes.arrayOf(PropTypes.object),
	records: PropTypes.arrayOf(PropTypes.object)
};
