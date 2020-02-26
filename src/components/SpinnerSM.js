import React from "react";
import styles from "../../css/shared/SpinnerSM.module.scss";

const SpinnerSM = ({ color }) => {
	const custom = {
		borderTopColor: color
	};

	return <div className={styles.SpinnerSM} style={custom} />;
};

export default SpinnerSM;
