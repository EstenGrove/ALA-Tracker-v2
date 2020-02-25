const ALERTS_MODEL = {
	ERROR: {
		heading: "Error",
		subheading: ""
	},
	SUCCESS: {
		heading: "Success",
		subheading: ""
	},
	WARN: {
		heading: "Warning",
		subheading: ""
	},
	INFO: {
		heading: "Notice",
		subheading: ""
	}
};

class Alerts {
	constructor() {
		this._model = {
			ERROR: {
				heading: "",
				subheading: ""
			},
			SUCCESS: {
				heading: "Success",
				subheading: ""
			},
			WARN: {
				heading: "Warning",
				subheading: ""
			},
			INFO: {
				heading: "Notice",
				subheading: ""
			}
		};
	}
	setAlert(type, heading, subheading) {
		return (this._model[type] = {
			heading: heading,
			subheading: subheading
		});
	}
	setAlertHeading(type, heading) {
		return (this._model[type] = {
			...this._model[type],
			heading: heading
		});
	}
	setAlertSubheading(type, subheading) {
		return (this._model[type] = {
			...this._model[type],
			subheading: subheading
		});
	}
	getModel() {
		return this._model;
	}
	getAlert(type) {
		return this._model[type];
	}
	getAlertHeading(type) {
		return this._model[type].heading;
	}
	getAlertSubheading(type) {
		return this._model[type].subheading;
	}
}

export { ALERTS_MODEL, Alerts };
