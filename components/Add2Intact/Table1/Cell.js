import React, { Component } from "react";
import moment from "moment";
import {
  isNumber,
  numberAddCommas,
  numberDeleteCommas,
  prependDollarSign,
  deleteDollarSign
} from "../../utils/utils";
import Visibility from "material-ui/svg-icons/action/visibility";
import Delta from "material-ui/svg-icons/action/change-history";
import Remove from "material-ui/svg-icons/content/remove";
import Checkbox from "material-ui/Checkbox";

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
  } else if (data == "true") {
    return <Delta />;
  } else if (data == "false") {
    return <Remove />;
  } else if (data == "visibility") {
    return <Visibility />;
  } else if (data == "checkbox") {
    return <Checkbox />;
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
