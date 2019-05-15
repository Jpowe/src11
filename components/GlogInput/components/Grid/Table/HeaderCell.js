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
    this.props.onSortFunc(this.props.col);
  };

  render() {
    const { sortable, data } = this.props;
    return (
      <div
        className="pointer"
        style={{
          width: "20%",
          display: "flex"
          //borderBottom: "5px solid #607D8B"
          //border: "2px solid red"
        }}
        onMouseOver={() => this.setState({ onmouseover: true })}
        onMouseOut={() => this.setState({ onmouseover: false })}
        onClick={this.onclick}
      >
        {this.props.bSelected ? (
          <ul>
            <strong>{data}</strong>
          </ul>
        ) : (
          <ul>
            <span>{data}</span>
          </ul>
        )}
        {sortable && this.state.onmouseover && <SortIcon />}
      </div>
    );
  }
}

export default HeaderCell;
