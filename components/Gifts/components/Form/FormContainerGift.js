import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { saveFormGift2, loadConfigs, setVar } from "../../actions";
import { getCurrentGift } from "../../reducers";

import Form from "./Form";
import {
  fieldsGift,
  registryStatuses,
  activeStatuses
} from "../../common/data";

/* to do   add array of configs from a parent wrapper */
class FormContainerGift extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.loadConfigs();
  }
  componentDidMount() {
    console.log(this.props.gift);
    /*  THIS WHERE CURRENT GIFT AUTOMATICALLY CREATED */
    if (!R.prop("uuid", this.props.gift)) {
      console.log("!props.gift");
      this.props.saveForm({}, true);
    }
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
      R.map(x => x.name, fieldsGift)
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
    newObj = this.convertBools(newObj, fieldsGift);
    console.table(newObj);
    const fieldsGE = R.map(x => x.name, fieldsGift);
    console.log(JSON.stringify(fieldsGE));
    newObj = R.pick(fieldsGE, newObj);
    console.log(newObj.value);
    if (newObj.value && isNaN(newObj.value)) {
      newObj = {
        ...newObj,
        value: Number(R.tail(newObj.value.split("")).join(""))
      };
    }

    console.table(newObj);
    this.props.saveForm(newObj, false);
  };

  render() {
    return (
      <div>
        {this.props.currentGiftRequest && (
          <Form
            fields={this.addOptions(fieldsGift)}
            data={this.props.gift ? this.props.gift : null}
            onSave={this.save}
            giftEventTypes={this.props.giftEventTypes}
            formGiftEvent={false}
            onNew={this.props.setVar}
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

const mapStateToProps = (state, ownProps) => ({
  gift: getCurrentGift(state) ? getCurrentGift(state) : null,
  currentGiftRequest: state.giftLog.currentGiftRequest
    ? state.giftLog.currentGiftRequest
    : [],
  personalAssistants: state.giftLog.personalAssistants
    ? state.giftLog.personalAssistants
    : null
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: (obj, create) => {
    dispatch(saveFormGift2(obj, create));
  },
  loadConfigs: () => {
    dispatch(loadConfigs());
  },
  setVar: () => {
    console.log("FCGE setVar");
    dispatch(setVar("currentGiftEvent", null));
  }
});

const FormContainerGift2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainerGift);

export default FormContainerGift2;
