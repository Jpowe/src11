import React, { Component } from "react";
import { connect } from "react-redux";
import Back from "material-ui/svg-icons/navigation/arrow-back";
import Forward from "material-ui/svg-icons/navigation/arrow-forward";

class SubNav extends Component {
  constructor(props) {
    super(props);
    //  this.state = { screen: 1 };
  }
  componentDidMount() {}

  render() {
    const { direction, disableNext, disableBack } = this.props;
    return (
      <div style={{ display: "flex" }}>
        {!disableBack && (
          <Back
            onClick={() => direction(-1)}
            style={{ zoom: "150%", cursor: "pointer", color: "#f58c32" }}
          />
        )}
        {disableBack && (
          <Back
            onClick={() => direction(-1)}
            style={{
              zoom: "150%",
              pointerEvents: "none",
              opacity: 0.4,
              color: "#f58c32"
            }}
          />
        )}
        {!disableNext && (
          <Forward
            onClick={() => direction(1)}
            style={{ zoom: "150%", cursor: "pointer", color: "#f58c32" }}
          />
        )}
        {disableNext && (
          <Forward
            onClick={() => direction(1)}
            style={{
              zoom: "150%",
              pointerEvents: " none",
              opacity: 0.4,
              color: "#f58c32"
            }}
          />
        )}
      </div>
    );
  }
}

export default SubNav;
