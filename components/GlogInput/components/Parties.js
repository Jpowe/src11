import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import * as R from "ramda";
import { typography } from "material-ui/styles";
import Paper from "material-ui/Paper";
import GlobalStyles from "../styles";
import { grey400, cyan600, white } from "material-ui/styles/colors";
const styles = {
  subheader: {
    fontSize: 18,
    fontWeight: typography.fontWeightLight,
    backgroundColor: "#DF5C33",
    color: white
  },
  paper: {
    borderRadius: "10px"
  }
};

const cellTypes = [
  { one: "Name1", two: "checkbox", three: "checkbox", four: "checkbox" },
  { one: "Name2", two: "checkbox", three: "checkbox", four: "checkbox" }
];

export default class Parties extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  showRow = (data, i) => {
    console.log("Pivot showRow ");
    const peopleID = R.prop("id", data);
    console.log("peopleID " + peopleID);

    const onselected = id => {
      console.log("onselected " + id);
      this.props.onselected(id);
    };

    const getBgColor = i => {
      console.log("i " + i);
      return i % 2 !== 0 ? "#A4AECB" : "#ccc";
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor:
            this.props.selection == peopleID ? "#DF5C33" : getBgColor(i)
        }}
      >
        <div
          style={{
            width: "95%",
            cursor: "pointer",
            fontSize: "large"
          }}
          onClick={() => onselected(data.id)}
        >
          {data.lastName ? data.lastName : data.name}
        </div>
      </div>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <Paper
        zDepth={GlobalStyles.depth.n}
        style={(styles.paper, { backgroundColor: "#A4AECB", width: "900px" })}
      >
        <div>
          <h3
            style={{
              backgroundColor: "#f58c32",
              color: "#ffffff",
              fontWeight: typography.fontWeightLight,
              padding: "8px"
            }}
          >
            Select gift
          </h3>

          {data.map((x, i) => {
            return this.showRow(x, i);
          })}
        </div>
      </Paper>
    );
  }
}
