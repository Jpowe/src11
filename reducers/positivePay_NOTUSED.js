import * as R from "ramda";

import { RECEIVE_BANKS } from "../actions";

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

const PositivePay = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BANKS:
      console.log("REDUCER RECEIVE_BANKS");
      return {
        ...state,
        banks: action.banks
      };
    default:
      return state;
  }
};

export default PositivePay;
