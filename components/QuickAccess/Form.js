import React, { Component } from "react";
import * as R from "ramda";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import WidgetBase from "../WidgetBase";
import List from "./List/List";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }

  render() {
    return (
      <WidgetBase title={"Quick Access"}>
        <div
          style={{
            padding: "21px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          {this.props.pageJSON.map(x => (
            <div style={{ margin: "10px" }}>
              <List title={x.title} data={x.list} />
            </div>
          ))}
        </div>
      </WidgetBase>
    );
  }
}
