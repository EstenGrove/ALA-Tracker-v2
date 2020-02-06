import React from "react";
import { PropTypes } from "prop-types";
import { isEmptyArray } from "../../helpers/utils_types";
import styles from "../../css/pastdue/PastDueList.module.scss";
import ResidentPhoto from "../app/ResidentPhoto";
import PastDueEntry from "./PastDueEntry";
import Placeholder from "../shared/Placeholder";

// REQUIREMENTS:
// 1. INTENDED TO INCLUDE ALL PAST DUE RECORDS FOR A GIVEN RESIDENT
// 2. INCLUDES A HEADING WITH THE RESIDENT'S FIRST & LAST NAMES
// 3. INCLUDES RESIDENT AVATAR OR FALLBACK "user" ICON IF EMPTY

// RENDERS A PAST DUE RECORDS LIST BY RESIDENT
// INCLUDES THE RESIDENT AVATAR AND THEIR PAST DUE RECORDS

const PastDueList = ({ record }) => {
	console.group("<PastDueList/>");
	console.log("Resident entry (record)", record);
	console.log("record.PastDueScheduleTasks", record.PastDueScheduleTask);
	console.groupEnd();

	return (
		<div className={styles.PastDueList}>
			<section className={styles.PastDueList_heading}>
				<ResidentPhoto alt="Resident image" src={""} imgSize="SM" />
				<h2 className={styles.PastDueList_heading_title}>
					{record.Resident[0].ResidentFirstName +
						" " +
						record.Resident[0].ResidentLastName}
				</h2>
			</section>
			<section className={styles.PastDueList_entries}>
				{!isEmptyArray(record.PastDueScheduleTask) &&
					record.PastDueScheduleTask.map((entry, index) => (
						<PastDueEntry task={entry} key={entry.SCHEDULED_ID} />
					))}

				{isEmptyArray(record.PastDueScheduleTask) && (
					<section className={styles.PastDueList_entries_EMPTY}>
						<Placeholder
							size="SM"
							msg={`No past due found for ${record.Resident[0]
								.ResidentFirstName +
								" " +
								record.Resident[0].ResidentLastName}`}
						/>
					</section>
				)}
			</section>
		</div>
	);
};

export default PastDueList;

PastDueList.defaultProps = {};

PastDueList.propTypes = {
	record: PropTypes.shape({
		ResidentInfo: PropTypes.shape({
			ResidentFirstName: PropTypes.string.isRequired,
			ResidentLastName: PropTypes.string.isRequired,
			ResidentID: PropTypes.number.isRequired
		}),
		PastDueRecords: PropTypes.arrayOf(PropTypes.object)
	})
};
