import React, { createContext, useReducer } from "react";
import { subtaskUpdater } from "../helpers/utils_subtasks";

const initialGlobalState = {
	app: {
		isLoading: false,
		hasLoaded: false,
		isError: false,
		hasCache: false,
		hasUpdated: false
	},
	user: {
		firstName: null,
		lastName: null,
		username: null,
		password: null,
		userID: null,
		facilityID: null,
		isAdmin: false,
		token: null
	},
	globals: {
		currentResident: {
			firstName: null,
			lastName: null,
			age: null,
			residentID: null,
			unit: null,
			height: null,
			weight: null,
			mdReportDue: null,
			servicePlanDue: null,
			monthlyMedReview: null,
			bathNotes: null,
			escortNotes: null,
			groomingNotes: null,
			hygieneNotes: null
		},
		residents: [],
		adlDescriptions: [],
		unscheduledTasks: [],
		scheduledTasks: [],
		scheduledTasksHistory: [],
		scheduledTasksFuture: [],
		trackingTasks: [],
		parsedTasks: {},
		adls: [],
		profile: {},
		charting: {},
		categories: [],
		vitals: []
	}
};

const GlobalStateContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case "SUCCESS": {
			const { newState } = action.data;
			return {
				...state,
				...newState,
				app: {
					hasLoaded: true,
					isLoading: false,
					isError: false,
					hasCache: true
				}
			};
		}
		case "LOADING": {
			return {
				...state,
				app: {
					hasLoaded: false,
					isLoading: true,
					isError: false,
					hasCache: false
				}
			};
		}
		case "ERROR": {
			return {
				...state,
				app: {
					hasLoaded: false,
					isLoading: false,
					isError: true,
					hasCache: false
				}
			};
		}
		case "UPDATE": {
			// SAME AS "SUCCESS" ACTION
			const { newState } = action.data;
			return {
				...state,
				...newState,
				app: {
					hasLoaded: true,
					isLoading: false,
					isError: false,
					hasCache: false
				}
			};
		}
		case "MARK_SUBTASK": {
			const { updatedSubtask } = action.data;
			const newTasks = subtaskUpdater(
				updatedSubtask,
				state.globals.scheduledTasks
			);
			return {
				...state,
				app: {
					...state.app,
					hasUpdated: true
				},
				globals: {
					...state.globals,
					scheduledTasks: [...newTasks]
				}
			};
		}
		case "UPDATE_SUBTASK": {
			const { updatedSubtask } = action.data;
			const newTasks = subtaskUpdater(
				updatedSubtask,
				state.globals.scheduledTasks
			);

			return {
				...state,
				app: {
					...state.app,
					hasUpdated: true
				},
				globals: {
					...state.globals,
					scheduledTasks: [...newTasks]
				}
			};
		}
		case "REFRESH_STATE": {
			const { newState } = action.data;
			return {
				...newState
			};
		}
		case "RESET": {
			return {
				...initialGlobalState
			};
		}

		default:
			return new Error("Invalid action type", action.type);
	}
};

const GlobalStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialGlobalState);

	return (
		<GlobalStateContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalStateContext.Provider>
	);
};

export { initialGlobalState, GlobalStateContext, GlobalStateProvider };
