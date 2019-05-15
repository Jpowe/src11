import React from "react";
import Drawer from "material-ui/Drawer";
import { spacing, typography } from "material-ui/styles";
//import { white, blue600, blueGrey400 } from "material-ui/styles/colors";
//import BackgroundImage from "react-background-image-loader";
import Pic from "../images/Logo_words_200w.png";
//import Pic from "../images/squares-small.jpg";
import { connect } from "react-redux";

import NavContainer from "./nav/NavContainer";
import { withRouter } from "react-router-dom";
//import Pic from "../images/nav_green9.jpg";

class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: this.props.navDrawerOpen
      //closeDrawer: false
    };
  }
  componentWillMount() {}
  componentDidMount() {
    console.log(
      "New URL from LeftDrawer",
      this.props.history.location.pathname
    );
    this.props.history.listen(() => {
      if (this.props.smallScreen) {
        console.log("smallScreen ");
        this.setState({ navDrawerOpen: false });
      }
    });
  }
  render() {
    //let { navDrawerOpen } = this.state;

    const styles = {
      logo: {
        cursor: "pointer",
        fontSize: 12,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        //backgroundColor: blueGrey400,
        paddingLeft: 40,
        height: 56,
        background: `url(${Pic})`,
        backgroundRepeat: "no-repeat"
      },
      bckgrndPic: {
        background: `url(${Pic})`,
        backgroundRepeat: "no-repeat",
        fontSize: 12,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        width: "80%",
        height: "50px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        /*border: "1px solid red",*/
        marginLeft: "10px",
        marginTop: "20px"
      },
      avatar: {
        icon: {
          float: "left",
          display: "block",
          marginRight: 15,
          boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)"
        },
        span: {
          paddingTop: 12,
          display: "block",
          color: "white",
          fontWeight: 300,
          textShadow: "1px 1px #444"
        }
      }
    };
    return (
      <Drawer docked={true} open={this.props.navDrawerOpen}>
        <div
          style={{
            position: "relative",
            height: "100%",
            overflow: "hidden"
          }}
        >
          <img
            src={require("../images/left-nav-D.jpg")}
            style={{
              opacity: 0.7,
              paddingBottom: "50px"
            }}
            alt="leftnav"
          />
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0",
              width: "100%"
              //overflowY: "auto",
              //overflowX: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                //top: "650px",
                top: "0px",
                left: "10px",
                width: "100%"
              }}
            >
              <div style={styles.bckgrndPic} />
            </div>
            <div style={{ paddingTop: "40px" }}>
              <NavContainer closeSelf={this.props.closeSelf} />
            </div>
          </div>
        </div>
      </Drawer>
    );
  }
}

LeftDrawer.contextTypes = {
  //  store: PropTypes.object
};

LeftDrawer.propTypes = {
  //  notifications: PropTypes.array
};
const wR = withRouter(LeftDrawer);
export default connect(state => ({ notifications: state.notifications }))(wR);
