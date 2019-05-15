import React, { Component } from "react";
import * as R from "ramda";
import { registryStatuses, activeStatuses } from "../common/data";
import FieldDropDown from "./FieldDropDown";
import AutoComplete from "material-ui/AutoComplete";
import FieldText from "./FieldText";
import RaisedButton from "material-ui/RaisedButton";
import Toggle from "material-ui/Toggle";
import TextField from "material-ui/TextField";
import { debounce } from "throttle-debounce";

const styles = {
  block: {
    maxWidth: 150,
    marginLeft: "6px"
  },
  toggle: {
    marginBottom: 16
  },
  thumbOff: {
    backgroundColor: "#ffcccc"
  },
  trackOff: {
    backgroundColor: "#ff9d9d"
  },
  thumbSwitched: {
    backgroundColor: "red"
  },
  trackSwitched: {
    backgroundColor: "#ff9d9d"
  },
  labelStyle: {
    color: "#DF5C33"
  },
  textAreaStyle: {
    backgroundColor: "#ff9d9d"
  }
};

export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: this.props.gei.eventType[0],
      registryStatus: this.props.gei.registryStatus,
      activeStatus: this.props.gei.activeStatus
      /* to do set state of notes so that its not jumping around on edit....but this requires refreshing notes textbox on new gei */
      //  notes: this.props.gei.notes
    };
  }
  componentDidMount() {
    this.state = {
      searchText: this.props.gei.eventType[0]
    };
  }

  componentWillReceiveProps(nextProps) {
    //  console.log("Events nextProps  " + JSON.stringify(nextProps));
    /*
  
    console.log("notes" + JSON.stringify(nextProps.gei.notes[0]));
    console.log(
      "this.props.gei.registryStatus " + this.props.gei.registryStatus
    );
    console.log(
      this.props.gei.registryStatus == "Yes" ||
      this.props.gei.registryStatus == 1
        ? 1
        : 0
    );
    */
    try {
      this.setState({
        registryStatus:
          nextProps.gei.registryStatus == "Yes" ||
          nextProps.gei.registryStatus == 1
            ? 1
            : 2,
        activeStatus:
          nextProps.gei.active[0] == "True" ||
          nextProps.gei.active == true ||
          nextProps.gei.active[0] == 1
            ? 1
            : 2
      });
      if (nextProps.gei.notes[0] !== this.state.notes) {
        console.log("change notes  " + nextProps.gei.notes[0]);
        this.setState({ notes: nextProps.gei.notes[0] });
      }
      this.setState({ searchText: nextProps.gei.eventType[0] });
      if (!nextProps.giftEventTypes) {
        return;
      }
      if (this.state.events) {
        return;
      }
      this.state = {
        events: R.map(x => x.name, nextProps.giftEventTypes)
        //searchText: nextProps.gei.eventType[0]
      };
    } catch (e) {
      console.log("CATCH " + e.message);
    }
  }
  handleChange = event => {
    //this.props.onTextChange(event.value, e.name)
    this.setState({
      value: event.target.value
    });
  };
  handleUpdateInput = searchText => {
    console.log("EVENTS.js handleUpdateInput " + searchText);

    this.setState({
      searchText: searchText
    });
  };
  handleNewRequest = x => {
    this.props.onEvt(x);

    //this.props.onSave({ ...this.props.data, name: x });
  };
  onNew = () => {
    this.setState({ searchText: "" });
    this.props.onNew();
  };
  getSearch = txt => {
    this.setState({ searchText: txt });
    return txt;
  };
  getRegStatus = status => {
    console.log("getRegStatus " + status);
    console.log(status == "Yes" || status == "1" ? 1 : 0);
    return status == "Yes" || status == "1" ? 1 : 0;
  };
  onRegistry = () => {
    console.log("onRegisry");
    let newState = this.state.registryStatus == "Yes" ? "No" : "Yes";
    this.setState({ registryStatus: newState });
    this.props.onRegistry(newState);
  };
  onActive = () => {
    console.log("onActive");
    let newState = this.state.activeStatus == "True" ? "False" : "True";
    this.setState({ activeStatus: newState });
    this.props.onActive(newState);
  };
  render() {
    const { gei } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#A4AECB",
          //backgroundColor: "rgba(173, 216, 230, 0.3)",
          borderBottom: "4px ridge grey"
        }}
      >
        <RaisedButton
          label="NEW"
          backgroundColor={this.props.color}
          labelColor={"#fff"}
          style={{ margin: "15px" }}
          onClick={this.onNew}
        />
        <div style={{ padding: "10px" }}>
          <div style={{ marginLeft: "5px", marginBottom: "16px" }}>
            <FieldText
              obj={{ name: "date", title: "Event date: MM/DD" }}
              data={this.props.gei.date[0]}
              change={this.props.onTextChange}
            />
          </div>
          <Toggle
            label="Recurring"
            labelStyle={styles.labelStyle}
            defaultToggled={this.props.gei.recurring[0]}
            style={styles.block}
            onToggle={(event, isInputChecked) =>
              this.props.ontoggle([isInputChecked])
            }
          />
          <div style={{ marginLeft: "10px" }}>
            {this.state.events && (
              <AutoComplete
                hintText="Select gift event type"
                //  searchText={this.state.searchText}
                searchText={this.state.searchText}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                dataSource={this.state.events}
                //filter={(searchText, key) => key.indexOf(searchText) !== -1}
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true}
              />
            )}
          </div>
        </div>
        <div>
          <div>
            <div style={{ color: "#DF5C33", fontSize: "small" }}>
              Registry status{" "}
            </div>
            <FieldDropDown
              options={registryStatuses}
              status={this.state.registryStatus}
              //data={ }
              onselect={this.props.onRegistry}
            />
          </div>
          <div>
            <div style={{ color: "#DF5C33", fontSize: "small" }}>Active</div>
            <FieldDropDown
              options={activeStatuses}
              status={this.state.activeStatus}
              //data={ }
              onselect={this.props.onActive}
            />
          </div>
        </div>
        <div>
          <TextField
            hintText="Text here"
            floatingLabelText="GIFT EVENT NOTES: (multi line)   "
            multiLine={true}
            rows={2}
            style={{
              width: "500px",
              backgroundColor: "#ddd",
              border: "1px ridge grey",
              padding: "10px"
            }}
            onChange={event =>
              this.props.onTextChange(event.target.value, "notes")
            }
            value={this.state.notes}
            textAreaStyle={styles.textAreaStyle}
          />
        </div>
      </div>
    );
  }
}
