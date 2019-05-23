import React from "react";
import * as R from "ramda";
import Paper from "material-ui/Paper";
import Row from "./Row";
import RowMain from "./RowMain";
import Header from "./Header";
import Paginated from "./Paginated";
//import "./Table.js";
import "./Table.css";

import { componentFromProp } from "recompose";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascend: false,
      col: "date",
      rows: this.props.rows,
      expand: ["0"]
    };
  }
  componentWillReceiveProps(nextProps) {
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

  getColor = (index, row) => {
    console.log("collapseRow " + row.collapseRow);
    if (row.collapseRow) {
      return "#ffffff";
    }
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
  colWidth = () => {
    let w = Number(100 / this.props.columns.length) + `%`;
    return w;
  };
  getRows = (data, component) => {
    const RowType = componentFromProp("type");
    const isRowPartofMulti = (data, id) => {
      return R.length(R.filter(x => x.geUUID === id, data)) > 1 ? true : false;
    };
    const setExpand = id => {
      console.log("geUUID " + id);
      let expand = [];
      console.log("state expand " + this.state.expand);
      expand = this.state.expand;
      expand = R.contains(id, expand)
        ? R.without([id], expand)
        : R.insert(0, id, expand);
      console.log("expand " + JSON.stringify(expand));
      this.setState({ expand: expand });
    };

    return data.map(
      (row, index) =>
        (row.collapseRow ||
          R.contains(row.geUUID, this.state.expand) ||
          !isRowPartofMulti(data, row.geUUID)) && (
          <RowType
            type={component}
            key={index}
            index={index}
            data={row}
            color={this.getColor(index, row)}
            onclick={this.rowSelected}
            selectable={this.props.selectable}
            selectColor={this.props.selectColor}
            rollOverColor={this.props.rollOverColor}
            selected={row.selected}
            submittable={this.props.submittable}
            onUpdate={this.props.onUpdate}
            //onselect={(uuid, typ) => console.log("uuid and type " + [uuid, typ])}
            onselect={(uuid, typ, partyType) =>
              this.props.onselect(uuid, typ, partyType)
            }
            cellWidth={this.colWidth()}
            personalAssts={this.props.personalAssts}
            collapseRow={!!row.collapseRow}
            onCollapse={() => setExpand(row.geUUID)}
          />
        )
    );
  };
  onPaginated = x => {
    this.props.onPaginated(x);
  };
  getNewRows = rows => {
    console.table(rows);
    const rowsMoreThanOneReq = d => {
      const moreThanOne = R.filter(y => y > 1, R.countBy(x => x.geUUID, rows));
      const k = R.keys(moreThanOne);
      return R.filter(x => R.contains(x.geUUID, k), rows);
    };
    const createNewRow = row => {
      const a = { request: "" };
      return {
        status: "",
        assign: "",
        eventType: row.eventType,
        eventDate: row.eventDate,
        geUUID: row.geUUID,
        party: row.party,
        geParties: row.geParties,
        ...a,
        collapseRow: true,
        request: ""
      };
    };

    const uniqueDupRows = R.uniqBy(x => x.geUUID, rowsMoreThanOneReq(rows));

    const newRows = R.map(createNewRow, uniqueDupRows);

    const getRows = (orig, newrows) => {
      return [...orig, ...newrows];
    };
    const sorted = R.sortWith([
      R.ascend(R.prop("eventDate")),
      R.descend(R.prop("geUUID")),
      R.ascend(R.prop("request"))
    ]);
    const changedRows = sorted(getRows(rows, newRows));
    console.table(changedRows);
    return changedRows;
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
      <div style={{ minWidth: "2700px" }}>
        <Paper zDepth={2}>
          <Header
            data={columns}
            sortable={sortable}
            onSortFunc={this.onSortFunc}
            cellWidth={this.colWidth()}
          />
          {this.props.rowType == "RowMain" &&
            this.props.rows &&
            this.getRows(this.getNewRows(this.state.rows), RowMain)}
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
