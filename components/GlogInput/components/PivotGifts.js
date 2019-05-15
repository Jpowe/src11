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

export default class PivotGifts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.gifts.length
      ? this.props.onselected(this.props.gifts[0].id)
      : this.props.onselected(0);
  }
  showRow = (gift, i) => {
    console.log("Pivot showRow ");
    const giftID = R.prop("id", gift);
    console.log("giftID " + giftID);

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
            this.props.selection == gift.id ? "#f58c32" : getBgColor(i)
        }}
      >
        <div
          style={{
            width: "95%",
            cursor: "pointer",
            fontSize: "large"
          }}
          onClick={() => onselected(gift.id)}
        >
          {gift.description}
        </div>
      </div>
    );
  };
  showHeader = locations => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <div style={{ width: "30%" }}> </div>

        {locations.map(x => {
          return (
            <div
              style={{
                width: "30%",
                margin: "4px",
                borderStyle: "solid",
                borderColor: "grey",
                borderWidth: " 0px 0px 4px 0px"
              }}
            >
              {x.streetAddress1}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { gifts } = this.props;
    return (
      <Paper
        zDepth={GlobalStyles.depth.n}
        style={(styles.paper, { backgroundColor: "#A4AECB", width: "900px" })}
      >
        <div>
          <h3
            style={{
              backgroundColor: "#DF5C33",
              color: "#ffffff",
              fontWeight: typography.fontWeightLight,
              padding: "8px"
            }}
          >
            Select gift
          </h3>

          {gifts.map((x, i) => {
            return this.showRow(x, i);
          })}
        </div>
      </Paper>
    );
  }
}
