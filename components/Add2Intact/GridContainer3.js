import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { submitRow, submitAllRows, onApprove } from "./actions";
import Grid from "./Grid3";
import { columns, tempDataSubmissions, months } from "./common/data";
import { getEndPoints } from "../../utils/utils";
import Delta from "material-ui/svg-icons/action/change-history";

let to1;

class GridContainer extends Component {
  componentDidMount() {
    this.props.getDataForComp(false);
    //  to1 = setInterval(this.checkPendingStatus, 5000);
  }
  componentWillUnmount() {
    clearInterval(to1);
  }
  componentWillReceiveProps(nextProps) {
    //console.log("GridContainer nextProps  " + JSON.stringify(nextProps));
  }

  createColumns = rows => {
    console.log("createColumns");
    console.table(rows);
    let cols = R.map(x => R.keys(x), rows);
    return cols;
  };

  addRowIcons = rows => {
    const changeToIcon = val => {
      return val ? <Delta /> : val;
    };
    return R.map(changeToIcon, rows);
  };
  addAllFields = rows => {
    let rows1 = R.map(x => R.omit("categories", x), rows);
    let fields = R.uniq(R.flatten(R.map(x => R.keys(x), rows1)));
    console.table(fields);
    let newObj = {};
    let f = field => {
      return { ...newObj, [field]: "false" };
    };
    let tempObj = R.mergeAll(R.map(f, fields));
    tempObj = { checkbox: "checkbox", visiblity: "visibility", ...tempObj };
    let newRows = R.map(x => R.merge(tempObj, x), rows);
    console.table(newRows);
    return newRows;
  };
  onsubmit = () => {
    console.log("GC2 onsubmit");
    this.props.onback();
  };
  chkbx = () => {
    this.props.submitAllRows();
  };
  render() {
    return (
      <div>
        {this.props.allowed ? (
          <Grid
            columns={[
              "Date",
              "Category",
              "Intacct Debit",
              "Intacct Credit",
              "Addepar Amount"
            ]}
            selectedAccountID={this.props.selectedAccountID}
            selectedAccountName={this.props.selectedAccountName}
            data={tempDataSubmissions}
            tab={this.props.tab}
            rows={this.props.rows}
            submittable={this.props.submitAllowed}
            loaded={this.props.loaded}
            onSubmit={this.onsubmit}
            onselected={this.props.onselected}
            onApprove={this.props.onApprove}
            chkbx={() => this.chkbx()}
            onVis={this.props.onshowPopup}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const createRows = (data, id) => {
  const accountData = R.filter(x => x.accountID == id, data);
  console.table(accountData);
  let tempObj = {
    date: "2018-01",
    addeparCategory: "",
    debit: "",
    credit: ""
  };
  const createObj = row => {
    return {
      ...tempObj,
      addeparCategory: row.addeparCategory,
      debit: row.intacctDebits ? row.intacctDebits[0].amount : null,
      credit: row.intacctCredits ? row.intacctCredits[0].amount : null,
      amount: row.addeparAmount ? row.addeparAmount : null
    };
  };
  return R.map(x => createObj(x), R.prop("accountDeltas", accountData[0]));
};

const getName = (data, id) => {
  const accountData = R.find(x => x.accountID == id, data);
  return R.prop("accountName", accountData);
};
const mapStateToProps = (state, ownProps) => ({
  //columns: columns ? columns : null,
  rows: state.addepar2intact.accountDetails[0].addeparAccounts
    ? createRows(
        state.addepar2intact.accountDetails[0].addeparAccounts,
        state.addepar2intact.selectedAccount
      )
    : null,
  selectedAccountID: state.addepar2intact.selectedAccount,
  selectedAccountName: getName(
    state.addepar2intact.accountDetails[0].addeparAccounts,
    state.addepar2intact.selectedAccount
  ),
  selectedSubmission: state.addepar2intact.selectedSubmission
    ? state.addepar2intact.selectedSubmission
    : null,
  allowed: true,
  submitAllowed: true,
  loaded: true
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getDataForComp: x => {
    //  dispatch(getData(x));
  },
  onselected: id => {
    console.log("GC2 onselected " + id);
    dispatch(submitRow(id));
  },
  onApprove: () => {
    dispatch(onApprove());
  },
  onselectNewRow: submitType => {
    //  dispatch(submitNewRow(submitType));
  },
  bankSelection: x => {
    //dispatch(submitBankSelection(x));
  },
  submitAllRows: () => {
    dispatch(submitAllRows());
  }
});

const GridContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridContainer);

export default GridContainer2;
