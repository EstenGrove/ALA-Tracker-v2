import React from "react";
import { AuthProvider } from "./AuthContext";
import { GlobalStateProvider } from "./GlobalStateContext";
import { BlurProvider } from "./BlurContext";

const AppProviders = ({ children }) => {
	return (
		<AuthProvider>
			<GlobalStateProvider>
				<BlurProvider>{children}</BlurProvider>
			</GlobalStateProvider>
		</AuthProvider>
	);
};

export { AppProviders };
