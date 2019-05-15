import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import RaisedButton from "material-ui/RaisedButton";
import FieldText from "./recipient/FieldText";
import FieldDropDown from "./FieldDropDown";
import { parties } from "../common/data";

import TableContainer from "./Grid/TableContainer";
import FormContainer from "./Form/FormContainer";

import RequestsPartiesContainer from "./RequestsPartiesContainer";
import ListWidget from "./ListWidget";
import muiThemeable from "material-ui/styles/muiThemeable";
import ListSingleLevel from "./ListSingleLevel/ListSingleLevel";

class RequestsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: 0,
      parties: []
    };
  }
  filterStr = v => {
    console.log("filterStr v " + v);
    this.setState({ filterStr: v });
  };

  onSelectRequest = x => {
    this.setState({ request: x, parties: [] });
    this.props.onSelectRequest(x);
  };
  onSelectParties = x => {
    this.setState({ parties: x });
  };
  details = () => {
    return `Choose 'request'  and  associated parties  .  If that's correct submit.`;
  };
  getMessage = (action, node) => {
    return action === "edit"
      ? `Edit '${node}' selection and/or its associations.`
      : "Enter new request. Then select a request and associate it to parties. ";
  };
  render() {
    const { props } = this;

    return (
      <Paper zDepth={1}>
        <h4>{this.getMessage(props.action, props.node)}</h4>
        <div style={{}}>
          <div>
            <div
              style={{
                display: "flex"
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around"
            }}
          >
            <FormContainer
              bubbleUp={this.props.bubbleUp}
              bubbleNew={() => console.log("trap it.  bubbleNew REQUESTS Form")}
            />
            <div style={{ opacity: props.onLoad ? 0.3 : 1 }}>
              <ListSingleLevel
                data={this.props.requests}
                title={"Requests"}
                onselect={x => this.onSelectRequest(x)}
                multiSelect={false}
                requestID={this.props.requestID}
              />
            </div>
            <div style={{ opacity: props.onLoad ? 0.3 : 1 }}>
              <RequestsPartiesContainer
                onselect={x => this.onSelectParties(x)}
                groups={this.props.groups}
                multiSelect={true}
              />
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default muiThemeable()(RequestsForm);
