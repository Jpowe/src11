import React, { Component } from "react";
import * as R from "ramda";
import GiftView from "./GiftView";

class GiftRequestView extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  renderItems(data) {
    console.log("renderItems");
    return;
  }
  giftYrInGift = (yr, reqGift) => {
    return R.prop("giftYear", reqGift) == yr ? true : false;
  };
  sortGifts = reqGifts => {
    console.table(reqGifts);
    const sortGifts = R.sortWith([R.descend(R.prop("giftYear"))])(reqGifts);
    return sortGifts.map(
      x =>
        (this.giftYrInGift(this.props.yr, x) || !this.props.yr) && (
          <GiftView gift={x.gift} giftYear={x.giftYear} />
        )
    );
    //  return reqGifts;
  };

  render() {
    const { data, yr } = this.props;
    return (
      <div>
        <div
          style={{
            padding: "10px",
            border: "3px solid #ccc",
            backgroundColor: "#edf4da",
            margin: "4px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                fontVariant: "small-caps",
                marginRight: "20px"
              }}
            >
              Gift Request:
            </div>
            <div
              style={{
                //fontVariant: "small-caps",
                margin: "20px",
                padding: "8px",
                color: "#8fad35"
              }}
            >
              {R.prop("requestNotes", data)}
            </div>
          </div>

          {this.sortGifts(data.requestGifts)}
        </div>
      </div>
    );
  }
}

export default GiftRequestView;
