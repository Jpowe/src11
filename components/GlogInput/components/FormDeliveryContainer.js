import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  updateSecondary,
  onTypeGift,
  addLocation,
  changeDeliveryLoc,
  queryGiftEvent
} from "../actions";
import FormDelivery from "./FormDelivery";
import { appLogic } from "../common/data";

class FormContainer extends Component {
  constructor(props) {
    console.log("FORMDELIVERYCONTAINER CONSTRUCT");
    super(props);
  }
  componentDidMount() {
    this.props.queryGE(this.props.gei);
  }
  getFields = tab => {
    let str = R.prop("fields", R.find(x => x.tab === tab, appLogic));
    return str;
  };

  render() {
    return (
      <div>
        <FormDelivery
          fields={this.getFields("delivery")}
          data={this.props.data ? this.props.data : []}
          onSave={this.props.onSave}
          onSaveGiftLocation={this.props.onSaveGiftLocation}
          locations={this.props.locations}
          giftID={this.props.giftID}
          onType={this.props.onType}
          onAdd={this.props.onAdd}
          gift={this.props.gift}
          deliveryAddresses={this.props.deliveryAddresses}
          changeDeliveryLoc={this.props.changeDeliveryLoc}
        />
      </div>
    );
  }
}

const getDelivery = (gifts, searchID, deliveries) => {
  console.log("getDelivery " + searchID);
  const gift = R.find(x => x.id === searchID, gifts);
  const deliveryID = R.prop("delivery", gift);
  console.log("deliveryID " + deliveryID);
  if (!deliveryID) {
    return;
  }
  console.table(R.find(x => x.id === deliveryID, deliveries));
  return R.find(x => x.id === deliveryID, deliveries);
};
/*
const getLocationsOrig = (obj, locations, gifts) => {
  const arrGifts = R.map(x => x.id, obj.giftHistory);
  const filteredGifts = R.filter(x => R.contains(x.id, arrGifts), gifts);
  const arrLocations = R.map(x => x.location, filteredGifts);
  const filteredLocations = R.filter(
    x => R.contains(x.id, arrLocations),
    locations
  );
  return filteredLocations;
};
*/
const getLocations = (obj, locations, gifts) => {
  console.log("getLcations2");
  const arrGifts = R.map(x => x.id, obj.giftHistory);
  const filteredGifts = R.filter(x => R.contains(x.id, arrGifts), gifts);
  console.table(filteredGifts);
  const getLocs = gift => {
    let counter = 0;
    const deliv = R.prop("delivery", gift);
    if (!deliv) {
      return;
    }
    const loc = R.prop("location", deliv);
    if (!loc) {
      return;
    }
    const addy = R.prop("formattedAddress", loc);
    if (!addy) {
      return;
    } else {
      console.table(addy);
    }
    const createStrAddy = arrAddy => {
      let newArr = arrAddy;
      newArr = R.filter(x => x, arrAddy);
      newArr = R.map(x => `${x} `, arrAddy);
      return newArr.toString();
    };
    return {
      name: addy[0],
      title: createStrAddy(addy),
      value: counter++
    };
  };
  let locs = R.map(x => getLocs(x), filteredGifts);
  console.table(locs);
  if (!locs[0]) {
    return;
  }
  return locs;
};
const getDeliveries = (obj, deliveries, gifts) => {
  console.log("getetDeliveries");
  const arrGifts = R.map(x => x.id, obj.giftHistory);
  const filteredGifts = R.filter(x => R.contains(x.id, arrGifts), gifts);
  console.table(filteredGifts);
  //let counter = 0;
  const getLocs = gift => {
    const deliv = R.prop("delivery", gift);
    if (!deliv) {
      return;
    }
    const addy = R.path(
      ["location", "formattedAddress"],
      R.find(x => x.id == deliv, deliveries)
    );
    if (!addy) {
      return;
    }
    const placeID = R.path(
      ["location", "uuid"],
      R.find(x => x.id == deliv, deliveries)
    );
    const createStrAddy = arrAddy => {
      let newArr = arrAddy;
      newArr = R.filter(x => x, arrAddy);
      newArr = R.map(x => ` ${x}`, arrAddy);
      return newArr.toString();
    };
    return {
      name: addy[0],
      title: createStrAddy(addy),
      value: placeID
    };
  };
  let locs = R.map(x => getLocs(x), filteredGifts);

  console.table(locs);
  locs = R.uniq(R.filter(x => x, locs));
  console.table(locs);
  if (!locs[0]) {
    return;
  }
  return locs;
};

const getValues = arrObj => {
  console.log("getValues ");
  return R.map(x => x.id, arrObj);
};

const mapStateToProps = (state, ownProps) => ({
  data:
    state.glogInput.searchID != 0.01
      ? getDelivery(
          state.glogInput.gifts,
          state.glogInput.searchID,
          state.glogInput.deliveries
        )
      : null,

  giftID: R.prop(
    "id",
    R.find(x => x.id === state.glogInput.searchID, state.glogInput.gifts)
  ),
  gift: R.find(x => x.id === state.glogInput.searchID, state.glogInput.gifts),
  locations: getLocations(
    R.find(
      x => x.id == state.glogInput.selectedRow,
      state.glogInput.giftEventInstances
    ),
    state.glogInput.locations,
    state.glogInput.gifts
  ),
  deliveryAddresses: getDeliveries(
    R.find(
      x => x.id == state.glogInput.selectedRow,
      state.glogInput.giftEventInstances
    ),
    state.glogInput.deliveries,
    state.glogInput.gifts
  ),
  gei: state.glogInput.searchID

  //title: this.props.data ? "Data for item selected" : "Select item"
});
const test = (msg, obj) => {
  console.log(msg);
  console.table(obj);
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: obj => {
    test("FDC onSave", obj);
    dispatch(updateSecondary(obj, "deliveries"));
  },
  onSaveGiftLocation: obj => {
    test("FDC onSaveGiftLocation", obj);
    dispatch(updateSecondary(obj, "gifts"));
  },
  onType: (payload, giftID) => {
    test("FDC ontype", payload);
    dispatch(onTypeGift(payload, giftID));
  },
  onAdd: (payload, node, bool) => {
    test("FDC onADD", payload);
    dispatch(addLocation(payload, node, bool));
  },
  changeDeliveryLoc: id => {
    console.log("FDC changeDelLOC");
    dispatch(changeDeliveryLoc(id));
  },
  queryGE: id => {
    console.log("FRC queryGE " + id);
    dispatch(queryGiftEvent(id));
  }
});

const FormContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);

export default FormContainer2;
