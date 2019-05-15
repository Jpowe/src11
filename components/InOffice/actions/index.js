import * as R from "ramda";
import * as HTTP from "../../../common/http";
import { Log } from "../../../utils/utils";

export const PRESENCE_RECEIVE_ROWS = "PRESENCE_RECEIVE_ROWS";
export const PRESENCE_UPDATE_ROW = "PRESENCE_UPDATE_ROW";
export const PERSON_UPDATE_ROW = "PERSON_UPDATE_ROW";

export const updatePresence = (time, message, uuid) => async (
  dispatch,
  getState
) => {
  Log("PRESENCE ACTION update presence");
  let token, login, userUUID;

  token = getState().notifications.token;
  login = getState().notifications.login;
  //userUUID = getState().notifications.user.uuid;

  /*  INPUT FOR TYPE INPUT IN GRAPHQL REQUIRES OBJ **/
  const jsn = { returnTimestamp: time, returnMessage: message };
  console.log(JSON.stringify(jsn));
  //  HTTP.updatePresence(id, newMessage);
  const presenseUpdate = await HTTP.updatePresence(token, uuid, jsn);
  console.log("presenseUpdate " + JSON.stringify(presenseUpdate));
  //  const data = await HTTP.getPortalUsers(token, login);

  //  const portalUsers = R.prop("PortalUsers", data);
  dispatch(updatePresenceRow(jsn, uuid));
};

export const updatePresenceRow = (json, userUUID) => ({
  type: PRESENCE_UPDATE_ROW,
  row: json,
  userUUID: userUUID
});

export const updatePerson = (id, invisible, presenceToken) => async (
  dispatch,
  getState
) => {
  let token, login;
  console.log("PRESENCE ACTION UPDATE PERSON");
  token = getState().notifications.token;
  login = getState().notifications.login;
  //userUUID = getState().notifications.user.uuid;
  const jsn = {
    isInvisible: invisible,
    presenceToken: presenceToken ? presenceToken : null
  };
  console.log(JSON.stringify(jsn));
  const presenseUpdate = await HTTP.updatePerson(token, id, jsn);
  console.log("personUpdate " + JSON.stringify(presenseUpdate));
  dispatch(updatePersonRow(jsn, id));
};

export const updatePersonRow = (json, id) => ({
  type: PERSON_UPDATE_ROW,
  row: json,
  id: id
});
