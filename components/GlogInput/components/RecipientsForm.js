import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import RaisedButton from "material-ui/RaisedButton";
import FieldText from "./recipient/FieldText";
import FieldDropDown from "./FieldDropDown";
import { parties } from "../common/data";

import TableContainer from "./Grid/TableContainer";
import FormContainer from "./Form/FormContainer";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: "",
      showForm: false
    };
  }
  filterStr = v => {
    console.log("filterStr str= " + v);
    console.log("filterLength " + v.length);
    if (v.length > 2) {
      this.setState({ showForm: true });
    }
    this.setState({ filterStr: v });
    this.props.onSearchText(v);
  };
  getMessage = action => {
    return action === "edit"
      ? `Edit selected party.`
      : "Search for a party (people, organizations, groups, animals) below. If not found create a new entry.";
  };
  render() {
    const { action, node } = this.props;
    return (
      <Paper zDepth={1}>
        <div style={{ height: "auto", minHeight: "800px" }}>
          <h4>{this.getMessage(action)}</h4>
          <div>
            {action === "create" && (
              <div
                style={{
                  display: "flex"
                }}
              >
                <FieldDropDown
                  options={parties}
                  status={this.props.node}
                  onselect={this.props.onselect}
                />
                <FieldText ontext={this.filterStr} />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            {action === "create" && (
              <TableContainer
                filterStr={this.state.filterStr}
                noFilter={!this.props.hideSearch}
                bubbleUp={() => this.setState({ showForm: true })}
              />
            )}
            {(this.state.showForm || action == "edit") && (
              <FormContainer
                bubbleUp={this.props.bubbleUp}
                bubbleNew={() => console.log("trap it.  bubbleNew Recip Form")}
                config={this.props.configAnimalTypes}
              />
            )}
          </div>
        </div>
        <div style={{ paddingTop: "20px" }} />
      </Paper>
    );
  }
}

export default SearchForm;
