import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  getData,
  selectedPortfolio,
  submitEndDate,
  setSubmissionID
} from "./actions";
import Grid from "./Grid1";
import { months } from "./common/data";
import { getEndPoints } from "../../utils/utils";

let to1;

class GridContainer extends Component {
  constructor(props) {
    super(props);
    this.props.getData();
  }
  componentDidMount() {
    //  this.props.getDataForComp(false);
    //  to1 = setInterval(this.checkPendingStatus, 5000);
  }
  componentWillUnmount() {
    clearInterval(to1);
  }
  componentWillReceiveProps(nextProps) {
    console.log("GridContainer nextProps  " + JSON.stringify(nextProps));
  }

  onTab = val => {
    this.getRows(val, this.props.data);
    this.props.selectedPortfolio(val);
  };

  getRows = (selected, data) => {
    console.log("selecteed " + selected);
    console.table(data);
    console.table(data[0].submissions);
    if (selected) {
      const selectedPort = R.find(x => x.name == selected, data);
      console.table(selectedPort);
      const t1 = R.prop("submissions", selectedPort);
      console.table(t1);
      return R.prop("submissions", selectedPort);
    } else {
      return data[0].submissions;
    }
  };
  onsubmit = (mo, yr) => {
    console.log("GC  " + [mo, yr]);
    /*ADD portfolio uuid */
    console.log(" this.props.selection " + this.props.selection);
    let obj = R.find(x => x.name == this.props.selection, this.props.data);
    console.table(obj);
    const id = R.prop(
      "uuid",
      R.find(x => x.name == this.props.selection, this.props.data)
    );
    let newMonth = String(mo).length == 1 ? `0${mo}` : mo;
    this.props.onsubmit(newMonth, yr, id);
    this.props.onselected();
  };
  rowSelected = uuid => {
    console.log("rowSelected uuid: " + uuid);
    this.props.setSubmissionID(uuid);
    this.props.onselected();
  };
  render() {
    return (
      <div>
        {this.props.data ? (
          <Grid
            s={this.props.selection}
            columns={R.keys(this.props.data[0].submissions[0])}
            data={this.props.data}
            tabs={R.map(x => x.name, this.props.data)}
            rows={this.getRows(this.props.selection, this.props.data)}
            submittable={this.props.submitAllowed}
            loaded={this.props.loaded}
            months={months}
            onselected={uuid => this.rowSelected(uuid)}
            onTab={this.onTab}
            onsubmit={this.onsubmit}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: state.addepar2intact.portfolio ? state.addepar2intact.portfolio : null,
  allowed: true,
  submitAllowed: true,
  loaded: true,
  selection: state.addepar2intact.selectedPortfolio
    ? state.addepar2intact.selectedPortfolio
    : ""
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getData: () => {
    dispatch(getData());
  },
  selectedPortfolio: str => {
    dispatch(selectedPortfolio(str));
  },
  onsubmit: (mo, yr, portfolioID) => {
    dispatch(submitEndDate(mo, yr, portfolioID));
  },
  setSubmissionID: uuid => {
    dispatch(setSubmissionID(uuid));
  }
});

const GridContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridContainer);

export default GridContainer2;
