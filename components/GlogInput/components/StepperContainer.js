import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { findAndProp } from "../utils/utils";
import {
  setNode,
  tabSelection,
  rowSubmit,
  addGiftInstance,
  updateGiftInstance
} from "../actions";
import Stepper from "./Stepper";

const t = "test";
class StepperContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.bSearchID ? (
          <Stepper
            vendors={this.props.vendors}
            delivery={this.props.delivery}
            order={this.props.order}
          />
        ) : (
          <div> New </div>
        )}
      </div>
    );
  }
}
/*
.filter(
  x =>
    x.id == findAndProp(state.data.selectedRow, "delivery",state.glogInput.gifts),
 state.glogInput.dataDeliveries
)
*/
const getLookup = (vdo, data, row, data2) => {
  if (row == 0.1) {
    return null;
  }
  const lookup = findAndProp(row, vdo, data);
  return R.find(x => x.id === lookup, data2)
    ? R.find(x => x.id === lookup, data2)
    : vdo[0];
};

const mapStateToProps = (state, ownProps) => ({
  vendors:
    state.glogInput.searchID != 0.01
      ? getLookup(
          "vendor",
          state.glogInput.gifts,
          state.glogInput.searchID,
          state.glogInput.vendors
        )
      : null,
  delivery:
    state.glogInput.searchID != 0.01
      ? getLookup(
          "delivery",
          state.glogInput.gifts,
          state.glogInput.searchID,
          state.glogInput.deliveries
        )
      : null,
  order:
    state.glogInput.searchID != 0.01
      ? getLookup(
          "order",
          state.glogInput.gifts,
          state.glogInput.searchID,
          state.glogInput.orders
        )
      : null,
  bSearchID: state.glogInput.searchID != 0.01
});
const mapDispatchToProps = (dispatch, ownProps) => ({});

const StepperContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  StepperContainer
);

export default StepperContainer2;
