import {
  SUBMIT_ROW,
  RECEIVE_BANK_ONE,
  BANK_ONE_UUID,
  BANK_ONE_NAME,
  RECEIVE_BANK_TWO,
  BANK_TWO_UUID,
  BANK_TWO_NAME,
  RECEIVE_BANK_THREE,
  BANK_THREE_UUID,
  BANK_THREE_NAME,
  RECEIVE_BANK_FOUR,
  BANK_FOUR_UUID,
  BANK_FOUR_NAME,
  BANK_SELECTION,
  BANK_START_REQUEST
} from "../actions";
import R from "ramda";
import { Log, LogTable } from "../../../utils/utils";
const contains = x => {
  return R.contains(x, ["FailedTx", "Manual"]);
};
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
  y2 = y1.map(x => (contains(x.status) ? { ...x, submit: true } : x));
  return y2;
};

export const banks = (state = [], action) => {
  switch (action.type) {
    case BANK_START_REQUEST:
      console.log("START_REQUEST");
      return {
        ...state,
        loaded: false
      };
    case RECEIVE_BANK_ONE:
      Log("REDUCER RECEIVE_BANK_ONE");
      //  Log("action.banks " + JSON.stringify(action.bankOne));
      return {
        ...state,
        bankOne: action.bankOne ? addFields(action.bankOne) : [],
        loaded: true
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
        bankTwo: action.bankTwo ? addFields(action.bankTwo) : []
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
    case RECEIVE_BANK_THREE:
      //  console.log("REDUCER RECEIVE_BANK_THREE");
      //  console.log("action.banks " + JSON.stringify(action.bankThree));
      return {
        ...state,
        bankThree: action.bankThree ? addFields(action.bankThree) : []
      };
    case BANK_THREE_UUID:
      console.log("PP BANK_THREE_UUID " + action.bankThreeUUID);
      return {
        ...state,
        bankThreeUUID: action.bankThreeUUID
      };
    case BANK_THREE_NAME:
      console.log("PP BANK_THREE NAME " + action.bankThreeName);
      return {
        ...state,
        bankThreeName: action.bankThreeName
      };

    case RECEIVE_BANK_FOUR:
      //  console.log("REDUCER RECEIVE_BANK_THREE");
      //  console.log("action.banks " + JSON.stringify(action.bankThree));
      return {
        ...state,
        bankFour: action.bankFour ? addFields(action.bankFour) : []
      };
    case BANK_FOUR_UUID:
      console.log("PP BANK_FOUR_UUID " + action.bankFourUUID);
      return {
        ...state,
        bankFourUUID: action.bankFourUUID
      };
    case BANK_FOUR_NAME:
      console.log("PP BANK_FOUR NAME " + action.bankFourName);
      return {
        ...state,
        bankFourName: action.bankFourName
      };

    case BANK_SELECTION:
      console.log(
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
