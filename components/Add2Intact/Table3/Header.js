import React from "react";
import HeaderCell from "./HeaderCell";
import Divider from "material-ui/Divider";
import muiThemeable from "material-ui/styles/muiThemeable";
import HeaderCheckbox from "./HeaderCheckbox";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedHeader: null };
    console.table(this.props.data);
  }
  sortin = data => {
    //console.log("sortin f: " + data);
    this.setState({ selectedHeader: data });
    this.props.sortFunc(data);
  };
  chkbx = () => {
    this.props.chkbx();
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
          {this.props.data.map((d, i) => {
            return d == "checkbox" ? (
              <HeaderCheckbox chkbx={this.chkbx} />
            ) : (
              <HeaderCell
                key={i}
                data={d}
                col={d}
                sortFunc={this.sortin}
                bSelected={this.state.selectedHeader == d}
              />
            );
          })}
        </div>
        <Divider />
      </div>
    );
  }
}

export default muiThemeable()(Header);
