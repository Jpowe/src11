import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
//import TableContainer from "./Grid/TableContainer";
import FormContainer from "./Form/FormContainer";
import Stepper from "./Stepper";
import ListWidget from "./ListWidget";
import muiThemeable from "material-ui/styles/muiThemeable";
import PivotContainerGifts from "./PivotContainerGifts";
import ListSingleLevel from "./ListSingleLevel/ListSingleLevel";
import GiftsPartiesContainer from "./GiftsPartiesContainer";
import GiftsRequestsContainer from "./GiftsRequestsContainer";
import FieldText from "./FieldText";
import FieldDropDown from "./FieldDropDown";
import { registryStatuses } from "../common/data";

class GiftsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1
    };
  }
  componentDidMount() {
    this.props.bubbleUp(this.props.giftYear, "giftYear");
  }

  render() {
    return (
      <Paper zDepth={1}>
        <FieldText
          obj={{ title: "Gift year", name: "giftYear" }}
          data={this.props.giftYear}
          change={this.props.bubbleUp}
        />
      </Paper>
    );
  }
}

export default muiThemeable()(GiftsForm);
