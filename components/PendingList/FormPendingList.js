import React, { Component } from "react";
import Paper from "material-ui/Paper";
import DropDownMenu from "material-ui/DropDownMenu";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import RaisedButton from "material-ui/RaisedButton";
import moment from "moment";
import WidgetBase from "../WidgetBase";
import { white } from "material-ui/styles/colors";
import FlatButton from "material-ui/FlatButton";
import "./pendinglist.css";
const styles = {
  customWidth: {
    width: 300
  },
  block: {
    maxWidth: 300
  },
  radioButton: {
    marginBottom: 16
  },
  widget: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 10,
    width: 300
  }
};

export default class FormPendingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personValue: this.props.dataPerson["value"],
      date: "today",
      dateFormat: moment().format("YYYYMMDD"),
      list: "pending",
      summary: [],
      tab: "Individual",
      role: this.props.role
    };
  }
  handleChangePerson = (event, index, value) => {
    this.setState({ personValue: value });
  };
  handleDate = (event, index, value) => {
    let dateFormat;
    switch (index) {
      case "yesterday":
        dateFormat = moment()
          .subtract(1, "days")
          .format("YYYYMMDD");
        break;
      case "today":
        dateFormat = moment().format("YYYYMMDD");
        break;
      case "tomorrow":
        dateFormat = moment()
          .add(1, "days")
          .format("YYYYMMDD");
        break;
      default:
    }
    this.setState({ date: index, dateFormat: dateFormat });
  };
  handleList = (event, index, value) => {
    this.setState({ list: index });
  };
  handleReport = value => {
    this.props.onSelect(
      this.props.data[this.state.personValue].teamWorkID,
      this.state.dateFormat,
      this.state.list
    );
    let temp = [];
    temp = this.state.summary;
    const descript = `${this.props.data[this.state.personValue].name}'s ${
      this.state.list
    } list, shown date of ${this.state.date},`;
    temp.push(descript + " " + value + " at " + moment().format(" h:mm A"));
    this.setState({ summary: temp });
  };
  handleReportIris = () => {
    this.props.onSelect(null, null, "iris");
    let temp = [];
    temp = this.state.summary;
    const descript = `Iris' list, shown date of ${this.state.date},`;
    temp.push(descript + "at " + moment().format(" h:mm A"));
    this.setState({ summary: temp });
  };
  getWidgetHeader = x => {
    let sty;
    sty = x != "Person" ? { marginBottom: 20 } : null;
    return (
      <div style={sty}>
        <strong>{x}</strong>
      </div>
    );
  };
  getLabel = n => {
    let d;
    switch (n) {
      case -1:
        d =
          moment()
            .subtract(1, "days")
            .format("YYYYMMDD") +
          " " +
          "(Yesterday)";
        break;
      case 1:
        d =
          moment()
            .add(1, "days")
            .format("YYYYMMDD") +
          " " +
          "(Tomorrow)";
        break;
      default:
        d = moment().format("YYYYMMDD") + " " + "(Today)";
    }
    return d;
  };
  handleChangeTabs = value => {
    this.setState({
      tab: value
      //rows: this.props.rows
    });
  };
  renderTab = value => {
    const sty = (a, b) => {
      return a == b
        ? {
            pointerEvents: "none",
            textDecoration: "none",
            backgroundColor: "#E0E0E0",
            //fontSize: "20px",
            //  color: "#440000",
            borderWidth: "1px 4px 1px 4px",
            borderStyle: "solid",
            marginRight: "2px",
            height: "38px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            borderBottom: "1px solid #E0E0E0",
            zIndex: 2
          }
        : {
            //textDecoration: "underline",
            backgroundColor: "#d6d6d6",
            //  color: "#fff",
            borderWidth: "1px 1px 1px 1px",
            borderStyle: "solid",
            marginRight: "2px",
            height: "38px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            borderBottom: "1px solid #333",
            zIndex: 2
          };
    };
    const renderLabelStyle = (a, b) => {
      return a == b ? { opacity: 1 } : { opacity: 0.3 };
    };
    return (
      <FlatButton
        onClick={() => this.handleChangeTabs(value)}
        label={value}
        labelStyle={renderLabelStyle(this.state.tab, value)}
        style={sty(this.state.tab, value)}
        className={"vertBar"}

        //disabled={this.state.tab == value}
      />
    );
  };
  /*
  renderTab = value => {
    console.log("Grid renderTab " + value + " " + this.state.tab);
    const styl = {
      borderWidth: "1px 1px 0px 1px",
      borderStyle: "solid",
      marginRight: "1px",
      height: "28px",
      borderTopLeftRadius: "6px",
      borderTopRightRadius: "6px",
      paddingBottom: "4px"
    };
    return (
      <FlatButton
        onClick={() => this.handleChangeTabs(value)}
        label={value}
        style={styl}
        disabled={this.state.tab == value ? true : false}
      />
    );
  };
  */
  showPersonDD = data => {
    return (
      <div style={styles.widget}>
        {this.getWidgetHeader("Person")}
        <div>
          <DropDownMenu
            value={this.state.personValue || 0}
            onChange={this.handleChangePerson}
            style={styles.customWidth}
            autoWidth={false}
            id="first"
          >
            {data.map((row, index) => (
              <MenuItem value={index} primaryText={row.possessive} />
            ))}
          </DropDownMenu>
        </div>
      </div>
    );
  };
  showDateWidget = () => {
    return (
      <div style={styles.widget}>
        {this.getWidgetHeader("Date")}
        <div>
          <RadioButtonGroup
            name="rbg1"
            defaultSelected="today"
            style={{ marginLeft: 20, width: 100 }}
            onChange={this.handleDate}
          >
            <RadioButton
              value="yesterday"
              label={this.getLabel(-1)}
              style={styles.radioButton}
            />
            <RadioButton
              value="today"
              label={this.getLabel(0)}
              style={styles.radioButton}
            />
            <RadioButton
              value="tomorrow"
              label={this.getLabel(1)}
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </div>
      </div>
    );
  };
  showWhichList = () => {
    return (
      <div style={styles.widget}>
        {this.getWidgetHeader("Which list")}
        <div>
          <RadioButtonGroup
            name="rbg2"
            defaultSelected="pending"
            style={{ marginLeft: 20 }}
            onChange={this.handleList}
          >
            <RadioButton
              value="pending"
              label="Pending"
              style={styles.radioButton}
            />
            <RadioButton
              value="update"
              label="Update"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </div>
      </div>
    );
  };
  showEmailReport = () => {
    return (
      <div style={styles.widget}>
        {this.getWidgetHeader("Email report")}
        <div>
          <RaisedButton
            label="Email to self"
            style={{ marginLeft: 20 }}
            backgroundColor="#f58c32"
            labelColor={white}
            onClick={() => this.handleReport("emailed to self")}
          />
        </div>
      </div>
    );
  };
  showIris = () => {
    return (
      <div style={styles.widget}>
        {this.getWidgetHeader("Iris")}
        <div>
          <RaisedButton
            label="Iris"
            style={{ marginLeft: 20 }}
            backgroundColor="#f58c32"
            labelColor={white}
            onClick={() => this.handleReportIris()}
          />
        </div>
      </div>
    );
  };
  render() {
    const { data, dataPerson } = this.props;
    const { tab, role } = this.state;
    return (
      <WidgetBase title={"Pending list"}>
        <Paper style={{ padding: 30 }}>
          {this.renderTab("Individual")}
          {role == "adminSubmitter" && this.renderTab("Iris")}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTop: "1px solid black",
              padding: "20px"
            }}
          >
            {tab == "Individual" && this.showPersonDD(data)}
            {tab == "Individual" && this.showDateWidget()}
            {tab == "Individual" && this.showWhichList()}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "flex-start"
            }}
          >
            {tab == "Individual" && this.showEmailReport()}
            {tab == "Iris" && this.showIris()}
            <div style={styles.widget}>
              {this.getWidgetHeader("SUMMARY")}
              <div style={{ marginLeft: 20 }}>
                {this.state.summary.length > 0
                  ? this.state.summary.map(x => (
                      <React.Fragment>
                        <div>
                          <em>{x}</em>
                        </div>
                        <br />
                      </React.Fragment>
                    ))
                  : "Details of generated report shows here."}
              </div>
            </div>
          </div>
        </Paper>
      </WidgetBase>
    );
  }
}
