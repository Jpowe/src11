import React, { Component } from "react";

export default class Butts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addChild = () => {
    console.log("addChild");
    this.setState({ data: [] });
    this.props.addChild();
  };
  addParent = () => {
    console.log("addParent");
    this.setState({ data: [] });
    this.props.addParent();
  };
  addPartner = () => {
    console.log("addPartner");
    this.setState({ data: [] });
    this.props.addPartner();
  };
  render() {
    return (
      <div style={{ display: "flex", opacity: "0.4" }}>
        <div
          style={{
            backgroundColor: "#999",
            width: "200px",
            height: "20px",
            margin: "10px"
          }}
          onClick={() => this.props.clear()}
        >
          CLEAR
        </div>
      </div>
    );
  }
}
