import React from "react";
import * as R from "ramda";
import Paper from "material-ui/Paper";
import Row from "./Row";
import Header from "./Header";
import Paginated from "./Paginated";
import "./Table.js";
import { LogTable } from "../../../utils/utils";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
      ascend: false,
      page: 0,
      perPage: this.props.perPage,
      totalRows: null,
      col: "createdTimestamp"
    };
  }
  componentWillReceiveProps(nextProps) {
    //  console.log("componentWillReceiveProps f " + nextProps.rows);
    this.setState({
      rows: nextProps.rows,
      page: 0,
      totalRows: nextProps.rows.length
    });
  }
  componentDidMount() {
    //console.log("componentDidMount f");
    LogTable(R.sort(this.byDate, this.props.rows));
    this.setState({
      rows: R.sort(this.byDate, this.props.rows),
      totalRows: this.props.rows.length
    });
  }
  byDate = (a, b) => {
    const c = new Date(parseFloat(a.createdTimestamp));
    const d = new Date(parseFloat(b.createdTimestamp));
    //console.log("byDate f " + c - d > 0 ? true : false);
    return this.state.ascend ? c - d : d - c;
  };
  byCol = () => {
    //  console.log("byCol f col&asscend: " + [this.state.col, this.state.ascend]);
    const col = this.state.col;
    const byStatus = this.state.ascend
      ? R.descend(R.prop(col))
      : R.ascend(R.prop(col));
    return R.descend(R.prop("status"));
  };
  sortFunc = col => {
    let byStatus;
    let newData;
    this.setState({
      col: col,
      ascend: !this.state.ascend
    });
    return;
    /**** DELETE THE REST OF THIS FUNCTION **/
    /* to do find col's TYPE if date use func to compare */
    if (col === "createdTimestamp") {
      newData = R.sort(this.diff, this.state.rows);
    } else {
      byStatus = this.state.ascend
        ? R.descend(R.prop(col))
        : R.ascend(R.prop(col));
      newData = R.sort(byStatus, this.state.rows);
    }
    this.setState({
      rows: newData,
      ascend: !this.state.ascend
    });
    LogTable(newData);
  };
  setObjProp = (prop, item, value) => {
    let a = R.find(x => x.uuid === item, this.state.rows);
    a[prop] = value;
  };
  rowSelected = id => {
    let a;
    let b;
    if (!this.props.selectable) {
      return;
    }
    if (this.props.multiselect) {
      b = R.map(
        x => (x.uuid === id ? { ...x, selected: true } : x),
        this.state.rows
      );
      this.setState({ rows: a });
    } else {
      a = R.map(
        x => (x.uuid !== id ? { ...x, selected: false } : x),
        this.state.rows
      );
      b = R.map(x => (x.uuid === id ? { ...x, selected: true } : x), a);
      this.setState({ rows: b });
    }
    this.props.onselected(id);
  };
  paginated = i => {
    const page = this.state.page + i;
    const start = 0;
    const end = start + this.state.perPage;
    this.setState({
      page: page
      //showRows: R.slice(0, this.state.perPage, this.state.rows)
    });
  };
  newSort = rows => {
    //console.log("newSort f");
    let newRows, byStatus;
    let col = this.state.col;
    if (col == "createdTimestamp") {
      newRows = R.sort(this.byDate, this.state.rows);
    } else {
      byStatus = this.state.ascend
        ? R.descend(R.prop(col))
        : R.ascend(R.prop(col));
      newRows = R.sort(byStatus, this.state.rows);
    }
    return newRows;
  };
  newPaginate = rows => {
    const start = this.state.perPage * this.state.page;
    return R.slice(start, start + this.state.perPage, rows);
  };

  render() {
    const {
      columns,
      rollOverColor,
      sortable,
      selectable,
      selectColor,
      stripeRows,
      stripeRowsColor,
      paginated,
      submittable
    } = this.props;
    const getColor = index => {
      //console.log("getColor " + [stripeRows, index, stripeRowsColor]);
      return stripeRows && index % 2 ? stripeRowsColor : null;
    };

    const getRows = () => {
      //  console.log("getRows");
      let rows;
      rows = this.newSort(this.state.rows);
      if (paginated) {
        rows = this.newPaginate(rows);
      }
      return rows.map((row, index) => (
        <Row
          key={index}
          index={index}
          data={row}
          color={getColor(index)}
          onclick={this.rowSelected}
          selectable={selectable}
          selectColor={selectColor}
          rollOverColor={rollOverColor}
          selected={row.selected}
          submittable={submittable}
        />
      ));
    };
    return (
      <div>
        <Paper zDepth={2}>
          <Header data={columns} sortable={sortable} sortFunc={this.sortFunc} />

          {this.state.rows && getRows()}
          {this.props.paginated && (
            <Paginated
              currentPage={this.state.page + 1}
              nRows={this.props.perPage}
              onPaginated={this.paginated}
              totalRows={this.state.totalRows}
            />
          )}
        </Paper>
      </div>
    );
  }
}
