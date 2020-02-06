import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { sortAlphabetically } from "../../helpers/utils_tasks";
import { isEmptyVal } from "../../helpers/utils_types";
import styles from "../../css/pastdue/PastDuePanel.module.scss";
import sprite from "../../assets/carets-arrows.svg";
import TextInput from "../shared/TextInput";
import PastDueList from "./PastDueList";
import ButtonSM from "../shared/ButtonSM";

const customStyles = {
	backgroundColor: "#ffffff"
};

const viewMoreStyles = {
	borderRadius: "5rem",
	marginTop: "2rem",
	marginBottom: "2rem",
	boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
};

const PastDuePanel = ({ records = [] }) => {
	const [sortedRecords, setSortedRecords] = useState(
		sortAlphabetically(records, "ResidentInfo", "ResidentLastName")
	);
	const [search, setSearch] = useState("");
	// number of rows current fetched from database
	const [rowCount, setRowCount] = useState(25);
	const handleSearch = e => {
		const { value } = e.target;
		setSearch(value);
		setSortedRecords(
			sortAlphabetically(
				records,
				"ResidentInfo",
				"ResidentLastName"
			).filter(entry =>
				entry.ResidentInfo.ResidentLastName.toLowerCase().startsWith(
					search.toLowerCase()
				)
			)
		);
	};

	const viewMore = async e => {
		// FETCH MORE RECORDS BY ROW COUNT
	};

	useEffect(() => {
		if (isEmptyVal(search)) {
			return setSortedRecords(
				sortAlphabetically(records, "ResidentInfo", "ResidentLastName")
			);
		}
	}, [records, search]);

	return (
		<>
			<article className={styles.PastDuePanel}>
				<section className={styles.PastDuePanel_search}>
					<TextInput
						name="searchByResident"
						id="searchByResident"
						label="Search by Resident Last Name"
						placeholder="resident's last name..."
						val={search}
						handleChange={handleSearch}
						customStyles={customStyles}
					/>
				</section>
				<section className={styles.PastDuePanel_entries}>
					{sortedRecords &&
						sortedRecords.map((entry, index) => (
							<>
								<hr />
								<PastDueList
									record={entry}
									key={entry.ResidentInfo.ResidentID + index}
								/>
							</>
						))}
					<div style={{ display: "flex", justifyContent: "center" }}>
						<ButtonSM handleClick={viewMore} customStyles={viewMoreStyles}>
							<div className={styles.PastDuePanel_viewMore}>
								<svg className={styles.PastDuePanel_viewMore_icon}>
									<use xlinkHref={`${sprite}#icon-arrow_drop_down`}></use>
								</svg>{" "}
								<span>View More Results</span>
							</div>
						</ButtonSM>
					</div>
				</section>
			</article>
		</>
	);
};

export default PastDuePanel;

PastDuePanel.defaultProps = {};

PastDuePanel.propTypes = {};
