/**
1)
input: definition ID      output:   instance ID
create workflow instance by passing in deWorkflowDefinition ID

2)
input: instance ID
get instanceID from #1 then pass form data to instance
*/
/*
https://workflow-qa.bluesprucecapital.net/cDevWorkflowRESTAPI/api/deUser/getUserIDFromExternalUserID?externalUserIdentification=admin
*/

import * as R from "ramda";
import { Base64 } from "js-base64";

const randomInt = Math.floor(Math.random() * 10000000);

/* HR WORKFLOW DEFINITION */
//let url1 = `https://workflow-qa.bluesprucecapital.net/cDevWorkflowRESTAPI/api/deWorkflowDefinition/createInstance/e9b65dfb-532c-4c17-bb38-cdc4fdd77069?instanceName=instance${randomInt}`;
const getURL1 = (definitionID, urlPath) => {
  console.log("getURL1 defID : " + definitionID);
  return `${urlPath}/cDevWorkflowRESTAPI/api/deWorkflowDefinition/createInstance/${definitionID}?instanceName=instance${randomInt}`;
};
//const urlGetUser =
//  "https://workflow-qa.bluesprucecapital.net/cDevWorkflowRESTAPI/api/deRole/getUserList/7bd17de2-dcea-4cdb-911e-b789bec975bc";

const getURLGetUser = urlPath => {
  return `${urlPath}/cDevWorkflowRESTAPI/api/deRole/getUserList/7bd17de2-dcea-4cdb-911e-b789bec975bc`;
};
//const urlGetUserList =
//  "https://workflow-qa.bluesprucecapital.net/cDevWorkflowRESTAPI/api/deUser/getUser/";
const getURLGetUserList = urlPath => {
  return `${urlPath}/cDevWorkflowRESTAPI/api/deUser/getUser/`;
};

/* check if person in FW database */
//const urlGetFWID =
//  "https://workflow-qa.bluesprucecapital.net/cDevWorkflowRESTAPI/api/deUser/getUserIDFromExternalUserID?externalUserIdentification=";
const getFWID_URL = path => {
  console.log("path " + path);
  return `${path}/cDevWorkflowRESTAPI/api/deUser/getUserIDFromExternalUserID?externalUserIdentification=`;
};

export const doesUserExist = async (login, urlPath, license) => {
  const auth = Base64.encode(login + `:${license}`);
  const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`
  };
  let options = {
    method: "GET",
    headers: requestHeaders
  };
  let userExist = await fetch(getFWID_URL(urlPath) + login, options);
  userExist.ok ? console.log("user ok") : console.log("user not ok");
  //const userReturn = await userExist.json();
  //console.log("http userReturn " + userReturn);
  return userExist.ok ? true : false;
};

export const getSupervisors = async (login, urlPath, license) => {
  console.log("getSupervisors f");
  const auth = Base64.encode(login + `:${license}`);
  const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`
  };
  let options = {
    method: "GET",
    headers: requestHeaders
  };
  const supervisorCall = await fetch(getURLGetUser(urlPath, license), options);
  supervisorCall.ok
    ? console.log("supervisor ok")
    : console.log("supervisor not ok");
  const jsonSupervisor = await supervisorCall.json();
  const supervisorPromises = R.map(
    x => fetchList(x.DEUSERID, login, urlPath),
    jsonSupervisor
  );
  const supervisorUserList = await Promise.all(supervisorPromises);
  const supervisorUserList2 = R.map(
    x => R.pick(["userFullName", "workflowUserID"], x),
    supervisorUserList
  );
  const convertObj = obj => {
    return {
      title: obj.userFullName,
      value: obj.workflowUserID,
      name: obj.userFullName
    };
  };
  //  console.table(R.map(x => convertObj(x), supervisorUserList2));
  let newList = R.map(x => convertObj(x), supervisorUserList2);
  newList.unshift({ name: "", title: "Select supervisor", value: "" });
  return newList;
};
const fetchList = async (id, login, urlPath, license) => {
  const auth = Base64.encode(login + `:${license}`);
  const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`
  };
  let options = {
    method: "GET",
    headers: requestHeaders
  };
  const supervisorListCall = await fetch(
    getURLGetUserList(urlPath) + id,
    options
  );
  supervisorListCall.ok
    ? console.log("supervisor ok")
    : console.log("supervisor not ok");
  const jsonSupervisorList = await supervisorListCall.json();
  return jsonSupervisorList;
  //console.table(jsonSupervisorList);
};

export const fetchWrap = async (body, login, config, urlPath, license) => {
  console.log("fetchWrap f login: " + JSON.stringify(config));
  console.log("fetchWrap f config:  " + JSON.stringify(config));
  console.log("fetchWrap  form data    " + JSON.stringify(body));
  let newBody = {
    oVariableDefaultValues: body,
    oGlobalDefaultValues: {}
  };
  const auth = Base64.encode(login + `:${license}`);
  const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`
  };
  let options = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(newBody)
    //  credentials: "include"
  };

  const res1 = await fetch(getURL1(config, urlPath), options);
  res1.ok ? console.log("response1 ok") : console.log("response1 not ok");
  const data1 = await res1.json();

  const url2 = `${urlPath}/cDevWorkflowRESTAPI/api/deWorkflowInstance/executeWithParms/${
    data1.instanceID
  }`;
  const res2 = await fetch(url2, options);
  res2.ok ? console.log("response2 ok") : console.log("response2 not ok");
  //const data = await res2.json();
  //return data;
};
