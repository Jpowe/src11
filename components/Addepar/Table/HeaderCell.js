import React, { Component } from "react";
import SortIcon from "material-ui/svg-icons/action/swap-vert";
import "./Table.css";

class HeaderCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onmouseover: false
    };
  }
  onclick = () => {
    this.props.sortFunc(this.props.col);
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
        onClick={this.onclick}
      >
        {this.props.bSelected ? <strong>{data}</strong> : <span>{data}</span>}
        {sortable && this.state.onmouseover && <SortIcon />}
      </div>
    );
  }
}

export default HeaderCell;
