import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  getNotifications,
  getNotifications2,
  deleteNotification
} from "../actions";
import Notifications from "../components/Notifications.js";
let to;
class TableContainer extends Component {
  constructor(props) {
    super(props);
  }
  /*temporary  TURN ON NOTIFICATIONS EVERY MINUTE **/
  componentWillMount() {
    this.props.getNotifications();
    to = setInterval(this.props.getNotifications2, 60000);
  }
  componentWillUnmount() {
    clearInterval(to);
  }
  onData() {
    if (this.props.notifications) {
      this.props.onData(this.props.notifications.length);
    }
    return this.props.notifications ? (
      <Notifications
        notifications={this.props.notifications}
        onclick={this.props.onClick2}
      />
    ) : null;
  }
  render() {
    return <div>{this.onData()}</div>;
  }
}
const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications.notifications,
  lastUpdated: state.notifications.lastUpdated
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getNotifications: x => {
    dispatch(getNotifications());
  },
  getNotifications2: x => {
    dispatch(getNotifications2());
  },
  onClick2: id => {
    dispatch(deleteNotification(id));
  }
});
const TableContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  TableContainer
);

export default TableContainer2;
