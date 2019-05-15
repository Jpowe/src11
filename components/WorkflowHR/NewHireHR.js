import React, { Component } from "react";
import * as R from "ramda";
//import ThemeDefault from "./theme-default";
//import Stepper from "./Stepper.js";
import { forms } from "./dataNewHire";
//import { fetchWrap, getSupervisors, doesUserExist } from "./common/http.js";
import { connect } from "react-redux";
//import { validate } from "./utils/utils";
import App from "./App";

const config = { definitionID: "e9b65dfb-532c-4c17-bb38-cdc4fdd77069" };

class TollPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <App
          forms={forms}
          config={config}
          authUserFW={false}
          appConfig={this.props.appConfig}
          url={this.props.url}
          license={this.props.license}
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
    ? R.find(x => x.name == "newHire", state.notifications.workflows)
    : null,
  url: state.notifications.flowWrightURL
    ? state.notifications.flowWrightURL
    : null,
  license: state.notifications.flowWrightLicense
    ? state.notifications.flowWrightLicense
    : null
});

const TollPass2 = connect(mapStateToProps)(TollPass);

export default TollPass2;
