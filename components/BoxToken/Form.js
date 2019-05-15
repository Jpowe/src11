import React, { Component } from "react";
import * as R from "ramda";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import WidgetBase from "../WidgetBase";
import { Log } from "../../utils/utils";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "textID", label: "Box client ID", message: null, value: null },
        {
          name: "textSecret",
          label: "Box client secret",
          message: null,
          value: null
        },
        { name: "textLogin", label: "Box login", message: null, value: null }
      ]
    };
  }
  componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }

  fieldsValid = () => {
    let bValid = true;
    this.state.data.map(item => {
      if (!item.value) {
        item.message = "Error can not be blank";
        bValid = false;
      }
    });
    this.setState({ data: this.state.data });
    return bValid;
  };
  handleButton = () => {
    this.fieldsValid()
      ? Log("VALIDATED FIELDS, PROCEED")
      : Log("NOT VALIDATED.  ");
  };
  handleChange = event => {
    // Log("handleChange f " + [event.target.value, event.target.name]);
    const temp = event.target.name;
    this.setState({
      [temp]: event.target.value
    });
    let a = R.find(x => x.name == event.target.name, this.state.data);
    a["value"] = event.target.value;
    a["message"] = null;
  };
  showTextField = obj => {
    return (
      <div>
        <TextField
          hintText={obj.label}
          floatingLabelText={obj.label}
          fullWidth={false}
          errorText={obj.message}
          multiLine={false}
          onChange={this.handleChange}
          name={obj.name}
        />
      </div>
    );
  };
  render() {
    return (
      <WidgetBase title={"Box.com token generator"}>
        <div style={{ padding: "21px" }}>
          <div style={{ fontSize: "large", color: "#23A596" }}>
            BOX TOKEN GENERATOR
          </div>
          {this.state.data.map(x => this.showTextField(x))}
          <div>
            <RaisedButton
              label="Get token"
              backgroundColor="#f58c32"
              labelColor={"#fff"}
              style={{ marginTop: "15px" }}
              onClick={this.handleButton}
            />
          </div>
        </div>
      </WidgetBase>
    );
  }
}
