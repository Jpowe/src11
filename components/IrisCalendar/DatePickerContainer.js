import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { submitCalendar } from "./actions";
import { getEndPoints } from "../../utils/utils";
import DateRangePicker from "./MyDateRangePicker";

class DatePickerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* ROLES == 'adminSubmitter" || "submitter"'*/
    };
  }
  onSubmit = (start, end) => {
    console.log("DatePickerContainer onSubmit start end " + [start, end]);
    this.props.onselect(start, end);
  };
  render() {
    return (
      <div>
        {this.props.allowed ? (
          <DateRangePicker
            onSubmit={this.onSubmit}
            color={"#DF5C33"}
            rangeColors={["#DF5C33"]}
            response={this.props.response}
            disabled={!this.props.loaded}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  allowed: state.notifications.user
    ? R.contains("Iris PA", getEndPoints(state.notifications.user.roles))
    : null,
  response: state.irisCalendar.response ? state.irisCalendar.response : null,
  loaded: state.irisCalendar.loaded ? state.irisCalendar.loaded : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onselect: (startDate, endDate) => {
    dispatch(submitCalendar(startDate, endDate));
  }
});

const DatePickerContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePickerContainer);

export default DatePickerContainer2;
