import React, { Component } from "react";
import * as R from "ramda";
import TextField from "material-ui/TextField";
import {
  isNumber,
  emailPattern,
  dateFormat,
  formatPhone,
  formatDate,
  formatCurrency
} from "../utils/utils";
import { debounce } from "throttle-debounce";

class FieldText extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
    //this.handleChange = debounce(500, this.handleChange);
    this.change = debounce(1000, this.bubbleUp);
  }
  componentDidMount() {
    this.state = { data: this.props.data };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data === nextProps.data) {
      return;
    }
    this.setState({ data: nextProps.data });
  }

  getValue = z => {
    //  return R.prop(z, this.props.data);
  };
  bubbleUp = (value, name) => {
    this.props.change(value, name);
  };
  format = (value, type) => {
    //  console.log("format " + [value, type]);
    if (!value) {
      return "";
    }
    switch (type) {
      case "phone":
        return formatPhone(value);
      case "date":
        return formatDate(value);
      case "currency":
        return formatCurrency(value);
      default:
        return value;
    }
  };
  validate = (value, type) => {
    console.log("validate switch : " + [type, value]);
    if (!value) {
      return true;
    }
    switch (type) {
      case "phone":
        //return value.replace(/[-,(,)]/g, "").length != 10;
        return value.replace(/[.,(,)]/g, "").length != 10;
        break;
      case "email":
        return !emailPattern.test(value);
        break;
      case "date":
        return !dateFormat.test(value);
      case "status":
        console.log("status ");
        console.log(
          JSON.stringify(
            !R.contains(
              value,
              R.map(x => R.prop("status", x), this.props.statuses)
            )
          )
        );
        return !R.contains(
          value,
          R.map(x => R.prop("status", x), this.props.statuses)
        );
      default:
        return false;
    }
  };
  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    console.log("value,name " + [value, name]);
    this.setState({ data: value });
    this.change(value, name);
  };
  render() {
    const { obj, data } = this.props;

    return (
      <div style={{ padding: "2px" }}>
        <TextField
          value={this.format(this.state.data, this.props.type)}
          hintText={R.prop("title", obj)}
          //defaultValue={`Enter ${R.prop("title", obj)}`}
          errorText={this.validate(this.state.data, this.props.type)}
          floatingLabelText={R.prop("title", obj)}
          fullWidth={false}
          multiLine={false}
          onChange={this.handleChange}
          name={R.prop("name", obj)}
          style={{ width: "250px", fontSize: "20px" }}
          floatingLabelStyle={{ color: "#DF5C33" }}
          underlineShow={true}
          //floatingLabelFocusStyle={{ color: "#ff0000" }}
        />
      </div>
    );
  }
}

export default FieldText;
