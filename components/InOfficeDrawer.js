import React from "react";
import Drawer from "material-ui/Drawer";
import { white } from "material-ui/styles/colors";
import RaisedButton from "material-ui/RaisedButton";
import HighLightOff from "material-ui/svg-icons/action/highlight-off";
import "../index.css";

//import Iframe from "./Iframe.js";
import InOffice from "./InOffice/InOfficeContainer.js";

class InOfficeDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items1: this.props.notifications,
      numOfNotifications: null
    };
  }

  getScreenWidthPX() {
    let w = Math.min(document.documentElement.clientWidth - 320, 1100);
    return `${w}px`;
  }
  render() {
    let { navDrawerOpen, handleChangeRequestNavDrawer } = this.props;
    return (
      <Drawer
        docked={true}
        open={navDrawerOpen}
        openSecondary={true}
        width={375}
        style={{
          opacity: navDrawerOpen ? "1" : "0",
          backgroundColor: "blueGrey400"
        }}
        swipeAreaWidth={30}
        autoWidth={false}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%"
          }}
        >
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              paddingTop: "10px"
            }}
          >
            <HighLightOff
              onClick={handleChangeRequestNavDrawer}
              className="svg_icons-small-screen"
              style={{
                color: "white",
                paddingLeft: "20px",
                paddingRight: "20px",
                cursor: "pointer"
              }}
            />
          </span>
          <hr />
          <InOffice
            handleChangeRequestNavDrawer={handleChangeRequestNavDrawer}
          />
        </div>
      </Drawer>
    );
  }
}
export default InOfficeDrawer;
