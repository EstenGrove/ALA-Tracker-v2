import React, { useEffect, useState, useContext } from "react";
import { PropTypes } from "prop-types";
import { GlobalStateContext } from "../../state/GlobalStateContext";
import { isEmptyArray, isEmptyObj } from "../../helpers/utils_types";
import styles from "../../css/dashboard/PastDueView.module.scss";
import { getGenericCount } from "../../helpers/utils_generic";

const PastDueView = ({ history }) => {
	const { state, dispatch } = useContext(GlobalStateContext);
	const { app, user, globals } = state;
	const [pastDueCount, setPastDueCount] = useState(null);
	const [pastDueRecords, setPastDueRecords] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getPastDueRecords = async () => {};

	const getPastDueCount = async () => {
		const { token, facilityID } = user;
		const params = {
			facilityId: facilityID
		};
		const count = await getGenericCount(token, params, "residents");
		return setPastDueCount(count);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		// fetches TOTAL number of past due records for facility
		getPastDueCount();
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // onMount ONLY

	return (
		<div className={styles.PastDueView}>
			<h1 className="title">Past Due View</h1>
			<h2 className="subtitle">Coming Soon</h2>
			{/*  */}
		</div>
	);
};

export default PastDueView;

PastDueView.defaultProps = {};

PastDueView.propTypes = {};
