import React, { useState } from "react";
import { createContext } from "react";

const initialAuthState = {
	username: null,
	password: null,
	token: null,
	sessionID: null,
	isAuthenticated: false,
	isAdmin: false,
	isLOA: false
};

const AuthContext = createContext(initialAuthState);

const AuthProvider = ({ children }) => {
	const [authData, setAuthData] = useState(initialAuthState);

	return (
		<AuthContext.Provider value={{ authData, setAuthData }}>
			{children}
		</AuthContext.Provider>
	);
};

export { initialAuthState, AuthContext, AuthProvider };
