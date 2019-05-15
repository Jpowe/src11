import React, { Component } from "react";
import "./App.css";
import Done from "material-ui/svg-icons/action/done";
import { white } from "material-ui/styles/colors";
import { convertTimestamp } from "../utils/utils.js";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //one: true,
    };
  }

  render() {
    const { onclick } = this.props;
    return (
      <div style={this.props.styl} onClick={onclick}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "lighter",
            alignItems: "center"
          }}
        >
          <h4>{this.props.item.title}</h4> <Done color={white} />
        </div>
        <div style={{ fontSize: 14, fontWeight: "lighter" }}>
          {this.props.item.message}
        </div>
        <div
          style={{
            paddingTop: "10px",
            fontSize: 12,
            fontWeight: "lighter",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div style={{ paddingTop: "4px", fontSize: 12 }}>
            {convertTimestamp(this.props.item.createdTimestamp)}
          </div>
          <div style={{ paddingRight: "4px" }}>{this.props.item.channel}</div>
        </div>
      </div>
    );
  }
}

export default Item;
