import * as R from "ramda";
import { Log } from "../../../utils/utils";

import { PRESENCE_RECEIVE_ROWS } from "../../../actions";
import { PRESENCE_UPDATE_ROW, PERSON_UPDATE_ROW } from "../actions/index";

export const presence = (state = [], action) => {
  let otherRows, thisRow, newRow;
  const rows = state.rows;
  //  console.table(rows);
  switch (action.type) {
    case PRESENCE_RECEIVE_ROWS:
      console.log("PRESENCE_RECEIVE_ROWS");
      return {
        ...state,
        rows: action.rows
      };

    case PRESENCE_UPDATE_ROW:
      console.log("PRESENCE_UPDATE_ROW");
      console.log("REDUCER " + action.userUUID);
      console.log("action.row " + JSON.stringify(action.row));
      otherRows = R.filter(x => x.uuid !== action.userUUID, rows);
      thisRow = R.find(x => x.uuid === action.userUUID, rows);
      console.log("thisRow " + JSON.stringify(thisRow));
      //  newRow = { ...thisRow, ...action.row };
      //console.log("newRow " + JSON.stringify(newRow));
      return {
        ...state,
        ["rows"]: [...otherRows, thisRow]
      };
    case PERSON_UPDATE_ROW:
      console.log("REDUCER PERSON_UPDATE_ROW2");
      otherRows = R.filter(x => x.uuid !== action.id, rows);
      thisRow = R.find(x => x.uuid === action.id, rows);
      console.log(JSON.stringify(thisRow));
      console.log("action.row " + JSON.stringify(action.row));
      //newRow = R.flatten(thisRow, action.row);
      newRow = { ...thisRow, ...action.row };
      console.log(JSON.stringify(newRow));
      return {
        ...state,
        ["rows"]: [...otherRows, newRow]
      };

    default:
      return { ...state, init: 1 };
  }
};
