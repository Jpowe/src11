import React, { Component } from "react";
import * as R from "ramda";

class GiftView extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  renderItems(data) {
    console.log("renderItems");
    return;
  }
  get = (obj, key) => {
    console.table(obj);
    try {
      return R.prop(key, obj);
    } catch (e) {
      console.log("CATCH " + e.message);
    }
  };
  showValue = val => {
    return val ? `$${val}` : null;
  };

  render() {
    const { gift, giftYear } = this.props;
    return (
      <div>
        <div
          style={{
            padding: "10px",
            border: "3px solid #ccc",
            backgroundColor: "#daedf4",
            marginLeft: "150px",
            marginRight: "100px",
            marginBottom: "4px",
            color: "#53acca",
            width: "50%"
          }}
        >
          <div
            style={{
              textDecoration: "underline",
              fontVariant: "small-caps",
              marginRight: "20px"
            }}
          >
            Gift :
          </div>
          <div style={{ margin: "5px" }}>{this.get(gift, "description")}</div>
          <div style={{ margin: "5px" }}> {giftYear}</div>
          <div style={{ margin: "5px" }}>
            {this.showValue(this.get(gift, "value"))}
          </div>
        </div>
      </div>
    );
  }
}

export default GiftView;
