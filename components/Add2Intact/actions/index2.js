import * as R from "ramda";
import * as HTTP from "../../../common/http";
import { Log, LogTable } from "../../../utils/utils";
import { Base64 } from "js-base64";
import { downloadText } from "download.js";

export const RECEIVE_COLUMNS = "RECEIVE_COLUMNS";
//export const RECEIVE_ROWSBOFA = "RECEIVE_ROWSBOFA";
//export const RECEIVE_ROWSCOBIZ = "RECEIVE_ROWSCOBIZ";
export const SUBMIT_ROW = "SUBMIT_ROW";

export const BANK_ONE_UUID = "BANK_ONE_UUID";
export const RECEIVE_BANK_ONE = "RECEIVE_BANK_ONE";
export const BANK_ONE_NAME = "BANK_ONE_NAME";

export const BANK_TWO_UUID = "BANK_TWO_UUID";
export const RECEIVE_BANK_TWO = "RECEIVE_BANK_TWO";
export const BANK_TWO_NAME = "BANK_TWO_NAME";
export const BANK_SELECTION = "BANK_SELECTION";
export const BANK_START_REQUEST = "START_REQUEST";

const decode = data => {
  return Base64.decode(data);
};
const download = (fileName, data) => {
  console.log("download f " + fileName);
  return downloadText(fileName, data);
};

const getFileId = (fields, id) => {
  let row = R.find(x => x.id === id, fields);
  return R.prop("fileId", row);
};

export const receiveColumns = json => ({
  type: RECEIVE_COLUMNS,
  fields: json
});

export const receiveBankOneUUID = uuid => ({
  type: BANK_ONE_UUID,
  bankOneUUID: uuid
});
export const receiveBankOneName = strName => ({
  type: BANK_ONE_NAME,
  bankOneName: strName
});
export const receiveBankOne = json => ({
  type: RECEIVE_BANK_ONE,
  bankOne: json
});

export const receiveBankTwoUUID = uuid => ({
  type: BANK_TWO_UUID,
  bankTwoUUID: uuid
});
export const receiveBankTwoName = strName => ({
  type: BANK_TWO_NAME,
  bankTwoName: strName
});
export const receiveBankTwo = json => ({
  type: RECEIVE_BANK_TWO,
  bankTwo: json
});
export const startRequest = () => ({
  type: BANK_START_REQUEST
});
export const getData = bRefresh => async (dispatch, getState) => {
  Log("PP ACTION GETDATA");
  console.log("ACTION bRefresh " + bRefresh);
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  dispatch(startRequest());
  const bankData = await HTTP.getBanks(token, login);
  let banks = R.prop("PositivePayBanks", bankData);
  banks = R.sort(R.ascend(R.prop("name")), banks);
  LogTable(banks);
  const bankOneUUID = banks[0].uuid;
  const bankOneName = banks[0].name;
  dispatch(receiveBankOne(R.prop("positivePaySubmissions", banks[0])));
  dispatch(receiveBankOneUUID(bankOneUUID));
  dispatch(receiveBankOneName(bankOneName));
  if (banks[1].uuid) {
    const bankTwoUUID = banks[1].uuid;
    const bankTwoName = banks[1].name;
    dispatch(receiveBankTwo(R.prop("positivePaySubmissions", banks[1])));
    dispatch(receiveBankTwoUUID(bankTwoUUID));
    dispatch(receiveBankTwoName(bankTwoName));
  }
  /* if not REFRESH, then INIT **/
  if (!bRefresh) {
    dispatch(submitBankSelection(bankOneName));
  }
};

