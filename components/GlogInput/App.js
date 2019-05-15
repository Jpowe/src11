import React, { Component } from "react";

import Dialog from "./components/Dialog";
import SummaryContainer from "./components/SummaryContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      screen: null
    };
  }
  componentDidMount() {}
  handleclick = () => {
    console.log("App handleclick  ");

    this.setState({ open: !this.state.open, screen: "main" });
  };
  /*for main table */
  handleclick2 = () => {
    console.log("App handleclick2");
    this.setState({ open: !this.state.open, screen: "table" });
  };
  render() {
    return (
      <div>
        <div style={{ padding: "20px" }}>
          <SummaryContainer
            onclick={this.handleclick}
            onDialog={this.handleclick2}
          />
        </div>

        <Dialog
          open={this.state.open}
          scrn={this.state.screen}
          handleClick={this.handleclick}
        />
      </div>
    );
  }
}

export default App;
