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

  render() {
    const { data } = this.props;
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
          {data.requestGifts.map(x => (
            <GiftView gift={x.gift} giftYear={x.giftYear} />
          ))}
        </div>
      </div>
    );
  }
}

export default GiftRequestView;
