import React, { Component } from "react";
import "../App.css";
import "./ItemRow.css";
import HighLightOff from "material-ui/svg-icons/action/highlight-off";

class ItemRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  hovering: false
    };
  }

  render() {
    return (
      <div className="itemRow">
        <div
          style={{
            lineHeight: "14px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginLeft: "20px",
            cursor: "pointer",
            width: "240px",
            height: "30px",
            paddingRight: "10px"
            //backgroundColor: "#333"
          }}
        >
          <span className="trigger">
            <span
              onClick={() => this.props.ondelete(this.props.id)}
              style={{ cursor: "pointer", marginRight: "10px" }}
            >
              <HighLightOff style={{ color: "white", paddingLeft: "20px" }} />
            </span>
          </span>
          <span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => this.props.onclick(this.props.id)}
            >
              {this.props.name}
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default ItemRow;
