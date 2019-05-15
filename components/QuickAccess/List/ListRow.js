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
import { withRouter } from "react-router-dom";
//import AutoComplete from "material-ui/AutoComplete";
//import Form from "../Form";
const rollOverColor = "#9ccc65";

class ListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onmouseover: false,
      iconClick: false
    };
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    //console.log("Row componentWillReceiveProps " + JSON.stringify(nextProps));
  }
  /*
  getTarget = t => {
    return t == "self" ? "_self" : "_blank";
  };
  */
  onclick = link => {
    this.props.history.push(`${link}`);
  };
  render() {
    const { data, label } = this.props;
    const setColor = id => {
      //console.log("ROW setColor " + data.id);
      this.setState({ selected: true });
      this.props.onclick(data.id);
    };
    const rollOver = () => {
      this.setState({
        onmouseover: true,
        color: "#ccc"
      });
    };
    const rollOut = () => {
      this.setState({
        onmouseover: false,
        color: ""
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
          onClick={() => console.log("Row click")}
        >
          {data.target != "self" && (
            <a
              href={data.link}
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              {label}
            </a>
          )}
          {data.target == "self" && (
            <div
              onClick={() => this.onclick(data.link)}
              style={{ textDecoration: "underline", color: "#0000CD" }}
            >
              {label}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ListRow);
