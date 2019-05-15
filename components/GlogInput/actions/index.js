import * as HTTP from "../../../common/http";
import * as HTTP_GLOG from "../../../common/http_glog";
import * as R from "ramda";
import uuidv4 from "uuid/v4";
import {
  person,
  gift,
  org,
  animal,
  group,
  request,
  location,
  vendor,
  delivery,
  order
} from "./data";
import {
  deleteDollarSign,
  numberDeleteCommas,
  removeFormatting,
  formatPhone
} from "../utils/utils";

import { events, genderStatuses } from "../common/data";

export const GLOG_ON_TYPE = "GLOG_ON_TYPE";
export const GLOG_RECEIVE_ROWS = "GLOG_RECEIVE_ROWS";
export const GLOG_SUBMIT_ROW = "GLOG_SUBMIT_ROW";

export const UPDATE_GEI_INSTANCE_RECIP = "UPDATE_GEI_INSTANCE_RECIP";
export const UPDATE_GEI_INSTANCE_REQUEST = "UPDATE_GEI_INSTANCE_REQUEST";
export const UPDATE_GIFT_INSTANCE = "UPDATE_GIFT_INSTANCE";
export const GLOG_UPDATE = "GLOG_UPDATE";
export const GLOG_UPDATE_SECONDARY = "GLOG_UPDATE_SECONDARY";

export const GLOG_DELETE = "GLOG_DELETE";

export const ADD_ROW_GIFT_INSTANCE = "ADD_ROW_GIFT_INSTANCE";
export const GLOG_ADD = "GLOG_ADD";

export const GLOG_REMOVE = "GLOG_REMOVE";

export const GLOG_ADD_DATA = "GLOG_ADD_DATA";
export const GLOG_SET_VIEW = "GLOG_SET_VIEW";
export const GLOG_SET_STATUS = "GLOG_SET_STATUS";
export const GLOG_SET_NODE = "GLOG_SET_NODE";

export const GLOG_SET_SEARCH_ID = "GLOG_SET_SEARCH_ID";
export const GLOG_ADD_SEARCH = "GLOG_ADD_SEARCH";
export const GLOG_ADD_SEARCH2 = "GLOG_ADD_SEARCH2";
export const GLOG_ADD_NEW = "GLOG_ADD_NEW";
export const GLOG_SET_SELECTED_ROW = "GLOG_SET_SELECTED_ROW";
export const GLOG_LOAD_DATA = "GLOG_LOAD_DATA";
export const GLOG_SET_REQUEST_ID = "GLOG_SET_REQUEST_ID";
export const GLOG_SET_ACTION = "GLOG_SET_ACTION";
export const GLOG_SET_VAR = "GLOG_SET_VAR";
export const GLOG_UPDATE_GIFTREQUEST_GIFT = "GLOG_UPDATE_GIFTREQUEST_GIFT";
export const GLOG_SEARCHTEXT = "GLOG_SEARCHTEXT";
export const GLOG_UPDATE_FIELD = "GLOG_UPDATE_FIELD";
export const GLOG_FILTER_GEIS = "GLOG_FILTER_GEIS";
export const SET_CONFIG_GIFT_LOG = "SET_CONFIG_GIFT_LOG";
export const SET_VAR = "SET_VAR";
export const SET_RAW_AND_GEI_LOAD = "SET_RAW_AND_GEI_LOAD";
export const UPDATE_GIFTREQUESTGIFT = "UPDATE_GIFTREQUESTGIFT";
export const GLOG_HIER2 = " GLOG_HIER2";
export const GLOG_GROUP_HIERARCHY = " GLOG_GROUP_HIERARCHY";
export const GLOG_HIERARCHY_REMOVE = "GLOG_HIERARCHY_REMOVE";
export const GLOG_CHANGE_DELIVERY_LOC = "GLOG_CHANGE_DELIVERY_LOC";

export const updateGRG = (x, payload) => async (dispatch, getState) => {
  console.log("ACTION updateGRG " + JSON.stringify(payload));
  console.log("ACTION reqID " + x);

  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const giftID = getState().glogInput.searchID;
  let reqID;
  const gifts = getState().glogInput.gifts;
  const giftObj = R.find(x => x.id === giftID, gifts);
  let giftReq = R.prop("requests", giftObj)[0];
  if (!x) {
    if (giftReq) {
      reqID = R.prop("id", giftReq);
    } else {
      return;
    }
  } else {
    reqID = x;
  }
  console.table(giftReq);
  let newReq = { ...giftReq, giftYear: R.prop("giftYear", payload), id: reqID };
  let newPayload = { ...giftObj, requests: [newReq] };
  console.table(newPayload);
  dispatch(update(newPayload, "gifts"));
  /* HTTP CALL */
  console.log("giftyar " + String(R.prop("giftYear", payload)).length);
  if (String(R.prop("giftYear", payload)).length == 4) {
    const ge = await HTTP_GLOG.updateGiftRequestGift(
      token,
      reqID,
      giftID,
      payload
    );
  }
};

export const onType = payload => ({
  type: GLOG_ON_TYPE,
  payload: payload
});

export const onTypeGift = (item, giftID = null) => async (
  dispatch,
  getState
) => {
  console.log("ACTION ontype x " + JSON.stringify(item));
  console.log(R.prop("id", item));
  console.log("ACTION giftID " + giftID);
  giftID && dispatch(setSearchID(giftID));
  dispatch(updateSecondary(item, "locations"));
};

export const setView = x => async dispatch => {
  console.log("ACTION SET VIEW " + x);
  dispatch(setView2(x));
};
export const setAction = x => ({
  type: GLOG_SET_ACTION,
  payload: x
});
export const setFilter2 = (val, variable) => ({
  type: GLOG_SET_VAR,
  payload: val,
  variable: variable
});
export const setFilter = (val, variable) => async dispatch => {
  console.log("ACTION setFILTER " + [val, variable]);
  dispatch(setFilter2(val, variable));
  dispatch(getData(val));
};
export const setView2 = x => ({
  type: GLOG_SET_VIEW,
  view: x
});
export const setNode = x => async dispatch => {
  console.log("ACTION SET_NODE " + x);
  dispatch(setNode2(x));
};
export const setNode2 = x => ({
  type: GLOG_SET_NODE,
  node: x
});
export const setStatus = x => async dispatch => {
  console.log("ACTION SET STATUS " + x);
  dispatch(setStatus2(x));
};
export const setStatus2 = x => ({
  type: GLOG_SET_STATUS,
  status: x
});

export const addGiftInstance2 = uuid => ({
  type: ADD_ROW_GIFT_INSTANCE,
  id: uuid
});
export const addGiftInstance = () => async (dispatch, getState) => {
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const ge = await HTTP_GLOG.createGiftEvent(token, login);
  console.table(ge);
  dispatch(addGiftInstance2(R.prop("uuid", ge.CreateGiftEvent)));
};

