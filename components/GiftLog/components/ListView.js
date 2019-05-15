import React, { Component } from "react";
import { connect } from "react-redux";
import TableGiftEventsContainer from "./TableGiftEventsContainer";
import MonthDropDown from "./MonthDropDown";
import GiftEventTypeDropDown from "./GiftEventTypeDropDown";
import CircleAdd from "material-ui/svg-icons/image/control-point";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventType: "all"
    };
  }
  componentDidMount() {}
  filterEventType = et => {
    console.log("filterEventType " + et);
    const a = et === "01" ? "all" : et == "02" ? "incidental" : "recurring";
    this.setState({ eventType: a });
  };
  render() {
    const { title } = this.props;
    return (
      <div>
        <div
          style={{
            display: "flex",
            height: "50px",
            padding: "4px",
            justifyContent: "space-between",
            alignItems: "flex-end",
            border: "4px solid #6076A9",
            backgroundColor: "#f4dfb7"
          }}
        >
          <div>
            <MonthDropDown />
          </div>
          <div>
            <GiftEventTypeDropDown setFilterEventType={this.filterEventType} />
          </div>
          <div
            onClick={() => this.props.onNew()}
            style={{
              backgroundColor: "#f58c32",
              color: "white",
              borderRadius: "4px",
              padding: "4px",
              margin: "4px",
              cursor: "pointer",
              width: "150px"
            }}
          >
            <span style={{ fontVariant: "small-caps" }}>New gift event</span>
            <CircleAdd color="#fff" />
          </div>
        </div>
        <TableGiftEventsContainer
          onNew={() => this.props.onNew()}
          onEdit={() => this.props.onEdit()}
          eventType={this.state.eventType}
        />
      </div>
    );
  }
}

export default ListView;
