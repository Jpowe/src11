import * as HTTP from "../common/http";
import R from "ramda";
import nJwt from "njwt";
import JwtDecode from "jwt-decode";
import { Log, LogTable } from "../utils/utils";

export const REQUEST_NOTIFICATIONS = "REQUEST_NOTIFICATIONS";
export const RECEIVE_NOTIFICATIONS = "RECEIVE_NOTIFICATIONS";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const DELETE_ALL_NOTIFICATIONS = "DELETE_ALL_NOTIFICATIONS";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const MODIFY_USER = "MODIFY_USER";
export const SAVE_FAVS = "SAVE_FAVS";
export const SAVE_TOKEN_AND_LOGIN = "SAVE_TOKEN_LOGIN";
export const PRESENCE_RECEIVE_ROWS = "PRESENCE_RECEIVE_ROWS";
export const SET_FLOWWRIGHT_URL = "SET_FLOWWRIGHT_URL";
export const SET_FLOWWRIGHT_LICENSE = "SET_FLOWWRIGHT_LICENSE";
export const SET_WORKFLOWS = "SET_WORKFLOWS";
export const SET_WORKFLOWS_ENUMS = "SET_WORKFLOWS_ENUMS";

let token = null;
let login;
let uuid = null;
let url, ejwt;

export const callModuleConfig = () => async (dispatch, getState) => {
  console.log("ACTION callHTTP");
  let mc = await HTTP.getModuleConfig(token, "Access Portal");
  let value = R.prop(
    "value",
    R.find(x => x.name == "Workflow URL", mc.ModuleConfiguration.metaValues)
  );
  console.log(value);
  //let value = mc.ModuleConfiguration.metaValues[0].value;
  dispatch(setFlowwrightURL(value));
  let license = R.prop(
    "value",
    R.find(x => x.name == "Workflow License", mc.ModuleConfiguration.metaValues)
  );
  console.log(license);
  //let license = mc.ModuleConfiguration.metaValues[1].value;
  dispatch(setFlowwrightLicense(license));
  mc = await HTTP.getModuleConfig(token, "Workflows");
  console.table(mc.ModuleConfiguration);
  value = mc.ModuleConfiguration.metaValues;
  console.table(value);
  dispatch(setWorkflows(value));
  value = mc.ModuleConfiguration.enumerations;
  console.table(value);
  dispatch(setWorkflowsENUMS(value));
};
export const setFlowwrightURL = payload => ({
  type: SET_FLOWWRIGHT_URL,
  payload: payload
});
export const setFlowwrightLicense = payload => ({
  type: SET_FLOWWRIGHT_LICENSE,
  payload: payload
});
export const setWorkflows = payload => ({
  type: SET_WORKFLOWS,
  payload: payload
});
export const setWorkflowsENUMS = payload => ({
  type: SET_WORKFLOWS_ENUMS,
  payload: payload
});
export const getNotifications = () => async dispatch => {
  dispatch(requestUser());
  /* SECRET SHARED WITH UI-SSO */
  const secret = "fadd25bc-083f-4bfa-b991-27082b2c8771";
  url = window.location.href;
  ejwt = url.substr(url.indexOf("sessionKey=") + 11);
  nJwt.verify(ejwt, secret, async function(err, verifiedJwt) {
    if (err) {
      Log("ACTION ERR");
      Log(err); // Token has expired, has been tampered with, etc
    } else {
      const newURL = window.location.href.split("?")[0];
      window.history.pushState("object", document.title, newURL);
      const decoded = JwtDecode(verifiedJwt.body.token);
      console.log("DECODED " + JSON.stringify(decoded));
      const id = decoded.uuid;
      login = decoded.login;
      console.log("login " + decoded.login);
      token = verifiedJwt.body.token;
      uuid = id;
      //const prefs = await HTTP.setPreferences(verifiedJwt.body.token, uuid);
      const userData = await HTTP.getUser(token, login);
      dispatch(receiveUser(userData));
      dispatch(saveTokenAndLogin(token, login));

      console.table(userData.PortalUser);
      const roleNames = R.map(x => x.name, userData.PortalUser.roles);
      console.table(roleNames);
      const showPresence = R.contains("Presence Viewer Submitter", roleNames);
      console.log(showPresence);

      if (showPresence) {
        const data = await HTTP.getPortalUsers(token, login);
        const portalUsers = R.prop("PortalUsers", data);
        dispatch(receivePortalUsers(portalUsers));
      }
    }
  });
};

