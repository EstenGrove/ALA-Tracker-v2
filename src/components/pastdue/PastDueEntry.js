import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { themeColors } from "../../helpers/utils_styles";
import {
	getTaskCategory,
	getTaskDescription,
	getTaskStatus,
	getTaskDueDate
} from "../../helpers/utils_tasks";
import sprite from "../../assets/tasks.svg";
import styles from "../../css/pastdue/PastDueEntry.module.scss";
import closeIcon from "../../assets/buttons.svg";
import StatusBadge from "../shared/StatusBadge";

const PastDueEntry = ({ task }) => {
	const [showOptions, setShowOptions] = useState(false);

	return (
		<article
			className={styles.PastDueEntry}
			title={getTaskDescription(task, 200)}
		>
			<section className={styles.PastDueEntry_group}>
				<h2 className={styles.PastDueEntry_group_title}>
					{getTaskCategory(task)}
				</h2>
				<p className={styles.PastDueEntry_group_text}>
					{getTaskDescription(task, 50)}
				</p>
			</section>
			<section className={styles.PastDueEntry_group_two}>
				<StatusBadge size="XSM" status="PAST-DUE">
					PAST-DUE
				</StatusBadge>
			</section>
			<section className={styles.PastDueEntry_group_three}>
				<svg className={styles.PastDueEntry_icon}>
					<use xlinkHref={`${sprite}#icon-timer`}></use>
				</svg>
				<h4 className={styles.PastDueEntry_group_three_date}>
					Due <b>{getTaskDueDate(task)}</b>
				</h4>
			</section>
			<section className={styles.PastDueEntry_group_four}>
				<svg
					className={styles.PastDueEntry_icon}
					onClick={() => setShowOptions(true)}
				>
					<use xlinkHref={`${sprite}#icon-dots-three-horizontal`}></use>
				</svg>

				{showOptions && (
					<aside className={styles.PastDueEntry_group_four_menu}>
						<ul className={styles.PastDueEntry_group_four_menu_list}>
							<li>
								<svg
									className={styles.PastDueEntry_icon}
									onClick={() => setShowOptions(false)}
								>
									<use
										xlinkHref={`${closeIcon}#icon-clearclose`}
										fill={themeColors.main.red}
									></use>
								</svg>
							</li>
							<li>Mark Completed</li>
							<li>Edit/Update Task</li>
							<li>
								<svg className={styles.PastDueEntry_icon}>
									<use
										xlinkHref={`${sprite}#icon-delete`}
										fill={themeColors.main.red}
									></use>
								</svg>
								<span>Remove Task</span>
							</li>
						</ul>
					</aside>
				)}
			</section>
		</article>
	);
};

export default PastDueEntry;

PastDueEntry.defaultProps = {};

PastDueEntry.propTypes = {
	task: PropTypes.object.isRequired
};
