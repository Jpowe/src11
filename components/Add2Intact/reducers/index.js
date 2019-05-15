import {
  SET_PORTFOLIO,
  SELECTED_PORTFOLIO,
  SET_SUBMISSION,
  SELECTED_SUBMISSION,
  SELECTED_ACCOUNT,
  SET_VAR
} from "../actions";
import R from "ramda";
import { Log, LogTable } from "../../../utils/utils";
const contains = x => {
  return R.contains(x, ["FailedTx", "Manual"]);
};
/* FOR BANK DATA */
const addFields = fields => {
  Log("addFields f");

  Log(JSON.stringify(fields));
  LogTable(fields);

  //const t1 = R.prop("PositivePayBanks", fields);

  //const arrObj = t1[0].positivePaySubmissions;

  let y1, y2;
  y1 = fields.map(x => {
    return { ...x, submit: false, selected: false };
  });
  y2 = y1.map(x => (contains(x.status) ? { ...x, submit: true } : x));
  return y2;
};

export const addepar2intact = (state = [], action) => {
  switch (action.type) {
    case SET_VAR:
      return {
        ...state,
        [action.ky]: action.payload
      };
    case SET_PORTFOLIO:
      console.log("SET_PORTFOLIO");
      return {
        ...state,
        portfolio: action.payload
      };
    case SET_SUBMISSION:
      console.log("SET_SUBMISSION");
      return {
        ...state,
        submission: action.payload
      };
    case SELECTED_PORTFOLIO:
      console.log("REDUCER selected portfolio");
      return {
        ...state,
        selectedPortfolio: action.payload
      };
    case SELECTED_SUBMISSION:
      console.log("REDUCER selected submission");
      return {
        ...state,
        selectedSubmission: action.payload
      };
    case SELECTED_ACCOUNT:
      console.log("REDUCER selected account");
      return {
        ...state,
        selectedAccount: action.payload
      };

    default:
      return state;
  }
};
