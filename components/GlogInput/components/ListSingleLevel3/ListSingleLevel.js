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
      multiSelect: this.props.multiSelect,
      data: this.props.data
    };
  }
  componentDidMount() {
    console.log("LSL3 cdm");
    /*
    console.table(this.props.data);
    let newData = R.filter(x => x.root, this.props.data);
    console.table(newData);
    if (newData.length) {
      console.log("newData is  defined");
      this.setState({ data: newData });
    } else {
      console.log("newData is UNdefined");
    }*/
  }
  componentWillReceiveProps(nextProps) {
    console.log("Row componentWillReceiveProps " + JSON.stringify(nextProps));
    this.setState({ data: nextProps.data });
  }
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
    //console.log(
    //  "bHighlight " + [id, selected, requestID, JSON.stringify(objRequest)]
    //  );

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

  sortOrder = R.sortWith([R.ascend(R.prop("order"))]);
  hide = id => {
    console.log("LSL hide id: " + id);
    let newData;

    console.log(!!R.prop("root", R.find(x => x.id == id, this.props.data)));
    if (!!R.prop("root", R.find(x => x.id == id, this.props.data))) {
      console.log("IS ROOT");
      newData = R.filter(x => x.root, this.props.data);
      this.setState({ data: this.sortOrder(newData) });
    } else {
      let newData = R.filter(x => x.parent != id, this.state.data);
      this.setState({ data: this.sortOrder(newData) });
    }
    this.props.hierarchyRemove(id);
  };
  show = id => {
    console.log("LSL show id: " + id);
    this.props.onGroupSelect(id);
    let newData = R.filter(x => x.parent == id, this.props.data);
    newData = [...this.state.data, ...newData];
    console.table(this.sortOrder(newData));
    this.setState({ data: this.sortOrder(newData) });
  };
  render() {
    const { request, requestID } = this.props;
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
          {this.state.data.map(x => (
            <ListRow
              data={x}
              hide={this.hide}
              show={this.show}
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
