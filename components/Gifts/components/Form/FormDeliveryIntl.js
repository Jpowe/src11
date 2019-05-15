import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import uuidv4 from "uuid/v4";
import FieldText from "./FieldText";
import RaisedButton from "material-ui/RaisedButton";
const fieldsIntl = [
  { name: "streetAddress1", title: "Street address 1", value: 0 },
  { name: "streetAddress2", title: "Street address 2", value: 1 },
  { name: "streetAddress3", title: "Street address 3", value: 2 },
  { name: "streetAddress4", title: "Street address 4", value: 3 }
];

export default class FormDeliveryIntl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  formatAddy() {
    return {
      id: uuidv4(),
      streetAddress1: this.state.streetAddress1,
      streetAddress2: this.state.streetAddress2,
      streetAddress3: this.state.streetAddress3,
      streetAddress4: this.state.streetAddress4
    };
  }
  getValue = z => {
    let field = R.prop("name", z);
    if (this.props.data) {
      return R.prop(field, this.props.data);
    }
  };
  showFieldsIntl = () => {
    return R.map(
      x => <FieldText obj={x} data={this.getValue(x)} change={this.change} />,
      fieldsIntl
    );
  };
  change = (val, name) => {
    console.log("FDI change : " + [val, name]);
    this.setState({ [name]: val });
    //  this.setState({ data: { ...this.props.data, [name]: val } });
    //this.props.onSave({ ...this.props.data, [name]: val });
    //this.setState({ saveEnabled: true });
  };
  onselect() {
    this.props.onselect(this.formatAddy());
  }
  render() {
    return (
      <Paper zDepth={2}>
        <div style={{ width: "500px", margin: "20px" }}>
          {this.showFieldsIntl()}
          <RaisedButton
            label="SAVE ADDRESS"
            primary={true}
            labelColor={"#fff"}
            style={{
              marginTop: "15px",
              marginRight: "20px"
            }}
            onClick={() => this.onselect()}
          />
        </div>
      </Paper>
    );
  }
}
