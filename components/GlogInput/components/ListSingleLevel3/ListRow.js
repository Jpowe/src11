import React from "react";
import * as R from "ramda";

import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import { white } from "material-ui/styles/colors";

import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

import Edit from "material-ui/svg-icons/image/edit";
import Checked from "material-ui/svg-icons/toggle/radio-button-checked";
import Unchecked from "material-ui/svg-icons/toggle/radio-button-unchecked";
import { RadioButton } from "material-ui/RadioButton";
import Checkbox from "material-ui/Checkbox";
import ExpandLess from "material-ui/svg-icons/navigation/arrow-drop-up";
import ExpandMore from "material-ui/svg-icons/navigation/arrow-drop-down";

//import AutoComplete from "material-ui/AutoComplete";
//import Form from "../Form";
const rollOverColor = "#9ccc65";

export default class ListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onmouseover: false,
      iconClick: false
    };
  }
  componentDidMount() {
    console.log("ListRow CDM");
    console.table(this.props.data);
    console.table(this.props.label);
    this.setState({ expand: false });
  }
  componentWillUnmount() {
    console.log("COMPONENT WILL UNMOUNT LISTROW");
    this.setState({ expand: false });
  }
  componentWillReceiveProps(nextProps) {
    //  console.log("Row componentWillReceiveProps " + JSON.stringify(nextProps));
  }
  toggle() {
    console.log("  toggle id " + this.props.data.id);
    this.setState({ iconClick: !this.state.iconClick });
    this.props.onselect(this.props.data.id, this.props.data);
  }
  getIndent(n, hasChildren) {
    if (!hasChildren && !n) {
      return `20px`;
    }
    let indent = hasChildren ? n * 20 : n * 20 + 40;
    return `${indent}px`;
  }
  handleExpand(id) {
    console.log("handleExpand " + id);
    this.setState({ expand: !this.state.expand });
    this.state.expand && this.props.hide(id);
    !this.state.expand && this.props.show(id);
  }
  render() {
    const {
      selectColor,
      color,
      selectable,
      data,
      label,
      currentIndent
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
            backgroundColor: this.props.bHighlight
              ? "#f58c32"
              : this.state.color,
            fontSize: "18px",
            padding: "8px"
          }}
          onMouseOver={rollOver}
          onMouseOut={rollOut}
        >
          <div
            style={{
              marginLeft: this.getIndent(
                this.props.data.level,
                this.props.data.hasChildren
              ),
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap"
            }}
          >
            {this.props.data.hasChildren && (
              <div
                onClick={() => this.handleExpand(this.props.data.id)}
                style={{
                  cursor: "pointer",
                  //backgroundColor: "#002200",
                  padding: "5px",
                  //  borderStyle: "dashed",
                  cursor: "pointer"
                }}
              >
                {this.state.expand ? (
                  <ExpandLess
                    style={{
                      color: "white",
                      height: "48px",
                      width: "48px"
                    }}
                  />
                ) : (
                  <ExpandMore
                    style={{
                      color: "white",
                      height: "48px",
                      width: "48px"
                    }}
                  />
                )}
              </div>
            )}
            <div
              style={{ padding: "20px", cursor: "pointer" }}
              onClick={() => this.toggle()}
            >
              {label}
            </div>
          </div>
        </div>

        <Divider />
      </div>
    );
  }
}