export const rowSubmit = (json, bank) => ({
  type: SUBMIT_ROW,
  row: json,
  bank: bank
});
//bankUUID = "c9a4102b-058e-46b9-8859-458d4297ac00"
//failed = "74e0c181-5620-4fdd-bec6-1be1bee4a63c"
export const submitRow = (id, submitType) => async (dispatch, getState) => {
  Log("PP ACTION submitRow f id: " + [id, submitType]);
  let newItem, ppSubmit, fileData, initials;
  const b = getState().banks.bankNameSelection;
  let data;
  if (b === "Bank of America") {
    data = getState().banks.bankOne;
  } else {
    data = getState().banks.bankTwo;
  }
  const item = R.find(x => x.uuid === id, data);
  if (id) {
    newItem = {
      ...item,
      submittedTimestamp: Date.now(),
      status: "Resubmitted"
    };
  }
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const bankSelection = getState().banks.bankNameSelection;
  if (bankSelection == "Bank of America") {
    initials = "BOA";
  } else {
    initials = "COB";
  }
  if (submitType == "auto") {
    ppSubmit = await HTTP.createPositivePaySubmission(
      token,
      getState().banks.bankUUIDSelection,
      id
    );
    //  fileData = ppSubmit["CreatePositivePaySubmission"]["autoFile64"];
    //if (ppSubmit["CreatePositivePaySubmission"]["status"] != "No file") {
    //  download("resubmitAutoFile.txt", decode(fileData));
    //  }
  } else {
    ppSubmit = await HTTP.createManualPositivePaySubmission(
      token,
      getState().banks.bankUUIDSelection,
      id
    );
    fileData = ppSubmit["CreateManualPositivePaySubmission"]["manualFile64"];
    if (ppSubmit["CreateManualPositivePaySubmission"]["status"] != "No file") {
      download(
        `${initials}${ppSubmit["CreateManualPositivePaySubmission"]["fileID"]}`,
        decode(fileData)
      );
    }
  }
  dispatch(rowSubmit(newItem, b === "Bank of America" ? "bankOne" : "bankTwo"));
};

export const submitNewRow = submitType => async (dispatch, getState) => {
  Log("PP ACTION submitNEWRow f submitType: " + submitType);
  let ppSubmit, fileData, initials;

  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const bankSelection = getState().banks.bankNameSelection;
  if (bankSelection == "Bank of America") {
    initials = "BOA";
  } else {
    initials = "COB";
  }

  console.log("bankSelection " + bankSelection);
  if (submitType == "auto") {
    ppSubmit = await HTTP.createPositivePaySubmission(
      token,
      getState().banks.bankUUIDSelection,
      null
    );
  } else {
    ppSubmit = await HTTP.createManualPositivePaySubmission(
      token,
      getState().banks.bankUUIDSelection,
      null
    );
  }
  const bank =
    getState().banks.bankNameSelection === "Bank of America"
      ? "bankOne"
      : "bankTwo";
  if (submitType == "auto") {
    //fileData = ppSubmit["CreatePositivePaySubmission"]["autoFile64"];
    //  if (ppSubmit["CreatePositivePaySubmission"]["status"] != "No file") {
    //  download(ppSubmit["CreatePositivePaySubmission"]["autoFile64"], decode(fileData));
    //  }
  } else {
    fileData = ppSubmit["CreateManualPositivePaySubmission"]["manualFile64"];
    if (ppSubmit["CreateManualPositivePaySubmission"]["status"] != "No file") {
      download(
        `${initials}${ppSubmit["CreateManualPositivePaySubmission"]["fileID"]}`,
        decode(fileData)
      );
    }
  }
  dispatch(rowSubmit(ppSubmit["CreateManualPositivePaySubmission"], bank));
};

export const submitSelectedBank = (x, n) => ({
  type: BANK_SELECTION,
  selectedBankName: x,
  selectedBankUUID: n
});

export const submitBankSelection = x => async (dispatch, getState) => {
  Log("ACTION submitBankSelection " + [x]);
  let uuid =
    x === "Bank of America"
      ? getState().banks.bankOneUUID
      : getState().banks.bankTwoUUID;

  dispatch(submitSelectedBank(x, uuid));
};
