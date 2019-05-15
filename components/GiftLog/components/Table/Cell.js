import React, { Component } from "react";
import * as R from "ramda";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  displayCell = arr => {
    try {
      if (typeof arr == "string") {
        return (
          <div
            style={{
              display: "flex"
            }}
          >
            <ul>{arr}</ul>
          </div>
        );
      }
      return arr.map((x, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex"
            }}
          >
            <ul>{x}</ul>
          </div>
        );
      });
    } catch (e) {
      console.log("CATCH " + e.message);
    }
  };
  getWidth = w => {
    return w;
  };
  render() {
    const { type, data } = this.props;
    return (
      <div
        style={{
          width: this.getWidth(this.props.width),
          marginLeft: "0px",
          padding: "0px 2px"
          //border: "2px solid red"
        }}
      >
        {this.displayCell(data)}
      </div>
    );
  }
}

export default Cell;
