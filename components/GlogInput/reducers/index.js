import * as R from "ramda";
import uuidv4 from "uuid/v4";

import {
  GLOG_SET_REQUEST_ID,
  GLOG_LOAD_DATA,
  GLOG_ON_TYPE,
  GLOG_ADD,
  GLOG_RECEIVE_ROWS,
  GLOG_SUBMIT_ROW,
  UPDATE_GIFT_INSTANCE,
  UPDATE_GEI_INSTANCE_RECIP,
  GLOG_UPDATE,
  GLOG_UPDATE_SECONDARY,
  GLOG_DELETE,
  GLOG_ADD_DATA,
  GLOG_SET_VIEW,
  GLOG_SET_STATUS,
  GLOG_SET_NODE,
  ADD_ROW_GIFT_INSTANCE,
  GLOG_SET_SEARCH_ID,
  GLOG_SET_SELECTED_ROW,
  GLOG_ADD_SEARCH,
  GLOG_ADD_SEARCH2,
  UPDATE_GEI_INSTANCE_REQUEST,
  GLOG_SET_ACTION,
  GLOG_SET_VAR,
  GLOG_UPDATE_GIFTREQUEST_GIFT,
  GLOG_SEARCHTEXT,
  GLOG_UPDATE_FIELD,
  GLOG_FILTER_GEIS,
  SET_CONFIG_GIFT_LOG,
  SET_VAR,
  SET_RAW_AND_GEI_LOAD,
  GLOG_HIER2,
  GLOG_GROUP_HIERARCHY,
  GLOG_HIERARCHY_REMOVE
} from "../actions";
import {
  dataGifts,
  dataOrgs,
  dataAnimals,
  dataPeople,
  dataLocations,
  giftEventInstances,
  dataVendors,
  dataDeliveries,
  dataOrders,
  dataGroups,
  dataRequests
} from "./reducer_data";

