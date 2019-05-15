import React, { Component } from "react";
import R from "ramda";

export default class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  process = row => {
    console.table(row);
    const deltas = row["accountDeltas"];
    const showDeltas = row => {
      return (
        <div>
          <div>{row.addeparCategory}</div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
              height: 56,
              //  color: this.props.muiTheme.palette.accent3Color,
              fontSize: "large"
            }}
          >
            <div>{row.addeparAmount}</div>
            <div>{row.intacctCredits ? row.intacctCredits[0].amount : 0}</div>
            <div>{row.intacctDebits ? row.intacctDebits[0].amount : 0}</div>
          </div>
        </div>
      );
    };

    return (
      <div>
        {R.prop("accountName", row)} | ${R.prop("accountID", row)}
        {deltas.map(x => showDeltas(x))}
      </div>
    );
  };

  render() {
    const {} = this.props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px"
        }}
      >
        {this.props.data.map((row, index) => (
          <div>{this.process(row)}</div>
        ))}
      </div>
    );
  }
}
