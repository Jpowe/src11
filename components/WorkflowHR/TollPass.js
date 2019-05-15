import React, { Component } from "react";
import * as R from "ramda";
//import ThemeDefault from "./theme-default";
//import Stepper from "./Stepper.js";
import { forms, appVars } from "./dataTollPass";
//import { fetchWrap, getSupervisors, doesUserExist } from "./common/http.js";
import { connect } from "react-redux";
import { callModuleConfig } from "../../actions";
//import { validate } from "./utils/utils";
import App from "./App";

const config = { definitionID: "b1f23067-b7f1-4b4f-9e54-baf182c146d8" };

class TollPass extends Component {
  constructor(props) {
    console.log("Tollpass.js");
    super(props);
    this.state = {
      data: []
    };
    this.props.callModuleConfig();
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <App
          forms={forms}
          config={config}
          extraData={this.props.initiatorEmail}
          authUserFW={false}
          appConfig={this.props.appConfig}
          url={this.props.url}
          license={this.props.license}
          appVars={appVars}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  initiatorEmail: {
    initiatorEmail: `${state.notifications.login}`
  },
  appConfig: state.notifications.workflows
    ? R.find(x => x.name == "tollPass", state.notifications.workflows)
    : null,
  url: state.notifications.flowWrightURL
    ? state.notifications.flowWrightURL
    : null,
  license: state.notifications.flowWrightLicense
    ? state.notifications.flowWrightLicense
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  callModuleConfig: () => {
    dispatch(callModuleConfig());
  }
});

const TollPass2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(TollPass);

export default TollPass2;
