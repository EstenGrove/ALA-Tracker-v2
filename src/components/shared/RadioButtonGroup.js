import React from "react";
import styles from "../../css/shared/RadioButtonGroup.module.scss";
import { PropTypes } from "prop-types";

// USAGE:
// 1. PASS AS MANY RADIO BUTTONS AS NEEDED AS CHILDREN
// 2. PASS THE EVENT HANDLER AS PROPS (IE "handleRadio")
// 3. IF USING "GROUPS" PASS A GROUP AS PROPS (ie "groupName")

const RadioButtonGroup = ({ groupName, handleRadio, children }) => {
	const radios = React.Children.map(children, child => {
		return React.cloneElement(child, {
			handleSelection: handleRadio,
			name: groupName
		});
	});
	return (
		<section className={styles.RadioButtonGroup}>
			<div className={styles.RadioButtonGroup_radios}>{radios}</div>
		</section>
	);
};

export default RadioButtonGroup;

RadioButtonGroup.defaultProps = {};

RadioButtonGroup.propTypes = {
	radios: PropTypes.array,
	groupName: PropTypes.string, // is required if using single choice
	handleSelection: PropTypes.func.isRequired,
	children: PropTypes.any
};
