import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { saveFormRequest } from "../../actions";
import { getCurrentRequest } from "../../reducers";

import Form from "./Form";
import {
  fieldsRequest,
  registryStatuses,
  activeStatuses
} from "../../common/data";

/* to do   add array of configs from a parent wrapper */
class FormContainerRequest extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  addOptions(rows) {
    let rows2;
    const allOptions = [
      { name: "registryStatus", options: registryStatuses },
      { name: "active", options: activeStatuses }
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
    return rows2;
  }

  addToForm = formObj => {
    console.log("addToForm f " + JSON.stringify(formObj));
    let newObj;
    console.table(R.keys(formObj));
    let kys = R.keys(formObj);
    let missingKys = R.filter(
      x => !R.contains(x, kys),
      R.map(x => x.name, fieldsRequest)
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
    console.log("FCR save f");
    console.table(obj);
    let newObj = this.addToForm(obj);
    newObj = this.convertBools(newObj, fieldsRequest);
    console.table(newObj);
    this.props.saveForm(newObj);
  };

  render() {
    return (
      <div>
        <Form
          fields={this.addOptions(fieldsRequest)}
          data={this.props.data}
          onSave={this.save}
          formGiftEvent={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: getCurrentRequest(state)
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: obj => {
    dispatch(saveFormRequest(obj));
  }
});

const FormContainerRequest2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainerRequest);

export default FormContainerRequest2;
