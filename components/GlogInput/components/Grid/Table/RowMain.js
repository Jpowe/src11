import React from "react";
import * as R from "ramda";
import Cell from "./Cell";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import { white } from "material-ui/styles/colors";

import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { statuses } from "../../../common/data";
import Edit from "material-ui/svg-icons/image/edit";

//import AutoComplete from "material-ui/AutoComplete";
//import Form from "../Form";

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onmouseover: false,
      selected: this.props.selected,
      color: this.props.selected ? this.props.selectColor : this.props.color,
      status: this.props.data.value
    };
  }
  componentDidMount() {
    //  console.log("ROW CDM ");
    //  console.log(JSON.stringify(this.props.data));
    //  console.log(this.props.data.status);
    this.setState({ status: this.props.data.status });
  }
  componentWillReceiveProps(nextProps) {
    console.log("Row componentWillReceiveProps " + JSON.stringify(nextProps));
    this.setState({
      selected: nextProps.selected,
      color: nextProps.color
    });
  }

  handleChangeDD = (event, index, value) => {
    console.log("HandlechangeDD  value: " + value);
    this.setState({ status: value });
    this.props.onUpdate(this.props.data.id, {
      ...this.props.data,
      status: value
    });
  };
  showDropDown = () => {
    return (
      <div>
        <DropDownMenu
          value={this.state.status}
          onChange={this.handleChangeDD}
          style={{
            padding: "0px",
            margin: "0px",
            fontSize: "large"
          }}
        >
          {R.map(
            x => (
              <MenuItem value={x.status} primaryText={x.title} />
            ),
            statuses
          )}
        </DropDownMenu>
      </div>
    );
  };

  renderCells = objData => {
    const ks = R.keys(objData);
    return R.map(
      x =>
        R.contains(x, [
          "eventType",
          "date",
          "recipients",
          "registry",
          "recurring"
        ]) && <Cell data={objData[x]} />,
      ks
    );
  };
  render() {
    const { selectColor, color, selectable, data, rollOverColor } = this.props;
    const setColor = id => {
      console.log("ROW setColor " + data.id);
      this.setState({ selected: true });
      this.props.onclick(data.id);
    };
    const rollOver = () => {
      this.setState({
        onmouseover: true,
        color: rollOverColor
      });
    };
    const rollOut = () => {
      this.setState({
        onmouseover: false,
        color: color
      });
    };

    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            backgroundColor: this.state.color,
            fontSize: "14px"
          }}
          onClick={selectable && setColor}
          onMouseOver={rollOver}
          onMouseOut={rollOut}
        >
          {this.renderCells(data)}
        </div>

        <Divider />
      </div>
    );
  }
}
