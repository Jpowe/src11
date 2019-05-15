import React, { Component } from "react";
import * as R from "ramda";
//import ThemeDefault from "./theme-default";
//import Stepper from "./Stepper.js";
import { forms, appVars } from "./dataContractorConfidentiality";
//import { fetchWrap, getSupervisors, doesUserExist } from "./common/http.js";
import { connect } from "react-redux";
//import { validate } from "./utils/utils";
import App from "./App";
import { callModuleConfig } from "../../actions";

const config = { definitionID: "a543b3c5-b8f9-4fbc-8642-406589766aca" };

class ContractorConfidentiality extends Component {
  constructor(props) {
    console.log("ContractorConfidentiality");
    super(props);
    this.state = {
      data: []
    };
    this.props.callModuleConfig();
  }
  componentDidMount() {}
  addENUMS(forms, enumerator) {
    console.log("addENUMS");
    console.table(forms);
    console.table(enumerator.metaValues);
    let subform = forms[0].form;
    console.table(subform);
    const createOptionObj = x => {
      return { name: x.name, title: x.name, value: x.name };
    };
    let newOptionObj = R.sortBy(
      R.prop("title"),
      R.map(x => createOptionObj(x), enumerator.metaValues)
    );
    console.table(newOptionObj);

    R.map(x => console.log(x.name), R.prop("fields", subform[0]));
    let le = R.find(x => x.name == "LegalEntity", R.prop("fields", subform[0]));
    le["uiOptions"] = newOptionObj;
    subform.fields = { ...subform[0].fields, le };
    console.table(subform);
    forms[0].form = subform;
    console.table(forms);
    return forms;
  }
  /*
  let newSubform =  R.map(x=>x.name ='LegalEntity'?addVal(x):x  ,subform)
  
  */
  render() {
    return (
      <div>
        {this.props.workflowsENUMS && (
          <App
            forms={this.addENUMS(forms, this.props.workflowsENUMS[0])}
            config={config}
            extraData={this.props.initiatorEmailAndName}
            authUserFW={false}
            appConfig={this.props.appConfig}
            url={this.props.url}
            license={this.props.license}
            appVars={appVars}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  initiatorEmailAndName: {
    initiatorEmail: `${state.notifications.login}`,
    formsubmittedby: `${state.notifications.user.firstName} ${
      state.notifications.user.lastName
    }`
  },

  appConfig: state.notifications.workflows
    ? R.find(
        x => x.name == "contractorConfidentialityAgreement",
        state.notifications.workflows
      )
    : null,
  url: state.notifications.flowWrightURL
    ? state.notifications.flowWrightURL
    : null,
  license: state.notifications.flowWrightLicense
    ? state.notifications.flowWrightLicense
    : null,
  workflowsENUMS: state.notifications.workflowsENUMS
    ? state.notifications.workflowsENUMS
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  callModuleConfig: () => {
    dispatch(callModuleConfig());
  }
});

const ContractorConfidentiality2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorConfidentiality);

export default ContractorConfidentiality2;
