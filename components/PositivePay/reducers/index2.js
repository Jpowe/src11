import {
  SUBMIT_ROW,
  RECEIVE_BANK_ONE,
  BANK_ONE_UUID,
  BANK_ONE_NAME,
  RECEIVE_BANK_TWO,
  BANK_TWO_UUID,
  BANK_TWO_NAME,
  BANK_SELECTION
} from "../actions";
import R from "ramda";
import { Log, LogTable } from "../../../utils/utils";
/* FOR BANK DATA */
const addFields = fields => {
  Log("addFields f");

  Log(JSON.stringify(fields));
  LogTable(fields);

  //const t1 = R.prop("PositivePayBanks", fields);

  //const arrObj = t1[0].positivePaySubmissions;

  let y1, y2;
  y1 = fields.map(x => {
    return { ...x, submit: false, selected: false };
  });
  y2 = y1.map(x => (x.status === "Failed" ? { ...x, submit: true } : x));
  return y2;
};

export const banks = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BANK_ONE:
      Log("REDUCER RECEIVE_BANK_ONE");
      Log("action.banks " + JSON.stringify(action.bankOne));
      return {
        ...state,
        bankOne: addFields(action.bankOne)
      };
    case BANK_ONE_UUID:
      Log("PP BANK_1 uuid ");
      return {
        ...state,
        bankOneUUID: action.bankOneUUID
      };
    case BANK_ONE_NAME:
      Log("PP BANK_NAME ");
      return {
        ...state,
        bankOneName: action.bankOneName
      };
    case RECEIVE_BANK_TWO:
      Log("REDUCER RECEIVE_BANK_TWO");
      Log("action.banks " + JSON.stringify(action.bankTwo));
      return {
        ...state,
        bankTwo: addFields(action.bankTwo)
      };
    case BANK_TWO_UUID:
      Log("PP BANK_TWO_UUID ");
      return {
        ...state,
        bankTwoUUID: action.bankTwoUUID
      };
    case BANK_TWO_NAME:
      Log("PP BANK_2NAME ");
      return {
        ...state,
        bankTwoName: action.bankTwoName
      };
    case BANK_SELECTION:
      Log(
        "REDUCER BANK SELECTION " +
          [action.selectedBankName, action.selectedBankUUID]
      );
      return {
        ...state,
        bankNameSelection: action.selectedBankName,
        bankUUIDSelection: action.selectedBankUUID
      };
    case SUBMIT_ROW:
      Log("REDUCER SUBMIT_ROW " + action.bank);
      Log(JSON.stringify(action.row));
      let row = action.row;
      let newRow = {
        ...row,
        submit: false,
        selected: false,
        submittedTimestamp: Date.now(),
        createdTimestamp: Date.now()
      };
      let tempArr = state[action.bank];
      tempArr.unshift(newRow);
      return {
        ...state,
        [action.bank]: tempArr
      };
    default:
      return state;
  }
};
