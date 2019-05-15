import React from "react";
import Drawer from "material-ui/Drawer";
import { white } from "material-ui/styles/colors";
import RaisedButton from "material-ui/RaisedButton";

import Iframe from "./Iframe.js";

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
          swipeAreaWidth={30}
        >
          <span
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: 10
            }}
          >
            <RaisedButton
              label="Close"
              primary={true}
              onClick={handleChangeRequestNavDrawer}
            />
          </span>
          <hr />
          <Iframe
            url="https://portal.bluesprucecapital.net/present/"
            title="In office"
          />
        </Drawer>
      </div>
    );
  }
}
export default InOfficeDrawer;
