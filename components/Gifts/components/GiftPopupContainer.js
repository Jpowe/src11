import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
//import { saveFormGift2, loadConfigs, setVar } from "../../actions";

import { typography } from "material-ui/styles";

class GiftPopupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <span style={{ fontVariant: "small-caps", marginRight: "20px" }}>
            Request:{" "}
          </span>
          <span>{this.props.request}</span>
          <hr />
        </div>
      </div>
    );
  }
}

const getRequest = (gifts, currentGiftRequest) => {
  console.log("currentGiftRequest " + currentGiftRequest);
  return R.prop("request", R.find(x => x.id === currentGiftRequest, gifts));
};
const mapStateToProps = (state, ownProps) => ({
  request: state.giftLog.gifts
    ? getRequest(state.giftLog.gifts, state.giftLog.currentGiftRequest)
    : null
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  /*
  saveForm: obj => {
    dispatch(saveFormGift2(obj));
  },
  loadConfigs: () => {
    dispatch(loadConfigs());
  },
  setVar: () => {
    console.log("FCGE setVar");
    dispatch(setVar("currentGiftEvent", null));
  }
  */
});

const GiftPopupContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftPopupContainer);

export default GiftPopupContainer2;
