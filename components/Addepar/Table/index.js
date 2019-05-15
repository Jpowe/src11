import * as R from "ramda";
import { Log } from "../../../utils/utils";

import {
  RECEIVE_COLUMNS,
  RECEIVE_ROWSBOFA,
  RECEIVE_ROWSCOBIZ,
  SUBMIT_ROW
} from "../actions";

const addFields = fields => {
  let y1, y2;
  y1 = fields.map(x => {
    return { ...x, submit: false, selected: false };
  });
  y2 = y1.map(x => (x.status === "Failed" ? { ...x, submit: true } : x));
  return y2;
};
const getFileId = (fields, id) => {
  let row = R.find(x => x.id === id, fields);
  return R.prop("fileId", row);
};

const reducers = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COLUMNS:
      return {
        ...state,
        columns: action.fields
      };
    case RECEIVE_ROWSBOFA:
      return {
        ...state,
        rowsBofA: addFields(action.fields)
      };
    case RECEIVE_ROWSCOBIZ:
      return {
        ...state,
        rowsCoBiz: addFields(action.fields)
      };
    case SUBMIT_ROW:
      Log("REDUCER SUBMIT_ROW " + action.id);
      return {
        ...state,
        selectedRow: action.id,
        selectedFileId: action.fileId
      };
    default:
      return { init: 1 };
  }
};

export default reducers;
