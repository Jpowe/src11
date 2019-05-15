import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { addNew, onTypeGift, setSearchID } from "../actions";
import PivotGifts from "./PivotGifts";

class PivotContainerGifts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onselect = id => {
    this.props.bubbleSelect();
    this.props.onselected(id);
  };
  render() {
    return (
      <div>
        {this.props.gifts ? (
          <PivotGifts
            gifts={this.props.gifts}
            onType={this.props.onType}
            onselected={this.onselect}
            selection={this.props.selection}
          />
        ) : (
          <div>no gifts yet</div>
        )}
      </div>
    );
  }
}

const convertGifts = (obj, gifts) => {
  const a = R.map(x => x.id, R.path(["giftHistory"], obj));
  return R.filter(x => R.contains(x.id, a), gifts);
};

const mapStateToProps = (state, ownProps) => ({
  selection: state.glogInput.searchID ? state.glogInput.searchID : null,
  data: state.glogInput.selectedRow
    ? state.glogInput[state.glogInput.node]
    : state.glogInput[state.glogInput.node][0],

  gifts: convertGifts(
    R.find(
      x => x.id == state.glogInput.selectedRow,
      state.glogInput.giftEventInstances
    ),
    state.glogInput.gifts
  )
    ? convertGifts(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.gifts
      )
    : null,

  node: state.glogInput.node ? state.glogInput.node : null,
  //  showSubSelect:state.glogInput.node === "people"
  showSubSelect: R.contains(state.glogInput.node, ["people", "orgs", "animals"])
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onNew: payload => {
    dispatch(addNew(payload));
  },
  onType: (payload, giftID) => {
    dispatch(onTypeGift(payload, giftID));
  },
  onselected: id => {
    dispatch(setSearchID(id));
    //  dispatch(setSelectedRow(id));
  }
});

const PivotContainerGifts2 = connect(mapStateToProps, mapDispatchToProps)(
  PivotContainerGifts
);

export default PivotContainerGifts2;
