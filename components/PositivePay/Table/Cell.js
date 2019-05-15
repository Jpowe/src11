import React, { Component } from "react";
import moment from "moment";
import {
  isNumber,
  numberAddCommas,
  numberDeleteCommas,
  prependDollarSign,
  deleteDollarSign
} from "../../utils/utils";

const cellFormat = (data, type) => {
  //  Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])
  //let testDate = Date.UTC(2017, 7, 2, 3, 4, 5);
  //if (!data) return;
  let data1;

  if (data === "--") {
    return "--";
  }
  if (type === "currency") {
    if (data == 0) {
      data1 = "0.00";
    } else {
      data1 = data;
    }
    return prependDollarSign(numberAddCommas(data1));
  } else if (type === "date") {
    return moment(data).format("M/D/YY H:mm ");
  } else {
    return data;
  }
};

class Cell extends Component {
  render() {
    const { type, data } = this.props;
    return (
      <div
        style={{
          //display: "flex",
          //alignItems: "center",
          padding: "4px",
          width: "10%"
          //  height: "38px"
        }}
      >
        {cellFormat(data, type)}
      </div>
    );
  }
}

export default Cell;
