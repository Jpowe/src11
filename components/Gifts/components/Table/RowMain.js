import React from "react";
import * as R from "ramda";
import Cell from "./Cell";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import { white } from "material-ui/styles/colors";

import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

import Edit from "material-ui/svg-icons/image/edit";

//import AutoComplete from "material-ui/AutoComplete";
//import Form from "../Form";

/* colors of material design x200s eg purple200 = cd993d8
initial= purple,reserach= blue,options =orange, waiting=brown,accounting=yellow,vendorworking=green,readytoship=red
 */
const statuses = [
  { name: "Initial", color: "#CE93D8", value: 1 },
  { name: "Research", color: "#90CAF9", value: 2 },
  { name: "Options sent", color: "#FFCC80", value: 3 },
  { name: "Waiting confirmation", color: "#BCAAA4", value: 4 },
  { name: "Accounting ", color: "#FFF59D", value: 5 },
  { name: "Vendor working", color: "#C5E1A5", value: 6 },
  { name: "Ready to ship", color: "#EF9A9A", value: 7 }
];

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onmouseover: false,
      selected: this.props.selected,
      //  color: this.props.selected ? this.props.selectColor : this.props.color,
      status: this.props.data.value
    };
  }
  componentDidMount() {
    console.log("ROW MAIN CDM ");
    //  console.log(JSON.stringify(this.props.data));
    //  console.log(this.props.data.status);
    try {
      this.setState({
        workStatus: this.getWorkStatus(),
        color: this.getRowColor(),
        rowColor: this.getRowColor(),
        status: this.props.data.status,
        assignedTo: this.props.data.assignedTo
      });
    } catch (e) {
      console.log("CATCH " + e.message);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("Row componentWillReceiveProps " + JSON.stringify(nextProps));
    this.setState({
      selected: nextProps.selected
      //color: nextProps.color
    });
  }
  getWorkStatus = () => {
    const getStatus = () => {
      return R.prop(
        "value",
        R.find(x => x.name === R.prop("status", this.props.data), statuses)
      );
    };
    return R.prop("status", this.props.data) ? getStatus() : null;
  };
  getRowColor = () => {
    if (this.props.data.collapseRow) {
      return "#ffffff";
    }

    const getColor = () => {
      return R.prop(
        "color",
        R.find(x => x.name === R.prop("status", this.props.data), statuses)
      );
    };
    return R.prop("status", this.props.data) ? getColor() : null;
  };
  handleChangeDD = (event, index, value) => {
    this.setState({
      workStatus: value,
      status: value,
      color: R.prop("color", R.find(x => x.value === value, statuses)),
      rowColor: R.prop("color", R.find(x => x.value === value, statuses))
    });
    this.props.onUpdate(
      "status",
      this.props.data.id,
      this.props.data.giftUUID,
      {
        ...this.props.data,
        status: R.prop("name", R.find(x => x.value === value, statuses))
      }
    );
  };

  showDropDown = status => {
    const menuItem = row => {
      return <MenuItem value={row.value} primaryText={row.name} />;
    };
    return (
      <DropDownMenu
        value={this.state.workStatus}
        onChange={this.handleChangeDD}
        style={{
          padding: "0px",
          margin: "0px",
          fontSize: "large",
          //  border: "1px solid red",
          minWidth: "200px",
          maxWidth: "200px"
        }}
      >
        {statuses.map(menuItem)}
      </DropDownMenu>
    );
  };
  handleChangeAssignedTo = (event, index, value) => {
    console.log("handleChangeAssignedTo " + value);
    console.log("data.id " + this.props.data.id);
    this.props.onUpdate(
      "assignedTo",
      this.props.data.id,
      this.props.data.giftUUID,
      value
    );
    this.setState({ assignedTo: value });
  };
  showDropDownAssignedTo = (data, selection) => {
    const menuItem = row => {
      return <MenuItem value={row.name} primaryText={row.name} />;
    };
    return (
      <DropDownMenu
        value={selection}
        onChange={this.handleChangeAssignedTo}
        style={{
          padding: "0px",
          margin: "0px",
          fontSize: "large",
          //  border: "1px solid red",
          minWidth: "200px",
          maxWidth: "200px"
        }}
      >
        {data.map(menuItem)}
      </DropDownMenu>
    );
  };

  renderCells = objData => {
    const ks = R.keys(objData);
    console.log("cellwidth " + this.props.cellWidth);
    //  console.log("keys:");
    //  console.table(ks);
    return R.map(
      x =>
        R.contains(x, [
          "eventDate",
          "eventType",
          "party",
          "request",
          "gift19",
          "gift18",
          "gift17",
          "gift19notes",
          "gift18notes",
          "gift17notes"
        ]) && <Cell data={objData[x]} width={this.props.cellWidth} />,
      ks
    );
  };
  render() {
    const {
      selectColor,
      color,
      selectable,
      data,
      rollOverColor,
      collapseRow,
      onCollapse
    } = this.props;
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
      console.log("rollOut color: " + this.state.rowColor);
      this.setState({
        onmouseover: false,
        color: this.state.rowColor
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
          onMouseOver={rollOver}
          onMouseOut={rollOut}
          onClick={collapseRow && onCollapse}
        >
          {!collapseRow && (
            <Edit
              onClick={() => this.props.onclick(data.id)}
              style={{
                cursor: "pointer",
                padding: "8px"
              }}
            />
          )}
          {!collapseRow && this.showDropDown(data.status)}
          {collapseRow && <div style={{ minWidth: "220px" }} />}
          {!collapseRow &&
            this.showDropDownAssignedTo(
              this.props.personalAssts,
              this.state.assignedTo
            )}
          {collapseRow && <div style={{ minWidth: "218px" }} />}
          {this.renderCells(data)}
        </div>

        <Divider />
      </div>
    );
  }
}
