import React from "react";
import * as R from "ramda";
import Paper from "material-ui/Paper";
import Table from "./Table/Table";
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
      tab: "Bank of America - California",
      animation: false,
      rows: null,
      width: Math.max(355, window.innerWidth - 280)
    };
  }
  componentWillReceiveProps(nextProps) {
    //  console.log("Grid nextProps  " + JSON.stringify(nextProps));
    console.log("Grid nextprops.bankOne");
    console.table(nextProps.bankOne);
    //  console.log("nextprops.bankSelection " + nextProps.bankSelection);
    this.setState({
      rows:
        this.state.tab === "Bank of America - California"
          ? nextProps.bankOne
          : this.state.tab === "Bank of America - New York"
            ? nextProps.bankTwo
            : this.state.tab === "Bank of America - Texas"
              ? nextProps.bankThree
              : nextProps.bankFour,
      animation: !nextProps.loaded
    });
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

    const getRows = [
      { name: "Bank of America - California", f: this.props.bankOne },
      { name: "Bank of America - New York", f: this.props.bankTwo },
      { name: "Bank of America - Texas", f: this.props.bankThree },
      { name: "CoBiz Bank", f: this.props.bankFour }
    ];
    this.setState({
      tab: value,
      rows: R.prop("f", R.find(x => x.name == value, getRows))
    });
    this.props.bankSelection(value);
  };
  getData = () => {
    return this.state.rows;
  };

  renderTab = value => {
    console.log("Grid renderTab " + [value, this.state.tab]);
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
      <FlatButton
        onClick={() => this.handleChangeTabs(value)}
        label={value}
        labelStyle={renderLabelStyle(this.state.tab, value)}
        style={sty(this.state.tab, value)}
        className={"vertBar"}
        //disabled={this.state.tab == value}
      />
    );
  };
  getClass = () => {
    return this.state.animation ? "rotating" : null;
  };
  sortColumns = columns => {
    return R.sort(R.ascend(R.prop("order")), columns);
  };
  removeSubmitColumn = columns => {
    return R.filter(x => x.name !== "override", columns);
  };
  evalRow = () => {
    Log("Grid evalRow f");
  };
  onselected = (id, submitType) => {
    //console.log("Grid onselected");
    this.props.onselected(id, submitType);
    let newItem = {
      submittedTimestamp: Date.now(),
      createdTimestamp: Date.now(),
      status: "Resubmitting",
      fileID: "NEW"
    };
    //  console.table([...this.state.rows, newItem]);
    //console.log("tab " + this.state.tab);
    this.setState({
      rows:
        this.state.tab == "Bank of America - California"
          ? [...this.props.bankOne, newItem]
          : this.state.tab == "Bank of America - New York"
            ? [...this.props.bankTwo, newItem]
            : this.state.tab == "Bank of America - Texas"
              ? [...this.props.bankThree, newItem]
              : [...this.props.bankFour, newItem]
    });
    to3 = setTimeout(this.props.onRefresh, 2500);
  };
  onselected2 = id => {
    this.props.onselected2(id);
    let newItem = {
      submittedTimestamp: Date.now(),
      createdTimestamp: Date.now(),
      status: "Resubmit2",
      fileID: "NEW"
    };
    //console.table([...this.state.rows, newItem]);
    //  console.log("tab " + this.state.tab);
    this.setState({
      rows:
        this.state.tab == "Bank of America - California"
          ? [...this.props.bankOne, newItem]
          : this.state.tab == "Bank of America - New York"
            ? [...this.props.bankTwo, newItem]
            : this.state.tab == "Bank of America - Texas"
              ? [...this.props.bankThree, newItem]
              : [...this.props.bankFour, newItem]
    });
  };
  newSubmission = submitType => {
    console.log("Grid newSubmission type: " + submitType);
    submitType === "auto"
      ? this.props.manualOverride("auto")
      : this.props.manualOverride("manual");
    let newItem = {
      submittedTimestamp: Date.now(),
      createdTimestamp: Date.now(),
      status: "New",
      fileID: "NEW"
    };

    this.setState({ animation: true });

    to1 = setTimeout(() => {
      this.setState({
        rows:
          this.state.tab == "Bank of America - California"
            ? [...this.props.bankOne, newItem]
            : this.state.tab == "Bank of America - New York"
              ? [...this.props.bankTwo, newItem]
              : this.state.tab == "Bank of America - Texas"
                ? [...this.props.bankThree, newItem]
                : [...this.props.bankFour, newItem]
      });
    }, 300);
    to2 = setTimeout(this.props.onRefresh, 2500);
  };
  onRefresh = () => {
    console.log("Grid refresh");
    this.props.onRefresh();
  };
  render() {
    const {
      columns,
      bankOne,
      bankTwo,
      bankThree,
      bankFour,
      submittable
    } = this.props;
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
                <div>{this.renderTab(this.props.bankOneName)}</div>
                <div>{this.renderTab(this.props.bankTwoName)}</div>
                <div>{this.renderTab(this.props.bankThreeName)}</div>
                <div>{this.renderTab(this.props.bankFourName)}</div>
              </div>

              <div style={{ borderTop: "1px solid black" }}>
                <div
                  style={{
                    height: 38,
                    color: "#455A64",
                    marginLeft: "10px",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <h3>Positive Pay History for {this.state.tab}</h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "baseline",
                    padding: 8
                  }}
                >
                  {submittable && (
                    <div>
                      <RaisedButton
                        label="New auto"
                        backgroundColor="#f58c32"
                        labelColor={white}
                        style={{ margin: "10px" }}
                        onClick={() => this.newSubmission("auto")}
                      />
                      <RaisedButton
                        label="New manual"
                        backgroundColor="#f58c32"
                        labelColor={white}
                        style={{ margin: "10px" }}
                        onClick={() => this.newSubmission("manual")}
                      />

                      <Replay
                        className={this.getClass()}
                        onClick={this.onRefresh}
                        style={{
                          color: "#f58c32",
                          cursor: "pointer"
                        }}
                      />
                    </div>
                  )}
                </div>
                {this.state.rows && (
                  <Table
                    columns={
                      !submittable
                        ? this.removeSubmitColumn(columns)
                        : this.sortColumns(columns)
                    }
                    rows={this.state.rows}
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
                )}
              </div>
            </Paper>
          </div>
        </WidgetBase>
      </div>
    );
  }
}
