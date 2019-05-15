import React from "react";
import * as R from "ramda";
import Paper from "material-ui/Paper";
import Table from "./Table1/Table";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import Loop from "material-ui/svg-icons/av/loop";
import Replay from "material-ui/svg-icons/av/replay";
import { white } from "material-ui/styles/colors";
import "./Grid.css";
import WidgetBase from "../WidgetBase";
import { Log, LogTable } from "../../utils/utils";
import MMYYpicker from "./MMYYpicker";

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

  componentWillReceiveProps(nextProps) {
    console.log("Grid nextProps  " + JSON.stringify(nextProps));
  }

  componentDidMount() {
    console.log("GRID CDM");
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
    this.setState({
      rows: this.props.bankOne
      //  tab: this.props.bankOneName
    });
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
    clearTimeout(to1);
    clearTimeout(to2);
    clearTimeout(to3);
  }

  handleChangeTabs = value => {
    console.log("handleChangeTabs value " + value);
    this.props.onTab(value);
  };
  getData = () => {
    return this.state.rows;
  };

  renderTab = (value, tabSelected) => {
    console.log("Grid renderTab " + [value, tabSelected]);
    const sty = (a, b) => {
      return a == b
        ? {
            pointerEvents: "none",
            textDecoration: "none",
            backgroundColor: "#E0E0E0",
            //fontSize: "20px",
            //  color: "#440000",
            borderWidth: "1px 4px 1px 4px",
            borderStyle: "solid",
            marginRight: "2px",
            height: "38px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            borderBottom: "1px solid #E0E0E0",
            zIndex: 2
          }
        : {
            //textDecoration: "underline",
            backgroundColor: "#d6d6d6",
            //  color: "#fff",
            borderWidth: "1px 1px 1px 1px",
            borderStyle: "solid",
            marginRight: "2px",
            height: "38px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            borderBottom: "1px solid #333",
            zIndex: 2
          };
    };
    const renderLabelStyle = (a, b) => {
      return a == b ? { opacity: 1 } : { opacity: 0.3 };
    };
    return (
      <div>
        <FlatButton
          onClick={() => this.handleChangeTabs(value)}
          label={value}
          labelStyle={renderLabelStyle(this.state.tab, value)}
          style={sty(tabSelected, value)}
          className={"vertBar"}
          //disabled={this.state.tab == value}
        />
      </div>
    );
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

  onRefresh = () => {
    console.log("Grid refresh");
    this.props.onRefresh();
  };
  onsubmit = (mo, yr) => {
    console.log("onsubmit str " + [mo, yr]);
    this.props.onsubmit(mo, yr);
  };

  render() {
    const { columns, months, submittable, s } = this.props;
    return (
      <div style={{ width: this.state.width }}>
        <WidgetBase title={"PositivePay"}>
          <div>
            <Paper zDepth={2}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0px"
                }}
              >
                {R.map(
                  x => (
                    <div>{this.renderTab(x, s)}</div>
                  ),
                  this.props.tabs
                )}
              </div>

              <div style={{ borderTop: "1px solid black" }}>
                <div
                  style={{
                    height: 38,
                    color: "#455A64",
                    marginLeft: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "nowrap"
                  }}
                >
                  <h3>Submissions for {this.props.tabs[0]}</h3>

                  <MMYYpicker months={months} onsubmit={this.onsubmit} />
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
                />
              </div>
            </Paper>
          </div>
        </WidgetBase>
      </div>
    );
  }
}
