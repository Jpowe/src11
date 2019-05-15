import React from "react";
import * as R from "ramda";
import Paper from "material-ui/Paper";
import Row from "./Row";
import RowMain from "./RowMain";
import Header from "./Header";
import Paginated from "./Paginated";
//import "./Table.js";
import "./Table.css";
import { statuses } from "../../../common/data";

import { componentFromProp } from "recompose";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascend: false,
      col: "date",
      rows: this.props.rows
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("Table CWRP: " + nextProps.rows);
    this.setState({
      rows: nextProps.rows,
      page: 0,
      totalRows: nextProps.rows.length
    });
  }
  componentDidMount() {
    this.setState({
      rows: R.sort(this.byDate, this.props.rows),
      totalRows: this.props.rows.length
    });
  }

  /** FROM HEADER **/
  onSortFunc = col => {
    console.log("Table onSortFunc col: " + col);
    let byStatus;
    let newData;
    console.log("this.state.ascend " + this.state.ascend);
    this.setState({
      col: col,
      ascend: !this.state.ascend
    });
    this.props.onSort(col, !this.state.ascend);
  };
  /*
  setObjProp = (prop, item, value) => {
    let a = R.find(x => x.id === item, this.state.rows);
    a[prop] = value;
  };
  */

  rowSelected = (id, edit = null) => {
    console.log("Table rowSelected id " + id);
    let a;
    let b;
    if (!this.props.selectable) {
      console.log("rowSelected A");
      return;
    }
    if (this.props.multiselect) {
      console.log("rowSelected B");
      b = R.map(
        x => (x.id === id ? { ...x, selected: true } : x),
        this.state.rows
      );
      this.setState({ rows: b });
    } else {
      console.log("rowSelected C");
      a = R.map(
        x => (x.id !== id ? { ...x, selected: false } : x),
        this.state.rows
      );
      b = R.map(x => (x.id === id ? { ...x, selected: true } : x), a);
      console.log("b");
      console.table(b);
      /** DONT NEED TO SET ROWS STATE ANYMORE ***/
      this.setState({ rows: b });
    }
    //  console.table(b);
    //  console.table(this.props.rows);
    let item = R.find(x => x.id === id, b);
    console.table(item);
    this.props.onselected(id, item, edit);
  };
  rowSelected2 = id => {
    console.log("Table rowSelected2 id " + id);
    this.props.onselected2(id, this.state.rows);
  };

  getColor = index => {
    return this.props.stripeRows && index % 2
      ? this.props.stripeRowsColor
      : null;
  };

  /* MUI the 200s of each color  grey 500*/
  /*
  getColor = status => {
    console.log("getcolor status: " + status);

    return R.prop("color", R.find(x => x.status == status, statuses));
  };
  */

  getRows = (data, component) => {
    //console.log("getRows component = " + component);
    const RowType = componentFromProp("type");
    return data.map((row, index) => (
      <RowType
        type={component}
        key={index}
        index={index}
        data={row}
        color={this.getColor(index)}
        onclick={this.rowSelected}
        selectable={this.props.selectable}
        selectColor={this.props.selectColor}
        rollOverColor={this.props.rollOverColor}
        selected={row.selected}
        submittable={this.props.submittable}
        onUpdate={this.props.onUpdate}
      />
    ));
  };
  onPaginated = x => {
    this.props.onPaginated(x);
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

    return (
      <div>
        <Paper zDepth={2}>
          {this.props.paginated && (
            <Paginated
              currentPage={this.props.page + 1}
              nRows={this.props.perPage}
              onPaginated={this.onPaginated}
              totalRows={this.props.totalRows}
            />
          )}
          <Header
            data={columns}
            sortable={sortable}
            onSortFunc={this.onSortFunc}
          />
          {this.props.rowType == "RowMain" &&
            this.props.rows &&
            this.getRows(this.state.rows, RowMain)}
          {this.props.rowType == "Row" &&
            this.props.rows &&
            this.getRows(this.state.rows, Row)}
          {this.props.paginated && (
            <Paginated
              currentPage={this.props.page + 1}
              nRows={this.props.perPage}
              onPaginated={this.onPaginated}
              totalRows={this.props.totalRows}
            />
          )}
        </Paper>
      </div>
    );
  }
}
