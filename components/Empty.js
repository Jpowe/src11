import React from "react";
//import TextField from "material-ui/TextField";

export default class Empty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div style={{ width: "240px" }} />;
  }
}
