import React, { Component } from "react";
import SortIcon from "material-ui/svg-icons/action/swap-vert";
import "./Table.css";
import Checkbox from "material-ui/Checkbox";

class HeaderCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onmouseover: false
    };
  }

  onclick = () => {
    console.log("Headercheckbox onclick f");
    this.props.chkbx();
  };

  render() {
    const { sortable, data } = this.props;
    return (
      <div
        className="pointer"
        style={{
          display: "flex",
          alignItems: "center",
          padding: 8,
          width: "10%",
          height: "48px"
          //backgroundColor: "#ded"
        }}
        onMouseOver={() => this.setState({ onmouseover: true })}
        onMouseOut={() => this.setState({ onmouseover: false })}
        //  onClick={() => this.onclick()}
      >
        <Checkbox onClick={this.onclick} />
      </div>
    );
  }
}

export default HeaderCheckbox;
