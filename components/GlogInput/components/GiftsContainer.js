import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  setNode,
  addSearch,
  addSearch2,
  addNew,
  onTypeGift,
  updateGRG
} from "../actions";
import GiftsForm from "./GiftsForm";

class GiftsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>GIFT HISTORY</div>
        {this.props.requests ? (
          <GiftsForm
            requests={this.props.requests}
            onNew={() => this.props.onNew(this.props.node)}
            onType={this.props.onType}
            bubbleUp={this.props.addSearch2}
            action={this.props.action}
            searchID={this.props.searchID}
            data={{ status: null }}
            configPersonalAssts={this.props.configPersonalAssts}
            updateGRG={this.props.updateGRG}
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}
/*
const getGiftYear = (giftEvents, geiID, giftID = null) => {
  if (giftID == 0.1) {
    return;
  }
  const gei = R.find(x => x.id === geiID, giftEvents);
  const requestGifts = R.flatten(
    R.map(x => x.requestGifts, R.prop("eventGiftRequests", gei))
  );
  console.table(requestGifts);
  const addKeyValue = obj => {
    return { ...obj.gift, giftYear: R.prop("giftYear", obj) };
  };
  const newList = R.map(x => addKeyValue(x), requestGifts);
  console.table(newList);
  console.log(R.prop("giftYear", R.find(x => x.uuid === giftID, newList)));
  return R.prop("giftYear", R.find(x => x.uuid === giftID, newList));
};
*/

const mapStateToProps = (state, ownProps) => ({
  requests: state.glogInput.requests ? state.glogInput.requests : null,
  node: state.glogInput.node ? state.glogInput.node : null,
  searchID: state.glogInput.searchID ? state.glogInput.searchID : null,
  action: state.glogInput.action ? state.glogInput.action : null,
  configPersonalAssts: state.glogInput.personalAssistants
    ? state.glogInput.personalAssistants
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setNode: x => {
    dispatch(setNode(x));
  },
  addSearch: () => {
    dispatch(addSearch());
  },
  onNew: () => {
    dispatch(addNew());
  },
  onType: payload => {
    dispatch(onTypeGift(payload));
  },
  addSearch2: () => {
    dispatch(addSearch2());
  },
  updateGRG: (x, payload) => {
    console.log("GC udateGRG");
    dispatch(updateGRG(x, payload));
  }
});

const GiftsContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftsContainer);

export default GiftsContainer2;
