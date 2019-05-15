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
    console.log("handleInOfficeDrawer f");
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
    return this.props.notifications.length || 0;
  }
  getTitle() {
    let str = null;
    const p = this.props.location.pathname;
    console.log("getTitle path== " + p);
    if (p === `/portal/`) {
      return;
    }
    let obj = R.find(R.propEq("endpoint", p))(this.state.data);
    return obj.name;
  }
  setMenuIconSize = () => {
    return this.state.width > 500
      ? "svg_icons-large-screen"
      : "svg_icons-small-screen";
  };
  drawView(style) {
    console.log("drawView f");
    const getDrawerIcon = () => {
      return (
        <Menu
          onClick={this.props.handleChangeRequestNavDrawer}
          color={white}
          className={this.setMenuIconSize()}
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
              width: this.widthAllIcons()
            }}
          >
            <div>
              <span style={style.headerItems}>{getDrawerIcon()}</span>
              <span style={style.headerItems}>
                {this.state.width > 600 || !this.props.open
                  ? this.getTitle()
                  : null}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                flexWrap: "nowrap",
                marginRight: 20
              }}
            >
              <div>
                <IconMenu
                  color={white}
                  iconButtonElement={
                    <IconButton>
                      <MoreVertIcon
                        color={white}
                        iconStyle={{ color: "#ffffff" }}
                        className="svg_icons"
                      />
                    </IconButton>
                  }
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  targetOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  <MenuItem
                    key={2}
                    primaryText="InOffice"
                    onClick={() => this.handleInOfficeDrawer()}
                  />
                  <a href="mailto:support@bluesprucecapital.net?subject=&lt;Please%20enter%20subject%20here&gt;&body=&lt;Please%20enter%20body%20of%20support%20ticket%20here&gt;">
                    <MenuItem
                      key={1}
                      primaryText="Support"
                      onClick={() => console.log("Support clicked")}
                    />
                  </a>
                </IconMenu>

                <Badge
                  onClick={this.props.handleChangeRequestRightDrawer}
                  badgeContent={this.badgeContentAmount()}
                  badgeStyle={
                    this.props.notifications.length
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
                  {this.props.notifications.length ? (
                    <NotificationsIcon style={{ color: white }} />
                  ) : (
                    <NotificationsNone style={{ color: white }} />
                  )}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
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
      }
    };
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
  notifications: state.notifications.notifications,
  lastUpdated: state.notifications.lastUpdated
});

const HeaderLink = connect(mapStateToProps)(Header);
export default withRouter(HeaderLink);
//export default HeaderLink;
