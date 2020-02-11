import React from "react";
import styles from "../../css/pastdue/PastDueUpdateForm.module.scss";
import sprite from "../../assets/tasks.svg";
import { PropTypes } from "prop-types";
import { STATUS as statuses } from "../../helpers/utils_options";
import { useForm } from "../../utils/useForm";
import { getUserInitials } from "../../helpers/utils_processing";
import {
	getTaskDescription,
	getTaskStatus,
	getTaskDueDate,
	getTaskCategory,
	checkForNotes
} from "../../helpers/utils_tasks";
import { themeColors, adlColors, adlIcons } from "../../helpers/utils_styles";
import PortableForm from "../shared/PortableForm";
import DropdownSelect from "../shared/DropdownSelect";

// REQUIREMENTS:
// 1. CURRENT RESIDENT
//    1a. RESIDENT PHOTO???
// 2. "VIEWING JOHN DOE'S PAST DUE" TITLE HEADING
// 3. ALL PAST DUE RECORDS FOR THAT RESIDENT
// 4.

// REQUIRED PROPERTIES
// 1. ADLCategory
// 2. TaskDescription
// 3. TaskNotes
// 4. PriorityName
// 5. DayOfWeek (scheduled for)
// 6. EntryUserFirstName & EntryUserLastName (initials??)
// 7. Description (secondary details)

const PastDueUpdateForm = ({ activeTask = {}, records = [] }) => {
	const {
		formState,
		handleChange,
		handleCheckbox,
		handleBlur,
		handleReset
	} = useForm({
		pastDueStatus: activeTask?.TaskStatus,
		pastDuePriority: activeTask?.PriorityName
	});

	const { values } = formState;
	return (
		<>
			<article className={styles.PastDueUpdateForm}>
				<h2
					className={styles.PastDueUpdateForm_title}
					style={{ color: adlColors[getTaskCategory(activeTask)] }}
				>
					<svg className={styles.PastDueUpdateForm_icon}>
						<use
							fill={`${adlIcons[getTaskCategory(activeTask)].styles.fill}`}
							xlinkHref={`${sprite}#icon-${
								adlIcons[getTaskCategory(activeTask)].icon
							}`}
						></use>
					</svg>
					{getTaskCategory(activeTask)}
				</h2>
				<section className={styles.PastDueUpdateForm_details}>
					<h4 className={styles.PastDueUpdateForm_details_heading}>
						Description
					</h4>
					<p>{getTaskDescription(activeTask)}</p>
					<h4 className={styles.PastDueUpdateForm_details_heading}>
						Additional Notes
					</h4>
					<p>{checkForNotes(activeTask, "No notes")}</p>
					<h4 className={styles.PastDueUpdateForm_details_heading}>Due Date</h4>
					<p style={{ color: themeColors.main.red }}>
						{getTaskDueDate(activeTask)}
					</p>
					<p>
						Created by{" "}
						<b style={{ color: themeColors.main.blue, fontStyle: "italic" }}>
							{getUserInitials(activeTask)}
						</b>
					</p>
				</section>

				<section className={styles.PastDueUpdateForm_inner}>
					<PortableForm
						handleBlur={handleBlur}
						handleChange={handleChange}
						handleCheckbox={handleCheckbox}
					>
						<DropdownSelect
							val={values.pastDueStatus}
							name="pastDueStatus"
							id="pastDueStatus"
							label="Edit Status"
							options={statuses}
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
	records: PropTypes.arrayOf(PropTypes.object)
};