export const add2 = (payload, node, addID = true) => ({
  type: GLOG_ADD,
  payload: payload,
  node: node,
  addID: addID
});
export const addToNode = payload => async (dispatch, getState) => {
  let node = getState().glogInput.node;
  dispatch(add2(payload, node, false));
};
export const add = (payload, node, searchID = true, addID = true) => async (
  dispatch,
  getState
) => {
  console.log("ACTION add  ");
  dispatch(add2(payload, node, addID));
  console.log("ACTION ADD searchID " + searchID);
  if (searchID) {
    dispatch(setSearchID());
  }
};
export const addLocation = (payload, node, addID = true) => async (
  dispatch,
  getState
) => {
  console.log("ACTION addLocation ");
  console.log("node : " + node);
  console.table(payload);
  const token = getState().notifications.token;
  const giftID = getState().glogInput.searchID;
  let giftObj2 = R.find(x => x.id === giftID, getState().glogInput.gifts);
  console.table(giftObj2);
  const delivery = R.prop("delivery", giftObj2);
  console.log("old delivery" + R.prop("delivery", giftObj2));
  const oldDelivery = R.find(
    x => x.id == delivery,
    getState().glogInput.deliveries
  );
  console.table(oldDelivery);
  let oldUUID = R.path(["location", "uuid"], oldDelivery);
  console.log("oldUUID " + oldUUID);
  if (!oldUUID) {
    oldUUID = R.prop("location", giftObj2);
  }
  console.log("oldUUID after loc check " + oldUUID);
  await HTTP_GLOG.removeGiftLocation(token, giftID, oldUUID);
  let formattedAddress;

  if (payload.streetAddress2) {
    formattedAddress = [
      payload.streetAddress1,
      payload.streetAddress2,
      payload.streetAddress3,
      payload.streetAddress4
    ];
  } else {
    formattedAddress = [
      payload.streetAddress1,
      payload.apt,
      `${payload.city},  ${payload.state}`,
      payload.zipcode
    ];
  }

  let newPayload = R.pick(
    ["uuid", "formattedAddress", "latitude", "longitude"],
    {
      ...payload,
      uuid: payload.placeID,
      formattedAddress: R.filter(x => x != null, formattedAddress),
      latitude: payload.latitude,
      longitude: payload.longitude
    }
  );
  if (!!R.prop("apt", payload)) {
    newPayload = R.omit("uuid", newPayload);
  }
  console.table(newPayload);
  let newItem = await HTTP_GLOG.createLocation(token, newPayload);
  let id;
  console.table(newItem.CreateLocation);
  let createLocationUUID;
  if (!!newItem.CreateLocation) {
    id = R.prop("uuid", newItem.CreateLocation);
    createLocationUUID = R.prop("uuid", newItem.CreateLocation);
  } else {
    console.log("if not newitem location ");
    console.table(payload);
    id = R.prop("placeID", payload);
  }

  //console.log("HTTP createLocation received");
  //console.log("placeID " + R.prop("placeID", payload));
  //let id = R.prop("uuid", newItem.CreateLocation);

  //  await HTTP_GLOG.removeGiftLocation(token, giftID, id);

  newItem = await HTTP_GLOG.createGiftLocation(token, giftID, id, {});
  console.log("HTTP_creategiftlocation");
  /* update gift... gift.location */
  let giftObj = R.find(x => x.id === giftID, getState().glogInput.gifts);
  let newGiftObj = { ...giftObj, location: id };
  dispatch(update(newGiftObj, "gifts"));
  console.log("deliveryID " + R.prop("delivery", newGiftObj));
  const deliveryID = R.prop("delivery", newGiftObj);
  console.table(
    R.find(x => x.id == deliveryID, getState().glogInput.deliveries)
  );
  const objDelivery = R.find(
    x => x.id == deliveryID,
    getState().glogInput.deliveries
  );
  /* intl address will have no uuid in newpayload */
  if (!R.prop("uuid", newPayload)) {
    console.log("no uuid in newpayload for intl addy");
    newPayload = { ...newPayload, uuid: createLocationUUID };
    console.table(newPayload);
  }
  const locationForDelivery = { ...objDelivery, location: newPayload };
  dispatch(add2(locationForDelivery, "deliveries", false));
  dispatch(add2(payload, node, addID));
  /* HACK 02/06/19  to get new loc to show on prev gift: call querygiftevent*/
  const gei = getState().glogInput.selectedRow;
  dispatch(queryGiftEvent(gei));
};

export const remove = (id, node) => ({
  type: GLOG_REMOVE,
  id: id,
  node: node
});
export const addNew = (payload = null) => async (dispatch, getState) => {
  console.log("ACTION addNew");
  let id, newItem, newAttach, orgID;
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const node = getState().glogInput.node;
  const gei = getState().glogInput.selectedRow;
  const geis = getState().glogInput.giftEventInstances;

  let recipients = R.prop("recipients", R.find(x => x.id === gei, geis));

  console.table(recipients);
  if (recipients.length) {
    console.log(R.contains(id, R.map(x => x.id, recipients)));
    if (R.contains(id, R.map(x => x.id, recipients))) {
      return;
    }
  }

  console.log("gei " + gei);
  console.log("node " + node);
  if (node == "people") {
    newItem = await HTTP.createPerson(token, login);
    console.log("HTTP createPerson received");
    id = R.prop("uuid", newItem.CreatePerson);
    console.log("newPerson uuid " + R.prop("uuid", newItem.CreatePerson));
    /* CREATE GIFT EVENT PERSON   current gei?*/
    newAttach = await HTTP_GLOG.createGiftEventPerson(token, login, gei, id);
  } else if (node == "orgs") {
    newItem = await HTTP_GLOG.createOrganization(token);
    id = R.prop("uuid", newItem.CreateOrganization);
    newAttach = await HTTP_GLOG.createGiftEventOrganization(
      token,
      login,
      gei,
      id
    );
  } else if (node == "groups") {
    newItem = await HTTP_GLOG.createGroup(token);
    id = R.prop("uuid", newItem.CreateGroup);
    newAttach = await HTTP_GLOG.createGiftEventGroup(token, login, gei, id);
  } else if (node == "requests") {
    newItem = await HTTP_GLOG.createGiftRequest(token);
    id = R.prop("uuid", newItem.CreateGiftRequest);
    newAttach = await HTTP_GLOG.createGiftEventGiftRequest(token, gei, id);
  } else if (node == "gifts") {
    newItem = await HTTP_GLOG.createGift(token, login);
    id = R.prop("uuid", newItem.CreateGift);
    console.table(newItem);
    console.log("newGift uuid " + R.prop("uuid", newItem.CreateGift));
  } else if (node == "animals") {
    newItem = await HTTP_GLOG.createAnimal(token, login);
    id = R.prop("uuid", newItem.CreateAnimal);
    newAttach = await HTTP_GLOG.createGiftEventAnimal(token, login, gei, id);
    console.table(newItem);
  }

  console.table(newItem);

  //const id = R.prop("uuid", newGift.CreateGift);
  let uuidVendor = uuidv4();
  console.log("uuidVendor " + uuidVendor);
  let uuidDelivery = uuidv4();
  let uuidOrder = uuidv4();

  console.log("node to call " + node);
  const newObjMapping = [
    { node: "people", obj: person },
    { node: "orgs", obj: org },
    { node: "animals", obj: animal },
    { node: "groups", obj: group },
    { node: "gifts", obj: gift },
    { node: "locations", obj: location },
    { node: "requests", obj: request }
  ];
  let newobj = payload
    ? payload
    : R.prop("obj", R.find(x => x.node === node, newObjMapping));

  let newobj2 = { ...newobj, id: id };

  if (node === "gifts") {
    //let newItem = await HTTP_GLOG.createOrganization(token);
    orgID = uuidv4();
    console.log("orgID " + orgID);
    //newAttach = await HTTP_GLOG.createGiftVendor(token, id, orgID, {});

    dispatch(add({ ...vendor, id: orgID }, "vendors", false, false));
    dispatch(
      add({ ...delivery, id: uuidDelivery }, "deliveries", false, false)
    );
    dispatch(add({ ...order, id: uuidOrder }, "orders", false, false));
  }
  if (node === "gifts") {
    dispatch(
      add(
        {
          ...newobj2,
          vendor: orgID,
          delivery: uuidDelivery,
          order: uuidOrder
        },
        node
      )
    );
  } else {
    dispatch(
      add(
        {
          ...newobj2
        },
        node
      )
    );
  }
};
export const loadData = () => ({
  type: GLOG_LOAD_DATA
});
export const addData = () => ({
  type: GLOG_ADD_DATA
});

