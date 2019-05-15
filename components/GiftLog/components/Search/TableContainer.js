import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
/*import {
  setView,
  setSearchID,
  setSelectedRow,
  GEI_add_recip,
  addToNode
} from "../../actions";*/
import { selectedRowAndType } from "../../actions";
//import { getRows, getSelection } from "../../reducers";
import Table from "../Table/Table";
import { columnsPerson, columnsOrg } from "../../common/data";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      col: null,
      ascend: null,
      page: 0,
      perPage: 3,
      totalRows: null,
      bPaginated: false
    };
  }
  componentDidMount() {
    //  this.props.getDataForComp();
  }
  componentWillRecieveProps(nextProps) {
    console.log("TC CWRP nextProps.rows ");
    console.table(nextProps.rows);
  }

  sortColumns = columns => {
    return R.sort(R.ascend(R.prop("order")), columns);
  };
  removeSubmitColumn = columns => {
    return R.filter(x => x.name !== "override", columns);
  };
  byDate = (a, b) => {
    const c = new Date(a.date);
    const d = new Date(b.date);
    return this.state.ascend ? c - d : d - c;
  };
  onSort = (col, ascend) => {
    this.setState({ col: col, ascend: ascend });
    this.tcSort(this.props.rows);
  };
  tcSort = rows => {
    let col = this.state.col;
    /* hack column as name = firstName +lastName */
    col = "id";
    let ascend = this.state.ascend;
    let newRows, byStatus;
    if (col == "date") {
      newRows = R.sort(this.byDate, rows);
    } else {
      byStatus = ascend ? R.descend(R.prop(col)) : R.ascend(R.prop(col));
      newRows = R.sort(byStatus, rows);
    }
    return newRows;
  };
  paginated = i => {
    console.log("TC paginated");
    const newRow = (this.state.page + i) * 4 + 1;
    const page = this.state.page + i;
    const start = 0;
    const end = start + this.state.perPage;
    this.setState({
      page: page
      //showRows: R.slice(0, this.state.perPage, this.state.rows)
    });
    let a = R.map(
      x => (x.id !== i ? { ...x, selected: false } : x),
      this.props.rows
    );
    let b = R.map(x => (x.id === newRow ? { ...x, selected: true } : x), a);
    let c = R.find(x => x.id === newRow, b);
    console.table(c);
    this.onSelected(newRow, c);
  };
  /* UPDATING FOR PREVIOUS PERSON SELECT AS WELL CURRENT SELECTION */
  /* NOT ACCOUNTING FOR MULTI-SELECT */
  onSelected = (id, item, edit) => {
    console.log("TC onSelected " + id, JSON.stringify(item));
    //  this.props.onselected(id);

    edit && this.props.setView("details");
  };
  onSelected2 = (id, item) => {
    console.log("TC onSelected2 " + id, JSON.stringify(item));
    this.props.onselected(id, item);
  };
  paginateRows = rows => {
    const start = this.state.perPage * this.state.page;
    return R.slice(start, start + this.state.perPage, rows);
  };
  getColumns = node => {
    console.log("getColumns node: " + node);

    return node == "person" ? columnsPerson : columnsOrg;
  };
  render() {
    console.log("TC render f");
    const { searchType } = this.props;
    return (
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
        {this.props.rows && this.props.rows.length ? (
          <Table
            columns={
              !this.props.submittable
                ? R.compose(
                    this.sortColumns,
                    this.removeSubmitColumn
                  )(this.getColumns(searchType))
                : this.sortColumns(this.getColumns(searchType))
            }
            rows={
              this.state.bPaginated
                ? this.paginateRows(this.tcSort(this.props.rows))
                : this.tcSort(this.props.rows)
            }
            rollOverColor="#9ccc65"
            stripeRows={true}
            stripeRowsColor="#A4AECB"
            sortable={false}
            selectable={true}
            multiselect={false}
            selectColor={"#DF5C33"}
            paginated={this.state.bPaginated}
            onPaginated={this.paginated}
            page={this.state.page}
            perPage={this.state.perPage}
            onselected={this.onSelected}
            onselected2={this.onSelected2}
            submittable={this.props.submittable}
            onSort={this.onSort}
            totalRows={this.props.totalRows}
            onUpdate={this.props.onUpdate}
            rowType="Row"
            onselect={this.props.onselected}
          />
        ) : (
          <div style={{ marginLeft: "200px" }}>No results.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  rows: state.giftLog.searchResults ? state.giftLog.searchResults : null,
  totalRows: state.giftLog.searchResults
    ? state.giftLog.searchResults.length
    : 0
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onselected: (id, typ, partyType) => {
    console.log("onselected id  " + [id, typ, partyType]);
    dispatch(selectedRowAndType(id, typ, partyType));
  }
});

const TableContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);

export default TableContainer2;
