import React from "react";
import styles from "../../css/calendar/Calendar.module.scss";
import { PropTypes } from "prop-types";
import Spinner from "../shared/Spinner";

// **REWRITE CALENDAR**
// LOOK AT THE LOGIC FOR <ADLByDay/> and consider refactoring.

const Calendar = ({ isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <article className={styles.Calendar}>
      <div className={styles.Calendar_inner}>
        {/* <ResidentDetails/> */}
        {/* <CalendarNav/>  */}
        {/* <NotificationsCenter/> */}
        {/* <CalendarHeader/> */}
        {/* <Week/> */}
      </div>
    </article>
  );
};

export default Calendar;

Calendar.defaultProps = {};

Calendar.propTypes = {};
