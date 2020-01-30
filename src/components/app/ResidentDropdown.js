import React from "react";
import { PropTypes } from "prop-types";
import { formatResidentNameOnly } from "../../helpers/utils_residents";
import { isEmptyArray } from "../../helpers/utils_types";
import styles from "../../css/app/ResidentDropdown.module.scss";
import SearchButton from "../shared/SearchButton";

const ResidentDropdown = ({
	label = "PLEASE SELECT A RESIDENT",
	id = "currentResident",
	name = "currentResident",
	residents = [],
	selectResident,
	loadResident
}) => {
	return (
		<div className={styles.ResidentDropdown}>
			<h4 htmlFor="currentResident" className={styles.ResidentDropdown_label}>
				{label}
			</h4>
			<section className={styles.ResidentDropdown_search}>
				<input
					type="search"
					name={name}
					list={id}
					onChange={selectResident}
					className={styles.ResidentDropdown_search_input}
				/>
				<SearchButton
					text="Load"
					action="Loading..."
					handleClick={loadResident}
				/>
			</section>
			<datalist className={styles.ResidentDropdown_list} id={id}>
				{!isEmptyArray(residents) &&
					residents.map((resident, index) => (
						<option
							value={`${formatResidentNameOnly(resident)} ~ ALA ID: ${
								resident.ResidentID
							}`}
							key={resident.ResidentID}
						>
							{formatResidentNameOnly(resident)}
						</option>
					))}
			</datalist>
		</div>
	);
};

export default ResidentDropdown;

ResidentDropdown.defaultProps = {
	label: "PLEASE SELECT A RESIDENT",
	id: "currentResident",
	name: "currentResident",
	residents: []
};

ResidentDropdown.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	residents: PropTypes.array,
	selectResident: PropTypes.func.isRequired,
	loadResident: PropTypes.func.isRequired
	// searchResidents: PropTypes.func.isRequired
};
