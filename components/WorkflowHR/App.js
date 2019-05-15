import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as R from "ramda";
import ThemeDefault from "./theme-default";
import Stepper from "./Stepper.js";
import { subForms2 } from "./data";
import { fetchWrap, getSupervisors, doesUserExist } from "./common/http.js";
import { connect } from "react-redux";
import { validate } from "./utils/utils";
import { callModuleConfig } from "../../actions";

const getAllReqFields = data => {
  const getReqFields = data => {
    const allFields = R.flatten(R.map(x => x.fields, data));
    return R.filter(x => x.required, allFields);
  };
  const reqObjs = R.flatten(R.map(x => getReqFields(x.form), data));
  return R.map(x => x.name, reqObjs);
};
/*
const getSupervisors2 = async login => {
  const newSup = await getSupervisors(
    login,
    this.props.url,
    this.props.license
  );
  const objSup = R.find(x => x.name == "Supervisor", subForms2[0].fields);
  objSup["uiOptions"] = newSup;
};
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      allReqCompleted: false,
      login: this.props.authUserFW ? this.props.login : "admin"
    };
    //  this.props.callModuleConfig();
    console.log("App constructor");
  }

  componentDidMount() {
    //const user = this.props.authUserFW ? this.props.login : "admin";
    ///////////////////////  this.checkUser(user, this.props.url,this.props.license);
    /* GET SUPERVISOR  WAS FOR HR WORKFLOW */
    /*
    getSupervisors2(this.props.login);
    */
  }
  /*
  checkUser = async (login, url, license) => {
    console.log("this.props.url " + url);
    const user = await doesUserExist(login, url, license);
    if (!user) {
      this.setState({ hideForm: true });
    }
  };
  */
  validateEnteredFields(fields, data) {
    console.log("validateENteredfields ");
    console.table(fields);
    console.log(JSON.stringify(data));
    let newFields = fields;
    const validField = (field, type) => {
      const val = R.prop(field, data);
      const isValid = !validate(val, type);
      return isValid;
    };
    //  const ssn = R.prop("SSN", data);
    //  const ssnValid = !validate(ssn, "ssn");
    if (!validField("SSN", "ssn")) {
      newFields = R.filter(x => x !== "SSN", newFields);
    }
    if (!validField("DateOfHire", "date")) {
      console.log("valid date " + !validField("DateOfHire", "date"));
      newFields = R.filter(x => x !== "DateOfHire", newFields);
    }
    return newFields;
  }
  process(val, name) {
    console.log("process v,n  " + [val, name]);
    //let newObj = { [name]: val };
    let newData = { ...this.state.data, [name]: val };
    this.setState({ data: newData });
    let reqFields = getAllReqFields(this.props.forms);
    let enteredFields = R.keys(newData);
    console.table(this.validateEnteredFields(enteredFields, newData));
    enteredFields = this.validateEnteredFields(enteredFields, newData);
    let bools = R.map(x => R.contains(x, enteredFields), reqFields);
    console.log("fields req");
    //let tempTable = R.filter(x => R.contains(x, enteredFields), reqFields);
    console.table(reqFields);
    console.table(enteredFields);
    console.log(JSON.stringify(R.difference(reqFields, enteredFields)));
    this.setState({ emptyReqFields: R.difference(reqFields, enteredFields) });
    R.difference(reqFields, enteredFields);
    R.contains(false, bools)
      ? this.setState({ allReqCompleted: false })
      : this.setState({ allReqCompleted: true });
    //R.find(x => console.log(!!R.prop(x, this.state.d), reqFields));
  }
  submit = () => {
    console.log("submit f");
    console.log(JSON.stringify(this.state.data));
    let sendData;
    sendData = this.props.extraData
      ? { ...this.state.data, ...this.props.extraData }
      : this.state.data;
    sendData = R.map(x => R.replace(/'/g, "", x), sendData);
    console.log(
      "this.props.appconfigvalue  " + R.prop("value", this.props.appConfig)
    );
    fetchWrap(
      sendData,
      this.state.login,
      R.prop("value", this.props.appConfig),
      this.props.url,
      this.props.license
    );
  };
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          <div style={{}}>
            {this.state.hideForm ? (
              <div>User not in FlowWright system.</div>
            ) : (
              this.props.url && (
                <Stepper
                  data={this.props.forms}
                  inputData={this.state.data}
                  onselect={(name, val) => this.process(name, val)}
                  allReqCompleted={this.state.allReqCompleted}
                  submit={this.submit}
                  clearAll={() => this.setState({ data: {} })}
                  emptyReqFields={this.state.emptyReqFields}
                  appVars={this.props.appVars}
                />
              )
            )}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  login: state.notifications.login ? state.notifications.login : "admin"
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  //callModuleConfig: () => {
  //  dispatch(callModuleConfig());
  //}
});

const App2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App2;
