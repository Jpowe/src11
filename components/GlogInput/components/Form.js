import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import FieldDropDown from "./FieldDropDown";
import FieldText from "./FieldText";
import AutoComplete from "material-ui/AutoComplete";

class FormOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveEnabled: false,
      dataSource: [],
      searchText: this.props.data ? this.props.data["name"] : "",
      vendors: []
    };
  }
  componentDidMount() {
    this.state = {
      data: this.props.data,
      searchText: this.props.data ? this.props.data["name"] : ""
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("CWRP");

    if (this.state.vendors) {
      //return;
    }
    this.setState({
      tab: nextProps.selection
      //searchText: nextProps.data["name"]
    });
    if (nextProps.searchText) {
      this.setState({
        vendors: R.map(x => x.name, nextProps.searchText)
      });
    }
  }

  handleUpdateInput = searchText => {
    console.log("handleUpdateInput searchText: " + searchText);
    this.setState({
      searchText: searchText
    });
    this.props.bubbleUp(searchText);
  };

  handleNewRequest = x => {
    console.log("Form handleNewRequest " + x);
    if (!R.contains(x, this.state.vendors)) {
      console.log("not in vendors");
      //this.setState({ vendors: [...this.state.vendors, x] });
    }
    this.props.onSave({ ...this.props.data, name: x });
  };

  getValue = z => {
    console.log("getValue z " + JSON.stringify(z));
    let field = R.prop("name", z);
    return R.prop(field, this.props.data);
  };
  childChange = (val, name) => {
    let newObj;
    if (val === "") {
      newObj = { ...this.props.data, [name]: " " };
    } else {
      newObj = { ...this.props.data, [name]: val };
    }

    this.setState({ data: newObj });
    this.props.onSave(newObj);
    this.setState({ saveEnabled: true });
  };
  render() {
    const { fields, data } = this.props;
    return (
      <Paper zDepth={2}>
        <div>
          {fields &&
            fields.map(
              (x, i) =>
                x.uiType === "dropDown" ? (
                  <div>
                    <div
                      style={{
                        color: "#DF5C33",
                        fontSize: "small",
                        marginLeft: "4px",
                        marginTop: "10px"
                      }}
                    >
                      {x.title}
                    </div>
                    <FieldDropDown
                      options={this.props.statuses}
                      status={data.status}
                      //data={ }
                      onselect={value => this.childChange(value, "status")}
                    />
                  </div>
                ) : x.uiType === "autoComplete" ? (
                  <AutoComplete
                    hintText="Search organizations"
                    searchText={this.state.searchText}
                    onUpdateInput={this.handleUpdateInput}
                    onNewRequest={this.handleNewRequest}
                    dataSource={this.state.vendors}
                    //filter={(searchText, key) => key.indexOf(searchText) !== -1}
                    filter={AutoComplete.fuzzyFilter}
                    openOnFocus={true}
                  />
                ) : (
                  <FieldText
                    obj={x}
                    data={this.getValue(x)}
                    change={this.childChange}
                    type={x.type}
                  />
                )
            )}
        </div>
      </Paper>
    );
  }
}

export default FormOrder;
