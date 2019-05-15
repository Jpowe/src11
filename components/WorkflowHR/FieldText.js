import React, { Component } from "react";
import * as R from "ramda";
import TextField from "material-ui/TextField";
import {
  validate,
  isNumber,
  emailPattern,
  dateFormat,
  formatPhone,
  formatSSN,
  formatCurrency
} from "./utils/utils";

class FieldText extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.inputData };
  }
  componentDidMount() {
    this.state = { data: this.props.inputData };
  }

  componentWillReceiveProps(nextProps) {
    console.log(" FIELD TEXT CWRP " + nextProps.selection);
    console.log("CWRP nextprops.data " + nextProps.inputData);

    this.setState({ data: nextProps.inputData });
  }

  format = (value, type) => {
    console.log("format " + [value, type]);
    if (!value) {
      return "";
    }
    switch (type) {
      case "phone":
        return formatPhone(value);
      case "ssn":
        return formatSSN(value);
      case "currency":
        console.log("here" + formatCurrency(value));
        return formatCurrency(value);
      default:
        return value;
    }
  };
  unFormat = str => {
    return str.replace(/[^\d]/g, "");
  };
  getValue = z => {
    //  return R.prop(z, this.props.data);
  };
  //unFormat = str =>}

  handleChange = event => {
    this.setState({ data: event.target.value });
    console.log("handleChange " + [event.target.value, event.target.name]);
    console.log("this.props.type " + this.props.type);
    let val = event.target.value;
    if (this.props.type === "currency") {
      val = this.unFormat(val);
    }
    this.props.change(val, event.target.name);
  };
  formatLabel = (str, required) => {
    return required ? str + "*" : str;
  };
  render() {
    const { obj, data } = this.props;
    return (
      <TextField
        floatingLabelFixed={true}
        id={obj.name}
        value={this.format(this.state.data, this.props.type)}
        //  hintText={obj.title}
        floatingLabelText={this.formatLabel(obj.title, obj.required)}
        errorText={validate(this.state.data, this.props.type)}
        fullWidth={true}
        multiLine={false}
        onChange={this.handleChange}
        name={obj.name}
        style={{
          minWidth: "250px",
          fontSize: "20px",
          marginLeft: "20px",
          height: "100px"
        }}
        floatingLabelStyle={{
          color: "#222",
          fontSize: "24px",
          fontWeight: "bold"
        }}
      />
    );
  }
}

export default FieldText;
