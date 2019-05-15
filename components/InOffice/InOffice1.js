import React, { Component } from "react";
import Row from "./Row";
import AdminRow from "./AdminRow";
import Divider from "material-ui/Divider";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import muiThemeable from "material-ui/styles/muiThemeable";
import Moment from "moment";
import NoteAdd from "material-ui/svg-icons/action/note-add";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Log, LogTable } from "../../utils/utils";

//let to;

class InOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: this.props.data,
      adminData: this.props.adminData,
      noteAdd: false,
      textMessage: null,
      adminView: false
    };
  }
  componentDidMount() {
    this.tick();
    //  to = setTimeout(this.tick, 2000);
  }
  componentWillUnmount() {
    //  clearTimeout(to);
  }
  /*
  testWithOutMilliseconds = () => {
    console.log("testWithOutMilliseconds f");
    let now = Moment.utc().valueOf();
    console.log("now before " + now);
    now = Number(String(now).substring(0, 9));
    console.log("now after " + now);
  };
  */
  /*
  truncateUTCtime = timestamp => {
    return Number(String(timestamp).substring(0, 9));
  };
  */
  tick = () => {
    Log("tick()");
    let hr, now, date;
    now = Moment.utc().valueOf();
    console.log("now " + now);
    //  hr = Moment(now).get("hour");
    //  console.log("HOUR is " + hr);
    //  date = Moment(now).get("date");
    //  console.log("date " + date);
    //  console.log("now truncated " + this.truncateUTCtime(now));
    //  now = this.truncateUTCtime(now);
    /*
    now = Moment()
      .add(19, "hours")
      .utc()
      .valueOf();
    */
    hr = Moment(now).get("hour");
    console.log("HOUR is " + hr);
    date = Moment(now).get("date");
    console.log("date " + date);
    this.state.data.map((x, i) => {
      if (!x.returnTimestamp) {
        return;
      }
      let utcDate = x.returnTimestamp && Moment(x.returnTimestamp).get("date");
      if (date - utcDate) {
        /* yestedays */
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
  /*
  ** SET Message field for user
  */
  setSelf = (prop, val) => {
    const self = this.props.selfRow;
    self[prop] = val;
  };
  bubble = (time, message) => {
    console.log("InOffice " + [time, message]);
    this.props.update(time, message);
  };
  handleChange = (event, index, value) => {
    console.log("HANDLECHANGE f value: " + value);
    if (value === 5) {
      console.log("set nodeAdd to true");
      this.setState({ noteAdd: true });
    }
    const data = this.state.data;
    const mn = value * 15;
    let newMessage, newTime;
    newMessage =
      "Returning in " +
      Moment()
        .add(mn, "minutes")
        .format("  h:mm");
    newTime = Moment()
      .add(mn, "minutes")
      .utc()
      .valueOf();
    mn
      ? this.setSelf("returnMessage", newMessage)
      : this.setSelf("returnMessage", null);
    this.setState({ value });
    value
      ? this.setSelf("returnTimestamp", newTime)
      : this.setSelf("returnTimestamp", null);
    this.bubble(newTime, newMessage);
    //LogTable(this.state.data);
  };
  onUpdateAdmin = (id, isInvisible, wifiAddy) => {
    Log("InOffice onUpdateAdmin " + [id, isInvisible, wifiAddy]);
    this.props.updatePerson(id, isInvisible, wifiAddy);
  };
  showDropDown = () => {
    return (
      <DropDownMenu
        value={this.state.value}
        onChange={this.handleChange}
        style={{
          color: "#440000",
          width: "70%",
          paddingBottom: "20px",
          fontSize: "large"
        }}
      >
        <MenuItem
          value={0}
          primaryText="Returning in..."
          style={{ fontSize: "large" }}
        />
        <MenuItem
          value={1}
          primaryText="Return in 15 min"
          style={{ fontSize: "large" }}
        />
        <MenuItem
          value={2}
          primaryText="Return in 30 min"
          style={{ fontSize: "large" }}
        />
        <MenuItem
          value={3}
          primaryText="Return in 45 min"
          style={{ fontSize: "large" }}
        />
        <MenuItem
          value={4}
          primaryText="Return in 60 min"
          style={{ fontSize: "large" }}
        />
        <MenuItem
          value={5}
          primaryText="CUSTOM TEXT"
          style={{ fontSize: "large" }}
        />
      </DropDownMenu>
    );
  };
  /*
  ** SHOW ROW OF USER AT TOP
  */
  showSelfRow = () => {
    return (
      <div style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <Row key={100} data={this.props.selfRow} />
        <Divider />
      </div>
    );
  };
  /*
  ** SHOW REGULAR ROW OR ADMIN Row
  */
  showRow = (x, i) => {
    return (
      <div style={{ paddingLeft: "4px", paddingRight: "4px" }}>
        {!this.state.adminView ? (
          <Row key={i} data={x} color={this.getColor(i)} />
        ) : (
          <AdminRow
            key={i}
            data={x}
            color={this.getColor(i)}
            onUpdate={this.onUpdateAdmin}
          />
        )}
      </div>
    );
  };
  handleTextMessage = event => {
    Log("InOffice.handleTextMessage f");
    this.setSelf("returnMessage", event.target.value);
    this.setSelf("returnTimestamp", null);
    this.setState({
      returnMessage: event.target.value
    });
    this.bubble(null, event.target.value);
  };
  showUserInput = () => {
    return (
      <React.Fragment>
        <div style={{ backgroundColor: "#f58c32", display: "flex" }}>
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
        </div>
        <div style={{ backgroundColor: "#f58c32" }}>
          {this.state.noteAdd && (
            <TextField
              onChange={this.handleTextMessage}
              hintText="Custom message here"
              style={{ paddingLeft: "25px" }}
            />
          )}
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
          {!this.state.adminView && this.showSelfRow()}
          {!this.state.adminView && this.showUserInput()}
        </div>

        {!this.state.adminView &&
          this.state.data.map((x, i) => this.showRow(x, i))}
        {this.state.adminView &&
          this.state.adminData.map((x, i) => this.showRow(x, i))}
      </div>
    );
  }
}

export default muiThemeable()(InOffice);
