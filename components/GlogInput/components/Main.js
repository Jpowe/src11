import React, { Component } from "react";
import * as R from "ramda";
import FlatButton from "material-ui/FlatButton";
import FieldDropDown from "./FieldDropDown";
//import Dialog from "./components/Dialog";
import Dialog from "material-ui/Dialog";
import SummaryContainer from "./SummaryContainer";

import { connect } from "react-redux";
import TableContainerMain from "./Grid/TableContainerMain";
import RecipientsContainer from "./RecipientsContainer";
import GiftsContainer from "./GiftsContainer";
import RequestsContainer from "./RequestsContainer";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      screen: "table"
    };
  }
  componentDidMount() {}
  handleclick = () => {
    console.log("Main handleclick  ");

    this.setState({ open: !this.state.open, screen: "main" });
  };
  handleclick2 = () => {
    console.log("Main handleclick2");
    this.setState({ open: !this.state.open, screen: "table" });
  };
  closeDialog = () => {
    console.log("MAIN closeDialog");
    this.setState({ open: false });
  };
  renderContainer = () => {
    console.log("renderContainer  node  " + this.props.node);
    if (this.state.screen == "table") {
      console.log("renderTable");
      return (
        <div>
          <TableContainerMain bubbleUp={this.closeDialog} />
        </div>
      );
    } else if (
      R.contains(this.props.node, ["people", "orgs", "animals", "groups"])
    ) {
      console.log("render Recip contain");
      return <RecipientsContainer />;
    } else if (this.props.node === "requests") {
      console.log("render req contain");
      return <RequestsContainer />;
    } else if (this.props.node === "gifts") {
      console.log("render gifts contain");
      return <GiftsContainer />;
    }
  };
  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={() => this.setState({ open: false })}
      />
    ];

    return (
      <div>
        <div style={{ padding: "20px" }}>
          <SummaryContainer
            onclick={this.handleclick}
            onDialog={this.handleclick2}
          />
        </div>

        <Dialog
          actions={actions}
          modal={false}
          onRequestClose={() => this.setState({ open: false })}
          open={this.state.open}
          autoDetectWindowHeight={false}
          autoScrollBodyContent
          contentStyle={{
            width: "90%",
            maxWidth: "none",
            position: "absolute",
            top: "20px"
          }}
        >
          {this.renderContainer()}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  node: state.glogInput.node ? state.glogInput.node : "people"
});

const Main2 = connect(mapStateToProps)(Main);

export default Main2;
