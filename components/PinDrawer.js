import React from "react";
import Drawer from "material-ui/Drawer";
import { white } from "material-ui/styles/colors";
import RaisedButton from "material-ui/RaisedButton";
import HighLightOff from "material-ui/svg-icons/action/highlight-off";
import "../index.css";

//import Iframe from "./Iframe.js";
import InOffice from "./InOffice/InOfficeContainer.js";
import NotificationsContainer from "../containers/NotificationsContainer";

class PinDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { navDrawerOpen, handleChangeRequestNavDrawer } = this.props;
    return (
      <div>
        <Drawer
          docked={true}
          open={true}
          openSecondary={false}
          width={700}
          swipeAreaWidth={30}
        >
          <div style={{ display: "flex" }}>
            <InOffice
              handleChangeRequestNavDrawer={() =>
                console.log("PIN inoffice test")
              }
            />
            <NotificationsContainer onData={() => console.log("testPin")} />
          </div>
        </Drawer>
      </div>
    );
  }
}
export default PinDrawer;
