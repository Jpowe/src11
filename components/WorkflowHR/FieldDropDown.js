import React, { Component } from "react";
import * as R from "ramda";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

export default class FieldDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      status: this.props.status
    };
  }

  componentDidMount() {
    console.log("CDM " + this.props.data);
    this.setState({
      status: this.props.data
        ? R.prop(
            "value",
            R.find(x => x.title == this.props.data, this.props.options)
          )
        : this.props.status
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("  nextProps  " + JSON.stringify(nextProps));
    console.log("nextProps.status " + nextProps.status);
    this.setState({
      status: nextProps.status
    });
    /*
    if (!nextProps.data) {
      return;
    }
    
    this.setState({
      status: R.prop(
        "value",
        R.find(x => x.title == nextProps.data, nextProps.options)
      )
    });
    */
  }
  handleChange = (event, index, value) => {
    //console.log("HandlechangeDD  value: " + value);
    //console.log("e " + [event.target.value, event.name]);
    //console.log("name " + this.props.name);
    this.setState({ status: value });
    this.props.onselect(value, this.props.name);
  };
  showItems = () => {
    if (!this.state.options) {
      return;
    }
    return R.map(
      x => (
        <MenuItem
          value={x.value}
          primaryText={this.props.required ? x.title : x.title}
          style={{
            fontSize: "20px"
          }}
        />
      ),
      this.state.options
    );
  };
  render() {
    const { obj, required, name } = this.props;
    return (
      <div>
        <DropDownMenu
          name={"test"}
          value={this.state.status}
          onChange={this.handleChange}
          style={{
            marginTop: "10px",
            //padding: "0px",
            //fontSize: "large",
            fontSize: "20px",
            minWidth: "480px",
            height: "60px"
          }}
        >
          {this.showItems()}
        </DropDownMenu>
      </div>
    );
  }
}
