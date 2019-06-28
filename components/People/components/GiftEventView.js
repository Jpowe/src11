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
  giftYrInGR = (yr, gr) => {
    if (!!R.find(x => x.giftYear == yr, R.prop("requestGifts", gr))) {
      console.log("true " + gr.uuid);
      //arrSHOW_GRS.push({ year: yr, gr: gr.uuid });
    }
    return R.find(x => x.giftYear == yr, R.prop("requestGifts", gr))
      ? true
      : false;
  };

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
            <div
              style={{
                marginLeft: "100px",
                color: "#ca53ac",
                display: "flex",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  fontVariant: "small-caps",
                  marginRight: "20px"
                }}
              >
                Gift Event:
              </div>
              <h3>{`${R.prop("eventType", row)}  (${R.prop(
                "eventMonth",
                row
              )}/${R.prop("eventDay", row)})`}</h3>
            </div>
            <div>
              {R.prop("eventGiftRequests", row)
                ? R.prop("eventGiftRequests", row).map(
                    r =>
                      (this.giftYrInGR(this.props.yr, r) || !this.props.yr) && (
                        <GiftRequestView data={r} yr={this.props.yr} />
                      )
                  )
                : null}
            </div>
          </div>
        ))
      : null;
  }

  render() {
    const { rows, yr } = this.props;
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
