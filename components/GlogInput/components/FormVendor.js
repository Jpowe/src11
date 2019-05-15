import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import AutoComplete from "material-ui/AutoComplete";

class FormVendor extends Component {
  constructor(props) {
    super(props);
    this.state = { saveEnabled: false };
  }
  componentDidMount() {
    this.state = { data: this.props.data };
  }
  componentWillReceiveProps(nextProps) {
    console.log(" FORM CWRP " + nextProps.selection);
    console.log("CWRP nextprops.data " + nextProps.data);
    this.setState({ tab: nextProps.selection });
  }
  showTextF(hint, value, label) {
    return (
      <TextField
        value={value}
        hintText={hint}
        floatingLabelText={label}
        fullWidth={false}
        multiLine={false}
        name={"name"}
        style={{ width: "250px", fontSize: "20px" }}
      />
    );
  }
  render() {
    const { fields, data } = this.props;
    return (
      <Paper zDepth={1}>
        <div style={{}}>
          <AutoComplete
            floatingLabelText="Type  search"
            filter={AutoComplete.fuzzyFilter}
            dataSource={R.map(x => x.name, this.props.vendors)}
            maxSearchResults={5}
          />
          TEMP TEST
          {this.showTextF("Vendor name", data ? data.name : null)}
        </div>
      </Paper>
    );
  }
}

export default FormVendor;
