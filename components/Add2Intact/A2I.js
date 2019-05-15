import React, { Component } from "react";
import R from "ramda";
import GridContainer1 from "./GridContainer1";
import GridContainer2 from "./GridContainer2";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
//import AccountDetailsContainer from "./AccountDetailsContainer";
import GridContainer3 from "./GridContainer3";

export default class A2I extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1 };
  }
  onselectGrid1 = uuid => {
    console.log("A2I onselectGrid1 change screen to 2");
    this.setState({ screen: 2 });
  };
  onselectGrid2 = () => {
    console.log("A2I onselectGrid2 change screen to 1");
    this.setState({ screen: 1 });
  };
  onshowPopup = () => {
    console.log("A2I onsshowPopup change screen to 3");
    this.setState({ popup: true });
  };

  render() {
    const { obj, status, options } = this.props;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={() => this.setState({ popup: false })}
      />
    ];
    return (
      <div>
        {this.state.screen == 1 && (
          <GridContainer1 onselected={this.onselectGrid1} />
        )}
        {this.state.screen == 2 && (
          <GridContainer2
            tab={"Portfolio 1"}
            onback={this.onselectGrid2}
            onshowPopup={this.onshowPopup}
          />
        )}
        <Dialog
          actions={actions}
          modal={false}
          onRequestClose={() => this.setState({ popup: false })}
          open={this.state.popup}
          autoDetectWindowHeight={false}
          autoScrollBodyContent
          contentStyle={{
            width: "90%",
            maxWidth: "none"
          }}
        >
          <GridContainer3 />
        </Dialog>
      </div>
    );
  }
}