export const filterGEIs = month => ({
  type: GLOG_FILTER_GEIS,
  month: month
});
export const setConfig = (name, payload) => ({
  type: SET_CONFIG_GIFT_LOG,
  payload: payload,
  name: name
});
export const setVar = (name, payload) => ({
  type: SET_VAR,
  payload: payload,
  name: name
});
export const setRawAndGEI = payload => ({
  type: SET_RAW_AND_GEI_LOAD,
  payload: payload
});
export const loadConfigs = () => async (dispatch, getState) => {
  console.log("loadConfigs");
  const token = getState().notifications.token;
  let temp = await HTTP.getModuleConfig(token, "Gift Log");
  let enums = temp.ModuleConfiguration.enumerations;
  try {
    let et = R.find(x => x.name == "Event Type", enums);
    let etValues = et.metaValues;
    dispatch(setConfig("eventTypes", etValues));
  } catch (e) {
    console.log("NO EVENT ENUM...try RECURRING/INCIDENDTAL ENUM");
  }
  try {
    let re = R.find(x => x.name == "Recurring Events", enums);
    let ie = R.find(x => x.name == "Incidental Events", enums);
    let etValues = [...re.metaValues, ...ie.metaValues];
    console.table(etValues);
    dispatch(setConfig("eventTypes", etValues));
  } catch (e) {
    console.log("NO EVENT ENUM...try RECURRING/INCIDENDTAL ENUM");
  }

  let pas = R.find(x => x.name === "Personal Assistant", enums);
  let pasValues = pas.metaValues;
  let counter = 2;
  let changeObj = obj => {
    return { ...obj, title: obj.name, value: counter++ };
  };
  /* change order...unknown first */

  pasValues = R.map(x => changeObj(x), pasValues);
  pasValues = [...pasValues, { name: "Unknown", value: 1, title: "Unknown" }];
  dispatch(setConfig("personalAssistants", pasValues));

  let animalTypes = R.find(x => x.name === "Animal Type", enums);
  let animalTypesValues = animalTypes.metaValues;
  counter = 0;
  animalTypesValues = R.map(x => changeObj(x), animalTypesValues);
  dispatch(setConfig("animalTypes", animalTypesValues));
};

const tweakData = obj => {
  console.log("tweakData");
  const addKeyID = obj => {
    return { id: obj.uuid, ...obj, type: "requests" };
  };
  const combineRecipients = obj => {
    const changeKey = (obj, type) => {
      return { id: obj.uuid, type: type };
    };
    //  console.log("ACTION combineRecipients");
    let people = R.map(x => changeKey(x, "people"), obj.eventPersons);
    let groups = R.map(x => changeKey(x, "groups"), obj.eventGroups);
    let orgs = R.map(x => changeKey(x, "orgs"), obj.eventOrganizations);
    let animals = R.map(x => changeKey(x, "animals"), obj.eventAnimals);
    return Array.prototype.concat(people, groups, orgs, animals);
  };
  return {
    ...obj,
    eventType: [obj.eventType],
    id: obj.uuid,
    date: [`${obj.eventMonth}/${obj.eventDay}`],
    recipients: combineRecipients(obj),
    giftHistory: [],
    requests: R.map(x => addKeyID(x), obj.eventGiftRequests),
    eventMonth: `${obj.eventMonth}`,
    notes: [obj.notes],
    recurring: [obj.recurring],
    registryStatus: [obj.registryStatus]
  };
};
/*
export const processGiftEvents = () => async (dispatch, getState) => {
  console.log("ACTION processGiftEvents");
  const giftEvents = getState().glogInput.GEI_RAW;
  console.table(giftEvents);
  const process = obj => {
    console.log("PROCESS");
    dispatch(add2(tweakData(obj), "giftEventInstances", false));
    let people = R.prop("eventPersons", obj);
    R.map(x => dispatch(add2({ ...x, id: x.uuid }, "people", false)), people);
    let groups = R.prop("eventGroups", obj);
    R.map(x => dispatch(add2({ ...x, id: x.uuid }, "groups", false)), groups);
    let orgs = R.prop("eventOrganizations", obj);
    R.map(x => dispatch(add2({ ...x, id: x.uuid }, "orgs", false)), orgs);
    let animals = R.prop("eventAnimals", obj);
    R.map(x => dispatch(add2({ ...x, id: x.uuid }, "animals", false)), animals);
  };

  R.map(x => process(x), giftEvents);
};
*/
export const hier2 = payload => ({
  type: GLOG_HIER2,
  payload: payload
});

export const getData = (filter = null) => async (dispatch, getState) => {
  console.log("GLOGINPUT  ACTION GETDATA");
  let mainFilter;
  const token = getState().notifications.token;
  mainFilter = filter ? filter : getState().glogInput.mainFilter;
  dispatch(setVar("loading", true));
  console.time("http-get-events");
  const ge = await HTTP_GLOG.getGiftEvents(token, mainFilter);
  console.timeEnd("http-get-events");
  dispatch(setVar("loading", false));
  //  console.table(ge.GiftEvents);
  dispatch(setFilter2([], "GEI_RAW"));
  dispatch(setRawAndGEI(ge.GiftEvents));
};

const processOrgOrGroupHier = (data, groupType, isRoot) => {
  let rowData = [];
  let parentID = data.uuid;
  /*
  if (isRoot) {
    rowData = [
      {
        uuid: data.uuid,
        name: data.name,
        hasChildren: true,
        partyType: groupType,
        parentID: null
      }
    ];
  }
  */
  const processPerson = obj => {
    let newPerson = {
      uuid: obj.uuid,
      name: `${obj.firstName} ${obj.lastName}`,
      partyType: "person",
      parent: parentID,
      id: obj.uuid
    };
    rowData.push(newPerson);
  };
  const processGroup = obj => {
    let newGroup = {
      uuid: obj.uuid,
      name: obj.name,
      hasChildren: true,
      partyType: "group",
      parent: parentID,
      id: obj.uuid
    };
    rowData.push(newGroup);
  };
  const arrPersons = data.employees ? data.employees : data.memberPersons;
  R.map(x => processGroup(x.group), data.memberGroups);
  R.map(x => processPerson(x.person), arrPersons);
  if (data.ownerPersons) {
    console.log("yes ownerPersons");
    R.map(x => processPerson(x.person), data.ownerPersons);
  }
  console.table(rowData);
  return rowData;
};

export const groupHierarchy = payload => ({
  type: GLOG_GROUP_HIERARCHY,
  payload: payload
});
export const onGroupSelect = id => async (dispatch, getState) => {
  console.log("ACTION onGroupSelect id: " + id);
  let typ, strSearch, result;
  /* get name from recips or group hierarchy */
  const token = getState().notifications.token;
  const geis = getState().glogInput.giftEventInstances;
  const geID = getState().glogInput.selectedRow;
  const gei = R.find(x => x.id == geID, geis);
  const orgs = getState().glogInput.orgs;
  const groups = getState().glogInput.groups;
  const recips = R.prop("recipients", gei);
  const gh = getState().glogInput.groupHierarchy;
  console.table(gh);
  /* if typ is org call search org , else search group... add to grouphier */
  let isRoot = true;
  if (!!R.find(x => x.id == id, recips)) {
    typ = R.prop("type", R.find(x => x.id == id, recips));
    console.log("type group or org :  " + typ);
    if (typ == "orgs" || typ == "org") {
      strSearch = R.prop("name", R.find(x => x.id == id, orgs));
    } else {
      strSearch = R.prop("name", R.find(x => x.id == id, groups));
    }
  } else if (!!R.find(x => x.uuid == id, gh)) {
    isRoot = false;
    console.log("here gh");
    typ = R.prop("partyType", R.find(x => x.uuid == id, gh));
    console.log("from GROUP hiertype group or org :  " + typ);
    strSearch = R.prop("name", R.find(x => x.uuid == id, gh));
  }
  if (typ == "orgs" || typ == "org") {
    result = await HTTP_GLOG.searchOrgTEST(token, strSearch);
    /* first one may not be root , so dont just pick first one */
    result = R.find(x => x.uuid === id, result.SearchOrganization);
    //result = result.SearchOrganization[0];
    result = { ...result, id: result.uuid };
    console.table(result);
    const tempOrg = groupHierarchy(
      processOrgOrGroupHier(result, "org", isRoot)
    );
    console.table(tempOrg);
    dispatch(groupHierarchy(processOrgOrGroupHier(result, "org", isRoot)));
  } else if (typ == "groups" || typ == "group") {
    result = await HTTP_GLOG.searchGroupTEST(token, strSearch);
    /* first one may not be root , so dont just pick first one */
    result = R.find(x => x.uuid === id, result.SearchGroup);
    //  result = result.SearchGroup[0];
    result = { ...result, id: result.uuid };
    console.table(result);
    dispatch(groupHierarchy(processOrgOrGroupHier(result, "group", isRoot)));
  }
};
export const hierarchyRemove = id => ({
  type: GLOG_HIERARCHY_REMOVE,
  parentID: id
});

