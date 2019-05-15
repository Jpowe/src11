import React from "react";
import * as R from "ramda";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TableContainerMain from "./Grid/TableContainerMain";
import { connect } from "react-redux";
import RecipientsContainer from "./RecipientsContainer";
import GiftsContainer from "./GiftsContainer";
import RequestsContainer from "./RequestsContainer";

class DialogModal extends React.Component {
  state = {
    open: false
  };
  componentWillReceiveProps(nextProps) {
    nextProps.open && this.handleOpen();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    console.log("Dialog handleClose");
    this.setState({ open: false });
    this.props.handleClick();
  };

  renderContainer = () => {
    console.log(
      "renderContainer scrn,node  " + [this.props.scrn, this.props.node]
    );
    if (this.props.scrn == "table") {
      console.log("renderTable");
      return <TableContainerMain />;
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
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.open}
          autoDetectWindowHeight={false}
          autoScrollBodyContent
          contentStyle={{
            width: "90%",
            maxWidth: "none"
          }}
        >
          {this.renderContainer()}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  node: state.glogInput.node ? state.glogInput.node : null
});

const DialogModal2 = connect(mapStateToProps)(DialogModal);

export default DialogModal2;
