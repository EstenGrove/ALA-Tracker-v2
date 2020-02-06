import React, { useEffect, useState, useContext } from "react";
import { PropTypes } from "prop-types";
import { GlobalStateContext } from "../../state/GlobalStateContext";
import { isEmptyArray, isEmptyObj } from "../../helpers/utils_types";
import {
	getDailyPastDue,
	getWeeklyPastDue,
	getMonthlyPastDue
} from "../../helpers/utils_pastdue";
import { getGenericCount } from "../../helpers/utils_generic";
import styles from "../../css/dashboard/PastDueView.module.scss";
import PastDuePanel from "../../components/pastdue/PastDuePanel";
import { startOfDay, endOfDay } from "date-fns";

const PastDueView = ({ history }) => {
	const { state, dispatch } = useContext(GlobalStateContext);
	const { app, user, globals } = state;
	const [pastDueCount, setPastDueCount] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(25);
	const [pastDueRecords, setPastDueRecords] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getPastDueRecords = async () => {
		const { token, facilityID } = user;
		setIsLoading(true);
		const records = await getDailyPastDue(
			token,
			facilityID,
			startOfDay(new Date()),
			endOfDay(new Date()),
			0,
			25
		);
		return setPastDueRecords(records);
	};

	// used for fetching more records after initial fetch.
	const getMorePastDueRecords = async index => {
		const { token, facilityID } = user;
		setIsLoading(true);
		const records = await getDailyPastDue(
			token,
			facilityID,
			startOfDay(new Date()),
			endOfDay(new Date()),
			index,
			index + 25
		);
		return setPastDueRecords(records);
	};

	const getPastDueCount = async () => {
		const { token, facilityID } = user;
		const params = {
			facilityId: facilityID
		};
		const count = await getGenericCount(token, params, "residents");
		return setPastDueCount(count);
	};

	const getInitialPastDue = () => {
		getPastDueRecords();
		getPastDueCount();
	};

	const viewMorePastDue = () => {
		setCurrentIndex(currentIndex + 25);
		return getMorePastDueRecords(currentIndex);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		// fetches TOTAL number of past due records for facility
		getInitialPastDue();
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // onMount ONLY

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		if (!isEmptyArray(pastDueRecords)) {
			return setIsLoading(false);
		}
		return () => {
			isMounted = false;
		};
	}, [pastDueRecords]);

	return (
		<div className={styles.PastDueView}>
			<h1 className="title">Past Due View</h1>
			<h2 className="subtitle">Under Construction</h2>
			<PastDuePanel
				records={pastDueRecords}
				isLoading={isLoading}
				viewMore={viewMorePastDue}
			/>
		</div>
	);
};

export default PastDueView;

PastDueView.defaultProps = {};

PastDueView.propTypes = {};
