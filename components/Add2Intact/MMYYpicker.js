import React, { Component } from "react";
import R from "ramda";
import FieldDropDown from "./FieldDropDown";
import RaisedButton from "material-ui/RaisedButton";

import moment from "moment";

export default class MMYYpicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let now = moment(new Date()).subtract(1, "months");
    console.log(now.month());
    console.log(now.year());
    this.setState({ month: now.month(), year: now.year() });
  }
  createYearDD = () => {
    let now = moment(new Date()).subtract(1, "months");
    let yr = now.year();
    const createYrs = n => {
      let yrs = [];
      for (let i = yr; i >= 2018; i--) {
        yrs.push(i);
      }
      return yrs;
    };
    const createItem = yr => {
      return { name: yr, title: yr, value: yr };
    };
    const createItems = () => {
      return R.map(x => createItem(x), createYrs(yr));
    };
    return createItems();
  };
  onsubmit = () => {
    console.log("picker onsubmit");
    this.props.onsubmit(this.state.month, this.state.year);
  };
  render() {
    const { obj, status, options } = this.props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px"
        }}
      >
        <FieldDropDown
          options={this.props.months}
          status={this.state.month}
          //data={ }
          onselect={x => this.setState({ month: x })}
        />
        <FieldDropDown
          options={this.createYearDD()}
          status={this.state.year}
          //data={ }
          onselect={x => this.setState({ year: x })}
        />
        <RaisedButton
          label="Submit"
          disabled={false}
          primary={true}
          style={{ marginRight: 12 }}
          onClick={() => this.onsubmit()}
        />
      </div>
    );
  }
}
