import React from "react";
import { PropTypes } from "prop-types";
import { STATUS as statuses } from "../../helpers/utils_options";
import { useForm } from "../../utils/useForm";
import styles from "../../css/pastdue/PastDueUpdateForm.module.scss";
import PortableForm from "../shared/PortableForm";
import DropdownSelect from "../shared/DropdownSelect";
import {
	getTaskDescription,
	getTaskStatus,
	getTaskDueDate,
	getTaskCategory,
	checkForNotes
} from "../../helpers/utils_tasks";
import { themeColors } from "../../helpers/utils_styles";

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
		<article className={styles.PastDueUpdateForm}>
			<section className={styles.PastDueUpdateForm_details}>
				<h2 className={styles.PastDueUpdateForm_details_title}>
					{getTaskCategory(activeTask)}
				</h2>
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
	);
};

export default PastDueUpdateForm;

PastDueUpdateForm.defaultProps = {};

PastDueUpdateForm.propTypes = {
	activeTask: PropTypes.object.isRequired,
	records: PropTypes.arrayOf(PropTypes.object)
};
