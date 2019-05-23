import * as R from "ramda";
import {
  GIFT_LOG_SEARCH,
  GIFT_LOG_ADD_ROWS,
  GIFT_LOG_SAVE_FORM,
  GIFT_LOG_UPDATE_FORM,
  SET_CONFIG_GIFT_LOG2,
  SET_VAR_GIFT_LOG2,
  GIFT_LOG_ADD_GIFT_EVENTS,
  GIFT_LOG_UPDATE_GIFT_EVENT,
  GIFT_LOG_MERGE_ROW,
  GIFT_LOG_HIERARCHY,
  //  GIFT_LOG_UPDATE_STATE_GIFTS,
  TEST
} from "../actions";

const mergeRows = (obj1, obj2) => {
  console.log("mergeRows");
  console.table(obj1);
  console.table(obj2);
  let children, partners;
  try {
    children = R.uniq([...obj1.children, ...obj2.children]);
    console.table(children);
  } catch (e) {
    console.log(e.message);
  }
  try {
    partners = R.uniq([...obj1.partners, ...obj2.partners]);
    console.table(partners);
  } catch (e) {
    console.log(e.message);
  }
  return { ...obj1, children: children, partners: partners };
};
const tweakData = obj => {
  //console.log("tweakData");
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
    //  eventType: [obj.eventType],
    id: obj.uuid,
    eventDate: `${obj.eventMonth}/${obj.eventDay}`,
    recipients: combineRecipients(obj),
    //giftHistory: [],
    //requests: R.map(x => addKeyID(x), obj.eventGiftRequests),
    eventMonth: `${obj.eventMonth}`,
    recurring: [obj.recurring],
    registryStatus: obj.registryStatus
  };
};
let testOrder = 0;
export const giftLog = (state = [], action) => {
  let uuid, otherRows, origRow, newRow, newRows, mainRows;
  switch (action.type) {
    case GIFT_LOG_SEARCH:
      console.log("REDUCER CASE GIFT_LOG_SEARCH ");
      console.table(action.payload);
      return {
        ...state,
        searchResults: action.payload
      };

    case GIFT_LOG_ADD_ROWS:
      console.log("REDUCER CASE GIFT_LOG_ADD_ROWS");
      console.table(action.payload);
      return {
        ...state,
        [action.name]: [...action.payload]
      };
    case GIFT_LOG_MERGE_ROW:
      console.log("REDUCER CASE GIFT_LOG_MERGE_ROW");
      uuid = R.prop("uuid", action.payload);
      console.log("uuid " + uuid);
      if (!!R.find(x => x.uuid === uuid, state[action.name])) {
        origRow = R.find(x => x.uuid === uuid, state[action.name]);
        //  console.table(origRow);
        newRow = mergeRows(origRow, action.payload);
      } else {
        newRow = { ...action.payload, testOrder: testOrder++ };
      }

      console.table(newRow);
      newRows = R.uniqBy(R.prop("uuid"), [newRow, ...state[action.name]]);
      mainRows = R.filter(x => R.contains(x.uuid, state.mainPersons), newRows);
      newRows = R.uniqBy(R.prop("uuid"), [...mainRows, ...newRows]);
      return {
        ...state,
        [action.name]: newRows
      };
    case GIFT_LOG_ADD_GIFT_EVENTS:
      console.log("REDUCER CASE GIFT_LOG_ADD_GIFT_EVENTS ");
      return {
        ...state,
        giftEvents: R.uniq([...R.map(x => tweakData(x), action.payload)])
      };
    case GIFT_LOG_UPDATE_GIFT_EVENT:
      console.log("REDUCER CASE GIFT_LOG_UPDATE_GIFT_EVENT");
      uuid = R.prop("uuid", action.payload);
      otherRows = R.filter(x => x.uuid !== uuid, state["giftEvents"]);
      return {
        ...state,
        giftEvents: [...otherRows, tweakData(action.payload)]
      };

    case GIFT_LOG_SAVE_FORM:
      console.log("REDUCER CASE GIFT_LOG_SAVE_FORM");
      return {
        ...state,
        [action.name]: state[action.name]
          ? R.uniqBy(R.prop("uuid"), [...state[action.name], action.payload])
          : [action.payload]
      };
    case GIFT_LOG_UPDATE_FORM:
      console.log("REDUCER CASE GIFT_LOG_UPDATE_FORM");
      uuid = R.prop("uuid", action.payload);
      console.log("REDUCER uuid " + uuid);
      otherRows = R.filter(x => x.uuid !== uuid, state[action.name]);
      newRows = [...otherRows, action.payload];
      try {
        console.log("state.mainperson " + state.mainPerson);
        mainRows = R.filter(
          x => R.contains(x.uuid, state.mainPersons),
          newRows
        );
        newRows = R.uniqBy(R.prop("uuid"), [...mainRows, ...newRows]);
        console.table(newRows);
        console.table(R.uniqBy(R.prop("uuid"), [...mainRows, ...newRows]));
      } catch (e) {
        console.log(e.mesage);
      }
      return {
        ...state,
        [action.name]: newRows
      };
    case SET_CONFIG_GIFT_LOG2:
      console.log("REDUCER CASE SET_CONFIG_GIFT_LOG2");
      return {
        ...state,
        [action.name]: action.payload
      };
    case SET_VAR_GIFT_LOG2:
      console.log("REDUCER CASE SET_VAR_GIFT_LOG2");
      return {
        ...state,
        [action.name]: action.payload
      };
    case GIFT_LOG_HIERARCHY:
      return {
        ...state,
        groupHierarchy: state.groupHierarchy
          ? addLevel(orderGroupHierarchy(state.groupHierarchy, action.payload))
          : addLevel([...action.payload])
      };
    /*
    case GIFT_LOG_UPDATE_STATE_GIFTS:
      console.log("REDUCER GIFT_LOG_UPDATE_STATE_GIFTS");
      console.log(action.id);
      console.table(action.payload);
      const temp = R.map(
        x => (x.id === action.id ? { ...x, ...action.payload } : x),
        state["gifts"]
      );
      console.table(temp);
      return {
        ...state,
        test: "TESTING",
        gifts2: [
          R.map(
            x => (x.id === action.id ? { ...x, ...action.payload } : x),
            state["gifts"]
          )
        ]
      };
    case TEST:
      console.log("REDUCER TEST");
      return {
        ...state,
        test: "test test"
      };*/
    default:
      console.log("REDUCER CASE DEFAULT " + action.id);
      return {
        ...state,
        currentGiftEvent: state.currentGiftEvent ? state.currentGiftEvent : null
      };
  }
};
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/***
 *** ADD RETURNING GIFT[0].ASSIGNEDTO TO GETREQUESTS,
 ***  so that assigned to is in each request row
 **/
