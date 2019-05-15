import { REQUEST_USER, RECEIVE_USER, MODIFY_USER } from "../actions";
import R from "ramda";

const user = (state = [], action) => {
  //console.log("ADD_NOTIFICATION reducer folder " + action.type);
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state
      };
    case RECEIVE_USER:
      console.log("REDUCER RECEIVE" + action.user);
      return {
        ...state,
        user: action.user.portalUser
      };

    case MODIFY_USER:
      console.log("MODIFY_USER reducer f action.id " + action.id);
      return state.map(
        x => (x.id === action.id ? { ...x, showNew: false } : x)
      );

    /*
    case "DELETE_ALL_NOTIFICATIONS":
      console.log("DELETE_ALL_NOTIFICATIONS reducer f ");
      return {
        ...state,
        rows: []
      };
      */
    default:
      return { empty: 1 };
  }
};

export default user;
