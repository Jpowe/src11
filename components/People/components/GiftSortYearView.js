import React, { Component } from "react";
import * as R from "ramda";
import GiftEventView from "./GiftEventView";
import { typography } from "material-ui/styles";
import muiThemeable from "material-ui/styles/muiThemeable";

class GiftSortYearView extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { data, yrs } = this.props;
    return (
      <div
        style={{
          fontWeight: typography.fontWeightMedium,
          fontFamily: this.props.muiTheme.fontFamily,
          margin: "4px"
        }}
      >
        {yrs.map((x, index) => (
          <div>
            <div style={{ marginLeft: "20px" }}>
              <h4>{x}</h4>
            </div>
            <GiftEventView rows={data[index]} yr={x} />
          </div>
        ))}
      </div>
    );
  }
}

export default muiThemeable()(GiftSortYearView);
