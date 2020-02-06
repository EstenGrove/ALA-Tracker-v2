import React, { useEffect } from "react";
import { NavLink, withRouter, useRouteMatch } from "react-router-dom";
import { PropTypes } from "prop-types";
import styles from "../../css/dashboard/Sidebar.module.scss";
import sprite from "../../assets/sidebar.svg";

const Sidebar = ({
	isExpanded,
	viewWidth,
	handleSidebar,
	setShowModal,
	state,
	history
}) => {
	const match = useRouteMatch(); // required for nested routes & link
	const {
		location: { pathname }
	} = history;

	// handles changing different sidebars
	const renderSidebar = () => {
		if (viewWidth <= 640) {
			return mobileSidebar;
		}
		if (isExpanded) {
			return expandedSidebar;
		}
		return collapsedSidebar;
	};

	const routeStyles = (active, toMatch) => {
		if (active === toMatch) {
			return styles.CollapsedSidebar_inner_list_item_active;
		}
		return styles.CollapsedSidebar_inner_list_item;
	};

	const mobileRouteStyles = (active, toMatch) => {
		if (active === toMatch) {
			return styles.MobileSidebar_inner_list_item_active;
		}
		return styles.MobileSidebar_inner_list_item;
	};

	const expandedSidebar = (
		<aside className={styles.Sidebar}>
			<section className={styles.Sidebar_top}>
				<svg className={styles.Sidebar_top_icon} onClick={handleSidebar}>
					<use xlinkHref={`${sprite}#icon-dots-three-horizontal`}></use>
				</svg>
			</section>
			<section className={styles.Sidebar_inner}>
				<ul className={styles.Sidebar_inner_list}>
					<li className={styles.Sidebar_inner_list_newTask}>
						<button
							className={styles.Sidebar_inner_list_newTask_btn}
							onClick={() => setShowModal(true)}
						>
							Create Task
						</button>
					</li>
					<li className={styles.Sidebar_inner_list_item}>
						<NavLink
							exact
							to={{
								pathname: `${match.url}/daily`,
								state: {}
							}}
							activeClassName={styles.active}
						>
							<svg className={styles.Sidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-event_note`}></use>
							</svg>
							<div>Daily View</div>
						</NavLink>
					</li>
					<li className={styles.Sidebar_inner_list_item}>
						<NavLink
							exact
							to={`${match.url}/calendar`}
							activeClassName={styles.active}
						>
							<svg className={styles.Sidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-event_available`}></use>
							</svg>
							<div>Calendar</div>
						</NavLink>
					</li>
					<li className={styles.Sidebar_inner_list_item}>
						<NavLink
							exact
							to={`${match.url}/summary`}
							activeClassName={styles.active}
						>
							<svg className={styles.Sidebar_inner_list_item_icon}>
								<use
									xlinkHref={`${sprite}#icon-insert_chartpollassessment`}
								></use>
							</svg>
							<div>Summary</div>
						</NavLink>
					</li>
					<li className={styles.Sidebar_inner_list_item}>
						<NavLink
							exact
							to={`${match.url}/pastdue`}
							activeClassName={styles.active}
						>
							<svg className={styles.Sidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-event_busy`}></use>
							</svg>
							<div>Past Due</div>
						</NavLink>
					</li>
					<li className={styles.Sidebar_inner_list_item}>
						<NavLink
							exact
							to={`${match.url}/residentinfo`}
							activeClassName={styles.active}
						>
							<svg className={styles.Sidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-perm_contact_calendar`}></use>
							</svg>
							<div>Resident</div>
						</NavLink>
					</li>
					<li className={styles.Sidebar_inner_list_item}>
						<NavLink
							exact
							to={`${match.url}/settings`}
							activeClassName={styles.active}
						>
							<svg className={styles.Sidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-settings1`}></use>
							</svg>
							<div>Settings</div>
						</NavLink>
					</li>
				</ul>
			</section>
		</aside>
	);

	const collapsedSidebar = (
		<aside className={styles.CollapsedSidebar}>
			<section className={styles.CollapsedSidebar_top}>
				<svg
					className={styles.CollapsedSidebar_top_icon}
					onClick={handleSidebar}
				>
					<use xlinkHref={`${sprite}#icon-dots-three-horizontal`}></use>
				</svg>
			</section>
			<section className={styles.CollapsedSidebar_inner}>
				<ul className={styles.CollapsedSidebar_inner_list}>
					<li className={styles.CollapsedSidebar_inner_list_newTask}>
						<button
							className={styles.CollapsedSidebar_inner_list_newTask_btn}
							onClick={() => setShowModal(true)}
						>
							<svg
								className={styles.CollapsedSidebar_inner_list_newTask_btn_icon}
							>
								<use xlinkHref={`${sprite}#icon-plus21`}></use>
							</svg>
						</button>
					</li>
					<li className={routeStyles(pathname, "/dashboard/daily")}>
						<NavLink to={`${match.url}/daily`} activeClassName={styles.active}>
							<svg className={styles.CollapsedSidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-event_note`}></use>
							</svg>
							<div className={styles.CollapsedSidebar_inner_list_item_text}>
								Daily View
							</div>
						</NavLink>
					</li>
					<li className={routeStyles(pathname, "/dashboard/calendar")}>
						<NavLink
							to={`${match.url}/calendar`}
							activeClassName={styles.active}
						>
							<svg className={styles.CollapsedSidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-event_available`}></use>
							</svg>
							<div className={styles.CollapsedSidebar_inner_list_item_text}>
								Calendar
							</div>
						</NavLink>
					</li>
					<li className={routeStyles(pathname, "/dashboard/summary")}>
						<NavLink
							to={`${match.url}/summary`}
							activeClassName={styles.active}
						>
							<svg className={styles.CollapsedSidebar_inner_list_item_icon}>
								<use
									xlinkHref={`${sprite}#icon-insert_chartpollassessment`}
								></use>
							</svg>
							<div className={styles.CollapsedSidebar_inner_list_item_text}>
								Summary
							</div>
						</NavLink>
					</li>
					<li className={routeStyles(pathname, "/dashboard/pastdue")}>
						<NavLink
							to={`${match.url}/pastdue`}
							activeClassName={styles.active}
						>
							<svg className={styles.CollapsedSidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-event_busy`}></use>
							</svg>
							<div className={styles.CollapsedSidebar_inner_list_item_text}>
								Past Due
							</div>
						</NavLink>
					</li>
					<li className={routeStyles(pathname, "/dashboard/residentinfo")}>
						<NavLink
							to={`${match.url}/residentinfo`}
							activeClassName={styles.active}
						>
							<svg className={styles.CollapsedSidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-perm_contact_calendar`}></use>
							</svg>
							<div className={styles.CollapsedSidebar_inner_list_item_text}>
								Resident
							</div>
						</NavLink>
					</li>
					<li className={routeStyles(pathname, "/dashboard/settings")}>
						<NavLink
							to={`${match.url}/settings`}
							activeClassName={styles.active}
						>
							<svg className={styles.CollapsedSidebar_inner_list_item_icon}>
								<use xlinkHref={`${sprite}#icon-settings1`}></use>
							</svg>
							<div className={styles.CollapsedSidebar_inner_list_item_text}>
								Settings
							</div>
						</NavLink>
					</li>
				</ul>
			</section>
		</aside>
	);

	const mobileSidebar = (
		<aside className={styles.MobileSidebar}>
			<ul className={styles.MobileSidebar_inner}>
				{/*  TASK BUTTON */}
				<li
					className={styles.MobileSidebar_inner_newTask}
					title="Create a task"
				>
					<svg
						className={styles.MobileSidebar_inner_newTask_icon}
						onClick={() => setShowModal(true)}
					>
						<use xlinkHref={`${sprite}#icon-plus21`}></use>
					</svg>
				</li>
				<li className={mobileRouteStyles(pathname, "/dashboard/daily")}>
					{/* MOBILE: dailiy */}
					<NavLink to={`${match.url}/daily`} activeClassName={styles.active}>
						<svg className={styles.MobileSidebar_inner_item_icon}>
							<use xlinkHref={`${sprite}#icon-event_note`}></use>
						</svg>
					</NavLink>
				</li>
				<li className={mobileRouteStyles(pathname, "/dashboard/calendar")}>
					{/* MOBILE: daily */}
					<NavLink to={`${match.url}/calendar`} activeClassName={styles.active}>
						<svg className={styles.MobileSidebar_inner_item_icon}>
							<use xlinkHref={`${sprite}#icon-event_available`}></use>
						</svg>
					</NavLink>
				</li>

				<li className={mobileRouteStyles(pathname, "/dashboard/summary")}>
					<NavLink to={`${match.url}/summary`} activeClassName={styles.active}>
						<svg className={styles.MobileSidebar_inner_item_icon}>
							<use xlinkHref={`${sprite}#icon-insert_chart_outlined`}></use>
						</svg>
					</NavLink>
				</li>
				<li className={mobileRouteStyles(pathname, "/dashboard/residentinfo")}>
					<NavLink
						to={`${match.url}/residentinfo`}
						activeClassName={styles.active}
					>
						<svg className={styles.MobileSidebar_inner_item_icon}>
							<use xlinkHref={`${sprite}#icon-perm_contact_calendar`}></use>
						</svg>
					</NavLink>
				</li>
				<li className={mobileRouteStyles(pathname, "/dashboard/settings")}>
					<NavLink to={`${match.url}/settings`} activeClassName={styles.active}>
						<svg className={styles.MobileSidebar_inner_item_icon}>
							<use xlinkHref={`${sprite}#icon-settings1`}></use>
						</svg>
					</NavLink>
				</li>
			</ul>
		</aside>
	);

	return <>{renderSidebar()}</>;
};

export default withRouter(Sidebar);

Sidebar.defaultProps = {};

Sidebar.propTypes = {
	isExpanded: PropTypes.bool.isRequired,
	handleSidebar: PropTypes.func.isRequired,
	state: PropTypes.object,
	scheduledTasks: PropTypes.arrayOf(PropTypes.object),
	unscheduledTasks: PropTypes.arrayOf(PropTypes.object),
	currentResident: PropTypes.object,
	categories: PropTypes.arrayOf(PropTypes.object)
};
