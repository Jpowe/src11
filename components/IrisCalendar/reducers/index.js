import * as R from "ramda";

import { IRIS_CALENDAR_RESPONSE, IRISCALENDAR_START_REQUEST } from "../actions";

export const irisCalendar = (state = [], action) => {
  switch (action.type) {
    case IRISCALENDAR_START_REQUEST:
      return {
        ...state,
        loaded: false
      };
    case IRIS_CALENDAR_RESPONSE:
      return {
        ...state,
        response: action.payload,
        loaded: true
      };

    default:
      return {
        ...state,
        init: 1,
        loaded: true
      };
  }
};
