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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ fontVariant: "small-caps", marginRight: "20px" }}>
            Request:
          </div>
          <div style={{ marginRight: "40px" }}>{this.props.request}</div>
          <div style={{ fontVariant: "small-caps", marginRight: "20px" }}>
            Party(ies):
          </div>
          <div>{this.props.parties.join(", ")}</div>
        </div>
        <hr />
      </div>
    );
  }
}

const getRequestProperty = (gifts, currentGiftRequest, property) => {
  console.log("currentGiftRequest " + currentGiftRequest);
  const temp = R.find(x => x.id === currentGiftRequest, gifts);
  console.table(temp);
  return R.prop(property, R.find(x => x.id === currentGiftRequest, gifts));
};
/*
const getRequest = (gifts, currentGiftRequest) => {
  console.log("currentGiftRequest " + currentGiftRequest);

  return R.prop("geParties", R.find(x => x.id === currentGiftRequest, gifts));
};
*/

const mapStateToProps = (state, ownProps) => ({
  request: state.giftLog.gifts
    ? getRequestProperty(
        state.giftLog.gifts,
        state.giftLog.currentGiftRequest,
        "request"
      )
    : null,
  parties: state.giftLog.gifts
    ? getRequestProperty(
        state.giftLog.gifts,
        state.giftLog.currentGiftRequest,
        "party"
      )
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
