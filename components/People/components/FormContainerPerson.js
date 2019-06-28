import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { saveFormPerson, loadConfigs, setVar } from "../actions";
import { getSelectedPerson } from "../../GiftLog/reducers";

import Form from "../../GiftLog/components/Form/Form";
import {
  fieldsPerson,
  registryStatuses,
  activeStatuses,
  recurringStatuses
} from "../../GiftLog/common/data";

/* to do   add array of configs from a parent wrapper */
class FormContainerPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.loadConfigs();
    console.log("FORMAT CONTAINER PERSON");
  }
  componentDidMount() {
    //  this.props.loadData();
  }
  addOptions(rows) {
    let rows2;
    const allOptions = [
      { name: "registryStatus", options: registryStatuses },
      { name: "active", options: activeStatuses },
      { name: "recurring", options: recurringStatuses }
    ];
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
  /*
  addToForm = formObj => {
    console.log("addToForm f " + JSON.stringify(formObj));
    let newObj;
    console.table(R.keys(formObj));
    let kys = R.keys(formObj);
    let missingKys = R.filter(
      x => !R.contains(x, kys),
      R.map(x => x.name, fieldsGiftEvent)
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
    { name: "recurring", value: recurringStatuses },
    { name: "registryStatus", value: registryStatuses },
    { name: "active", value: activeStatuses }
  ];
  */
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
    console.log("FCP save f");
    console.table(obj);
    let newObj;
    // newObj = this.addToForm(obj);
    //  newObj = this.convertBools(newObj, fieldsPerson);
    //  console.table(newObj);
    const fieldsP = R.map(x => x.name, fieldsPerson);
    console.log(JSON.stringify(fieldsP));
    newObj = R.pick(fieldsP, obj);
    console.table(newObj);
    this.props.saveForm(newObj);
  };
  showNew = () => {
    console.log("FCGE show new");
    console.log(R.isEmpty(this.props.giftEvent));
    return R.isEmpty(this.props.giftEvent) ? false : true;
  };
  formatDate = (obj, fields) => {
    console.log("changeDate f");
    console.table(obj);
    let newDate, d;
    let emptyObj = this.emptyVals(fields);

    try {
      d = obj.birthDate.replace(/\//g, "");
      console.log(d);
    } catch (e) {
      console.log("CATCH " + e.message);
    }
    console.log("newDate " + newDate);
    let returnObj = { ...emptyObj, ...obj, birthDate: d ? d : "" };
    //  let returnObj = { ...emptyObj, ...obj };
    console.log(JSON.stringify(returnObj));
    console.table(returnObj);
    return returnObj;
  };
  emptyVals = fields => {
    let emptyObj = {};
    const arrKeys = R.map(x => x.name, fields);
    const createObj = k => {
      return (emptyObj[k] = " ");
    };
    R.map(createObj, arrKeys);
    console.log(JSON.stringify(emptyObj));
    return emptyObj;
  };

  render() {
    const { selectedPerson } = this.props;
    return (
      <div>
        {
          <Form
            fields={fieldsPerson}
            data={this.formatDate(this.props.selectedPerson, fieldsPerson)}
            onSave={this.save}
            //  showNew={this.showNew()}
            showNew={true}
            onNew={this.props.setVar}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedPerson:
    state.giftLog.selectedPerson && state.giftLog.searchResults
      ? R.find(
          x => x.uuid === state.giftLog.selectedPerson,
          state.giftLog.searchResults
        )
      : ""
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: obj => {
    console.log(JSON.stringify(obj));
    dispatch(saveFormPerson(obj, "TBD?"));
  },
  loadConfigs: () => {
    dispatch(loadConfigs());
  },
  setVar: () => {
    console.log("FCP setVar");
    dispatch(setVar("selectedPerson", ""));
  }
});

const FormContainerPerson2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainerPerson);

export default FormContainerPerson2;