/*  to do why passing http.getuser instead of grabbing from redux */
export const getNotifications2 = () => async (dispatch, getState) => {
  //  console.log("ACTION getNotifications2");
  //const userData = await HTTP.getUser(token, login);
  //  const roleNames = R.map(x => x.name, userData.PortalUser.roles);
  const roleNames = R.map(x => x.name, getState().notifications.user.roles);
  //  console.table(roleNames);
  const showPresence = R.contains("Presence Viewer Submitter", roleNames);
  console.log(showPresence);
  if (showPresence) {
    const data = await HTTP.getPortalUsers(token, login);
    const portalUsers = R.prop("PortalUsers", data);
    Log("ALL PORTAL USERS...");
    LogTable(portalUsers);
    dispatch(receivePortalUsers(portalUsers));
  }
};
/*  REPLACE DUPLICATE CODE IN getNotification and getNotifications2 with callPresence */
/*
const callPresence = () => async dispatch => {
  const userData = await HTTP.getUser(token, login);
  const roleNames = R.map(x => x.name, userData.PortalUser.roles);
  const bPresence = R.contains("Presence Viewer Submitter", roleNames);
  const httpCall = async (token, login) => {
    const data = await HTTP.getPortalUsers(token, login);
    const portalUsers = R.prop("PortalUsers", data);
    dispatch(receivePortalUsers(portalUsers));
  };
  bPresence && httpCall(token, login);
};
*/
export const receivePortalUsers = json => ({
  type: PRESENCE_RECEIVE_ROWS,
  rows: json
});
/*_____________________________________________________________________*/
/*      NOTIFICATIONS */
export const requestNotifications = () => ({
  type: REQUEST_NOTIFICATIONS
});
export const receiveNotifications = json => ({
  type: RECEIVE_NOTIFICATIONS,
  notifications: json,
  receivedAt: Date.now()
});

export const deleteRowAction = n => ({
  type: DELETE_NOTIFICATION,
  id: n
});
export const deleteNotification = id => async (dispatch, getState) => {
  Log("Action deleteNotification  id: " + id);
  const uuid = getState().notifications.user.uuid;
  Log("Action UUID " + uuid);
  dispatch(deleteRowAction(id));
  let arr = new Array();
  arr.push(id);
  const row = await HTTP.deleteRow(token, uuid, arr);
};

export const dismissAllNotifications = () => ({
  type: "DELETE_ALL_NOTIFICATIONS"
});
export const deleteAllNotifications = () => async (dispatch, getState) => {
  const notifications = getState().notifications.notifications;
  const uuid = getState().notifications.user.uuid;
  dispatch(dismissAllNotifications());
  const arrUuids = R.map(x => R.prop("uuid", x), notifications);
  Log("Action deleteAllNotifications");
  HTTP.deleteRow(token, uuid, arrUuids);
};

/*____________________________________________________________________*/
/*     USER          */
/*
export const getUser = () => async dispatch => {
  dispatch(requestUser());
  const userData = await HTTP.getUser(verifiedJwt.body.token, login);
  dispatch(receiveUser(prefs));
};
*/
export const requestUser = () => ({
  type: REQUEST_USER
});
export const receiveUser = json => ({
  type: RECEIVE_USER,
  user: json,
  receivedAt: Date.now()
});

export const saveFavsAction = str => ({
  type: SAVE_FAVS,
  favs: str
});
export const saveFavs = prefs => async (dispatch, getState) => {
  const login = getState().notifications.login;
  const p = prefs.toString();
  const jsn = { preferences: p };
  dispatch(saveFavsAction(p));
  console.log("saveFavs json " + JSON.stringify(jsn));
  const pf = await HTTP.setPreferences(token, uuid, login, jsn);
  //const row = await HTTP.deleteRow(id);
};
export const saveTokenAndLogin = (token, login) => ({
  type: SAVE_TOKEN_AND_LOGIN,
  token: token,
  login: login
});

//bankUUID = "c9a4102b-058e-46b9-8859-458d4297ac00"
//failed = "74e0c181-5620-4fdd-bec6-1be1bee4a63c"
export const submitRow = id => async (dispatch, getState) => {
  Log("ACTION submitRow f ");
  const ppSubmit = await HTTP.createPositivePaySubmission(
    token,
    uuid,
    null,
    "74e0c181-5620-4fdd-bec6-1be1bee4a63c"
  );
  /* TO DO send data to http   PARAMS WILL BE BANK UUID, and FILE ID*/
};
