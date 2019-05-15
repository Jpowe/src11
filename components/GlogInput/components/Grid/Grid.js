import React from "react";
import * as R from "ramda";
import Paper from "material-ui/Paper";
import TableContainer from "./TableContainer";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import Loop from "material-ui/svg-icons/av/loop";
import { white } from "material-ui/styles/colors";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import "./Grid.css";
const styl = {
  borderWidth: "1px 1px 0px 1px",
  borderStyle: "solid",
  marginRight: "1px",
  height: "28px",
  borderTopLeftRadius: "6px",
  borderTopRightRadius: "6px",
  paddingBottom: "4px"
};

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({});
  }

  handleChangeTabs = value => {
    this.setState({
      tab: value
      //rows: this.props.rows
    });
    this.props.onSelection(value);
  };
  getData = () => {
    //  return this.state.rows;
  };

  renderTab = value => {
    console.log("Grid renderTab " + value + " " + this.state.tab);
    return (
      <FlatButton
        onClick={() => this.handleChangeTabs(value)}
        label={value}
        style={styl}
        disabled={this.state.tab == value ? true : false}
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

  addRow = () => {
    this.props.addRow();
  };
  showSearch = bSearch => {
    return "SHOW SEARCH: " + bSearch;
  };
  render() {
    const { title, bSearch } = this.props;
    return (
      <div style={{ padding: 4 }}>
        <Paper zDepth={2}>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 8
            }}
          />
          <div
            style={{
              height: 38,
              color: "#455A64",
              marginLeft: "10px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div style={{ fontSize: "x-large", color: "#303F9F" }}>{title}</div>
            <div>{this.showSearch(bSearch)}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "baseline",
              padding: 8
            }}
          >
            <div />
          </div>

          <div>
            <TableContainer submittable={false} />
          </div>
        </Paper>
      </div>
    );
  }
}
