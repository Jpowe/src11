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
import Checked from "material-ui/svg-icons/toggle/radio-button-checked";
import Unchecked from "material-ui/svg-icons/toggle/radio-button-unchecked";
import { RadioButton } from "material-ui/RadioButton";
import Checkbox from "material-ui/Checkbox";

//import AutoComplete from "material-ui/AutoComplete";
//import Form from "../Form";

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onmouseover: false,
      selected: this.props.selected,
      color: this.props.selected ? this.props.selectColor : this.props.color,
      status: this.props.data.value,
      iconClick: false
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
  toggle() {
    console.log("ROW toggle");
    this.setState({ iconClick: !this.state.iconClick });
    this.props.onclick(
      this.props.data.id ? this.props.data.id : this.props.data.uuid
    );
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
        x == "status"
          ? this.showDropDown()
          : R.contains(x, [
              "firstName",
              "middleName",
              "lastName",
              "name",
              "type",
              "birthSurname",
              "legalLastName",
              "suffix"
            ]) && <Cell data={[objData[x]]} />,
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
      return;
      this.setState({
        onmouseover: true,
        color: rollOverColor
      });
    };
    const rollOut = () => {
      return;
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
            alignItems: "center",
            //justifyContent: "space-around",
            backgroundColor: this.state.color,
            fontSize: "18px"
          }}
          onMouseOver={rollOver}
          onMouseOut={rollOut}
          onClick={() => this.toggle()}
        >
          {!this.state.selected ? (
            <Unchecked style={{ zoom: "150%", width: "20%" }} />
          ) : (
            <Checked style={{ zoom: "150%", width: "20%" }} />
          )}

          {this.renderCells(data)}
        </div>

        <Divider />
      </div>
    );
  }
}
