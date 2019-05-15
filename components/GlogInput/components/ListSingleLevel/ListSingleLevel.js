import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import * as R from "ramda";
import { typography } from "material-ui/styles";
import Paper from "material-ui/Paper";
import GlobalStyles from "../../styles";
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

export default class ListSingleLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      multiSelect: this.props.multiSelect
    };
  }
  componentDidMount() {}
  onselect(x, obj) {
    console.log("onselect x,obj " + x + " " + obj);
    if (this.state.multiSelect) {
      console.log("contains " + R.contains(x, this.state.selected));
      let arr = this.state.selected;
      !R.contains(x, this.state.selected)
        ? this.setState({ selected: [...this.state.selected, x] })
        : this.setState({
            selected: R.filter(y => y !== x, arr)
          });
    } else {
      this.setState({ selected: [x] });
    }

    this.props.onselect(x, obj);
  }
  bHighlight = (id, selected, objRequest, requestID, field = "recipients") => {
    /*
    console.log(
      "bHighlight " + [id, selected, requestID, JSON.stringify(objRequest)]
    );
    */

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
      console.log("HERE?");
      return;
    }
    const recips = R.path([field], objRequest);
    //  console.log("recips " + JSON.stringify(recips));
    const arr = R.map(x => x.id, recips);
    //console.log(JSON.stringify(arr));
    show = R.contains(id, arr);

    return show;
  };
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
    //show = R.contains(id, arr);

    console.log("show and id " + show + "  " + id);
    return id == selected;
  };
  */
  bHighlight2 = (rn, giftObj) => {
    console.log("x " + rn);
    console.table(giftObj);
    if (giftObj) {
      console.log(JSON.stringify(R.prop("requests", giftObj)));
      const request = R.prop("requests", giftObj);
      if (request.length) {
        const requestNote = R.prop("requestNotes", request[0]);
        if (requestNote == rn) {
          console.log("true requestNote == rn");
          return true;
        } else {
          return false;
        }
      }
    }
  };
  render() {
    const { data, request, requestID } = this.props;
    return (
      <Paper
        zDepth={GlobalStyles.depth.n}
        style={(styles.paper, { backgroundColor: "#A4AECB" })}
      >
        <div
          style={{ minHeight: "400px", minWidth: "200px", maxWidth: "400px" }}
        >
          <div
            style={{
              backgroundColor: "#DF5C33",
              color: "#ffffff",
              fontWeight: typography.fontWeightLight,
              padding: "8px",
              fontSize: 18
            }}
          >
            {this.props.title}
          </div>
          {data.map(x => (
            <ListRow
              data={x}
              label={
                x.name
                  ? x.name
                  : x.lastName
                    ? `${x.firstName} ${x.lastName}`
                    : x.requestNotes
              }
              onselect={(x, obj) => this.onselect(x, obj)}
              // highlight(x.requestnotes,props.gift)
              bHighlight={
                this.props.gift
                  ? this.bHighlight2(x.requestNotes, request)
                  : this.bHighlight(
                      x.id,
                      this.state.selected,
                      request,
                      requestID,
                      this.props.field
                    )
              }
            />
          ))}
        </div>
      </Paper>
    );
  }
}
