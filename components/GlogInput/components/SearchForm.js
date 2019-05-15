import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import RaisedButton from "material-ui/RaisedButton";
import FieldText from "./FieldText";
import FieldDropDown from "./FieldDropDown";
import { parties } from "../common/data";
//import GridContainer from "./Grid/GridContainer";
import TableContainer from "./Grid/TableContainer";
import FormContainer from "./Form/FormContainer";
import Stepper from "./Stepper";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: ""
    };
  }
  filterStr = v => {
    console.log("filterStr v " + v);
    this.setState({ filterStr: v });
  };

  render() {
    const { fields, title } = this.props;
    return (
      <Paper zDepth={1}>
        <div style={{ height: "auto", padding: "21px" }}>
          <h2>{title}</h2>
          <div>
            {!this.props.hideSearch && (
              <RaisedButton
                label="USE SELECT"
                backgroundColor="#f58c32"
                labelColor={"#fff"}
                style={{ marginTop: "15px", marginRight: "20px" }}
                onClick={this.props.onHandle}
              />
            )}
            {this.props.hideSearch && (
              <RaisedButton
                label="CREATE NEW"
                backgroundColor="#f58c32"
                labelColor={"#fff"}
                style={{ marginTop: "15px", marginRight: "20px" }}
                onClick={this.props.onNew}
              />
            )}
          </div>
          <div>
            {this.props.showSubSelect && (
              <FieldDropDown
                options={parties}
                status={"people"}
                onselect={this.props.onselect}
              />
            )}
          </div>
          <div>
            {!this.props.hideSearch && <FieldText ontext={this.filterStr} />}
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <TableContainer
                filterStr={this.state.filterStr}
                noFilter={!this.props.hideSearch}
              />
            </div>
            <div>
              {this.props.node === "gifts" ? <Stepper /> : <FormContainer />}
            </div>
          </div>
          <div />
        </div>
      </Paper>
    );
  }
}

export default SearchForm;
