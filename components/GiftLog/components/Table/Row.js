import React from "react";
import * as R from "ramda";
import Cell from "./Cell";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import { white } from "material-ui/styles/colors";

import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { statuses } from "../../common/data";
import Edit from "material-ui/svg-icons/image/edit";
import { RadioButton } from "material-ui/RadioButton";
import Checkbox from "material-ui/Checkbox";

import TwoPeople from "material-ui/svg-icons/action/supervisor-account";
import ChildCare from "material-ui/svg-icons/places/child-care";
import PlusOne from "material-ui/svg-icons/social/plus-one";
import Siblings from "material-ui/svg-icons/social/people-outline";
import Person from "material-ui/svg-icons/social/person";
import Content from "material-ui/svg-icons/content/add";

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
    console.log("ROW renderCells f");
    console.table(objData);
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
            ]) && <Cell data={[objData[x]]} width={this.props.cellWidth} />,
      ks
    );
  };

  renderIconButtons = typ => {
    const data = this.props.data;
    const relationIcons = [
      {
        name: "main",
        icon: (
          <Person
            onClick={() =>
              this.props.onselect(data.uuid, "main", data.partyType)
            }
          />
        )
      },
      {
        name: "parent",
        icon: (
          <TwoPeople onClick={() => this.props.onselect(data.uuid, "parent")} />
        )
      },
      {
        name: "partner",
        icon: (
          <PlusOne onClick={() => this.props.onselect(data.uuid, "partner")} />
        )
      },
      {
        name: "child",
        icon: (
          <ChildCare onClick={() => this.props.onselect(data.uuid, "child")} />
        )
      },
      {
        name: "sibling",
        icon: (
          <Siblings onClick={() => this.props.onselect(data.uuid, "sibling")} />
        )
      },
      {
        name: "content",
        icon: (
          <Content
            onClick={() =>
              this.props.onselect(data.uuid, "main", data.partyType)
            }
          />
        )
      }
    ];
    return (
      <div
        style={{
          width: this.props.cellWidth,
          marginLeft: "0px",
          padding: "0px 2px",
          cursor: "pointer"
        }}
      >
        {R.prop("icon", R.find(x => x.name == typ, relationIcons))}
      </div>
    );
  };
  showIcon = obj => {
    console.log("Row showIcon");
    console.table(R.keys(obj));
    const b = R.contains("firstName", R.keys(obj));
    console.log(b);
    return b;
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
            alignItems: "center",
            //justifyContent: "space-around",
            backgroundColor: this.state.color,
            fontSize: "18px"
          }}
          onMouseOver={rollOver}
          onMouseOut={rollOut}
          //onClick={() => this.toggle()}
        >
          {this.renderCells(data)}
          {!this.showIcon(data) && this.renderIconButtons("content")}
          {this.showIcon(data) && this.renderIconButtons("main")}
          {this.showIcon(data) && this.renderIconButtons("parent")}
          {this.showIcon(data) && this.renderIconButtons("partner")}
          {this.showIcon(data) && this.renderIconButtons("child")}
        </div>

        <Divider />
      </div>
    );
  }
}
