import uuidv4 from "uuid/v4";
import { Base64 } from "js-base64";
import { sURL, username, password } from "./config-FlowWright.js";

/*  WORKFLOW  DEF ID  */
let defID = "c0d6b7f7-ab82-48af-b0be-f61dd8a3f86b";
let instanceName = "MY-NEW-INSTANCE2";
let instID = uuidv4();

const requestHeaders = {
  Accept: "application/json",
  Authorization: "Basic " + Base64.encode(username + ":" + password)
};
const wfTestJSON = {
  firstName: `fn`,
  lastName: `ln`,
  state: `co`,
  ssn: `123-45-6789`,
  dob: `1-1-11`,
  legalEntity: `Blue Spruce Capital Corp`,
  division: `Flight Operations`,
  department: `Investments`,
  primaryWorkLocation: `Yacht`,
  supervisor: `supervisor1`,
  employmentType: `TriNet Co-Employee Payroll`,
  fullOrPartTime: `Full-Time`,
  hourlyOrSalary: `Hourly`,
  hoursPerWeek: `40+`,
  flsaStatus: `Exempt`,
  dateOfHire: `1/1/2018`,
  jobTitle: `jobtitle`
};
export const getREST = (value1 = null, field = null, value = null) => {
  console.log("getRest f httpFlowWright  061418 411pm");
  const options = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(wfTestJSON)
    //  body: JSON.stringify({ id: `${value1}`, [field]: `${value}` })
  };

  //api/deWorkflowInstance/executeWithParms/{id}
  return fetch(
    `${sURL}api/deWorkflowDefinition/createInstance/${defID}?instanceName=${
      instanceName
    }&instanceID=${instID}`,
    options
  )
    .then(res => res.json())
    .then(data => {
      console.log("HTTP FW data: " + data);
      console.log("INSTANCE ID:  " + data.instanceID);
      return fetch(
        `${sURL}api/deWorkflowInstance/executeWithParms/${data.instanceID}`,
        options
      )
        .then(res2 => res2.json())
        .then(data2 => {
          console.log("exec with parms response " + data2);
        });
    })
    .catch(function(error) {
      console.log("CAUGHT ERROR:  " + error);
    });
};

/*
export const getREST = (value1 = null, field = null, value = null) => {
  console.log("getRest f httpFlowWright ");
  const options = {
    method: "get",
    headers: requestHeaders
    //  body: JSON.stringify({ id: `${value1}`, [field]: `${value}` })
  };

  return fetch(`${sURL}api/deEngineService/getBuildVersion`, options)
    .then(res => {
      console.log("FLOWWRIGHT FROM HTTP " + res.data);
      return res.data;
    })
    .catch(function(error) {
      console.log("CAUGHT ERROR:  " + error);
    });
};
*/

/*
export const getREST = (value1 = null, field = null, value = null) => {
  console.log("getRest f httpFlowWright ");
  const options = {
    method: "get",
    headers: requestHeaders
    //  body: JSON.stringify({ id: `${value1}`, [field]: `${value}` })
  };

  return fetch(`${sURL}api/deEngineService/getBuildVersion`, options)
    .then(res => {
      console.log("FLOWWRIGHT FROM HTTP " + res.data);
      return res.data;
    })
    .catch(function(error) {
      console.log("CAUGHT ERROR:  " + error);
    });
};

/*
string sURL = "http://localhost/cDevWorkflowRESTAPI/";

var userName = "admin";
var password = "your license key";

var oBytes = Encoding.ASCII.GetBytes(string.Format("{0}:{1}", userName, password));
var sAuthString = Convert.ToBase64String(oBytes);

WebClient oClient = new WebClient();

oClient.Headers.Add("Authorization", "Basic " + sAuthString);

string defID = "41f459bf-98f2-4933-9437-eb7fcac99d7b";
string instID = Guid.NewGuid().ToString();

string urlParms = string.Format("api/deDefinition/createInstance/{0}?instanceName={1}&instanceID={2}", defID, "My New Inst", instID);

string oInstance = oClient.UploadString(sURL + urlParms,"");

*/
