import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import styles from "../../css/shared/LoadingButton.module.scss";
import SpinnerSM from "./SpinnerSM";

const LoadingButton = ({
	type = "button",
	autoFocus = false,
	dotColor = "#ffffff",
	ms = 3000,
	handleClick,
	isDisabled = false,
	customStyles = {},
	children
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const clickHandler = e => {
		e.preventDefault();
		setIsLoading(true);
		return handleClick(e);
	};

	// handling animation trigger and reset
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		let timer;
		if (isLoading) {
			timer = setTimeout(() => {
				setIsLoading(false);
			}, ms);
		}

		return () => {
			isMounted = false;
			clearTimeout(timer);
		};
	}, [isLoading, ms]);

	return (
		<button
			className={
				isLoading || isDisabled
					? styles.LoadingButton_isDisabled
					: styles.LoadingButton
			}
			onClick={clickHandler}
			disabled={isLoading || isDisabled}
			style={customStyles}
			type={type}
			autoFocus={autoFocus}
		>
			{isLoading && <SpinnerSM color={dotColor} />}
			{children}
		</button>
	);
};

export default LoadingButton;

LoadingButton.defaultProps = {
	type: "button",
	autoFocus: false,
	dotColor: "#ffffff", // color of the animation dots
	ms: 3000,
	customStyles: {}
};

LoadingButton.propTypes = {
	type: PropTypes.string,
	autoFocus: PropTypes.bool,
	dotColor: PropTypes.string,
	handleClick: PropTypes.func.isRequired,
	ms: PropTypes.number,
	customStyles: PropTypes.object,
	children: PropTypes.any.isRequired
};
