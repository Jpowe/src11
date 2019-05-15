import React from "react";
import HeaderCell from "./HeaderCell";
import Divider from "material-ui/Divider";
import muiThemeable from "material-ui/styles/muiThemeable";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedHeader: null };
  }
  sortin = data => {
    this.setState({ selectedHeader: data });
    this.props.onSortFunc(data);
  };
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",

            height: 56,
            color: this.props.muiTheme.palette.accent3Color,
            fontSize: "large",
            //  backgroundColor: "#ccc",
            backgroundColor: "#B0BEC5"
          }}
        >
          {this.props.data.map((d, i) => (
            <HeaderCell
              key={i}
              data={d.title}
              col={d.name}
              sortable={d.type !== "component" ? this.props.sortable : false}
              onSortFunc={this.sortin}
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
