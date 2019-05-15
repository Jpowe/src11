import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  getData,
  submitRow,
  submitNewRow,
  submitBankSelection
} from "./actions";
import Grid from "./Grid";
import { columns } from "./common/data";
import { getEndPoints } from "../../utils/utils";

let to1;
class GridContainer extends Component {
  componentDidMount() {
    this.props.getDataForComp(false);
    to1 = setInterval(this.checkPendingStatus, 5000);
  }
  componentWillUnmount() {
    clearInterval(to1);
  }
  componentWillReceiveProps(nextProps) {
    //console.log("GridContainer nextProps  " + JSON.stringify(nextProps));
  }
  checkPendingStatus = () => {
    console.log("checkPendingStatus f");
    let allRows = [
      ...this.props.bankOne,
      ...this.props.bankTwo,
      ...this.props.bankThree,
      ...this.props.bankFour
    ];
    if (R.find(x => x.status == "Pending", allRows)) {
      console.log("true status");
      this.props.getDataForComp(true);
    } else {
      console.log("false status");
    }
  };
  onselectNewRow = x => {
    this.props.onselectNewRow(x);
    this.props.getDataForComp(true);
  };
  onrefresh = () => {
    console.log("GridC onrefresh");
    this.props.getDataForComp(true);
  };

  render() {
    return (
      <div>
        {this.props.allowed ? (
          <Grid
            columns={columns}
            bankSelect={this.props.bankSelect}
            bankOne={this.props.bankOne}
            bankOneName={this.props.bankOneName}
            bankTwo={this.props.bankTwo}
            bankTwoName={this.props.bankTwoName}
            bankThree={this.props.bankThree}
            bankThreeName={this.props.bankThreeName}
            bankFour={this.props.bankFour}
            bankFourName={this.props.bankFourName}
            rowsCoBiz={this.props.rowsCoBiz}
            onselected={this.props.onselected}
            manualOverride={this.onselectNewRow}
            submittable={this.props.submitAllowed}
            bankSelection={this.props.bankSelection}
            onRefresh={this.onrefresh}
            loaded={this.props.loaded}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  columns: columns ? columns : null,
  bankOne: state.banks.bankOne ? state.banks.bankOne : null,
  bankOneName: state.banks.bankOneName ? state.banks.bankOneName : null,
  bankTwo: state.banks.bankTwo ? state.banks.bankTwo : null,
  bankTwoName: state.banks.bankTwoName ? state.banks.bankTwoName : null,
  bankThree: state.banks.bankThree ? state.banks.bankThree : null,
  bankThreeName: state.banks.bankThreeName ? state.banks.bankThreeName : null,
  bankFour: state.banks.bankFour ? state.banks.bankFour : null,
  bankFourName: state.banks.bankFourName ? state.banks.bankFourName : null,
  allowed: state.banks.bankOneName
    ? R.contains(
        "PositivePayBanks",
        getEndPoints(state.notifications.user.roles)
      )
    : null,
  submitAllowed: state.banks.bankOneName
    ? R.contains(
        "CreatePositivePaySubmission",
        getEndPoints(state.notifications.user.roles)
      )
    : null,
  loaded: state.banks.loaded ? state.banks.loaded : false
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getDataForComp: x => {
    dispatch(getData(x));
  },
  onselected: (id, submitType) => {
    dispatch(submitRow(id, submitType));
  },

  onselectNewRow: submitType => {
    dispatch(submitNewRow(submitType));
  },
  bankSelection: x => {
    console.log("bankSelection " + x);
    dispatch(submitBankSelection(x));
  }
});

const GridContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridContainer);

export default GridContainer2;
