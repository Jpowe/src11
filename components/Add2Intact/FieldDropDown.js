import React, { Component } from "react";
import * as R from "ramda";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

export default class FieldDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options
      //  status: this.props.status
    };
  }
  /*
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
  */

  componentWillReceiveProps(nextProps) {
    //  console.log("  nextProps  " + JSON.stringify(nextProps));
    if (!nextProps.data) {
      return;
    }
    this.setState({ status: nextProps.status, options: nextProps.options });
    this.showItems();
    /*
    this.setState({
      status: R.prop(
        "value",
        R.find(x => x.title == nextProps.data, nextProps.options)
      )
    });
    */
  }

  handleChange = (event, index, value) => {
    console.log("HandlechangeDD  value: " + value);
    this.props.onselect(value);
  };
  showItems = options => {
    if (!options) {
      return;
    }
    return R.map(
      x => <MenuItem value={x.value} primaryText={x.title} />,
      options
    );
  };
  render() {
    const { obj, status, options } = this.props;
    return (
      <div>
        <DropDownMenu
          value={status}
          onChange={this.handleChange}
          style={{
            padding: "0px",
            margin: "0px",
            fontSize: "large",
            left: "-20px"
          }}
        >
          {this.showItems(options)}
        </DropDownMenu>
      </div>
    );
  }
}
