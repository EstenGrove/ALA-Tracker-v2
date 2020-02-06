import { test } from "./utils_env";
import { generic } from "./utils_endpoints";
import { genericCount } from "./utils_params";

const getGenericCount = async (token, params, type = "residents") => {
	let url = test.base + generic.count;
	url +=
		"?" +
		new URLSearchParams({
			...genericCount[type],
			...params
		});

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa(test.user + ":" + test.password),
				SecurityToken: token,
				"Content-Type": "application/json"
			}
		});
		const response = await request.json();
		return response.Data;
	} catch (err) {
		console.log("An error occurred ", err);
		return err.message;
	}
};

export { getGenericCount };
