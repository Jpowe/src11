import React, { Component } from "react";
import * as R from "ramda";
import Row from "./Row";
import AdminRow from "./AdminRow";
import Divider from "material-ui/Divider";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import muiThemeable from "material-ui/styles/muiThemeable";
import Moment from "moment";
import NoteAdd from "material-ui/svg-icons/action/note-add";
import HourglassEmpty from "material-ui/svg-icons/action/hourglass-empty";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Log, LogTable } from "../../utils/utils";
import "../Tooltip.css";

class InOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: this.props.data,
      adminData: this.props.adminData,
      noteAdd: false,
      textMessage: null,
      adminView: false,
      topRow: this.props.selfRow,
      duplicateFirstNames: this.props.duplicateFirstNames
    };
  }
  componentDidMount() {
    this.tick();
    this.setState({
      currentHour: Moment().get("hour"),
      hourSelected: Moment().get("hour"),
      minutes: 0
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log("Presence compwillRecProps");
    console.table(nextProps.data);
    this.setState({
      data: nextProps.data
    });
    this.tick();
  }

  tick = () => {
    Log("tick()");
    let hr, now, date;
    now = Moment.utc().valueOf();
    //  console.log("now " + now);
    hr = Moment(now).get("hour");
    //  console.log("HOUR is " + hr);
    date = Moment(now).format("DDD");
    this.state.data.map((x, i) => {
      console.log("name lastseen:  "[(x.name, x.lastSeenTimestamp)]);
      if (!x.returnTimestamp) {
        return;
      }
      let utcDate = Moment(Number(x.returnTimestamp)).format("DDD");
      if (date - utcDate) {
        /* previous days */
        x.returnMessage = null;
      } else {
        if (hr > 16) {
          x.returnMessage = "GONE HOME";
        } else if (hr < 9) {
          x.returnMessage = "NOT IN YET";
        } else if (now > x.returnTimestamp) {
          x.returnMessage = "Back soon";
        }
      }
    });
    this.setState({ data: this.state.data });
  };
  setTopRowProp = (prop, val) => {
    const self = this.state.topRow;
    self[prop] = val;
  };
  bubble = (time, message) => {
    this.props.update(time, message, this.getSelectedUUID());
  };
  getSelectedUUID = () => {
    return this.state.topRow["uuid"];
  };
  handleChangeHour = (event, index, value) => {
    console.log("HANDLECHANGE f value: " + value);
    this.setState({ hourSelected: value });
    let newMessage, newTime;
    newMessage =
      "Back @ " +
      Moment()
        .hour(value)
        .minute(this.state.minutes)
        .format("  h:mm");
    newTime = Moment()
      .hour(value)
      .minute(this.state.minutes)
      .utc()
      .valueOf();
    console.log("newTimeUTC " + newTime);
    this.setTopRowProp("returnMessage", newMessage);
    this.setState({ value });
    this.setTopRowProp("returnTimestamp", newTime);
    this.bubble(newTime, newMessage);
  };
  handleChangeMinute = (event, index, value) => {
    console.log("HANDLECHANGE f value: " + value);
    this.setState({ minutes: value });
    let newMessage, newTime;
    newMessage =
      "Back @ " +
      Moment()
        .hour(this.state.hourSelected)
        .minute(value)
        .format("  h:mm");
    newTime = Moment()
      .hour(this.state.hourSelected)
      .minute(value)
      .utc()
      .valueOf();
    console.log("newTimeUTC " + newTime);
    this.setTopRowProp("returnMessage", newMessage);
    this.setState({ value });
    this.setTopRowProp("returnTimestamp", newTime);
    this.bubble(newTime, newMessage);
  };
  clearTime = () => {
    this.setTopRowProp("returnMessage", null);
    this.setTopRowProp("returnTimestamp", null);
    this.bubble(null, null);
  };
  onUpdateAdmin = (id, isInvisible, wifiAddy) => {
    Log("InOffice onUpdateAdmin " + [id, isInvisible, wifiAddy]);
    this.props.updatePerson(id, isInvisible, wifiAddy);
  };
  createHourMenuItems = () => {
    const dataMenuItems = [
      { text: "9am", value: 9 },
      { text: "10am", value: 10 },
      { text: "11am", value: 11 },
      { text: "12pm", value: 12 },
      { text: "1pm", value: 13 },
      { text: "2pm", value: 14 },
      { text: "3pm", value: 15 },
      { text: "4pm", value: 16 },
      { text: "5pm", value: 17 }
    ];
    const newDataMenuItems = R.filter(
      x => x.value >= this.state.currentHour,
      dataMenuItems
    );
    return newDataMenuItems.map(x => {
      return <MenuItem value={x.value} key={x.value} primaryText={x.text} />;
    });
  };
  showDropDown = () => {
    return (
      <div>
        <DropDownMenu
          value={
            this.state.hourSelected
              ? this.state.hourSelected
              : this.state.currentHour
          }
          onChange={this.handleChangeHour}
          style={{
            color: "#440000",
            padding: "0px",
            margin: "0px",
            fontSize: "large"
          }}
        >
          {this.createHourMenuItems()}
        </DropDownMenu>
        <DropDownMenu
          value={this.state.minutes}
          onChange={this.handleChangeMinute}
          style={{
            padding: "0px",
            margin: "0px",
            fontSize: "large"
          }}
        >
          <MenuItem value={0} primaryText="00" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={45} primaryText="45" />
        </DropDownMenu>
      </div>
    );
  };
  /*
  ** SHOW ROW OF USER AT TOP
  */
  showTopRow = () => {
    return (
      <div style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <Row key={100} data={this.state.topRow} />
        <Divider />
      </div>
    );
  };
  contains = item => {
    //console.log(item + "  " + this.state.duplicateFirstNames);
    if (!this.state.duplicateFirstNames) return;
    return R.contains(item, this.state.duplicateFirstNames);
  };

  showRow = (x, i) => {
    console.log("showRow data: " + JSON.stringify(x));
    return (
      <div style={{ paddingLeft: "4px", paddingRight: "4px" }}>
        <Row
          key={i}
          data={x}
          color={this.getColor(i)}
          onSelect={() => this.onSelectRow(x.uuid)}
          showLastInitial={this.contains(x.firstName)}
        />
      </div>
    );
  };
  showAdminRow = (x, i) => {
    return (
      <div style={{ paddingLeft: "4px", paddingRight: "4px" }}>
        <AdminRow
          key={i}
          data={x}
          color={this.getColor(i)}
          onUpdate={this.onUpdateAdmin}
        />
      </div>
    );
  };
  onSelectRow = uuid => {
    console.log("inOffic onSelectRow uuid : " + uuid);
    console.log(R.find(x => x.uuid === uuid, this.state.data));
    this.setState({ topRow: R.find(x => x.uuid === uuid, this.state.data) });
  };

  showUserInput = () => {
    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "#f58c32",
            display: "flex",
            flexWrap: "nowrap"
          }}
        >
          <div
            style={{
              marginLeft: "24px",
              paddingTop: "20px",
              color: this.props.muiTheme.palette.secondaryTextColor
            }}
          >
            <strong>Leaving?</strong>
          </div>
          {this.showDropDown()}
          <div
            tooltip="Clear time"
            tooltip-position="top"
            style={{ paddingTop: "20px", cursor: "pointer" }}
            onClick={this.clearTime}
          >
            <HourglassEmpty />
          </div>
        </div>
      </React.Fragment>
    );
  };
  getColor = index => {
    return index % 2 ? 0 : 1;
  };
  handleAdmin = () => {
    Log("InOffice comp handleAdmin f");
    this.setState({
      adminView: !this.state.adminView,
      data: this.props.data,
      adminData: this.props.adminData
    });
    //this.forceUpdate();
  };
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "2px",
            paddingLeft: "4px",
            paddingRight: "4px",
            backgroundColor: this.props.muiTheme.palette.primary1Color,
            color: "#fff"
          }}
        >
          <div style={{ fontSize: "x-large" }}>Presence</div>
          {this.props.admin && (
            <div>
              <RaisedButton
                label="Admin"
                backgroundColor="#f58c32"
                labelColor="#fff"
                onClick={this.handleAdmin}
              />
            </div>
          )}
        </div>
        <div
          style={{
            paddingTop: "4px",
            paddingLeft: "4px",
            paddingRight: "4px",
            paddingBottom: "4px"
          }}
        >
          {!this.state.adminView && this.showTopRow()}
          {!this.state.adminView && this.showUserInput()}
        </div>

        {!this.state.adminView &&
          this.state.data.map((x, i) => this.showRow(x, i))}
        {this.state.adminView &&
          this.state.adminData.map((x, i) => this.showAdminRow(x, i))}
      </div>
    );
  }
}

export default muiThemeable()(InOffice);
