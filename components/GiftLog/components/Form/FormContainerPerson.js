import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { saveFormPerson, loadConfigs, setVar } from "../../actions";
import { getSelectedPerson } from "../../reducers";

import Form from "./Form";
import {
  fieldsPerson,
  registryStatuses,
  activeStatuses,
  recurringStatuses
} from "../../common/data";

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
    let newDate;

    let emptyObj = this.emptyVals(fields);
    //  if (!obj.birthDate) {
    //  return obj;
    //}
    try {
      let d = obj.birthDate;

      if (obj.birthDate.length === 8) {
        newDate = d.slice(4, 6) + d.slice(6, 8) + d.slice(0, 4);
      } else if (obj.birthDate.length === 6) {
        newDate = d.slice(2, 4) + d.slice(4, 6) + d.slice(0, 2);
      }
    } catch (e) {
      console.log("CATCH " + e.message);
    }
    let returnObj = { ...emptyObj, ...obj, birthDate: newDate };
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
            data={this.formatDate(selectedPerson, fieldsPerson)}
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
  //giftEventTypes: state.giftLog.eventTypes ? state.giftLog.eventTypes : null,
  selectedPerson: getSelectedPerson(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: obj => {
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
