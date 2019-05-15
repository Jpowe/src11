import React, { Component } from "react";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import { getREST } from "../../common/httpFlowWright";

export default class FlowWrightIntiateAPI extends Component {
  handle() {
    console.log("handle API call");
    getREST();
  }
  render() {
    console.log("render FW Initate");
    return (
      <div style={{ height: "400px" }}>
        FLow Wright initate API. (Click button)
        <div>
          <RaisedButton
            label="Initate workflow API"
            backgroundColor="#f58c32"
            labelColor="#ff0000"
            onClick={this.handle}
          />
        </div>
      </div>
    );
  }
}
