import React, { Component } from "react";
import { connect } from "react-redux";
import TableGiftsContainer from "./TableGiftsContainer";
import MonthDropDown from "./MonthDropDown";
import GiftEventTypeDropDown from "./GiftEventTypeDropDown";
import CircleAdd from "material-ui/svg-icons/image/control-point";
import Dialog from "material-ui/Dialog";
import FormContainerGift from "./Form/FormContainerGift";
import FormContainerOrder from "./Form/FormContainerOrder";
import FormContainerDelivery from "./Form/FormContainerDelivery";
import HistoryContainer from "./HistoryContainer";
import Paper from "material-ui/Paper";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventType: "all",
      open: false
    };
  }
  componentDidMount() {}
  filterEventType = et => {
    console.log("filterEventType " + et);
    const a = et === "01" ? "all" : et == "02" ? "incidental" : "recurring";
    this.setState({ eventType: a });
  };
  onEdit = () => {
    this.setState({ open: true });
  };
  render() {
    const { title } = this.props;
    return (
      <div>
        <Paper zDepth={2}>
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
              <GiftEventTypeDropDown
                setFilterEventType={this.filterEventType}
              />
            </div>
          </div>
        </Paper>
        <TableGiftsContainer
          onNew={() => this.props.onNew()}
          onEdit={() => this.onEdit()}
          eventType={this.state.eventType}
        />
        <Dialog
          modal={false}
          onRequestClose={() => this.setState({ open: false })}
          open={this.state.open}
          autoDetectWindowHeight={false}
          autoScrollBodyContent
          contentStyle={{
            width: "90%",
            height: "90%",
            maxWidth: "none",
            position: "absolute",
            top: "10px"
          }}
        >
          <h3 style={{ padding: "12px" }}>
            Current year (2019): Gift form, Order form, Delivery form.
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >
            <FormContainerGift />
            <FormContainerOrder />
            <FormContainerDelivery />
          </div>
          <div style={{ height: "1000px" }}>
            <HistoryContainer />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ListView;
