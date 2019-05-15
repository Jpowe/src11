import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { saveFormGift } from "../../actions";

import Form from "./Form";
import { fieldsSummary } from "../../common/data";
import RaisedButton from "material-ui/RaisedButton";
import {
  getCurrentGiftEvent,
  getRequests,
  bIncidentalOrRecurring
} from "../../reducers";
import List2Obj from "../List2/List2Obj";
import List2Array from "../List2/List2Array";
import CircleAdd from "material-ui/svg-icons/image/control-point";
import Edit from "material-ui/svg-icons/image/edit";
import Search from "material-ui/svg-icons/action/search";

class FormContainerRequest extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  addOptions(rows) {
    return rows.map(
      x =>
        x.name === "assignedTo"
          ? { ...x, options: this.props.personalAssistants }
          : x
    );
  }
  eventTypeMessage = typ => {
    /* no event type message for now */
    return;
    /*
    return typ === "incidental"
      ? `Follow up this incidental gift event with another gift event?`
      : "Add another gift event?";
      */
  };
  saveForm = obj => {
    console.log(JSON.stringify(obj));
    const n = R.prop("assignedTo", obj);
    const strTitle = R.prop(
      "title",
      R.find(x => x.value === n, this.props.personalAssistants)
    );
    this.props.saveForm({ assignedTo: strTitle });
  };
  render() {
    const { title } = this.props;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "flex",
              border: "4px solid #6076A9",
              backgroundColor: "#f4dfb7",
              width: "1212px"
            }}
          >
            <div>
              {this.eventTypeMessage(this.props.bIncidentalOrRecurring)}
            </div>
            <div
              onClick={() => this.props.onEdit()}
              style={{
                backgroundColor: "#f58c32",
                color: "white",
                borderRadius: "4px",
                padding: "4px",
                margin: "4px",
                cursor: "pointer"
              }}
            >
              <span style={{ padding: "4px", fontVariant: "small-caps" }}>
                Gift event
              </span>

              <Edit color="#fff" />
            </div>
            <div
              onClick={() => this.props.onAddRequest()}
              style={{
                backgroundColor: "#f58c32",
                color: "white",
                borderRadius: "4px",
                padding: "4px",
                margin: "4px",
                cursor: "pointer"
              }}
            >
              <span style={{ padding: "4px", fontVariant: "small-caps" }}>
                Gift request
              </span>
              <CircleAdd color="#fff" />
              <Edit color="#fff" />
            </div>

            <div
              onClick={() => this.props.onDone()}
              style={{
                backgroundColor: "#f58c32",
                color: "white",
                borderRadius: "4px",
                padding: "4px",
                margin: "4px",
                cursor: "pointer"
              }}
            >
              <span style={{ padding: "4px", fontVariant: "small-caps" }}>
                Gift event list
              </span>
              <CircleAdd color="#fff" />
              <Search color="#fff" />
            </div>
          </div>
        </div>
        {this.props.giftEvent && <List2Obj data={this.props.giftEvent} />}
        {this.props.requests && <List2Array data={this.props.requests} />}
      </div>
    );
  }
}
/*
**  to add assigned to requests  need to get all gifts for a request and then pick first
** gift to get ASSIGNED TO
*/
const mapStateToProps = (state, ownProps) => ({
  personalAssistants: state.giftLog.personalAssistants
    ? state.giftLog.personalAssistants
    : null,
  giftEvent: getCurrentGiftEvent(state),
  requests: getRequests(state),
  bIncidentalOrRecurring: bIncidentalOrRecurring(state)
    ? bIncidentalOrRecurring(state)
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: obj => {
    console.log(JSON.stringify(obj));
    dispatch(saveFormGift(obj));
  }
});

const FormContainerRequest2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainerRequest);

export default FormContainerRequest2;
