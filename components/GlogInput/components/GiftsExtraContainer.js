import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { setNode, addSearch, addSearch2, addNew, onTypeGift } from "../actions";
import GiftsExtraForm from "./GiftsExtraForm";

class GiftsExtraContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.giftEventInstance ? (
          <GiftsExtraForm
            giftYear={this.props.giftYear}
            bubbleUp={this.props.bubbleUp}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const getGiftYear = (gei, giftID = null) => {
  console.table(gei);
  if (giftID == 0.1) {
    return 0;
  }
  /*
  if (!!!R.prop("eventGiftRequests", gei)) {
    return 11;
  }
  */
  const requestGifts = R.flatten(
    R.map(x => x.requestGifts, R.prop("eventGiftRequests", gei))
  );
  console.table(requestGifts);
  const addKeyValue = obj => {
    let newObj = { giftYear: 1, ...obj };
    if (!!R.prop("giftYear", newObj)) {
      return {
        ...newObj.gift,
        giftYear: R.prop("giftYear", newObj)
      };
    } else {
      return null;
    }
  };
  const newList = R.map(x => addKeyValue(x), requestGifts);
  console.table(newList);
  if (!!newList) {
    return R.prop("giftYear", R.find(x => x.uuid === giftID, newList))
      ? R.prop("giftYear", R.find(x => x.uuid === giftID, newList))
      : null;
  }
};
/*const mapStateToProps = (state, ownProps) => ({
  giftEventInstance: state.glogInput.selectedRow
    ? R.find(
        x => x.id === state.glogInput.selectedRow,
        state.glogInput.giftEventInstances
      )
    : null,
  giftYear: state.glogInput.selectedRow
    ? getGiftYear(
        R.find(
          x => x.id === state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.searchID
      )
    : null
});
*/
const returnGiftYr = objGift => {
  console.log("GiftExtraCOntainer returnGiftYr f");
  console.table(objGift);
  if (!objGift) {
    return;
  }

  const r = R.prop("requests", objGift);
  if (!r.length) {
    return;
  }
  return R.prop("giftYear", r[0]);
  /*
  R.prop(
      "giftYear",
      R.find(x => x.id === state.glogInput.searchID, state.glogInput.gifts)
    )
  */
};
const mapStateToProps = (state, ownProps) => ({
  giftEventInstance: state.glogInput.selectedRow
    ? R.find(
        x => x.id === state.glogInput.selectedRow,
        state.glogInput.giftEventInstances
      )
    : null,
  giftYear: state.glogInput.searchID
    ? returnGiftYr(
        R.find(x => x.id === state.glogInput.searchID, state.glogInput.gifts)
      )
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
  }
});

const GiftsExtraContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftsExtraContainer);

export default GiftsExtraContainer2;
