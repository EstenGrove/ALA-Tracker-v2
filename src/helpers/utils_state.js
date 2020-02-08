import { handleEmpties } from "./utils_types";
import { isLOA } from "./utils_residentData";

const populateState = (data, state) => {
	const {
		ADL,
		ADLCareTask,
		ADLCareTaskHistory,
		ADLCareTaskFuture,
		ADLCareLevel,
		Resident,
		ResidentId,
		AssessmentTrackingTask,
		AssessmentTrackingTaskNote,
		Charts,
		Vitals,
		UnscheduledTasks,
		AssessmentUnscheduleTaskNote,
		ADLCategory,
		LOA,
		Medications
		// AssessmentTask,
		// AssessmentTracking,
	} = data;
	const [resident] = Resident;

	console.log("medications", Medications);

	const newState = {
		...state,
		globals: {
			...state.globals,
			currentResident: {
				...resident,
				ResidentId: ResidentId,
				isLOA: isLOA(LOA[0]),
				Meds: handleEmpties(Medications)
			},
			adlDescriptions: handleEmpties(ADL),
			unscheduledTasks: handleEmpties(UnscheduledTasks),
			unscheduledTaskNotes: handleEmpties(AssessmentUnscheduleTaskNote),
			scheduledTasks: handleEmpties(ADLCareTask),
			scheduledTaskNotes: handleEmpties(AssessmentTrackingTaskNote),
			scheduledTasksHistory: handleEmpties(ADLCareTaskHistory),
			scheduledTasksFuture: handleEmpties(ADLCareTaskFuture),
			trackingTasks: handleEmpties(AssessmentTrackingTask),
			categories: handleEmpties(ADLCareLevel),
			activeCategories: handleEmpties(ADLCategory),
			charting: handleEmpties(Charts),
			vitals: handleEmpties(Vitals),
			loa: handleEmpties(LOA)
		}
	};

	return { ...newState };
};

export { populateState };