/* MOVE ADDSUBMITFIELD TO ACTIONS or CONTAINER ??*/
/* added selected true for first row */
const addSubmitField = fields => {
  console.log("REDUCER addSubmitField f");
  console.table(fields);
  let y1, y2;
  y1 = fields.map((x, i) => {
    return { ...x, submit: false, selected: !i ? true : false };
  });
  y2 = y1.map(x => (x.status === "Failed" ? { ...x, submit: true } : x));
  return y2;
};
let newRows,
  newRow,
  id,
  otherRows,
  thisRow,
  arrRecips,
  newRecip,
  arrGifts,
  newGift,
  t,
  gei;

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
    eventType: [obj.eventType],
    id: obj.uuid,
    date: [`${obj.eventMonth}/${obj.eventDay}`],
    recipients: combineRecipients(obj),
    giftHistory: [],
    requests: R.map(x => addKeyID(x), obj.eventGiftRequests),
    eventMonth: `${obj.eventMonth}`,
    notes: [obj.notes],
    recurring: [obj.recurring],
    registryStatus: obj.registryStatus
  };
};
export const glogInput = (state = [], action) => {
  switch (
    action.type /*
    case SET_RAW_AND_GEI_LOAD:
      console.log("REDUCER SET_RAW_AND_GEI_LOAD");
      newObj = x => {
        return { ...x, id: x.uuid };
      };
      return {
        ...state,
        GEI_RAW: R.uniq([...state.GEI_RAW, ...action.payload]),
        giftEventInstances: R.uniq([
          ...state.giftEventInstances,
          ...R.map(x => tweakData(x), action.payload)
        ])
      };
      */
  ) {
    case SET_RAW_AND_GEI_LOAD:
      console.log("REDUCER SET_RAW_AND_GEI_LOAD");
      newObj = x => {
        return { ...x, id: x.uuid };
      };
      return {
        ...state,
        GEI_RAW: R.uniq([...state.GEI_RAW, ...action.payload]),
        giftEventInstances: R.uniq([
          R.find(x => x.id == state.selectedRow, state.giftEventInstances),
          ...R.map(x => tweakData(x), action.payload)
        ])
      };
    case SET_VAR:
      return {
        ...state,
        [action.name]: action.payload
      };
    case SET_CONFIG_GIFT_LOG:
      return {
        ...state,
        [action.name]: action.payload
      };
    case GLOG_FILTER_GEIS:
      console.log("REDUCER action.month " + action.month);
      let filteredMonth = R.filter(
        x => x.eventMonth == action.month,
        state.giftEventInstances
      );
      let filteredNoTimestamp = R.filter(
        x => x.createdTimestamp == "0",
        state.giftEventInstances
      );
      let newRows = R.concat(filteredMonth, filteredNoTimestamp);
      return {
        ...state,
        giftEventInstances: R.uniq([...newRows, ...state.giftEventInstances])
      };
    case GLOG_UPDATE_FIELD:
      console.log("REDUCER GLOG_UPDATE_FIELD");
      console.log(
        "vars " + [action.id, action.node, action.field, action.payload]
      );
      const row = R.find(x => x.id === action.id, state[action.node]);
      let otherRows = R.filter(x => x.id !== action.id, state[action.node]);
      let newRow = { ...row, vendor: action.payload };
      console.table(row);
      return {
        ...state,
        gifts: [...otherRows, newRow]
      };
    case GLOG_SEARCHTEXT:
      return {
        ...state,
        searchText: action.payload
      };
    case GLOG_ON_TYPE:
      console.log("REDUCER ON_TYPE");
      console.log("selectedrow " + state.selectedRow);
      console.log("payload id " + action.payload.id);

      return {
        ...state
        //  locations:
      };
    case GLOG_UPDATE_GIFTREQUEST_GIFT:
      console.log("REDUCER GLOG_GIFTREQUEST_GIFT_AD");
      console.log("action.payload " + action.payload);

      let selectedObj = R.find(x => x.id === action.id, state.requests);
      let newObj = {
        ...selectedObj,
        requestGifts: [action.payload]
      };
      console.table(newObj);
      let otherObjs = R.filter(x => x.id !== action.id, state.requests);
      return {
        ...state,
        requests: [...otherObjs, newObj]
      };
    case GLOG_SET_VIEW:
      console.log("REDUCER GLOG_SET_VIEW");
      return {
        ...state,
        view: action.view
      };
    case GLOG_SET_ACTION:
      console.log("REDUCER SET_ACTION");
      return {
        ...state,
        action: action.payload
      };
    case GLOG_SET_VAR:
      return {
        ...state,
        [action.variable]: action.payload
      };
    case GLOG_SET_NODE:
      console.log("REDUCER SET_NODE " + action.node);
      return {
        ...state,
        node: action.node
      };

    case GLOG_SET_STATUS:
      console.log("REDUCER SET_STATUS");
      return {
        ...state,
        status: action.status
      };
    case GLOG_LOAD_DATA:
      return {
        ...state,
        gifts: dataGifts,
        people: dataPeople,
        locations: dataLocations,
        orgs: dataOrgs,
        animals: dataAnimals,
        groups: dataGroups,
        requests: dataRequests,
        node: "people",
        //  selection: "people",
        giftEventInstances: giftEventInstances,
        selectedRow: 21,
        //searchID: 1,
        vendors: dataVendors,
        deliveries: dataDeliveries,
        orders: dataOrders,
        config: [],
        GEI_RAW: [],
        groupHierarchy: null
      };
    case GLOG_ADD_DATA:
      return {
        ...state,
        gifts: dataGifts,
        people: dataPeople,
        node: "gifts"
      };
    case ADD_ROW_GIFT_INSTANCE:
      return {
        ...state,
        selectedRow: action.id,
        giftEventInstances: [
          ...state.giftEventInstances,
          {
            id: action.id,
            eventType: [""],
            date: [""],
            recipients: [],
            giftHistory: [],
            registryStatus: "1",
            active: [1],
            recurring: [1],
            requests: [],
            notes: [""],
            eventMonth: [],
            eventDay: [],
            eventGiftRequests: []
          }
        ],
        searchID: null,
        requestID: null,
        groupHierarchy: null
      };
    case GLOG_ADD_SEARCH:
      console.log("REDUCER ADD_SEARCH");
      otherRows = R.filter(
        x => x.id !== state.selectedRow,
        state.giftEventInstances
      );

      thisRow = R.find(
        x => x.id == state.selectedRow,
        state.giftEventInstances
      );
      console.table(thisRow);
      arrRecips = R.prop("recipients", thisRow);
      console.log(JSON.stringify(arrRecips));
      newRecip = R.prop(
        "id",
        R.find(x => x.id == state.searchID, state[state.node])
      );
      console.log("newRecip" + JSON.stringify(newRecip));

      newRow = {
        ...thisRow,
        recipients: [...arrRecips, { id: newRecip, type: state.node }]
      };
      console.table(newRow);
      return {
        ...state,
        giftEventInstances: [...otherRows, newRow]
      };
    case GLOG_ADD_SEARCH2:
      console.log("REDUCER ADD_SEARCH2");
      otherRows = R.filter(
        x => x.id !== state.selectedRow,
        state.giftEventInstances
      );
      thisRow = R.find(
        x => x.id == state.selectedRow,
        state.giftEventInstances
      );
      console.table(thisRow);
      arrGifts = R.prop("giftHistory", thisRow);
      console.log(JSON.stringify(arrGifts));
      newGift = R.prop(
        "id",
        R.find(x => x.id == state.searchID, state[state.node])
      );
      console.log("newRecip" + JSON.stringify(newGift));

      newRow = {
        ...thisRow,
        giftHistory: [...arrGifts, { id: newGift, type: "gifts" }]
      };
      console.table(newRow);
      return {
        ...state,
        giftEventInstances: [...otherRows, newRow]
      };
    case GLOG_ADD:
      let containsID = R.prop("id", action.payload);
      if (containsID) {
        id = R.prop("id", action.payload);
      } else {
        id = uuidv4();
      }
      let noDupRows = R.filter(x => x.id !== id, state[action.node]);
      let allRows = action.addID
        ? [...state[action.node], { ...action.payload, id: id }]
        : [...noDupRows, { ...action.payload }];
      return {
        ...state,
        [action.node]: R.uniq(allRows),
        searchID: action.addID ? id : state.searchID
      };

    case UPDATE_GIFT_INSTANCE:
      console.log(
        "REDUCER UPDATE_GIFT_INSTANCE " + JSON.stringify(action.giftInstance)
      );
      gei = state.giftEventInstances;
      newRows = gei.map(
        x => (x.id === state.selectedRow ? action.giftInstance : x)
      );
      return {
        ...state,
        giftEventInstances: newRows
      };

    case UPDATE_GEI_INSTANCE_RECIP:
      console.log("REDUCER UPDATE_GEI_INSTANCE_RECIP");
      otherRows = R.filter(
        x => x.id !== state.selectedRow,
        state.giftEventInstances
      );
      thisRow = R.find(
        x => x.id == state.selectedRow,
        state.giftEventInstances
      );
      arrRecips = R.prop("recipients", thisRow);
      let arrEventPersons = thisRow.eventPersons
        ? R.prop("eventPersons", thisRow)
        : [];

      newRecip = R.prop(
        "id",
        R.find(x => x.id == state.searchID, state[state.node])
      );

      let newEventPerson = R.pick(
        ["id", "firstName", "lastName"],
        R.find(x => x.id == state.searchID, state[state.node])
      );
      console.table(newEventPerson);
      let eventPersons = [
        {
          id: newEventPerson.id,
          firstName: newEventPerson.firstName,
          lastName: newEventPerson.lastName
        }
      ];
      newRow = {
        ...thisRow,
        recipients: R.uniq([...arrRecips, { id: newRecip, type: state.node }]),
        eventPersons: R.uniq([...arrEventPersons, ...eventPersons])
      };
      console.table(newRow);
      return {
        ...state,
        giftEventInstances: [...otherRows, newRow]
      };
    case UPDATE_GEI_INSTANCE_REQUEST:
      console.log("REDUCER UPDATE_GEI_INSTANCE_RqueST");
      otherRows = R.filter(
        x => x.id !== state.selectedRow,
        state.giftEventInstances
      );
      thisRow = R.find(
        x => x.id == state.selectedRow,
        state.giftEventInstances
      );
      arrRecips = R.prop("requests", thisRow);

      newRecip = R.prop(
        "id",
        R.find(x => x.id == state.searchID, state[state.node])
      );

      newRow = {
        ...thisRow,
        requests: R.uniq([...arrRecips, { id: newRecip, type: state.node }])
      };
      return {
        ...state,
        giftEventInstances: [...otherRows, newRow],
        requestID: newRecip
      };

    case GLOG_UPDATE:
      console.log("REDUCER UPDATE");
      console.log("reducer node: " + action.node);
      t = state[action.node];
      console.table(t);
      newRows = t.map(x => (x.id === state.searchID ? action.payload : x));
      console.table(newRows);
      return {
        ...state,
        [action.node]: newRows
      };
    case GLOG_UPDATE_SECONDARY:
      console.log("GLOG_UPDATE_SECONDARY");
      console.table(action.payload);
      t = state[action.node];
      id = R.prop("id", action.payload);
      console.log("REDUCE UPDATE SECONDARY ID " + id);
      console.log("NODE " + action.node);
      newRows = t.map(x => (x.id === id ? action.payload : x));
      console.table(newRows);
      return {
        ...state,
        [action.node]: newRows
      };
    case GLOG_DELETE:
      console.log("REDUCER DELETE " + [action.id, action.node]);
      newRows = R.filter(x => x.id !== action.id, state[action.node]);
      return {
        ...state,
        [action.node]: newRows
      };
    case GLOG_RECEIVE_ROWS:
      console.log(
        "REDUCER RECEIVE_ROWS action.rows " + JSON.stringify(action.rows)
      );
      return {
        ...state,
        rows: [...state.rows, ...addSubmitField(action.rows)],
        selectedRow: 1
      };
    case GLOG_SUBMIT_ROW:
      console.log("REDUCER GLOG_SUBMIT_ROW " + action.id);
      console.log("REDUCER GLOG SUBMIT ROW action.filedId " + action.fileID);
      return {
        ...state,
        selectedRow: action.id ? action.id : state.selectedRow,
        requestID: null
        //selectedFileId: action.fileId
      };
    case GLOG_SET_SEARCH_ID:
      console.log("REDUCER SET_SEARCH_ID : " + action.id);
      id = action.id ? action.id : state.searchID;
      return {
        ...state,
        searchID: id,
        [state.node]: R.map(
          x =>
            x.id === id ? { ...x, selected: true } : { ...x, selected: false },
          state[state.node]
        )
      };
    case GLOG_SET_SELECTED_ROW:
      console.log("REDUCER SET_SELECTED_ROW " + action.id);
      //R.map(x => (x.id === action.id ? { ...x, selected: true } : x))
      return {
        ...state,
        [state.node]: R.map(
          x =>
            x.id === action.id
              ? { ...x, selected: true }
              : { ...x, selected: false },
          state[state.node]
        )
      };
    case GLOG_SET_REQUEST_ID:
      return {
        ...state,
        requestID: action.id
      };
    case GLOG_HIER2:
      return {
        ...state,
        hier2: state.hier2 ? [...state.hier2, action.payload] : [action.payload]
      };

    case GLOG_GROUP_HIERARCHY:
      return {
        ...state,
        groupHierarchy: state.groupHierarchy
          ? addLevel(orderGroupHierarchy(state.groupHierarchy, action.payload))
          : addLevel([...action.payload])
      };
    /*
    case GLOG_HIERARCHY_REMOVE: {
      return {
        ...state,
        groupHierarchy: state.groupHierarchy
          ? R.filter(x => x.parent !== action.parentID, state.groupHierarchy)
          : []
      };
    }*/
    case GLOG_HIERARCHY_REMOVE: {
      return {
        ...state,
        groupHierarchy: state.groupHierarchy
          ? removeHier(state.groupHierarchy, action.parentID)
          : []
      };
    }
    default:
      return {
        ...state
      };
  }
};

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
const removeGroupHierarchy = (parentID, hierarchy) => {
  const removeChild = id => {
    let list = R.filter(x => x.parent !== parentID, hierarchy);
    list = R.map(x => x.uuid, list);
    return R.map(removeChild, list);
  };
  return removeChild(parentID);
};
*/
/**
 * selector pattern...called from containers
 **/

export const getRows = store => {
  console.log("Reducer getRows");
  return store.data.rows ? store.data.rows : null;
};
export const getSelection = store => {
  console.log("Reducer getSelection");
  return store.data.selection ? store.data.selection : null;
};
export const getRowSelected = store => {
  console.log("Reducer getRowSelected");
  return store.data.rows ? store.data.rows[store.data.selectedRow] : null;
};

/**/

export default glogInput;
