import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import * as R from "ramda";
import { typography } from "material-ui/styles";
import Paper from "material-ui/Paper";
import GlobalStyles from "../../../styles";
import { grey400, cyan600, white } from "material-ui/styles/colors";
import ListRow from "./ListRow";

const styles = {
  subheader: {
    fontSize: 20,
    height: "40px",
    fontWeight: typography.fontWeightLight,

    backgroundColor: "#DF5C33",
    color: white
  },
  paper: {
    borderRadius: "10px"
  }
};

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  onselect(x, obj) {}
  /*
  bHighlight = (id, selected, objRequest, requestID, field = "recipients") => {
    console.log(
      "bHighlight " + [id, selected, JSON.stringify(objRequest), requestID]
    );
    let show = "";
    if (requestID === id) {
      return true;
    }

    if (selected && !this.props.request) {
      if (id == selected) {
        return true;
      }
    }

    if (!objRequest || !objRequest[field]) {
      return;
    }
    const recips = R.path([field], objRequest);
    console.log("recips " + JSON.stringify(recips));
    const arr = R.map(x => x.id, recips);
    show = R.contains(id, arr);

    return show;
  };
  */
  render() {
    const { data, title } = this.props;
    return (
      <Paper zDepth={2} style={(styles.paper, { backgroundColor: "" })}>
        <div
          style={{
            height: "400px",
            minWidth: "275px",
            maxWidth: "600px"
          }}
        >
          <div
            style={{
              //backgroundColor: "#DF5C33",
              backgroundColor: "#23A596",
              color: "#ffffff",
              fontWeight: typography.fontWeightLight,
              fontSize: 20,
              fontVariant: "small-caps",
              paddingTop: "8px",
              paddingBottom: "4px"
            }}
          >
            <div style={{ marginLeft: "10px" }}>{title}</div>
          </div>
          {data.map(x => (
            <ListRow
              data={x}
              label={x.name}
              onselect={(x, obj) => this.onselect(x, obj)}
            />
          ))}
        </div>
      </Paper>
    );
  }
}
