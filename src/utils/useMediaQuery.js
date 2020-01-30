import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
// useMediaQuery - watches screen size(width, height etc) and exposes that data
export const useMediaQuery = (callback = null) => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		const handleResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
			if (!callback) {
				return;
			}
			callback(); // only run callback is one is passed to "useMediaQuery"
		};
		// add window tracking
		window.addEventListener("resize", handleResize);

		// handle cleanup, remove tracking
		return () => {
			isMounted = false;
			window.removeEventListener("resize", handleResize);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // ONLY run on mount/unmount - add deps to run more frequently.

	return { width, height };
};

useMediaQuery.defaultProps = {
	callback: null
};

useMediaQuery.propTypes = {
	callback: PropTypes.func
};
