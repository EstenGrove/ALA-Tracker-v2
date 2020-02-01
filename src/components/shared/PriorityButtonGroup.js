import React from "react";
import { PropTypes } from "prop-types";
import styles from "../../css/shared/PriorityButtonGroup.module.scss";
import PriorityButton from "./PriorityButton";

const PriorityButtonGroup = ({ handleClick, val }) => {
	return (
		<section className={styles.PriorityButtonGroup}>
			<PriorityButton
				id="priorityNote"
				name="priorityNone"
				label="NONE"
				isChecked={val === "NONE"}
				handleClick={() => handleClick("NONE")}
				priority="none"
			/>
			<PriorityButton
				id="priorityLow"
				name="priorityLow"
				label="LOW"
				isChecked={val === "LOW"}
				handleClick={() => handleClick("LOW")}
				priority="low"
			/>
			<PriorityButton
				id="priorityMedium"
				name="priorityMedium"
				label="MED"
				isChecked={val === "MEDIUM"}
				handleClick={() => handleClick("MEDIUM")}
				priority="medium"
			/>
			<PriorityButton
				id="priorityHigh"
				name="priorityHigh"
				label="HIGH"
				isChecked={val === "HIGH"}
				handleClick={() => handleClick("HIGH")}
				priority="high"
			/>
		</section>
	);
};

export default PriorityButtonGroup;

PriorityButtonGroup.propTypes = {
	val: PropTypes.string,
	handleClick: PropTypes.func
};
