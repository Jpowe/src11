import * as R from "ramda";
import * as HTTP from "../../../common/http";
import { Log, LogTable } from "../../../utils/utils";

export const ADDEPAR_RECEIVE_ROWS = "ADDEPAR_RECEIVE_ROWS";
export const ADDEPAR_SUBMIT_ROW = "ADDEPAR_SUBMIT_ROW";
export const ADDEPAR_START_REQUEST = "ADDEPAR_START_REQUEST";

export const getAddepar = () => async (dispatch, getState) => {
  Log("ADEPAR ACTION GETDATA");
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  dispatch(startRequest());
  const data = await HTTP.getAddepar(token, login);
  const addepar = R.prop("AddeparBloombergSubmissions", data);
  dispatch(receiveRows(addepar));
  LogTable(addepar);
};

export const startRequest = () => ({
  type: ADDEPAR_START_REQUEST
});

export const receiveRows = json => ({
  type: ADDEPAR_RECEIVE_ROWS,
  rows: json
});
/*CreateAddeparBloombergSubmission*/
export const submitNewRow = () => async (dispatch, getState) => {
  Log("Addepar ACTION submitNEWrow f ");
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const ppSubmit = await HTTP.createAddeparBloombergSubmission(token);
  const json = {
    id: 33,
    createdTimestamp: "3/8/2018",
    status: "PENDING",
    submittedBy: "You"
  };
  dispatch(rowSubmit(json));
};
export const rowSubmit = json => ({
  type: ADDEPAR_SUBMIT_ROW,
  row: json
});
