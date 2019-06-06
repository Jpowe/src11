import React, { Component } from "react";
import * as R from "ramda";
import GiftRequestView from "./GiftRequestView";
import { typography } from "material-ui/styles";
import muiThemeable from "material-ui/styles/muiThemeable";

class GiftEventView extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  renderItems(rows) {
    console.log("renderItems");
    return rows
      ? rows.map((row, index) => (
          <div
            style={{
              padding: "10px",
              border: "3px solid #ccc",
              backgroundColor: "#f4daed",
              margin: "4px"
            }}
            onClick={() => console.log(row.uuid)}
          >
            <div style={{ marginLeft: "100px", color: "#ca53ac" }}>
              <h3>{R.prop("eventType", row)}</h3>
            </div>
            <div>
              {R.prop("eventGiftRequests", row)
                ? R.prop("eventGiftRequests", row).map(r => (
                    <GiftRequestView data={r} />
                  ))
                : null}
            </div>
          </div>
        ))
      : null;
  }

  render() {
    const { rows } = this.props;
    return (
      <div
        style={{
          fontWeight: typography.fontWeightMedium,
          fontFamily: this.props.muiTheme.fontFamily,
          margin: "4px"
        }}
      >
        <div>{this.renderItems(rows)}</div>
      </div>
    );
  }
}

export default muiThemeable()(GiftEventView);
