import React, { Component } from "react";
import "./InOffice.css";
import Toggle from "material-ui/Toggle";
import TextField from "material-ui/TextField";
import { Log } from "../../utils/utils";
import Visibility from "material-ui/svg-icons/action/visibility";
import VisibilityOff from "material-ui/svg-icons/action/visibility-off";

class AdminRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presenceToken: this.props.data.presenceToken,
      isInvisible: this.props.data.isInvisible
    };
  }
  update = () => {
    Log("Admin row state.isInvisible " + this.state.isInvisible);
    const toggle = !this.state.isInvisible;
    this.setState({ isInvisible: !this.state.isInvisible });
    this.props.onUpdate(this.props.data.uuid, toggle, this.state.presenceToken);
  };
  handleChange = event => {
    this.setState({
      presenceToken: event.target.value
    });
    this.props.onUpdate(
      this.props.data.uuid,
      this.state.isInvisible,
      event.target.value
    );
  };

  render() {
    const { firstName, presenceToken } = this.props.data;
    const { color } = this.props;
    const getBackgroundColor = () => {
      return color ? "#ccc" : "#A4AECB";
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          //padding: "12px",
          backgroundColor: getBackgroundColor()
        }}
      >
        {this.state.isInvisible ? (
          <div>
            <VisibilityOff
              onClick={this.update}
              style={{ cursor: "pointer", color: "#999" }}
            />
          </div>
        ) : (
          <div>
            <Visibility
              onClick={this.update}
              style={{ cursor: "pointer", color: "#f58c32" }}
            />
          </div>
        )}
        {!this.state.isInvisible ? (
          <div style={{ marginLeft: "20px", marginRight: "20px" }}>
            <strong>{firstName}</strong>
          </div>
        ) : (
          <div
            style={{
              color: "#888",
              marginLeft: "20px",
              marginRight: "20px"
            }}
          >
            {firstName}
          </div>
        )}

        <div style={{ marginLeft: "20px" }}>
          <TextField
            value={this.state.presenceToken}
            onChange={this.handleChange}
            style={{ width: "150px" }}
          />
        </div>
      </div>
    );
  }
}

export default AdminRow;
