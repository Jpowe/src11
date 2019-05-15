import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  setView,
  setSearchID,
  setSelectedRow,
  GEI_add_recip,
  addToNode
} from "../../actions";
import { getRows, getSelection } from "../../reducers";
import Table from "./Table/Table";
import {
  columnsPerson,
  columnsOrg,
  columnsAnimal,
  columnsGroup,
  columnsGift,
  columnsLocation
} from "../../common/data";

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
    this.props.getDataForComp();
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
    /*
    let prevSelectedRow = R.find(x => x.selected == true, this.props.rows);
    prevSelectedRow["selected"] = false;
    this.props.onselected(R.prop("id", prevSelectedRow), prevSelectedRow);

    let a = R.map(
      x => (x.id !== id ? { ...x, selected: false } : x),
      this.props.rows
    );
    */

    this.props.addToNode(item);
    this.props.bubbleUp(id);
    this.props.onselected(id);
    this.props.GEI_add_recip();
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

    const choices = [
      { nodeName: "people", cols: columnsPerson },
      { nodeName: "orgs", cols: columnsOrg },
      { nodeName: "animals", cols: columnsAnimal },
      { nodeName: "groups", cols: columnsGroup },
      { nodeName: "locations", cols: columnsLocation },
      { nodeName: "gifts", cols: columnsGift }
    ];
    return R.prop("cols", R.find(x => x.nodeName === node, choices));
  };
  render() {
    console.log("TC render f");
    return (
      <div>
        {this.props.rows && this.props.rows.length ? (
          <Table
            columns={
              !this.props.submittable
                ? R.compose(this.sortColumns, this.removeSubmitColumn)(
                    this.getColumns(this.props.node)
                  )
                : this.sortColumns(this.getColumns(this.props.node))
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
          />
        ) : (
          <div style={{ marginLeft: "200px" }}>Search results here.</div>
        )}
      </div>
    );
  }
}
const filteredStatuses = (status, gifts) => {
  console.log("filteredStatuses " + status);
  console.log(R.contains("preapproved", status));
  const byDate = (a, b) => {
    const c = new Date(a.date);
    const d = new Date(b.date);
    return d - c;
  };
  //console.table(R.filter(x => x.status === "preapproved", gifts));
  let tableAction;
  if (R.contains("preapproved", status)) {
    return R.filter(x => x.statusGroup === "preapproved", gifts);
  } else if (R.contains("approved", status)) {
    return R.filter(x => x.statusGroup === "approved", gifts);
  } else if (R.contains("activity", status)) {
    console.log("filter by activity");
    console.table(R.sort(this.byDate, gifts));
    return R.sort(byDate, gifts);
  } else if (R.contains("date", status)) {
    console.log("filter by date");
    console.table(R.sort(this.byDate, gifts));
    return R.sort(byDate, gifts);
  }
};
const filterSearch = (data, filterStr, node) => {
  console.log(
    "filterSearch  : " + [JSON.stringify(data), JSON.stringify(filterStr), node]
  );
  let q;
  const matching = (exp, data) => {
    const regex2 = RegExp(exp, "g");
    const str1 = data;
    return regex2.test(str1);
  };
  if (!filterStr) {
    return;
  }
  const getQuery = node => {
    const searchFields = [
      { node: "people", field: "lastName" },
      { node: "orgs", field: "name" },
      { node: "animals", field: "name" },
      { node: "groups", field: "name" },
      { node: "locations", field: "streetAddress1" },
      { node: "gifts", field: "description" }
    ];
    const searchField = R.prop(
      "field",
      R.find(x => x.node === node, searchFields)
    );
    return R.filter(x => matching(filterStr, x[searchField]), data);
  };
  return getQuery(node);
};

const convertGifts = (obj, gifts) => {
  const a = R.map(x => x.id, R.path(["giftHistory"], obj));
  return R.filter(x => R.contains(x.id, a), gifts);
};

const getLocations = (obj, locations) => {
  const recipInLoc = (recip, loc) => {
    return !!R.find(x => R.contains(x.id, recip), loc.person);
  };
  let r = R.map(x => x.id, R.path(["recipients"], obj));
  const fRows = R.filter(x => recipInLoc(r, x), locations);
  /* hack out arrays of person and gift */
  return R.map(x => (x ? { ...x, person: 0, gift: 0 } : null), fRows);
};
const test = locations => {
  return locations;
  return R.map(x => {
    return {
      street: x.streetAddress1,
      city: x.city,
      state: x.state,
      selected: x.selected
    };
  }, locations);
};

const mapStateToProps = (state, ownProps) => ({
  node: state.glogInput.node,
  //rows:state.glogInput[state.glogInput.node],
  rows: ownProps.noFilter
    ? state.glogInput.searchText
    : state.glogInput.node == "locations"
      ? //? getLocations(state.glogInput.locations)
        test(
          getLocations(
            R.find(
              x => x.id == state.glogInput.selectedRow,
              state.glogInput.giftEventInstances
            ),
            state.glogInput.locations
          )
        )
      : convertGifts(
          R.find(
            x => x.id == state.glogInput.selectedRow,
            state.glogInput.giftEventInstances
          ),
          state.glogInput.gifts
        ),
  //rows:filterSearch(state.glogInput[state.glogInput.node],ownProps.filterStr)
  totalRows: state.glogInput[state.glogInput.node].length
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getDataForComp: x => {
    //dispatch(getData());
  },
  onselected: id => {
    dispatch(setSearchID(id));
    dispatch(setSelectedRow(id));
  },
  setView: x => {
    dispatch(setView(x));
  },
  onUpdate: (id, obj) => {
    //dispatch(updateRow(obj));
  },
  GEI_add_recip: () => {
    dispatch(GEI_add_recip());
  },
  addToNode: payload => {
    dispatch(addToNode(payload));
  }
});

const TableContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  TableContainer
);

export default TableContainer2;
