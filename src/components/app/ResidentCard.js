import React, { useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { replaceNullWithMsg } from "../../helpers/utils_processing";
import { isEmptyObj } from "../../helpers/utils_types";
import { useOutsideClick } from "../../utils/useOutsideClick";
import styles from "../../css/app/ResidentCard.module.scss";
import sprite from "../../assets/resident-details.svg";
import ResidentPhoto from "./ResidentPhoto";

const ResidentCard = ({ currentResident, meds = [] }) => {
  const cardRef = useRef();
  const { isOutside } = useOutsideClick(cardRef);
  const [hideDetails, setHideDetails] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [activeResident, setActiveResident] = useState(currentResident);

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) {
      return false;
    }
    if (isOutside) {
      return setShowMenu(false);
    }

    return () => {
      isMounted = false;
    };
  }, [isOutside]);

  useEffect(() => {
    if (!isEmptyObj(currentResident)) {
      return setActiveResident(currentResident);
    }
  }, [currentResident]);

  return (
    <article className={styles.ResidentCard}>
      <div className={styles.ResidentCard_row}>
        <section className={styles.ResidentCard_row_top}>
          <ResidentPhoto imgSize="MD" />
          <hgroup className={styles.ResidentCard_row_top_group}>
            <h2 className={styles.ResidentCard_row_top_group_title}>
              {replaceNullWithMsg(currentResident.FirstName, "NA") +
                " " +
                replaceNullWithMsg(currentResident.LastName, "NA")}
            </h2>
            <h4 className={styles.ResidentCard_row_top_group_subtitle}>
              Unit: {replaceNullWithMsg(currentResident.Unit, "NA")}
            </h4>
            <h4 className={styles.ResidentCard_row_top_group_subtitle}>
              ALA ID: {replaceNullWithMsg(currentResident.ResidentID, "NA")}
            </h4>
          </hgroup>
        </section>
        <section className={styles.ResidentCard_row_menu} ref={cardRef}>
          <svg
            className={styles.ResidentCard_row_menu_icon}
            onClick={() => setShowMenu(!showMenu)}
          >
            <use xlinkHref={`${sprite}#icon-dots-three-horizontal`}></use>
          </svg>
          {showMenu && (
            <aside className={styles.ResidentCard_row_menu_dropdown}>
              <h4 className={styles.ResidentCard_row_menu_dropdown_option}>
                <NavLink to="/dashboard/residentinfo">
                  View Resident Info
                </NavLink>
              </h4>
            </aside>
          )}
        </section>
      </div>
      {!hideDetails && (
        <div className={styles.ResidentCard_row}>
          <section className={styles.ResidentCard_row_tile}>
            <div className={styles.ResidentCard_row_tile_group}>
              <svg className={styles.ResidentCard_row_tile_icon_red}>
                <use xlinkHref={`${sprite}#icon-heartbeat`}></use>
              </svg>
              <h4 className={styles.ResidentCard_row_tile_group_title}>
                Medications
              </h4>
            </div>
            <div className={styles.ResidentCard_row_tile_group}>
              <h6 className={styles.ResidentCard_row_tile_group_subtitle}>
                Notes: {replaceNullWithMsg(currentResident.medNotes, "No meds")}
              </h6>
            </div>
          </section>
          <section className={styles.ResidentCard_row_tile}>
            <div className={styles.ResidentCard_row_tile_group}>
              <svg className={styles.ResidentCard_row_tile_icon_blue}>
                <use xlinkHref={`${sprite}#icon-drivers-license`}></use>
              </svg>
              <h4 className={styles.ResidentCard_row_tile_group_title}>
                Service Plans
              </h4>
            </div>
            <div className={styles.ResidentCard_row_tile_plans}>
              Due:{" "}
              {replaceNullWithMsg(
                format(currentResident.servicePlanDue, "MM/DD/YYYY"),
                "No scheduled service plans in the future."
              )}
            </div>
          </section>
        </div>
      )}
      <button
        className={styles.ResidentCard_viewDetails}
        onClick={() => setHideDetails(!hideDetails)}
      >
        {hideDetails ? "View" : "Hide"} Details
      </button>
    </article>
  );
};

export default ResidentCard;

ResidentCard.defaultProps = {};

ResidentCard.propTypes = {
  currentResident: PropTypes.object
};