export const getRequests = state => {
  console.log("REDUCER getRequests");
  try {
    const appData = state.giftLog;
    let ge = R.find(
      x => x.uuid == appData.currentGiftEvent,
      appData.giftEvents
    );
    console.table(ge);
    console.table(ge.eventGiftRequests);
    return ge.eventGiftRequests;
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};
export const getCurrentGiftEvent = state => {
  console.log("REDUCER getCurrentGiftEvent");
  console.table(state.giftLog);
  const appData = state.giftLog;
  try {
    if (!appData.currentGiftEvent) {
      console.log("!currentGiftEvent return empty {}");
      return {};
    }
    let ge = R.find(
      x => x.uuid == appData.currentGiftEvent,
      appData.giftEvents
    );
    console.log("ge " + JSON.stringify(ge));
    return ge;
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};
export const bIncidentalOrRecurring = state => {
  console.log("REDUCER bIncidentalOrRecurring");
  try {
    const ge = getCurrentGiftEvent(state);
    const etypes = state.giftLog.eventTypes;
    const etypeRow = R.find(x => x.value === ge.eventType, etypes);
    return etypeRow.type;
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};

export const getCurrentRequest = state => {
  console.log("REDUCER getCurrentRequest");
  const appData = state.giftLog;
  if (!appData.currentGiftRequest) {
    console.log("NOT currentGiftrequest");
    return [];
  }
  try {
    let ge = R.find(
      x => x.uuid == appData.currentGiftEvent,
      appData.giftEvents
    );
    const gr = R.find(
      x => x.uuid == appData.currentGiftRequest,
      ge.eventGiftRequests
    );
    console.log(JSON.stringify(gr));
    console.table(gr);

    return gr ? gr : {};
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};

export const getCurrentRequestPersons = state => {
  console.log("REDUCER getCurrentRequestPersons");
  try {
    const appData = state.giftLog;
    const giftReq = getCurrentRequest(state);
    return R.prop("requestPersons", giftReq)
      ? R.prop("requestPersons", giftReq)
      : [];
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};
export const getCurrentRequestOrganizations = state => {
  console.log("REDUCER getCurrentRequestOrganizations");
  try {
    const appData = state.giftLog;
    const giftReq = getCurrentRequest(state);
    return R.prop("requestOrganizations", giftReq)
      ? R.prop("requestOrganizations", giftReq)
      : [];
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};
export const getCurrentRequestGroups = state => {
  console.log("REDUCER getCurrentRequestGroups");
  try {
    const appData = state.giftLog;
    const giftReq = getCurrentRequest(state);
    return R.prop("requestGroups", giftReq)
      ? R.prop("requestGroups", giftReq)
      : [];
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};
export const getSelectedPerson = state => {
  console.log("REDUCER getSelectedPerson");
  try {
    //const objPerson = state.giftLog.geneology[state.giftLog.selectedPerson];
    const objPerson = R.find(
      x => x.uuid === state.giftLog.selectedPerson,
      state.giftLog.geneology
    );
    console.table(objPerson);
    return objPerson;
  } catch (e) {
    console.log("CATCH " + e.message);
    return {};
  }
};
export const getCurrentAssignedTo = state => {
  console.log("REDUCER  getCurrentAssignedTo");
  try {
    const giftReq = getCurrentRequest(state);
    console.table(giftReq);
    const assign = R.path(["requestGifts", 0, "gift", "assignedTo"], giftReq);
    console.log("assign via reducer " + assign);

    return { assignedTo: assign };
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};

export const getCurrentGift = state => {
  console.log("REDUCER  getCurrentGift");
  const emptyObj = {
    value: "",
    description: "",
    assignedTo: "",
    sentiment: "",
    giftNotes: ""
  };
  try {
    const giftReq = getCurrentRequest(state);
    console.table(giftReq);
    const gift = R.prop(
      "gift",
      R.find(x => x.giftYear == "2019", R.prop("requestGifts", giftReq))
    );
    //const gift = R.path(["requestGifts", 0, "gift"], giftReq);
    console.table(gift);
    return gift;
  } catch (e) {
    return emptyObj;
    console.log("CATCH " + e.message);
  }
};

export const getCurrentOrder = state => {
  try {
    const gift = getCurrentGift(state);
    const order = R.path(["giftVendor"], gift);
    console.table(order);
    if (!order) {
      const emptyObj = {
        orderNumber: "",
        orderDate: "",
        vendorRepresentativeName: "",
        vendorRepresentativePhone: "",
        vendorRepresentativeEmail: "",
        orderStatus: "",
        organization: { name: "" }
      };
      return emptyObj;
    }
    return order;
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};

export const getCurrentDelivery = state => {
  const emptyObj = {
    attentionTo: "",
    deliveryContactNumber: "",
    deliveryTrackingNumber: "",
    confirmedDeliveryDate: "",
    location: { uuid: "", name: "", formattedAddress: [] }
  };
  try {
    const gift = getCurrentGift(state);
    const delivery = R.path(["delivery"], gift);
    console.table(delivery);
    if (delivery) {
      return delivery;
    } else {
      console.log("delivery is null");
      return emptyObj;
    }
  } catch (e) {
    return emptyObj;
    console.log("CATCH " + e.message);
  }
};

export const getCurrentRequestLocations = state => {
  try {
    const giftReq = getCurrentRequest(state);
    const reqGifts = R.prop("requestGifts", giftReq);
    console.table(reqGifts);
    const convert = reqGift => {
      const addy = R.path(
        ["gift", "delivery", "location", "formattedAddress"],
        reqGift
      )
        ? R.path(
            ["gift", "delivery", "location", "formattedAddress"],
            reqGift
          ).toString()
        : null;
      const uuid = R.path(["gift", "delivery", "location", "uuid"], reqGift);
      const newObj = { name: addy, title: addy, value: uuid };
      return newObj;
    };
    const objLocs = R.filter(x => x.value, R.map(convert, reqGifts));
    console.table(objLocs);
    return objLocs;
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};

//////////////////////////////////////////

const orderGroupHierarchy = (hierarchy, payload) => {
  console.log("orderGroupHierarcy");
  const parentID = R.prop("parent", payload[0]);
  console.log("parentID " + parentID);
  const ind = R.findIndex(R.propEq("uuid", parentID))(hierarchy);
  console.log("ind " + ind);
  hierarchy.splice(ind + 1, 0, ...payload);
  console.table(R.uniq(hierarchy));
  return R.uniq(hierarchy);
};
const addLevel = rows => {
  const getParentLevel = row => {
    const a = R.find(x => x.id == row.parent, rows);
    return a ? a.level : 0;
  };
  const setLevel = row => {
    return { ...row, level: getParentLevel(row) + 1 };
  };
  return R.map(x => setLevel(x), rows);
};
const removeHier = (rows, parentID) => {
  let newRows, childRows, childrenIDs;
  newRows = rows;
  const process = y => {
    let childrenRows = R.filter(x => x.parent == y, rows);
    childrenIDs = R.map(x => x.id, childrenRows);
    newRows = R.filter(x => x.parent != y, newRows);
    R.map(process, childrenIDs);
  };
  process(parentID);

  return newRows;
};

/*
export const filterEventType = (state, eventType, rows) => {
  console.table(rows);

  const data = state.giftLog;
  const etypes = state.giftLog.eventTypes;
  console.table(etypes);
  const check = et => {
    console.log(et);
    if (!et) {
      return null;
    }
    try {
      console.log(R.prop("type", R.find(x => x.name == et, etypes)));
      return R.prop("type", R.find(x => x.name == et, etypes));
    } catch (e) {
      console.log("CATCH " + e.message);
      return null;
    }
  };

  return R.filter(x => check(x.eventType) == eventType, rows);
};
*/
