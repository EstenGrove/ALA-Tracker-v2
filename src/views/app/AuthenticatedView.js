import React, { useEffect, useState, useContext } from "react";
import { PropTypes } from "prop-types";
import { AuthContext } from "../../state/AuthContext";
import { GlobalStateContext } from "../../state/GlobalStateContext";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { logout } from "../../helpers/utils_auth";
import {
	getInitialResource,
	syncResourceToState
} from "../../helpers/utils_requests";
import { isEmptyVal, isEmptyObj } from "../../helpers/utils_types";
import { handleResidentSelection } from "../../helpers/utils_residents";
import { mergeDailyResidentData } from "../../helpers/utils_residentData";
import { populateState } from "../../helpers/utils_state";

import styles from "../../css/app/AuthenticatedView.module.scss";

import Navbar from "../../components/app/Navbar";
import ResidentDropdown from "../../components/app/ResidentDropdown";
import ResidentCard from "../../components/app/ResidentCard";
import DashboardNav from "../../components/dashboard/DashboardNav";
import DashboardContainer from "../../components/dashboard/DashboardContainer";
import HelpLegend from "../../components/app/HelpLegend";

const AuthenticatedView = ({ history }) => {
	const { authData } = useContext(AuthContext);
	const { state, dispatch } = useContext(GlobalStateContext);
	const { width } = useMediaQuery();
	const [isExpanded, setIsExpanded] = useState(true);
	const [currentResident, setCurrentResident] = useState({});

	const handleSidebar = () => setIsExpanded(!isExpanded);

	// handles expanding/shrinking container based on Sidebar's width
	const customStyles = {
		paddingLeft: isExpanded ? "22rem" : "8rem"
	};
	// IMPLEMENT MOBILE CHECKER FOR CONTAINER
	const mobileStyles = {
		paddingLeft: width <= 630 ? "0" : null
	};

	const handleLogout = async e => {
		const { token } = authData;
		const wasSuccessful = await logout(token);
		if (wasSuccessful) {
			return history.replaceState("/");
		}
		return alert("Something went wrong. Please try again.");
	};

	const handleInitialResource = async () => {
		const resource = await getInitialResource(authData, state, dispatch);
		return syncResourceToState({ ...resource, authData }, state, dispatch);
	};

	const selectResident = e => {
		e.preventDefault();
		const { value } = e.target;
		if (isEmptyVal(value)) return setCurrentResident({});

		// parses text value, finds resident by id sets local state
		return handleResidentSelection(
			value,
			state.globals.residents,
			setCurrentResident
		);
	};

	const loadResident = async e => {
		if (isEmptyObj(currentResident)) return alert("Please select a resident.");
		const { ResidentID } = currentResident;
		const { token } = authData;

		dispatch({ type: "LOADING" });

		// fetch data and merged together
		const merged = await mergeDailyResidentData(token, ResidentID, new Date());
		const oldState = { ...state };
		const newState = populateState(merged, oldState);

		return dispatch({
			type: "SUCCESS",
			data: {
				newState: newState
			}
		});
	};

	useEffect(() => {
		// prevents memory leaks (DO NOT REMOVE!!)
		let isMounted = true;

		if (!isMounted) {
			return;
		}
		handleInitialResource();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// ??? REMOVE LATER MAYBE ??? //
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		const handleShortcuts = e => {
			console.log("e", e);
			if (e.key === "/" || e.code === "Slash") {
				return setIsExpanded(!isExpanded);
			}
			if (e.key === "s" && e.ctrlKey) {
				return alert("hellow");
			}
			return;
		};
		window.addEventListener("keydown", handleShortcuts);

		return () => {
			isMounted = false;
			window.removeEventListener("keydown", handleShortcuts);
		};
	}, [isExpanded]);
	// ??? REMOVE LATER MAYBE ??? //

	return (
		<>
			<div className={styles.AuthenticatedView}>
				<Navbar
					currentUser={state.user}
					dispatch={dispatch}
					handleLogout={handleLogout}
				/>
				<section
					className={styles.AuthenticatedView_dashboard}
					style={width <= 630 ? mobileStyles : customStyles}
				>
					<header className={styles.AuthenticatedView_dashboard_header}>
						<ResidentDropdown
							residents={state.globals.residents}
							name="currentResident"
							id="currentResident"
							selectResident={selectResident}
							loadResident={loadResident}
						/>
						<DashboardNav />
						<ResidentCard
							currentResident={currentResident}
							residentDetails={state.globals.currentResident}
						/>
					</header>
					<DashboardContainer
						isExpanded={isExpanded}
						viewWidth={width}
						state={state}
						dispatch={dispatch}
						handleSidebar={handleSidebar}
					/>
				</section>
			</div>

			<HelpLegend />
		</>
	);
};

export default AuthenticatedView;

AuthenticatedView.defaultProps = {};

AuthenticatedView.propTypes = {
	history: PropTypes.object
};
