import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import RaisedButton from "material-ui/RaisedButton";
import FieldText from "./FieldText";
import FieldDropDown from "./FieldDropDown";
import SubForm from "./SubForm";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveEnabled: false,
      title: this.props.title,
      createNewDisabled: false
    };
  }
  componentDidMount() {
    this.state = { data: this.props.data };
  }
  componentWillReceiveProps(nextProps) {
    console.log(" FORM CWRP " + nextProps.selection);
    console.log("CWRP nextprops.data " + nextProps.data);
    console.log("CWRP nextprops.clear " + nextProps.clear);
    this.setState({ tab: nextProps.selection });
  }
  handleChange = event => {
    this.setState({ saveEnabled: true });
    //  console.log(event.target.name);
  };

  render() {
    const { data } = this.props;
    return (
      <Paper zDepth={1}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItem: "center"
            }}
          />
          {data.form.map(x => (
            <SubForm
              data={x}
              onselect={this.props.onselect}
              inputData={this.props.inputData}
              clear={this.props.clear}
            />
          ))}
        </div>
      </Paper>
    );
  }
}

export default Form;
