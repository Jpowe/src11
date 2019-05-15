import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
//import { saveFormGift2, loadConfigs, setVar } from "../../actions";
import { getCurrentRequest } from "../reducers";
import {
  fieldsGift,
  fieldsGiftOrder,
  fieldsGiftDelivery
} from "../common/data";

import HistoryPart from "./HistoryPart";
import { typography } from "material-ui/styles";

/* to do   add array of configs from a parent wrapper */
class HistoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //  this.props.loadData();
  }
  /* input keys; output key values */
  getValues = data => {
    console.table([R.pick(R.map(x => x.name, fieldsGift), data)]);
    return [R.pick(R.map(x => x.name, fieldsGift), data)];
  };
  getValues2 = data => {
    console.table([R.pick(R.map(x => x.name, fieldsGiftOrder), data)]);
    return [R.pick(R.map(x => x.name, fieldsGiftOrder), data)];
  };
  getValues3 = data => {
    console.table([R.pick(R.map(x => x.name, fieldsGiftDelivery), data)]);
    return [R.pick(R.map(x => x.name, fieldsGiftDelivery), data)];
  };

  getHeaderText = data => {
    console.log(JSON.stringify(R.map(x => x.title, data)));
    let titles = R.map(x => x.title, data);
    titles = ["Year", ...titles];
    return titles;
  };
  parseGift = reqGifts => {
    let data = R.filter(x => x.giftYear !== "2019", reqGifts);
    const f = obj => {
      const newObj = { year: obj.giftYear, ...obj.gift };
      return newObj;
    };
    data = R.map(f, data);
    const arr = R.map(x => x.name, fieldsGift);
    const selectFields = x => {
      return { year: x.year, ...R.pick(arr, x) };
    };
    data = R.map(selectFields, data);
    return data;
  };
  parseOrder = reqGifts => {
    let data = R.filter(x => x.giftYear !== "2019", reqGifts);
    const f = obj => {
      const newObj = {
        year: obj.giftYear,
        vendor: R.path(["giftVendor", "organization", "name"], obj.gift),
        ...R.omit(["organization"], R.prop("giftVendor", obj.gift))
      };
      return newObj;
    };
    data = R.map(f, data);
    console.table(data);
    const arr = R.map(x => x.name, fieldsGiftOrder);
    const selectFields = x => {
      return { year: x.year, ...R.pick(arr, x) };
    };
    data = R.map(selectFields, data);
    return data;
  };
  parseDelivery = reqGifts => {
    try {
      let data = R.filter(x => x.giftYear !== "2019", reqGifts);
      console.table(data);
      const f = obj => {
        const loc = R.path(
          ["location", "formattedAddress"],
          R.prop("delivery", obj.gift)
        ).toString();
        const newObj = {
          year: obj.giftYear,
          location: loc,
          ...R.omit(["location"], R.prop("delivery", obj.gift))
        };
        return newObj;
      };
      data = R.map(f, data);
      console.table(data);
      const arr = R.map(x => x.name, fieldsGiftDelivery);
      const selectFields = x => {
        return { year: x.year, ...R.pick(arr, x) };
      };
      data = R.map(selectFields, data);
      return data;
    } catch (e) {
      console.log("CATCH " + e.message);
    }
  };
  render() {
    return (
      <div>
        {this.props.requestGifts ? (
          <div
            style={{
              height: "450px",
              padding: "4px"
              //alignItems: "flex-end"
              //  border: "4px solid #6076A9"
              //  backgroundColor: "#f4dfb7"
            }}
          >
            <hr />
            <div
              style={{
                fontSize: 20,
                fontWeight: typography.fontWeightBold,
                marginTop: "30px",
                textDecoration: "underline"
              }}
            >
              HISTORY:
            </div>
            {this.parseGift(this.props.requestGifts) && (
              <HistoryPart
                title="GIFTS"
                data={this.parseGift(this.props.requestGifts)}
                headers={this.getHeaderText(fieldsGift)}
              />
            )}
            {this.parseOrder(this.props.requestGifts) && (
              <HistoryPart
                title="ORDERS"
                data={this.parseOrder(this.props.requestGifts)}
                headers={this.getHeaderText(fieldsGiftOrder)}
              />
            )}
            {this.parseDelivery(this.props.requestGifts) && (
              <HistoryPart
                title="DELIVERIES"
                data={this.parseDelivery(this.props.requestGifts)}
                headers={this.getHeaderText(fieldsGiftDelivery)}
              />
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  requestGifts: getCurrentRequest(state)
    ? R.prop("requestGifts", getCurrentRequest(state))
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

const HistoryContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryContainer);

export default HistoryContainer2;
