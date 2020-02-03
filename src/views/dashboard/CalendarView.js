import React from "react";
import styles from "../../css/dashboard/CalendarView.module.scss";
import { PropTypes } from "prop-types";
import Calendar from "../../components/calendar/Calendar";

const CalendarView = () => {
	return (
		<div className={styles.CalendarView}>
			<Calendar />
		</div>
	);
};

export default CalendarView;

CalendarView.defaultProps = {};

CalendarView.propTypes = {};
