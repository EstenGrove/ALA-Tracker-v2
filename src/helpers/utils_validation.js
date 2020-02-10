import { isEmptyObj, isEmptyVal, isBool } from "./utils_types.js";

// CHECKS IF FORM IS COMPLETED
const isValidForm = vals => {
  if (isEmptyObj(vals)) return false;
  let results = [];
  for (const prop in vals) {
    if (!isBool(vals[prop]) && isEmptyVal(vals[prop])) {
      results.push(false);
    }
    results.push(true);
  }
  return results.includes(false) ? false : true;
};
