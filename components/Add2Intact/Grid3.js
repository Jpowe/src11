import React from "react";
import * as R from "ramda";
import Paper from "material-ui/Paper";
import Table from "./Table2/Table";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import Loop from "material-ui/svg-icons/av/loop";
import Replay from "material-ui/svg-icons/av/replay";
import { white } from "material-ui/styles/colors";
import "./Grid.css";
import WidgetBase from "../WidgetBase";
import { Log, LogTable } from "../../utils/utils";

const styl = {
  borderWidth: "1px 1px 0px 1px",
  borderStyle: "solid",
  marginRight: "1px",
  height: "28px",
  borderTopLeftRadius: "6px",
  borderTopRightRadius: "6px"
};
let to1, to2, to3;
export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "",
      animation: false,
      rows: this.props.rows,
      width: Math.max(355, window.innerWidth - 280)
    };
    console.table(this.props.rows);
  }
  /*
  componentWillReceiveProps(nextProps) {
    //  console.log("Grid nextProps  " + JSON.stringify(nextProps));
    console.log("Grid nextprops.bankOne");
    console.table(nextProps.bankOne);
    //  console.log("nextprops.bankSelection " + nextProps.bankSelection);
    this.setState({
      rows: this.props.rows,
      animation: !nextProps.loaded
    });
  }
  */
  componentDidMount() {
    console.log("GRID CDM");
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
    clearTimeout(to1);
    clearTimeout(to2);
    clearTimeout(to3);
  }

  getData = () => {
    return this.state.rows;
  };

  getClass = () => {
    return this.state.animation ? "rotating" : null;
  };
  sortColumns = columns => {
    console.log("sortColumns");
    console.table(columns);
    return R.sort(R.ascend(R.prop("order")), columns);
  };
  removeSubmitColumn = columns => {
    return R.filter(x => x.name !== "override", columns);
  };
  evalRow = () => {
    Log("Grid evalRow f");
  };
  onselected = id => {
    console.log("Grid onselected");
    this.props.onselected(id);

    to3 = setTimeout(this.props.onRefresh, 2500);
  };
  onselected2 = id => {
    this.props.onselected2(id);

    //console.table([...this.state.rows, newItem]);
    //  console.log("tab " + this.state.tab);
  };

  onRefresh = () => {
    console.log("Grid refresh");
    this.props.onRefresh();
  };
  onsubmit = () => {
    console.log("Grid2 onsubmit");
    this.props.onSubmit();
  };
  chkbx = () => {
    this.props.chkbx();
  };

  render() {
    const { columns, months, submittable } = this.props;
    return (
      <div>
        <Paper zDepth={2}>
          <div style={{ borderTop: "1px solid black" }}>
            <div
              style={{
                height: 38,
                color: "#455A64",
                marginLeft: "20px",
                marginRight: "40px",
                display: "flex",
                justifyContent: "center",
                flexWrap: "nowrap",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  marginLeft: "20px",
                  marginRight: "40px"
                }}
              >
                <h3>ACCOUNT NAME: {this.props.selectedAccountName}</h3>
              </div>
              <div>
                <h3>
                  ACCOUNT ID:
                  {this.props.selectedAccountID}
                </h3>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "baseline",
                padding: 8
              }}
            />

            <Table
              columns={columns}
              rows={this.props.rows}
              rollOverColor="#9ccc65"
              stripeRows={true}
              stripeRowsColor="#A4AECB"
              sortable={false}
              selectable={true}
              multiselect={false}
              selectColor="#f58c32"
              paginated={false}
              perPage={10}
              onselected={this.onselected}
              submittable={submittable}
              chkbx={() => this.chkbx()}
              onVis={this.props.onVis}
            />
          </div>
        </Paper>
      </div>
    );
  }
}
