import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { setRequestID, setNode, GEI_add_request } from "../actions";
import RequestsForm from "./RequestsForm";

class RecipientsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>GIFT REQUESTS </div>
        <RequestsForm
          onSelectRequest={this.props.setRequestID}
          onselect={this.props.setNode}
          requests={this.props.requests}
          //  onHandle={this.props.GEI_add_recip}
          node={this.props.node}
          bubbleUp={this.props.GEI_add_request}
          requestID={this.props.requestID}
          action={this.props.action}
          onLoad={this.props.onLoad}
        />
      </div>
    );
  }
}
const convertRequests = (obj, requests) => {
  const a = R.map(x => x.id, R.path(["requests"], obj));
  return R.filter(x => R.contains(x.id, a), requests);
};
const mapStateToProps = (state, ownProps) => ({
  node: state.glogInput.node ? state.glogInput.node : null,
  requests: state.glogInput.selectedRow
    ? convertRequests(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.requests
      )
    : null,
  requestID: state.glogInput.requestID,
  action: state.glogInput.action ? state.glogInput.action : null,
  onLoad: state.glogInput.searchID === 0.1
  //groups:state.glogInput.groups ?state.glogInput.groups : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setRequestID: x => {
    dispatch(setRequestID(x));
  },
  setNode: x => {
    dispatch(setNode(x));
  },
  GEI_add_request: () => {
    dispatch(GEI_add_request());
  }
});

const RecipientsContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  RecipientsContainer
);

export default RecipientsContainer2;