export const receiveRows = json => ({
  type: GLOG_RECEIVE_ROWS,
  rows: json
});

export const GEI_add_recip2 = () => ({
  type: UPDATE_GEI_INSTANCE_RECIP
});

export const GEI_add_recip = () => async (dispatch, getState) => {
  let newAttach;
  const token = getState().notifications.token;
  const gei = getState().glogInput.selectedRow;
  const login = getState().notifications.login;
  const id = getState().glogInput.searchID;
  const node = getState().glogInput.node;
  const geis = getState().glogInput.giftEventInstances;
  let recipients = R.prop("recipients", R.find(x => x.id === gei, geis));
  console.log("ACTION gei_add_recip");
  console.table(recipients);
  if (recipients.length) {
    console.log(R.contains(id, R.map(x => x.id, recipients)));
    if (R.contains(id, R.map(x => x.id, recipients))) {
      return;
    }
  }
  if (node === "people") {
    await HTTP_GLOG.createGiftEventPerson(token, login, gei, id);
  } else if (node === "groups") {
    await HTTP_GLOG.createGiftEventGroup(token, login, gei, id);
  } else if (node === "orgs") {
    await HTTP_GLOG.createGiftEventOrganization(token, login, gei, id);
  } else if (node === "animals") {
    await HTTP_GLOG.createGiftEventAnimal(token, login, gei, id);
  }

  dispatch(GEI_add_recip2());
};

export const GEI_add_request = () => ({
  type: UPDATE_GEI_INSTANCE_REQUEST
});
export const updateGiftInstance = payload => async (dispatch, getState) => {
  console.log("ACTION updateGift Instance" + R.prop("id", payload));
  console.table(payload);
  const uuid = R.prop("id", payload);
  const convertStatus = n => (n == 1 || n == "Yes" ? "Yes" : "No");
  let newPayload = {
    ...payload,
    registryStatus: convertStatus(payload.registryStatus),
    active: payload.active == 1 ? true : false,
    recurring:
      payload.recurring[0] == 1 || payload.recurring[0] == true ? true : false
  };
  console.table(newPayload);
  newPayload = R.pick(
    [
      "active",
      "recurring",
      "eventDay",
      "eventMonth",
      "eventType",
      "registryStatus",
      "notes"
    ],
    newPayload
  );
  const data = R.map(x => (typeof x == "object" ? x[0] : x), newPayload);
  const token = getState().notifications.token;
  const login = getState().notifications.login;

  const ge = await HTTP_GLOG.updateGiftEvent(token, login, uuid, data);
  console.table(ge);

  dispatch(updateGiftInstance2(payload));
};

export const updateGiftInstance2 = payload => ({
  type: UPDATE_GIFT_INSTANCE,
  giftInstance: payload
});
export const update = (payload, node) => ({
  type: GLOG_UPDATE,
  payload: payload,
  node: node
});

const formatDateYYMMDD = strDate => {
  console.log("date strDate: " + strDate);
  if (!strDate) {
    return;
  }
  let arrDate = strDate.split("/");
  if (arrDate.length == 1) {
    console.log("arrDate length = 1");
    let newDt = strDate.slice(4, 8) + strDate.slice(0, 2) + strDate.slice(2, 4);
    console.log("newDt " + newDt);
    return newDt;
  }
  console.log("formatedDate " + arrDate[2] + arrDate[0] + arrDate[1]);
  return arrDate[2] + arrDate[0] + arrDate[1];
};
const validateDateYYMMDD = strDate => {
  console.log(strDate);
  console.log(typeof strDate);
  let arrDate = strDate.split("/");
  console.log("arrDate.length " + arrDate.length);
  if (arrDate.length !== 3) {
    return false;
  }
  console.log("str lngth" + String(arrDate[2]).length);
  return String(arrDate[2]).length === 4 ? true : false;
};

export const updateForm = payload => async (dispatch, getState) => {
  const node = getState().glogInput.node;
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const id = getState().glogInput.searchID;
  const personalAssts = getState().glogInput.personalAssistants;
  const animalTypes = getState().glogInput.animalTypes;
  let httpPayload;
  console.log("ACTION updateForm " + node);
  console.table(payload);
  /* HTTP UPDATE BASED ON NODE AND SEARCH ID */
  if (node === "people") {
    httpPayload = R.omit(
      [
        "id",
        "selected",
        "name",
        "reportsTo",
        "roles",
        "submit",
        "worksAt",
        "worksFor",
        "worksIn",
        "uuid"
      ],
      payload
    );

    const getGenderName = n => {
      if (!n) {
        return { name: "Unknown", value: 3 };
      }
      const genderJSON = [
        { name: "Female", value: 1 },
        { name: "Male", value: 2 },
        { name: "Unknown", value: 3 }
      ];
      if (!!R.find(x => x.value == n, genderJSON)) {
        return R.prop("name", R.find(x => x.value == n, genderJSON));
      }
    };
    httpPayload = {
      ...httpPayload,
      birthDate: formatDateYYMMDD(R.prop("birthDate", httpPayload)),
      gender: getGenderName(R.prop("gender", httpPayload)),
      deathDate: formatDateYYMMDD(R.prop("deathDate", httpPayload))
    };

    const updatePerson = await HTTP.updatePerson(token, id, httpPayload);
    console.table(updatePerson);
  } else if (node === "orgs") {
    console.log("ACTION if orgs update");
    httpPayload = R.pick(["name", "contactNumber"], payload);
    const updateOrg = await HTTP_GLOG.updateOrganization(
      token,
      id,
      httpPayload
    );
    console.table(updateOrg);
  } else if (node === "groups") {
    console.log("ACTION if groups update");
    httpPayload = R.pick(["name"], payload);
    const updateGroup = await HTTP_GLOG.updateGroup(token, id, httpPayload);
    console.table(updateGroup);
  } else if (node == "requests") {
    console.log("ACTION if requests update");
    console.table(payload);
    httpPayload = R.pick(["registryStatus", "requestNotes", "active"], payload);
    httpPayload = {
      ...httpPayload,
      registryStatus: httpPayload.registryStatus == 1 ? "Yes" : "No",
      active: httpPayload.active == 1 ? true : false
    };
    console.table(httpPayload);
    const updateRequest = await HTTP_GLOG.updateGiftRequest(
      token,
      id,
      httpPayload
    );
  } else if (node == "gifts") {
    console.log("ACTION if gifts update");
    console.table(payload);
    httpPayload = R.prop("value", payload) ? payload : { ...payload, value: 0 };
    console.table(httpPayload);
    httpPayload = R.pick(
      ["value", "giftNotes", "description", "sentiment", "assignedTo"],
      httpPayload
    );
    const defaultTo0 = R.defaultTo("$0");
    httpPayload = {
      ...httpPayload,
      value: Number(removeFormatting(defaultTo0(R.prop("value", httpPayload))))
    };
    /* change dropdown values from int to string */
    console.log("ACTION assignedTo == " + R.prop("assignedTo", httpPayload));
    console.table(personalAssts);
    let assignedTo = R.prop(
      "title",
      R.find(
        x =>
          x.value == R.prop("assignedTo", httpPayload) ||
          x.name == R.prop("assignedTo", httpPayload),
        personalAssts
      )
    );
    httpPayload = { ...httpPayload, assignedTo: assignedTo };
    const updateRequest = await HTTP_GLOG.updateGift(token, id, httpPayload);
    dispatch(addSearch2());
  } else if (node == "animals") {
    console.log("ACTION if animals update");
    console.table(payload);
    httpPayload = R.pick(["name", "type", "notes"], payload);
    httpPayload = { type: 0, ...httpPayload };
    console.table(httpPayload);
    console.table(animalTypes);
    console.log(R.prop("type", httpPayload));
    /*get string of animal type */
    console.table(
      R.find(x => x.value == R.prop("type", httpPayload), animalTypes)
    );
    let type = R.prop(
      "name",
      R.find(x => x.value == R.prop("type", httpPayload), animalTypes)
    );

    httpPayload = { ...httpPayload, type: type };
    const updateAnimal = await HTTP_GLOG.updateAnimal(token, id, httpPayload);
    console.table(updateAnimal);
  }
  dispatch(update(payload, node));
};

