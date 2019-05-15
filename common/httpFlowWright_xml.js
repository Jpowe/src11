import uuidv4 from "uuid/v4";
import { Base64 } from "js-base64";
import { sURL, username, password } from "./config-FlowWright.js";

/*  WORKFLOW  DEF ID  */
let defID = "c0d6b7f7-ab82-48af-b0be-f61dd8a3f86b";
let instanceName = "MY-NEW-INSTANCE";
let instID = uuidv4();

const requestHeaders = {
  Accept: "application/xml",
  Authorization: "Basic " + Base64.encode(username + ":" + password)
};

export const getREST = (value1 = null, field = null, value = null) => {
  console.log("getRest f httpFlowWright ");
  const options = {
    method: "get",
    headers: requestHeaders
    //  body: JSON.stringify({ id: `${value1}`, [field]: `${value}` })
  };

  return fetch(`${sURL}api/deEngineService/getBuildVersion`, options)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => console.log(data));
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
