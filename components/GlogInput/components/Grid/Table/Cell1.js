import React, { Component } from "react";
import moment from "moment";
import {
  isNumber,
  numberAddCommas,
  numberDeleteCommas,
  prependDollarSign,
  deleteDollarSign
} from "../../utils/utils";

class Cell extends Component {
  displayCell = arr => {
    return arr.map(x => {
      return <div style={{ padding: 4 }}>{x}</div>;
    });
  };
  render() {
    const { type, data } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          padding: 28,
          width: "20%",
          height: "48px",
          border: "2px solid red",
          borderRadius: "50px 20px"
        }}
      >
        {this.displayCell(data)}
      </div>
    );
  }
}

export default Cell;
