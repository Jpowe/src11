import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  saveFormGift2,
  loadConfigs,
  setVar,
  addLocation,
  saveFormDelivery
} from "../../actions";
import {
  getCurrentDelivery,
  getCurrentRequestLocations,
  getCurrentGift
} from "../../reducers";

import Form from "./FormDelivery";
import {
  fieldsGiftDelivery,
  registryStatuses,
  activeStatuses
} from "../../common/data";

/* to do   add array of configs from a parent wrapper */
class FormContainerOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.loadConfigs();
  }
  componentDidMount() {
    //  this.props.loadData();
  }
  /*
  addOptions(rows) {
    let rows2;
    const allOptions = [{ name: "active", options: activeStatuses }];
    const addOptionsObj = row => {
      try {
        const selectedRow = R.find(x => x.name === row.name, allOptions);
        return { ...row, options: R.prop("options", selectedRow) };
      } catch (err) {
        console.log(err.message);
        return row;
      }
    };
    rows2 = R.map(x => addOptionsObj(x), rows);
    rows2 = rows2.map(
      x =>
        x.name === "eventType"
          ? { ...x, options: R.map(x => x.name, this.props.giftEventTypes) }
          : x
    );
    return rows2;
  }
  */
  addOptions(rows) {
    return rows.map(
      x =>
        x.name === "assignedTo"
          ? { ...x, options: this.props.personalAssistants }
          : x
    );
  }

  addToForm = formObj => {
    console.log("addToForm f " + JSON.stringify(formObj));
    let newObj;
    console.table(R.keys(formObj));
    let kys = R.keys(formObj);
    let missingKys = R.filter(
      x => !R.contains(x, kys),
      R.map(x => x.name, fieldsGiftDelivery)
    );
    newObj = formObj;
    const getVal = field => {
      if (!field) {
        return;
      }
      let q = R.find(x => x.name == field, this.kv);
      if (!q) {
        console.log("not q return");
        return;
      }
      console.table(q);
      console.table(q.value);
      console.table(q.value[0]);
      console.table(q.value[0]["title"]);
      let val = q.value[0]["title"];
      console.log("val " + val);
      return val;
    };
    const addDefaultVal = field => {
      newObj = { ...newObj, [field]: getVal(field) };
    };
    console.table(missingKys);
    R.map(x => addDefaultVal(x), missingKys);
    console.table(newObj);
    return newObj;
  };
  kv = [
    { name: "registryStatus", value: registryStatuses },
    { name: "active", value: activeStatuses }
  ];
  //
  convertBools = (obj, fields) => {
    console.log("convertBools f");
    let newObj = obj;
    const filtFields = R.filter(x => x.type == "boolean", fields);
    console.table(filtFields);
    const changeBoolsInObj = strField => {
      newObj = { ...newObj, [strField]: newObj[strField] == 2 ? false : true };
    };
    const arrFieldNames = R.map(x => changeBoolsInObj(x.name), filtFields);
    const convertRegistryStatus = obj => ({
      ...obj,
      registryStatus:
        obj["registryStatus"] == 1 || obj["registryStatus"] == "Yes"
          ? "Yes"
          : "No"
    });
    newObj = convertRegistryStatus(newObj);
    console.table(newObj);
    return newObj;
  };

  save = (giftID, placeID, payload) => {
    console.log("FCD save f");
    console.log(giftID);
    console.log(placeID);
    console.table(payload);
    console.table(this.props.delivery);
    let oldPlaceID = R.path(["location", "uuid"], this.props.delivery)
      ? R.path(["location", "uuid"], this.props.delivery)
      : R.path(["location", "value"], this.props.delivery);
    if (!placeID) {
      placeID = R.path(["location", "uuid"], this.props.delivery);
    }

    /*
        oldPlaceID = this.props.delivery.location.uuid
       if (not placeID)
        placeID = this.props.delivery.location.uuid
         
     
    */
    this.props.saveForm(
      giftID,
      placeID,
      oldPlaceID,
      R.omit(["location", "uuid"], payload)
    );
  };

  getCurrentLocations = locs => {
    console.log("getCurrentLocations");
    if (!this.props.locations) {
      return null;
    }
    if (!this.props.locations.length > 0) {
      return null;
    }
    console.log(this.props.locations.length);
    return this.props.locations[0].value;
  };

  render() {
    return (
      <div>
        <Form
          fields={fieldsGiftDelivery}
          data={this.props.delivery ? this.props.delivery : null}
          onSave={this.save}
          giftEventTypes={this.props.giftEventTypes}
          formGiftEvent={false}
          onNew={this.props.setVar}
          searchText={this.props.searchText}
          locations={this.props.locations ? this.props.locations : null}
          currentLocation={this.getCurrentLocations()}
          onAddLoc={this.props.onAddLoc}
          gift={this.props.gift ? this.props.gift : null}
          width={"600px"}
        />
      </div>
    );
  }
}

const numValToTitle = obj => {
  //kv
  //if obj.field contains kv, then Check
  //if value is number, convert to title
};

const mapStateToProps = (state, ownProps) => ({
  gift: getCurrentGift(state) ? getCurrentGift(state) : null,
  delivery: getCurrentDelivery(state) ? getCurrentDelivery(state) : null,
  locations: getCurrentRequestLocations(state)
    ? getCurrentRequestLocations(state)
    : null
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: (giftID, placeID, oldPlaceID, payload) => {
    console.table(payload);
    console.log;
    dispatch(saveFormDelivery(giftID, placeID, oldPlaceID, payload));
  },
  loadConfigs: () => {
    dispatch(loadConfigs());
  },
  setVar: () => {
    console.log("FCGE setVar");
    dispatch(setVar("currentGiftEvent", null));
  },
  onAddLoc: (obj, node, bool, gift) => {
    console.table(obj);
    console.log("node " + node);
    console.log("bool " + bool);
    console.table(gift);
    dispatch(addLocation(obj, node, bool, R.prop("uuid", gift)));
  }
});

const FormContainerOrder2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainerOrder);

export default FormContainerOrder2;
