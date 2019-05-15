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
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    //  console.log("Row componentWillReceiveProps " + JSON.stringify(nextProps));
  }
  toggle() {
    console.log("  toggle id " + this.props.data.id);
    this.setState({ iconClick: !this.state.iconClick });
    this.props.onselect(this.props.data.id, this.props.data);
  }
  getIndent(n) {
    return `${n * 10}px`;
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
            padding: "8px",
            cursor: "pointer"
          }}
          onMouseOver={rollOver}
          onMouseOut={rollOut}
          onClick={() => this.toggle()}
        >
          <div style={{ marginLeft: this.getIndent(this.props.data.level) }}>
            {label}
          </div>
        </div>

        <Divider />
      </div>
    );
  }
}
