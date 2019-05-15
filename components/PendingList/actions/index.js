import * as R from "ramda";
import * as HTTP from "../../../common/http";
import { Log, LogTable } from "../../../utils/utils";

//export const SUBMIT_PENDING = "SUBMIT_PENDING";

export const submitPending = (teamWorkID, dateFormat, list) => async (
  dispatch,
  getState
) => {
  let result;
  console.log(
    "SUBMITPENDIN ACTION submitPending f " + [teamWorkID, dateFormat, list]
  );
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  if (list == "iris") {
    console.log("list eq iris");
    result = await HTTP.createPendingReport(token);
  } else if (list == "pending") {
    console.log("list eq pending");
    result = await HTTP.createPendingSubmission(token, teamWorkID, dateFormat);
  } else {
    console.log("list is else ie update");
    result = await HTTP.createUpdateSubmission(token, teamWorkID, dateFormat);
  }

  console.log("HTTP result: " + JSON.stringify(result));
  /*
  const json = {
    id: 33,
    createdTimestamp: "3/8/2018",
    status: "PENDING",
    submittedBy: "You"
  };
  */
  //dispatch(pendingSubmit(json));
};
/*
export const pendingSubmit = json => ({
  type: SUBMIT_PENDING
});
*/
