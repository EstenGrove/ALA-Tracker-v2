import React, { useState, createContext } from "react";

const initialBlurState = false;

const BlurContext = createContext();

const BlurProvider = ({ children }) => {
	const [addBlur, setAddBlur] = useState(false);

	return (
		<BlurContext.Provider value={{ addBlur, setAddBlur }}>
			{children}
		</BlurContext.Provider>
	);
};

export { initialBlurState, BlurContext, BlurProvider };
