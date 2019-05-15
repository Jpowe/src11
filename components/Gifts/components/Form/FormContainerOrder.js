import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  saveFormOrder,
  searchOrganization,
  loadConfigs,
  setVar
} from "../../actions";
import { getCurrentOrder, getCurrentGift } from "../../reducers";

import Form from "./FormOrder";
import {
  fieldsGiftOrder,
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
      R.map(x => x.name, fieldsGiftOrder)
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

  save = obj => {
    console.log("FCGE save f");
    console.table(obj);
    let newObj = this.addToForm(obj);
    newObj = this.convertBools(newObj, fieldsGiftOrder);
    console.table(newObj);
    const fieldsGE = R.map(x => x.name, fieldsGiftOrder);
    console.log(JSON.stringify(fieldsGE));
    newObj = R.pick(fieldsGE, newObj);
    console.table(newObj);
    this.props.saveForm(
      newObj,
      this.props.giftID,
      R.prop("organizationUUID", obj)
    );
  };

  render() {
    return (
      <div>
        {this.props.order && (
          <Form
            fields={fieldsGiftOrder}
            data={this.props.order ? this.props.order : null}
            onSave={this.save}
            giftEventTypes={this.props.giftEventTypes}
            formGiftEvent={false}
            onNew={this.props.setVar}
            searchText={this.props.searchText}
            bubbleUp={this.props.onSearchText}
          />
        )}
      </div>
    );
  }
}

const numValToTitle = obj => {
  //kv
  //if obj.field contains kv, then Check
  //if value is number, convert to title
};

const objOrgToVal = order => {
  console.table(order);
  console.log("objORgtoval " + order.organization["name"]);
  try {
    return {
      ...order,
      organization: order.organization["name"],
      organizationUUID: R.prop("uuid", order.organization),
      vendor: order.organization["name"]
    };
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};

const mapStateToProps = (state, ownProps) => ({
  //gift: getCurrentGift(state) ? getCurrentGift(state) : null,
  order: getCurrentOrder(state) ? objOrgToVal(getCurrentOrder(state)) : null,
  giftID: getCurrentGift(state) ? getCurrentGift(state).uuid : null,
  currentGiftRequest: state.giftLog.currentGiftRequest
    ? state.giftLog.currentGiftRequest
    : [],
  personalAssistants: state.giftLog.personalAssistants
    ? state.giftLog.personalAssistants
    : null,
  searchText: state.giftLog.searchText
    ? state.giftLog.searchText
    : ["formVendorContainer placeholder"]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: (obj, giftID, organizationUUID = null) => {
    console.table(obj);
    dispatch(saveFormOrder(obj, giftID, organizationUUID));
  },
  loadConfigs: () => {
    dispatch(loadConfigs());
  },
  setVar: () => {
    console.log("FCGE setVar");
    dispatch(setVar("currentGiftEvent", null));
  },
  onSearchText: str => {
    console.log("FOC onSearchText");
    dispatch(searchOrganization(str));
  }
});

const FormContainerOrder2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainerOrder);

export default FormContainerOrder2;
