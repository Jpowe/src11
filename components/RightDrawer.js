import React from "react";
import Drawer from "material-ui/Drawer";
//import { spacing, typography } from "material-ui/styles";
import { white } from "material-ui/styles/colors";
import { CSSTransitionGroup } from "react-transition-group";
import NotificationsContainer from "../containers/NotificationsContainer";
import Badge from "material-ui/Badge";
import NotificationsIcon from "material-ui/svg-icons/social/notifications-active";
import NotificationsNone from "material-ui/svg-icons/social/notifications-none";
import RaisedButton from "material-ui/RaisedButton";
import FastForward from "material-ui/svg-icons/av/fast-forward";
import DoneAll from "material-ui/svg-icons/action/done-all";
import { connect } from "react-redux";
import { deleteAllNotifications, addNotification } from "../actions";
import { data1 } from "./data_notify";
import HighLightOff from "material-ui/svg-icons/action/highlight-off";
import "../index.css";

class RightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: data1,
      items1: this.props.notifications,
      numOfNotifications: 0
    };
  }
  handleRemoveAll = () => {
    this.props.onClick();
  };
  handleAdd = () => {
    this.props.onClickAdd(this.state.data1[0]);
  };
  handleNotificationData = n => {
    this.setState({ numOfNotifications: n });
  };
  /*
  getScreenWidthPX() {
    let w = Math.min(document.documentElement.clientWidth - 320, 1100);
    return `${w}px`;
  }
  */
  render() {
    let { navDrawerOpen, handleChangeRequestNavDrawer } = this.props;
    return (
      <div>
        <Drawer
          docked={true}
          open={navDrawerOpen}
          openSecondary={true}
          width={320}
          style={{
            opacity: navDrawerOpen ? "1" : "0",
            backgroundColor: "blueGrey400"
          }}
          autoWidth={false}
          swipeAreaWidth={30}
        >
          <div>
            <span
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center"
              }}
            >
              <RaisedButton
                label="Dismiss all"
                secondary={true}
                onClick={() => this.handleRemoveAll()}
              />
              <Badge
                onClick={handleChangeRequestNavDrawer}
                badgeContent={this.state.numOfNotifications}
                badgeStyle={
                  this.state.numOfNotifications
                    ? {
                        backgroundColor: "#f58c32",
                        top: 16,
                        right: 8,
                        height: 15
                      }
                    : {
                        backgroundColor: "#4e82af",
                        top: 16,
                        right: 8,
                        height: 15
                      }
                }
                primary={true}
              >
                {this.state.numOfNotifications ? (
                  <NotificationsIcon style={{ color: white }} />
                ) : (
                  <NotificationsNone style={{ color: white }} />
                )}
              </Badge>{" "}
              <HighLightOff
                onClick={handleChangeRequestNavDrawer}
                className="svg_icons-small-screen"
                style={{
                  color: "white",
                  paddingLeft: "20px"
                }}
              />
            </span>
            <hr />
            <NotificationsContainer onData={this.handleNotificationData} />
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(deleteAllNotifications());
  }
});
const RightDrawerContainer = connect(mapStateToProps, mapDispatchToProps)(
  RightDrawer
);
export default RightDrawerContainer;
