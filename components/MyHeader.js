import React from "react";
import R from "ramda";
import Menu from "material-ui/svg-icons/navigation/menu";
//import ViewModule from "material-ui/svg-icons/action/view-module";
import { white } from "material-ui/styles/colors";
//import SearchBox from "./SearchBox";
import FlatButton from "material-ui/FlatButton";
import Badge from "material-ui/Badge";
import NotificationsIcon from "material-ui/svg-icons/social/notifications-active";
import NotificationsNone from "material-ui/svg-icons/social/notifications-none";
import AccountBox from "material-ui/svg-icons/action/account-box";
//import muiThemeable from "material-ui/styles/muiThemeable";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { data1, data2, data3 } from "./nav/data";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import "./MyHeader.css";
import Mail from "material-ui/svg-icons/communication/contact-mail";
import Presence from "material-ui/svg-icons/notification/tap-and-play";
import "./Tooltip.css";
import { getEndPoints } from "../utils/utils";

const style = {
  appBar: {
    position: "fixed",
    top: 0,
    overflow: "hidden",
    maxHeight: 1142
  },
  menuButton: {
    marginLeft: 10
  },
  iconsRightContainer: {
    //  marginLeft: 20,
    marginTop: "-10px",
    marginRight: 40,
    display: "flex",
    alignItems: "center"
  },
  headerItems: {
    marginRight: 20,
    marginLeft: 20,
    fontSize: 24
  },
  headerItemsSmall: {
    marginRight: 20,
    marginLeft: 20,
    fontSize: 18
  }
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      data1: data1,
      data2: data2,
      data3: data3,
      width: window.innerWidth
    };
  }
  componentWillMount() {
    this.setState({
      data: [...this.state.data1, ...this.state.data2, ...this.state.data3]
    });
  }
  componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({ width: window.innerWidth })
    );
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: window.innerWidth })
    );
  }
  /* Notifications functions */
  /*
  dispatchNotification(fn, timeout) {
    setTimeout(() => {
      this.context.store.dispatch(fn(notificationOpts));
    }, timeout);
  }*/
  /*
  handleBadge() {
    console.log("handleBadge  and dispatch");
    //this.context.store.dispatch(Notifications.removeAll());
    //this.context.store.dispatch(Notifications.hide(1));
    this.props.handleChangeRequestRightDrawer();
    ///this.context.store.dispatch(addNotification);
  }
  */
  /* end Notifications functions */
  handleInOfficeDrawer = () => {
    //console.log("handleInOfficeDrawer f");
    this.props.handleInOfficeDrawer();
  };
  placeIcons = () => {
    return this.props.open ? "230px" : "0px";
  };
  widthAllIcons = () => {
    let offset = 0;
    offset = this.props.open ? 270 : 40;
    return `${this.state.width - offset}px`;
  };
  badgeContentAmount() {
    return this.props.notifications ? this.props.notifications.length : 0;
  }
  getTitle() {
    const p = this.props.location.pathname;
    //console.log("getTitle path== " + p);
    if (p === `/portal/`) {
      return;
    }
    let obj = R.find(R.propEq("endpoint", p))(this.state.data);
    //console.table(obj);

    return this.state.width > 500 ? (
      <span style={style.headerItems}>
        {obj.parentName ? obj.parentName : obj.name}
      </span>
    ) : (
      <span style={style.headerItemsSmall}>
        {obj.parentName ? obj.parentName : obj.name}
      </span>
    );
  }
  setMenuIconSize = () => {
    return this.state.width > 500
      ? "svg_icons-large-screen"
      : "svg_icons-small-screen";
  };
  drawView(style) {
    //console.log("drawView f");
    const getDrawerIcon = () => {
      return (
        <Menu
          onClick={this.props.handleChangeRequestNavDrawer}
          color={white}
          className={this.setMenuIconSize()}
          style={{ cursor: "pointer" }}
        />
      );
    };
    return (
      <div
        style={{
          position: "fixed",
          zIndex: "10"
        }}
      >
        <div
          style={{
            position: "relative",
            opacity: 0.95,
            height: "60px",
            overflow: "hidden"
          }}
        >
          <img
            src={require("../images/nav_green9.jpg")}
            alt=""
            width={this.state.width}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: this.placeIcons(),
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              //border: "1px solid white",
              width: this.widthAllIcons()
            }}
          >
            <div>
              <span style={style.headerItems}>{getDrawerIcon()}</span>
              {this.props.open && this.state.width < 500
                ? null
                : this.getTitle()}
            </div>

            <div style={{ display: "flex" }}>
              {this.props.allowPresence && (
                <div
                  tooltip="Presence"
                  tooltip-position="left"
                  style={{ marginLeft: "20px" }}
                >
                  <Presence
                    color={white}
                    onClick={this.handleInOfficeDrawer}
                    className={"svg_icons-large-screen"}
                    style={{ cursor: "pointer", marginRight: "20px" }}
                  />
                </div>
              )}

              <div
                tooltip="Support"
                tooltip-position="left"
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                <a href="mailto:support@bluesprucecapital.net?subject=&lt;Please%20enter%20subject%20here&gt;&body=&lt;Please%20enter%20body%20of%20support%20ticket%20here&gt;">
                  <Mail color={white} className={"svg_icons-large-screen"} />
                </a>
              </div>

              <div style={{ cursor: "pointer" }}>
                {this.state.width < 500 && this.props.open ? null : (
                  <Badge
                    onClick={this.props.handleChangeRequestRightDrawer}
                    badgeContent={this.badgeContentAmount()}
                    badgeStyle={
                      this.badgeContentAmount()
                        ? {
                            backgroundColor: "#f58c32",
                            top: 0,
                            right: -20,
                            height: 15
                          }
                        : {
                            backgroundColor: "#4e82af",
                            top: 0,
                            right: -20,
                            height: 15
                          }
                    }
                    primary={true}
                    style={{ padding: "0px" }}
                  >
                    {this.badgeContentAmount() ? (
                      <NotificationsIcon
                        style={{ color: white }}
                        className={"svg_icons-large-screen"}
                      />
                    ) : (
                      <NotificationsNone
                        style={{ color: white }}
                        className={"svg_icons-large-screen"}
                      />
                    )}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.lastUpdated ? this.drawView(style) : <div>Loading</div>}
      </div>
    );
  }
}

Header.contextTypes = {
  //  store: PropTypes.object
};

Header.propTypes = {
  //notifications: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications.notifications
    ? state.notifications.notifications
    : null,
  lastUpdated: state.notifications.lastUpdated,
  allowPresence: state.notifications.user
    ? R.contains("UpdatePresence", getEndPoints(state.notifications.user.roles))
    : null
});

const HeaderLink = connect(mapStateToProps)(Header);
export default withRouter(HeaderLink);
//export default HeaderLink;