export const delet = (id, node) => ({
  type: GLOG_DELETE,
  id: id,
  node: node
});
/* delete from Gift event instance */
export const ondelete = id => async (dispatch, getState) => {
  console.log("ACTION ondelete id " + id);
  const token = getState().notifications.token;
  const geis = getState().glogInput.giftEventInstances;
  const selectedRow = getState().glogInput.selectedRow;
  let recipients = R.prop(
    "recipients",
    R.find(x => x.id === selectedRow, geis)
  );
  let giftHistory = R.prop(
    "giftHistory",
    R.find(x => x.id === selectedRow, geis)
  );
  let giftRequests = R.prop(
    "requests",
    R.find(x => x.id === selectedRow, geis)
  );
  let giftRequestID;
  if (giftRequests.length) {
    giftRequestID = R.prop("id", giftRequests[0]);
  }

  console.log(JSON.stringify(giftRequests));
  console.log(giftRequestID);
  let arr = [];
  arr.push(...recipients, ...giftHistory, ...giftRequests);
  console.table(arr);
  const gei = R.find(x => x.id === selectedRow, geis);
  const geiID = R.prop("id", R.find(x => x.id === id, arr));
  const geiType = R.prop("type", R.find(x => x.id === id, arr));
  if (geiType == "gifts") {
    gei.giftHistory = R.filter(x => x.id !== id, gei.giftHistory);
    dispatch(update(gei, "giftEventInstances"));
    const gifts = getState().glogInput.gifts;
    const giftObj = R.find(x => x.id === id, gifts);
    console.table(giftObj);
    //const giftRequestID = R.prop("requests", giftObj)[0].id;
    console.log("giftRequestID " + giftRequestID);
    //  console.log(R.prop("id", giftObj.requests[0]));
    /*
    const removeGiftRequestGift = await HTTP_GLOG.removeGiftRequestGift(
      token,
      R.prop("id", giftObj.requests[0]),
      id
    );
    */
    const removeGift = await HTTP_GLOG.removeGift(token, id);
  } else if (geiType == "requests") {
    gei.requests = R.filter(x => x.id !== id, gei.requests);
    dispatch(update(gei, "giftEventInstances"));
    const removeGiftRequest = await HTTP_GLOG.removeGiftRequest(token, id);
  } else {
    gei.recipients = R.filter(x => x.id !== id, gei.recipients);
    gei.eventPersons = R.filter(x => x.id !== id, gei.eventPersons);
    dispatch(update(gei, "giftEventInstances"));
    console.log("ondelete geiType : " + geiType);
    if (geiType === "people") {
      const removeGiftEventPerson = await HTTP_GLOG.removeGiftEventPerson(
        token,
        selectedRow,
        id
      );
    } else if (geiType === "orgs") {
      const removeGiftEventOrg = await HTTP_GLOG.removeGiftEventOrganization(
        token,
        selectedRow,
        id
      );
    } else if (geiType === "groups") {
      const removeGiftEventGroup = await HTTP_GLOG.removeGiftEventGroup(
        token,
        selectedRow,
        id
      );
    }
  }
};

