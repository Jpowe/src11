import React, { Component } from "react";
import "./Block.css";
import Attach from "material-ui/svg-icons/editor/attach-file";
import Expand from "material-ui/svg-icons/navigation/unfold-more";

export default class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  bubble = () => {
    this.props.onclick(this.props.uuid);
  };

  render() {
    const {
      top,
      left,
      color,
      className,
      data,
      uuid,
      highlight,
      personPartyType
    } = this.props;
    const style = { top, left, backgroundColor: color, borderRadius: "10px" };
    const orange = "#f58c32";

    return (
      <div>
        {!highlight && (
          <div
            className={`block ${className}`}
            style={{
              ...style,
              backgroundColor: style.backgroundColor,
              display: "flex",
              alignContent: "stretch"
            }}
          >
            <div
              style={{
                padding: "5px",
                width: "5%",
                //  backgroundColor: " orange",
                borderRadius: "10px"
              }}
              onClick={() => this.props.expand(uuid)}
            >
              {personPartyType && (
                <div>
                  <Expand />
                </div>
              )}
            </div>
            <div
              style={{
                padding: "5px",
                width: "5%",
                borderRadius: "10px"
              }}
              onClick={() => this.props.attach(uuid)}
            >
              {personPartyType && (
                <div>
                  <Attach />
                </div>
              )}
            </div>
            <div
              onClick={this.bubble}
              style={{
                width: "80%"
              }}
            >
              {data}
            </div>
          </div>
        )}

        {highlight && (
          <div
            className={`block ${className}`}
            style={{
              ...style,
              backgroundColor: highlight ? orange : style.backgroundColor,
              display: "flex"
            }}
            onClick={this.bubble}
          >
            <div
              style={{
                padding: "5px",
                width: "5%",
                //  backgroundColor: " orange",
                borderRadius: "10px"
              }}
              onClick={() => this.props.expand(uuid)}
            >
              {personPartyType && (
                <div>
                  <Expand />
                </div>
              )}
            </div>
            <div style={{ width: "80%" }}>
              <strong>{data}</strong>
            </div>
            <div style={{ padding: "10px", width: "6px" }} />
          </div>
        )}
      </div>
    );
  }
}
