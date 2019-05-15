import * as R from "ramda";
import * as HTTP from "../../../common/http";

export const IRIS_CALENDAR_RESPONSE = "IRIS_CALENDAR_RESPONSE";
export const IRISCALENDAR_START_REQUEST = "IRISCALENDAR_START_REQUEST";

export const submitCalendar = (startDateID, endDateID) => async (
  dispatch,
  getState
) => {
  let result;
  console.log("SUBMIT CALENDAR ACTION " + [startDateID, endDateID]);
  //  JSON.stringify(startDateID);
  //  JSON.stringify(endDateID);
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  dispatch(startRequest());
  result = await HTTP.submitCalendar(token, startDateID, endDateID);
  console.log(
    "HTTP result: " + JSON.stringify(result.CreateIrisCalendarSubmission)
  );
  dispatch(receiveResult(result.CreateIrisCalendarSubmission));
};

export const receiveResult = json => ({
  type: IRIS_CALENDAR_RESPONSE,
  payload: json
});

export const startRequest = () => ({
  type: IRISCALENDAR_START_REQUEST
});
