import React from "react";
import * as R from "ramda";
import Paper from "material-ui/Paper";
import Row from "./Row";
import Header from "./Header";
import Paginated from "./Paginated";
import "./Table.js";
import { Log, LogTable } from "../../../utils/utils";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.rows,
      ascend: false,
      page: 0,
      perPage: this.props.perPage,
      totalRows: null,
      col: "submittedTimestamp"
    };
    console.table(this.props.rows);
  }
  /*
  componentWillReceiveProps(nextProps) {
    Log("Table componentWillReceiveProps f " + nextProps.rows);
    console.log("state.rows.LENGTH " + this.state.rows.length);
    console.log("table.nextprops.rows " + nextProps.rows);
    console.table(R.difference(nextProps.rows, this.state.rows));
    console.table(nextProps.rows);
    this.setState({
      rows: nextProps.rows,
      page: 0,
      totalRows: nextProps.rows.length,
      diffUUIDs: this.setDiffDoc(nextProps.rows, this.state.rows)

   
    });
  }
  */
  componentDidMount() {
    Log("componentDidMount f");
    LogTable(R.sort(this.byDate, this.props.rows));
    this.setState({
      //rows: R.sort(this.byDate, this.props.rows),
      totalRows: this.props.rows.length
    });
  }
  setDiffDoc = (newRows, rows) => {
    const dd = R.map(x => x.uuid, R.difference(newRows, rows));
    console.log("diffence length : " + dd.length);
    /*IF ALL NEW THEN TAB SELECTED NEW BANK, SO DONT SHOW FADE IN */
    return dd.length >= 10 ? [] : dd;
  };
  byDate = (a, b) => {
    const c = new Date(parseFloat(a.submittedTimestamp));
    const d = new Date(parseFloat(b.submittedTimestamp));
    //Log("byDate f " + c - d > 0 ? true : false);
    return this.state.ascend ? c - d : d - c;
  };
  byCol = () => {
    Log("byCol f col&asscend: " + [this.state.col, this.state.ascend]);
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
    if (col === "createTimestamp") {
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
    console.log("Table rowSelected id " + id);

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
    let newRows, byStatus;
    let col = this.state.col;
    if (col == "submittedTimestamp") {
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
  chkbx = () => {
    this.props.chkbx();
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
      submittable,
      rows
    } = this.props;
    const getColor = index => {
      //Log("getColor " + [stripeRows, index, stripeRowsColor]);
      return stripeRows && index % 2 ? stripeRowsColor : null;
    };

    const getRows = rows => {
      console.log("Table getRows f");
      console.table(rows);
      /*
      let rows;
      rows = this.newSort(this.state.rows);
      if (paginated) {
        rows = this.newPaginate(rows);
      }
      */
      return rows.map((row, index) => (
        <Row
          key={index}
          index={index}
          data={row}
          color={getColor(index)}
          onclick={this.rowSelected}
          selectable={selectable}
          selectable={selectable}
          selectColor={selectColor}
          rollOverColor={rollOverColor}
          selected={row.selected}
          submittable={submittable}
          onVis={this.props.onVis}
        />
      ));
    };
    return (
      <div>
        <Paper zDepth={2}>
          <Header
            data={columns}
            sortable={sortable}
            sortFunc={this.sortFunc}
            chkbx={() => this.chkbx()}
          />
          {getRows(rows)}
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