export const updateGiftRequestGift = (id, payload) => ({
  type: GLOG_UPDATE_GIFTREQUEST_GIFT,
  id: id,
  payload: payload
});
export const updateSecondary2 = (payload, node) => ({
  type: GLOG_UPDATE_SECONDARY,
  payload: payload,
  node: node
});
export const updateField = (field, node, id, payload) => ({
  type: GLOG_UPDATE_FIELD,
  field: field,
  node: node,
  id: id,
  payload: payload
});
export const updateSecondary = (
  payload,
  node,
  x = null,
  giftReqGiftPayload = null,
  bRemove = false
) => async (dispatch, getState) => {
  let newAttach;
  console.log("ACTION updateSecondary " + JSON.stringify(payload));
  console.log("ACTION updateSecondary  node param " + node);
  console.log("x " + x);
  console.log("giftReqGiftPayload " + JSON.stringify(giftReqGiftPayload));
  console.log("bRemove " + bRemove);
  const token = getState().notifications.token;
  const geis = getState().glogInput.giftEventInstances;
  const geID = getState().glogInput.selectedRow;
  const gei = R.find(x => x.id == geID, geis);

  const requests = R.prop("requests", gei);

  if (node === "requests") {
    let id = R.prop("id", payload);
    console.log("ACTION Requests createGiftRequestGIft " + payload);
    console.log(id);
    /* x == parties */
    console.log(x);
    const recips = R.prop("recipients", gei);
    const objRecip = R.find(xa => xa.id == x, recips);
    let typ;
    /* temp if typ is null, set to people */
    if (objRecip && objRecip["type"]) {
      console.log("  objRecip type");
      typ = R.prop("type", objRecip);
    } else {
      console.log("  NOT objRecip type");
      typ = "people";
    }
    console.log("typ " + typ);
    const hierarchy = getState().glogInput.groupHierarchy;
    console.table(hierarchy);
    if (hierarchy && !!R.find(xa => xa.id == x, hierarchy)) {
      const r = R.find(xa => xa.id == x, hierarchy);
      if (R.prop("partyType", r)) {
        const partyType = R.prop("partyType", r);
        if (partyType == "group") {
          typ = "groups";
        } else if (partyType == "org") {
          typ = "orgs";
        }
      }
    }

    //*** FLATTEN */

    console.log("typ  " + typ);

    if (bRemove) {
      await (typ == "people" &&
        HTTP_GLOG.removeGiftRequestPerson(token, id, x));
      await (typ == "animals" &&
        HTTP_GLOG.removeGiftRequestAnimal(token, id, x));
      await (typ == "orgs" &&
        HTTP_GLOG.removeGiftRequestOrganization(token, id, x));
      await (typ == "groups" && HTTP_GLOG.removeGiftRequestGroup(token, id, x));
    } else {
      await (typ == "people" &&
        HTTP_GLOG.createGiftRequestPerson(token, id, x));
      await (typ == "animals" &&
        HTTP_GLOG.createGiftRequestAnimal(token, id, x));
      await (typ == "orgs" &&
        HTTP_GLOG.createGiftRequestOrganization(token, id, x));
      await (typ == "groups" && HTTP_GLOG.createGiftRequestGroup(token, id, x));
    }
  } else if (node === "gifts") {
    let id = R.prop("id", payload);
    console.log("selection ID " + x);
    console.log("giftID " + id);
    let requestsID = R.map(x => x.id, requests);

    console.log("remove this request " + requestsID);

    let status = giftReqGiftPayload
      ? R.prop("status", giftReqGiftPayload)
      : null;
    const parseGRG = obj => {
      console.log("parseGRG obj " + JSON.stringify(obj));
      if (obj && !!R.prop("status", obj)) {
        let val = obj.status == 1 ? "No" : "Yes";
        return { ...obj, status: val };
      } else {
        return { ...obj, status: "" };
      }
    };
    if (R.contains(x, requestsID)) {
      console.log("ACTION call HTTP_GLOG.createGiftRequestGift");
      console.log(giftReqGiftPayload);
      const removeGRG = async (x, id) => {
        await HTTP_GLOG.removeGiftRequestGift(token, x, id);
      };

      let tempX = x;
      requestsID = R.filter(x => x != tempX, requestsID);
      R.map(x => removeGRG(x, id), requestsID);
      newAttach = await HTTP_GLOG.createGiftRequestGift(
        token,
        x,
        id,
        parseGRG(giftReqGiftPayload)
      );
    } else {
      console.log("ACTION CALL + HTTP_GLOG.createGift X ");
      const recips2 = R.prop("recipients", gei);
      let typ2;
      if (!!R.find(xa => xa.id == x, recips2)) {
        const objRecip2 = R.find(xa => xa.id == x, recips2);
        typ2 = R.prop("type", objRecip2);
      } else {
        console.log("no type 2 id is " + x);
        const hier = getState().glogInput.groupHierarchy;
        if (hier) {
          console.table(hier);
          const r = R.find(xa => xa.id == x, hier);
          if (R.prop("partyType", r)) {
            const giftPartyType = R.prop("partyType", r);
            if (giftPartyType == "group") {
              typ2 = "groups";
            } else if (giftPartyType == "org") {
              typ2 = "orgs";
            } else if (giftPartyType == "person") {
              typ2 = "people";
            }
          }
        }
      }

      if (!bRemove && x) {
        await (typ2 == "people" && HTTP_GLOG.createGiftPerson(token, id, x));
        await (typ2 == "animals" && HTTP_GLOG.createGiftAnimal(token, id, x));
        await (typ2 == "orgs" &&
          HTTP_GLOG.createGiftOrganization(token, id, x));
        await (typ2 == "groups" && HTTP_GLOG.createGiftGroup(token, id, x));
      } else if (x) {
        await (typ2 == "people" && HTTP_GLOG.removeGiftPerson(token, id, x));
        await (typ2 == "animals" && HTTP_GLOG.removeGiftAnimal(token, id, x));
        await (typ2 == "orgs" &&
          HTTP_GLOG.removeGiftOrganization(token, id, x));
        await (typ2 == "groups" && HTTP_GLOG.removeGiftGroup(token, id, x));
      }
    }
    //  dispatch(addGiftRequestGift(x, id, parseGRG(giftReqGiftPayload)));
    dispatch(
      updateGiftRequestGift(x, {
        giftRequestID: x,
        giftID: id,
        ...parseGRG(giftReqGiftPayload)
      })
    );

    console.table(newAttach);
  } else if (node === "orders") {
    console.log(" ACTION orders");
    //  console.table(payload)
    let giftID = getState().glogInput.searchID;
    let giftObj = R.find(x => x.id === giftID, getState().glogInput.gifts);
    let vendorID = R.prop("vendor", giftObj);
    let newPayload = R.omit(["status", "id", "uuid", "organization"], {
      ...payload,
      orderStatus: `Received`
    });
    newPayload = {
      ...newPayload,
      orderDate: formatDateYYMMDD(R.prop("orderDate", newPayload))
    };
    HTTP_GLOG.updateGiftVendor(token, giftID, vendorID, newPayload);
  } else if (node === "deliveries") {
    console.log("ACTION deliveries");
    console.table(payload);
    let locationID;
    let giftID = getState().glogInput.searchID;
    let giftObj = R.find(x => x.id === giftID, getState().glogInput.gifts);
    console.log("payload.location " + payload.location);
    if (payload.location["uuid"]) {
      locationID = R.prop("uuid", payload.location);
    } else {
      locationID = giftObj.location;
      console.log("LOCATION ID on else " + locationID);
    }

    let newPayload = R.omit(["id", "uuid", "location"], payload);
    newPayload = {
      ...newPayload,
      confirmedDeliveryDate: formatDateYYMMDD(
        R.prop("confirmedDeliveryDate", newPayload)
      ),
      deliveryContactNumber: formatPhone(
        R.prop("deliveryContactNumber", newPayload)
      )
    };
    HTTP_GLOG.updateGiftLocation(token, giftID, locationID, newPayload);

    //  let giftID = getState().glogInput.searchID;
  } else if (node === "vendors") {
    console.log("ACTION Vendors");
    let giftID = getState().glogInput.searchID;
    let giftObj = R.find(x => x.id === giftID, getState().glogInput.gifts);
    let str = R.prop("name", payload);
    console.log("vendor name search " + str);
    const token = getState().notifications.token;
    let newSearch = await HTTP_GLOG.searchOrganization(token, str);
    if (!R.length(newSearch.SearchOrganization)) {
      console.log("no seach results");
      let vendorID = R.prop("vendor", giftObj);
      let newPayload = R.omit(["id"], payload);
      let newItem = await HTTP_GLOG.createOrganization(token);
      let orgID = R.prop("uuid", newItem.CreateOrganization);
      const updateOrg = await HTTP_GLOG.updateOrganization(
        token,
        orgID,
        newPayload
      );
      console.table(updateOrg);
    } else {
      console.log("search results");
      let newVendorID = R.prop(
        "uuid",
        R.find(x => x.name == str, newSearch.SearchOrganization)
      );
      console.log("newVendorID " + newVendorID);
      /*
      const vendors = getState().glogInput.vendors;
      const v2 = R.find(x => x.name == R.prop("name", payload), vendors);
      console.table(v2);
*/
      dispatch(add({ ...payload, id: newVendorID }, "vendors", false, false));

      dispatch(updateField("vendor", "gifts", giftID, newVendorID));
      newAttach = await HTTP_GLOG.createGiftVendor(
        token,
        giftID,
        newVendorID,
        {}
      );
      console.table(newAttach);

      //dispatch(add2(newobj, "gifts", false));
      //  R.map()
      //  dispatch(update(ayload, 'gifts'));
    }
  }
  dispatch(updateSecondary2(payload, node));
};
/*
export const changeDeliveryLoc2 = payload => ({
  type: GLOG_CHANGE_DELIVERY_LOC,
  payload: payload
});
*/
export const changeDeliveryLoc = id => async (dispatch, getState) => {
  console.log("ACTION changeDeliveryLoc place id " + id);
  const token = getState().notifications.token;
  const placeID = id;
  const deliveries = getState().glogInput.deliveries;
  const newDeliveryRow = R.find(
    x => R.path(["location", "uuid"], x) == placeID,
    deliveries
  );
  console.log(newDeliveryRow);
  const deliveryID = R.prop("id", newDeliveryRow);
  let giftID = getState().glogInput.searchID;
  let giftObj = R.find(x => x.id === giftID, getState().glogInput.gifts);

  let newObj = { ...giftObj, delivery: deliveryID };
  console.log(newObj);

  let oldUUID = R.prop("delivery", giftObj);
  const oldDeliveryRow = R.find(x => x.id == oldUUID, deliveries);
  console.table(oldDeliveryRow);
  const oldDeliveryPlaceID = R.path(["location", "uuid"], oldDeliveryRow);
  console.table(oldDeliveryRow);
  try {
    oldDeliveryRow.location = newDeliveryRow.location;
    console.table(oldDeliveryRow);
    console.log("oldDeliveryPlaceID " + oldDeliveryPlaceID);
    //dispatch(update(newObj, "gifts"));
    //change Delivery Row location
    await HTTP_GLOG.removeGiftLocation(token, giftID, oldDeliveryPlaceID);
    /* pass the delivery form data  */
    const deliveryHTTP = R.omit(["uuid", "location", "id"], oldDeliveryRow);
    await HTTP_GLOG.createGiftLocation(token, giftID, placeID, deliveryHTTP);
  } catch (e) {
    console.log("catch, no old location");
    await HTTP_GLOG.createGiftLocation(token, giftID, placeID, {});
  }
};
/* queryGiftEvent start...*/
export const queryGiftEvent = id => async (dispatch, getState) => {
  console.log("ACTION queryGiftEvent id : " + id);
  const token = getState().notifications.token;
  const ge = await HTTP_GLOG.getGiftEvent(token, id);
  console.table(ge.GiftEvent);
  const formatRecips = arr => {
    const formatObjRecip = obj => {
      return { ...obj, id: obj.uuid, name: `${obj.firstName} ${obj.lastName}` };
    };
    return R.map(x => formatObjRecip(x), arr);
  };
  const formatRecipsOther = arr => {
    const formatObj = obj => {
      return { ...obj, id: obj.uuid };
    };
    return R.map(x => formatObj(x), arr);
  };

  const changeKey = obj => {
    return {
      ...obj,
      id: obj.uuid,
      recipients: [
        ...formatRecips(obj.requestPersons),
        ...formatRecipsOther(obj.requestAnimals),
        ...formatRecipsOther(obj.requestOrganizations),
        ...formatRecipsOther(obj.requestGroups)
      ]
    };
  };
  R.map(
    x => dispatch(add2(changeKey(x), "requests", false)),
    ge.GiftEvent.eventGiftRequests
  );
  const addKeyID = obj => {
    return {
      ...obj,
      id: obj.uuid
    };
  };
  // input is YYYYMMDD
  const formatDateMMDDYYYY = strDate => {
    if (!strDate) {
      return;
    }
    console.log(
      "formatDateMMDDYYYY " +
        strDate.slice(4, 6) +
        strDate.slice(6, 8) +
        strDate.slice(0, 4)
    );
    return strDate.slice(4, 6) + strDate.slice(6, 8) + strDate.slice(0, 4);
  };
  const changeDateKey = person => {
    return {
      ...person,
      birthDate: formatDateMMDDYYYY(R.prop("birthDate", person)),
      deathDate: formatDateMMDDYYYY(R.prop("deathDate", person))
    };
  };
  R.map(
    x => dispatch(add2(addKeyID(changeDateKey(x)), "people", false)),
    ge.GiftEvent.eventPersons
  );
  R.map(
    x => dispatch(add2(addKeyID(x), "orgs", false)),
    ge.GiftEvent.eventOrganizations
  );
  R.map(
    x => dispatch(add2(addKeyID(x), "groups", false)),
    ge.GiftEvent.eventGroups
  );
  R.map(
    x => dispatch(add2(addKeyID(x), "animals", false)),
    ge.GiftEvent.eventAnimals
  );
  /*  add to  gifthistory in GEI  and gifts table */
  const requests = ge.GiftEvent.eventGiftRequests;

  /*  ADD request notes here to gift  */
  const getGifts = arrRequestGifts => {
    console.table(arrRequestGifts);
    const formatGiftObj = reqGift => {
      return {
        ...reqGift.gift,
        requestNotes: reqGift.requestNotes,
        id: reqGift.uuid,
        type: "requests"
      };
    };
    return R.map(x => formatGiftObj(x), arrRequestGifts);
  };
  const gifts = R.flatten(R.map(x => getGifts(x.requestGifts), requests));
  let allGifts = [];
  const formatObj = obj => {
    console.log("formatObj");
    console.log(JSON.stringify(obj));
    allGifts.push(obj);
    if (obj) {
      return { id: obj.uuid, type: "gifts" };
    } else {
      return { id: "", type: "gifts" };
    }
  };
  const formatGiftHistory = R.map(x => formatObj(x), gifts);
  console.table(formatGiftHistory);
  const geis = getState().glogInput.giftEventInstances;
  const geID = getState().glogInput.selectedRow;
  const gei = R.find(x => x.id == geID, geis);
  const newPayload = { ...gei, giftHistory: formatGiftHistory };
  dispatch(updateGiftInstance2(newPayload));
  const formatForGifts = obj => {
    return { ...obj, id: obj.uuid };
  };
  allGifts = R.map(x => formatForGifts(x), allGifts);

  const addToVendor = gift => {
    console.log("addToVendor ");
    console.table(gift);
    const gv = R.prop("giftVendor", gift);
    if (!gv) {
      return;
    }
    const org = R.prop("organization", gv);
    if (!org) {
      return;
    }
    let objFrmt = { ...org, id: org.uuid };
    console.table(objFrmt);
    dispatch(add2(objFrmt, "vendors", false));
    return org.uuid;
  };
  const addToOrder = gift => {
    console.log("addToOrder ");
    console.table(gift);
    const gv = R.prop("giftVendor", gift);
    if (!gv) {
      return;
    }
    let objFrmt = {
      ...gv,
      id: gv.uuid,
      orderDate: formatDateMMDDYYYY(gv.orderDate)
    };

    dispatch(add2(objFrmt, "orders", false));
    return gv.uuid;
  };
  const addToDelivery = gift => {
    console.log("addtodelivery gift " + JSON.stringify(gift));
    const d = R.prop("delivery", gift);
    if (!d) {
      return;
    }
    let objFrmt = {
      ...d,
      id: d.uuid,
      confirmedDeliveryDate: formatDateMMDDYYYY(d.confirmedDeliveryDate)
    };
    dispatch(add2(objFrmt, "deliveries", false));
    return d.uuid;
  };
  /* USE DELIVERY DATA */
  /*
  const addToLocation = gift => {
    console.log("addtoLocation ");
    console.table(gift);
    console.log(R.path(["delivery", "location", "formattedAddress"], gift));
    console.log(R.path(["delivery", "location", "uuid"], gift));

  };
  */
  const addToTables = gift => {
    console.log("addToTables");
    /* add foreign key */
    let vendorID = addToVendor(gift);
    let orderID = addToOrder(gift);
    let deliveryID = addToDelivery(gift);
    //  let locationID = addToLocation(gift);
    console.log("VOD ids " + [vendorID, orderID, deliveryID]);
    let newObj = {
      ...gift,
      vendor: vendorID,
      order: orderID,
      delivery: deliveryID
    };
    console.log("gift payload ");
    console.log(JSON.stringify(newObj));
    /***
    LOOP THROUGH REQUEST GIFTS CREATE obj data for gift.requests [notes,giftyear,id]
    add  array to gift.requests (same as on create gift)
     */

    const checkGifts = (reqGift, id) => {
      console.log("checkGifts id :" + id);
      /* reqGift is array of gifts */
      console.table(reqGift);
      console.table(R.map(x => x.gift, reqGift));
      const createNewGiftObj = rg => {
        const giftYr = R.prop("giftYear", rg);
        const requestNotes = R.prop("requestNotes", rg);
        //  const requestUUID = R.prop("requestUUID", rg);
        const requestUUID = R.prop("requestUUID", rg);

        const gift = rg.gift;
        return {
          ...gift,
          giftYear: giftYr,
          requestNotes: requestNotes,
          requestUUID: requestUUID,
          test: "here"
        };
      };
      console.table(R.map(x => createNewGiftObj(x), reqGift));
      return R.map(x => createNewGiftObj(x), reqGift);
    };
    const addFieldToObj = obj => {
      const requestNotes = R.prop("requestNotes", obj);
      const requestUUID = R.prop("uuid", obj);
      const newObj = x => {
        return { ...x, requestNotes: requestNotes, requestUUID: requestUUID };
      };
      return R.map(x => newObj(x), obj.requestGifts);
    };
    const reqGifts = R.map(x => addFieldToObj(x), requests);
    console.table(reqGifts);
    let giftsWithRequestData = R.map(x => checkGifts(x, newObj.id), reqGifts);
    console.table(giftsWithRequestData);
    ////  giftsWithRequestData = R.map(x => x["0"], giftsWithRequestData);
    giftsWithRequestData = R.flatten(giftsWithRequestData);
    console.table(giftsWithRequestData);
    const addRequestData = (giftObj, requestObjs) => {
      console.log("addRequestData");
      console.table(requestObjs);
      if (!requestObjs) {
        return {
          ...giftObj,
          id: giftObj.uuid
        };
      }
      const id = R.prop("uuid", giftObj);
      console.log("gift id " + id);
      const reqObj = R.find(x => x.uuid == id, requestObjs);
      //  const reqObj = requestObjs[0];
      console.table(reqObj);
      /* GET OBJ FROM REQOBJ ARRAY */
      console.log("giftobj uuid " + giftObj.uuid);
      console.table(giftObj);
      return {
        ...giftObj,
        id: giftObj.uuid,
        requests: [
          {
            id: R.prop("requestUUID", reqObj),
            requestNotes: R.prop("requestNotes", reqObj),
            giftYear: reqObj.giftYear
          }
        ]
      };
    };
    const addGiftParties = obj => {
      console.table(obj);
      console.table(obj.recipientPersons);
      console.table(obj.recipientGroups);
      let allRecips = [
        ...obj.recipientPersons,
        ...obj.recipientGroups,
        ...obj.recipientOrganizations,
        ...obj.recipientAnimals
      ];
      const eventPersons = ge.GiftEvent.eventPersons;
      const parseUUID = x => {
        return { id: x.uuid };
      };
      const parties = R.map(x => parseUUID(x), allRecips);

      return { ...obj, parties: parties };
    };
    console.table(addRequestData(newObj, giftsWithRequestData));
    console.table(addGiftParties(addRequestData(newObj, giftsWithRequestData)));
    dispatch(
      add2(
        addGiftParties(addRequestData(newObj, giftsWithRequestData)),
        "gifts",
        false
      )
    );
  };
  console.log("next addtotables");
  console.table(allGifts);
  R.map(x => addToTables(x), allGifts);
  dispatch(setFilter2(null, "groupHierarchy"));
};
/* END queryGiftEvent  */

