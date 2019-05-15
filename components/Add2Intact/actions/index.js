import * as R from "ramda";
import * as HTTP from "../../../common/http_add2intacct.js";
import { Base64 } from "js-base64";
import { downloadText } from "download.js";

export const SET_PORTFOLIO = "SET_PORTFOLIO";
export const SELECTED_PORTFOLIO = "SELECTED_PORTFOLIO";
export const SET_SUBMISSION = "SET_SUBMISSION";
export const SELECTED_SUBMISSION = "SELECTED_SUBMISSION";
export const SELECTED_ACCOUNT = "SELECTED_ACCOUNT";
export const SET_VAR = "SET_VAR";

export const submitEndDate = (mo, yr, portfolioID) => async (
  dispatch,
  getState
) => {
  const token = getState().notifications.token;
  const login = getState().notifications.login;

  console.log("ACTION submitEndDate " + [mo, yr, portfolioID]);
  let endDate = `${yr}${mo}`;
  const submission = await HTTP.createAddeparIntacctSubmission(
    token,
    login,
    endDate,
    portfolioID
  );
  // to do get real uuid //
  //  let subID = R.prop("uuid",CreateAddeparIntacctSubmission);
  let subID = "fake-submission-uuid-1aaaaaa";
  dispatch(selectedSubmission(subID));

  //const submission2 = await HTTP.addeparIntacctSubmission(token, login);
};

const getPortfolio = json => ({
  type: SET_PORTFOLIO,
  payload: json
});
export const selectedSubmission = str => ({
  type: SELECTED_SUBMISSION,
  payload: str
});
export const selectedPortfolio = str => ({
  type: SELECTED_PORTFOLIO,
  payload: str
});
export const selectedAccount = str => ({
  type: SELECTED_ACCOUNT,
  payload: str
});

export const setSubmissionID = uuid => async (dispatch, getState) => {
  dispatch(selectedSubmission(uuid));
};

export const submitRow = id => async (dispatch, getState) => {
  let submissions = getState().addepar2intact.submission;
  const updateApprove = obj => {
    let newObj = obj;
    const approve = R.prop("approve", newObj);
    newObj =
      approve == "true"
        ? R.assocPath(["approve"], "false", newObj)
        : R.assocPath(["approve"], "true", newObj);
    return newObj;
  };
  let newSubs = R.map(x => (x.id == id ? updateApprove(x) : x), submissions);
  dispatch(setSubmission(newSubs));
  dispatch(selectedAccount(id));
};

export const submitAllRows = () => async (dispatch, getState) => {
  let acctsLength, approvalsLength;
  const submissions = getState().addepar2intact.submission;
  const intSubs = submissions.length;
  const intApprove = R.filter(x => x.approve == "true", submissions).length;
  const remove = () => {
    return R.map(x => R.assocPath(["approve"], "false", x), submissions);
  };
  const add = () => {
    return R.map(x => R.assocPath(["approve"], "true", x), submissions);
  };
  let newSubs = intSubs == intApprove ? remove() : add();
  dispatch(setSubmission(newSubs));
};

export const onApprove = () => async (dispatch, getState) => {
  console.log("ACTION onApprove f");
  const token = getState().notifications.token;
  const login = getState().notifications.login;

  const submissionID = getState().addepar2intact.selectedSubmission;
  const arrAccounts = R.map(
    x => x.id,
    R.filter(x => x.approve == "true", getState().addepar2intact.submission)
  );
  console.log("arrAccounts...");
  console.table(arrAccounts);
  const approve = await HTTP.approveAddeparIntacctSubmission(
    token,
    login,
    submissionID,
    arrAccounts
  );
};

export const getData = () => async (dispatch, getState) => {
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  //dispatch(startRequest());
  const portfolioData = await HTTP.getAddeparIntacctPortfolios(token, login);
  let portfolios = R.prop("AddeparIntacctPortfolios", portfolioData);
  dispatch(getPortfolio(portfolios));
  const firstPortfolio = R.prop("name", portfolios[0]);
  dispatch(selectedPortfolio(firstPortfolio));
  dispatch(getSubmissionData());
};

const setSubmission = json => ({
  type: SET_SUBMISSION,
  payload: json
});

const setVar = (ky, json) => ({
  type: SET_VAR,
  ky: ky,
  payload: json
});
export const getSubmissionData = () => async (dispatch, getState) => {
  console.log("ACTION getSubmissionData f");
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  //dispatch(startRequest());
  const submissionData = await HTTP.addeparIntacctSubmission(token, login);
  let submission = R.prop("AddeparIntacctSubmission", submissionData);
  const month1 = R.path(["submissionRanges"], submission)[0];
  dispatch(setVar("accountDetails", R.path(["submissionRanges"], submission)));
  let addeparAccts = R.prop("addeparAccounts", month1);
  const f2 = row => {
    const getCategories = arrDeltas => {
      return R.map(x => x.addeparCategory, arrDeltas);
    };
    return {
      name: row.accountName,
      id: row.accountID,
      categories: getCategories(row.accountDeltas)
    };
  };
  const a = m => {
    let tempObj;
    const f = cat => {
      if (R.contains(cat, m.categories)) {
        tempObj = { ...tempObj, [cat]: "true" };
      }
    };
    R.map(f, m.categories);
    return { ...m, ...tempObj };
  };
  addeparAccts = R.map(f2, addeparAccts);
  const moreFakeData = () => {
    return [
      { id: "3", name: "account3", categories: ["testField1"] },
      { id: "4", name: "account name 4", categories: ["field2"] },
      {
        id: "5",
        name: "account name 5",
        categories: ["field3", "field2", "Expenses"]
      }
    ];
  };
  addeparAccts = R.concat(addeparAccts, moreFakeData());
  console.table(addeparAccts);
  addeparAccts = R.map(a, addeparAccts);
  addeparAccts = R.map(x => R.omit("categories", x), addeparAccts);
  addeparAccts = R.map(x => R.assocPath(["approve"], "false", x), addeparAccts);
  dispatch(setSubmission(addeparAccts));
};
