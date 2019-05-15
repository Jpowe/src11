import React from "react";
import HeaderCell from "./HeaderCell";
import Divider from "material-ui/Divider";
import muiThemeable from "material-ui/styles/muiThemeable";
import { Log } from "../../../utils/utils";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedHeader: null };
  }
  sortin = data => {
    Log("sortin f: " + data);
    this.setState({ selectedHeader: data });
    this.props.sortFunc(data);
  };
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
            height: 56,
            color: this.props.muiTheme.palette.accent3Color,
            fontSize: "large"
          }}
        >
          {this.props.data.map((d, i) => (
            <HeaderCell
              key={i}
              data={d.title}
              col={d.name}
              sortable={d.type !== "component" ? this.props.sortable : false}
              sortFunc={this.sortin}
              bSelected={this.state.selectedHeader == d.name}
            />
          ))}
        </div>
        <Divider />
      </div>
    );
  }
}

export default muiThemeable()(Header);
