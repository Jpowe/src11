import * as R from "ramda";
import { Log } from "../../../utils/utils";

import {
  ADDEPAR_RECEIVE_ROWS,
  ADDEPAR_SUBMIT_ROW,
  ADDEPAR_START_REQUEST
} from "../actions";

export const addepar = (state = [], action) => {
  switch (action.type) {
    case ADDEPAR_START_REQUEST:
      return {
        ...state,
        loaded: false
      };
    case ADDEPAR_RECEIVE_ROWS:
      Log("ADDEPAR_RECEIVE_ROWS");
      return {
        ...state,
        rows: action.rows ? action.rows : [],
        received: true,
        loaded: true
      };
    case ADDEPAR_SUBMIT_ROW:
      Log("ADDEPAR_SUBMIT_ROW");
      let tempArr = state["rows"];
      tempArr.unshift(action.row);
      return {
        ...state,
        ["rows"]: tempArr
      };

    default:
      return {
        ...state,
        init: 1
      };
  }
};