export const rowSubmit = (id, fileId = null) => ({
  type: GLOG_SUBMIT_ROW,
  id: id,
  fileId: fileId
});
export const setSearchID = id => ({
  type: GLOG_SET_SEARCH_ID,
  id: id
});
export const setSelectedRow = (id, value = true) => ({
  type: GLOG_SET_SELECTED_ROW,
  id: id
});
export const addSearch = () => ({
  type: GLOG_ADD_SEARCH
});
export const addSearch2 = () => ({
  type: GLOG_ADD_SEARCH2
});
export const setRequestID = x => ({
  type: GLOG_SET_REQUEST_ID,
  id: x
});
export const searchText = arr => ({
  type: GLOG_SEARCHTEXT,
  payload: arr
});

const filterBeginsWith = (str, items, searchField) => {
  const capFirst = str => {
    //console.log(str);
    const head = R.head(str);
    const tail = R.tail(str);
    return R.toUpper(head) + tail;
  };

  return R.filter(x => R.indexOf(capFirst(str), x[searchField]) === 0, items);
};

const changeLabel = x => {
  return R.omit(["uuid"], {
    ...x,
    id: x.uuid
  });
};
export const deleteVendor = vendorName => async (dispatch, getState) => {
  console.log("ACTION deleteVendor " + vendorName);
  dispatch(searchOrganization(vendorName));
  const token = getState().notifications.token;
  const giftID = getState().glogInput.searchID;
  const vd = await HTTP_GLOG.searchOrganization(token, vendorName);
  const objToDelete = vd.SearchOrganization;

  //const vendorUUID = getState().glogInput.searchText[0].id;
  console.log("vendor uuid to delete " + R.prop("uuid", objToDelete[0]));
  await HTTP_GLOG.removeGiftVendor(
    token,
    giftID,
    R.prop("uuid", objToDelete[0])
  );
};
export const searchOrganization = (str = "") => async (dispatch, getState) => {
  console.log("ACTION searchOrganization");
  const token = getState().notifications.token;
  let newSearch = await HTTP_GLOG.searchOrganization(token, str);
  let orgs = R.map(x => changeLabel(x), newSearch.SearchOrganization);
  //  orgs = filterBeginsWith(str, orgs, "name");
  dispatch(searchText(orgs));
};
export const searchPerson = (str = "") => async (dispatch, getState) => {
  //  console.log("ACTION searchPerson " + str);
  console.log("str length " + str.length);
  const token = getState().notifications.token;
  let newSearch = await HTTP_GLOG.searchPerson(token, str);
  console.table(newSearch);
  let peps = R.map(x => changeLabel(x), newSearch.SearchPerson);
  //  peps = filterBeginsWith(str, peps, "lastName");

  const changeDateBirth = obj => {
    console.log("changeDate f");
    console.log(!!obj.birthDate);
    if (!obj.birthDate) {
      return obj;
    }
    let d = obj.birthDate;
    let newDate = "";
    if (obj.birthDate.length === 8) {
      newDate = d.slice(4, 6) + d.slice(6, 8) + d.slice(0, 4);
    } else if (obj.birthDate.length === 6) {
      newDate = d.slice(2, 4) + d.slice(4, 6) + d.slice(0, 2);
    }

    return { ...obj, birthDate: newDate };
  };
  const changeDateDeath = obj => {
    console.log("changeDate f");
    console.log(!!obj.birthDate);

    if (!obj.deathDate) {
      return obj;
    }
    let d = obj.deathDate;
    let newDate2 = "";
    if (obj.deathDate.length === 8) {
      newDate2 = d.slice(4, 6) + d.slice(6, 8) + d.slice(0, 4);
    } else if (obj.deathDate.length === 6) {
      newDate2 = d.slice(2, 4) + d.slice(4, 6) + d.slice(0, 2);
    }
    return { ...obj, deathDate: newDate2 };
  };

  peps = R.map(x => changeDateBirth(x), peps);
  peps = R.map(x => changeDateDeath(x), peps);
  dispatch(searchText(peps));
};
export const searchGroup = (str = "") => async (dispatch, getState) => {
  console.log("ACTION searchGroup " + str);
  const token = getState().notifications.token;
  let newSearch = await HTTP_GLOG.searchGroup(token, str);
  let groups = R.map(x => changeLabel(x), newSearch.SearchGroup);
  //groups = filterBeginsWith(str, groups, "name");
  dispatch(searchText(groups));
};
export const searchAnimal = (str = "") => async (dispatch, getState) => {
  console.log("ACTION searchAnimal " + str);
  const token = getState().notifications.token;
  let newSearch = await HTTP_GLOG.searchAnimal(token, str);
  let animals = R.map(x => changeLabel(x), newSearch.SearchAnimal);
  //animals = filterBeginsWith(str, animals, "name");
  dispatch(searchText(animals));
};
export const searchNode = (str = "") => async (dispatch, getState) => {
  const node = getState().glogInput.node;
  console.log("ACTION searchNode str length : " + str.length);
  if (str == "") {
    return;
  }
  if (node == "people") {
    dispatch(searchPerson(str));
  } else if (node == "orgs") {
    dispatch(searchOrganization(str));
  } else if (node == "groups") {
    dispatch(searchGroup(str));
  } else if (node == "animals") {
    dispatch(searchAnimal(str));
  }
};
