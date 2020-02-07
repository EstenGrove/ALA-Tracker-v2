import React, { useState } from "react";
import styles from "../../css/app/HelpLegend.module.scss";
import { PropTypes } from "prop-types";
import { STATUS } from "../../helpers/utils_options";
import { statusTextColor } from "../../helpers/utils_styles";
import ModalSM from "../shared/ModalSM";
import sprite from "../../assets/sidebar.svg";
import StatusBadge from "../shared/StatusBadge";

// help-with-circle

// REQUIREMENTS:
// 1. COLOR LEGEND FOR STATUS
// 2. SHOW STATUS BADGES WITH DEFINITIONS

const HelpLegend = () => {
	const [openHelp, setOpenHelp] = useState(false);
	return (
		<aside className={styles.HelpLegend}>
			<section className={styles.HelpLegend_floating}>
				<svg
					className={styles.HelpLegend_floating_icon}
					onClick={() => setOpenHelp(!openHelp)}
				>
					<use xlinkHref={`${sprite}#icon-help1`}></use>
				</svg>
			</section>

			{openHelp && (
				<ModalSM title="Help Menu" closeModal={() => setOpenHelp(false)}>
					<section className={styles.HelpLegend_section}>
						<h2 className={styles.HelpLegend_section_title}>
							Status Color Legend
						</h2>
						<div className={styles.HelpLegend_section_entry}>
							<p className={styles.HelpLegend_section_entry_text}>
								GREEN:<b style={statusTextColor.complete}> COMPLETE</b>
							</p>
							<p className={styles.HelpLegend_section_entry_text}>
								DARK-GREY/CHARCOAL:{" "}
								<b style={statusTextColor.notcomplete}>NOT-COMPLETE</b>{" "}
							</p>
							<p className={styles.HelpLegend_section_entry_text}>
								RED: <b style={statusTextColor.missedevent}>MISSED-EVENT</b>
							</p>
							<p className={styles.HelpLegend_section_entry_text}>
								ORANGE: <b style={statusTextColor.inprogress}>IN-PROGRESS</b>
							</p>
							<p className={styles.HelpLegend_section_entry_text}>
								PEACH: <b style={statusTextColor.pending}>PENDING</b>
							</p>
							<p className={styles.HelpLegend_section_entry_text}>
								RED: <b style={statusTextColor.missedevent}>PAST-DUE</b>
							</p>
						</div>
						<hr className="divider" />
						<div className={styles.HelpLegend_section_entry}>
							<h2 className={styles.HelpLegend_section_title}>
								Status Badges Legend
							</h2>
							<div className={styles.HelpLegend_section_entry}>
								{STATUS &&
									STATUS.map((status, index) => (
										<div className={styles.HelpLegend_section_entry_badges}>
											<StatusBadge size="XSM" status={status}>
												{status}
											</StatusBadge>
										</div>
									))}
							</div>
							<hr className="divider" />
							<div className={styles.HelpLegend_section_entry}>
								<h2 className={styles.HelpLegend_section_title}>
									Create a New Task
								</h2>

								<ol
									start="1"
									className={styles.HelpLegend_section_entry_numberedList}
								>
									<li
										className={
											styles.HelpLegend_section_entry_numberedList_item
										}
									>
										Click on the "Create a Task" button in the sidebar.
									</li>
									<li
										className={
											styles.HelpLegend_section_entry_numberedList_item
										}
									>
										A window will popup. Fill out the task details form.
									</li>
									<li
										className={
											styles.HelpLegend_section_entry_numberedList_item
										}
									>
										Add any checklists you'd like.
									</li>
									<li
										className={
											styles.HelpLegend_section_entry_numberedList_item
										}
									>
										Click the "Save" button at the bottom of the popup window.
									</li>
								</ol>
							</div>
						</div>
					</section>
					{/*  */}
					{/*  */}
				</ModalSM>
			)}
		</aside>
	);
};

export default HelpLegend;

HelpLegend.defaultProps = {};

HelpLegend.propTypes = {};
