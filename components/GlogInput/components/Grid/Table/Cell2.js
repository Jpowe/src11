import React, { Component } from "react";
import * as R from "ramda";

class Cell extends Component {
  displayCell = arr => {
    return arr.map((x, i) => {
      return (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "14px"
          }}
        >
          {R.map(y => <div>{y}</div>, x)}
        </div>
      );
    });
  };
  render() {
    const { type, data } = this.props;
    return <div style={{}}>{this.displayCell(data)}</div>;
  }
}

export default Cell;
