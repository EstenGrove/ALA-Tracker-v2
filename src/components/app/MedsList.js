import React from "react";
import styles from "../../css/app/MedsList.module.scss";
import { PropTypes } from "prop-types";
import { isEmptyArray, isEmptyVal } from "../../helpers/utils_types";
import { replaceNullWithMsg } from "../../helpers/utils_processing";

const MedsList = ({ meds = [] }) => {
	if (isEmptyArray(meds)) {
		return (
			<section className={styles.MedsList}>
				<p className={styles.MedsList_EMPTY}>No meds</p>
			</section>
		);
	}
	return (
		<section className={styles.MedsList}>
			<ul className={styles.MedsList_list}>
				{!isEmptyArray(meds) &&
					meds.map((med, index) => (
						<>
							<li
								key={`${med.MedID}_${index}`}
								className={styles.MedsList_list_item}
							>
								<div
									className={styles.MedsList_list_item_wrapper}
									key={`${med.MedID}_${index}_1`}
								>
									<b key={`${med.MedID}__1`}>Med:</b>{" "}
									<i key={`${med.MedID}___1`}>
										{replaceNullWithMsg(med.Medication, "Unknown")}
									</i>
								</div>
								<div
									className={styles.MedsList_list_item_wrapper}
									key={`${med.MedID}_${index}_2`}
								>
									<b key={`${med.MedID}__2`}>Quantity:</b>{" "}
									<i key={`${med.MedID}___2`}>
										{replaceNullWithMsg(med.Quantity, "Unknown")}
									</i>
								</div>
							</li>
							<hr className="dividerSM" />
						</>
					))}
			</ul>
			{/*  */}
			{/*  */}
		</section>
	);
};

export default MedsList;

MedsList.defaultProps = {
	meds: []
};

MedsList.propTypes = {
	meds: PropTypes.arrayOf(PropTypes.object)
};
