import React, { Component } from "react";
import "./css/style.css";

class WelcomeScreen extends Component {
  render() {
    return (
      <div style={{ width: "1100px" }} className="intro">
        <div id="div-wrapper" className="main">
          <div id="div-header">
            <div id="div-logo" />
          </div>

          <div id="div-info" className="h-divider main">
            <div style={{ display: "flex" }}>
              <div id="info" className="main">
                <div style={{ fontSize: "1.5em", paddingBottom: "20px " }}>
                  Welcome to the Blue Spruce Intranet Portal
                </div>

                <div style={{ fontSize: "1.2em" }}>
                  You will see this screen upon login until you set your first
                  “Favorite” in the main menu.
                </div>
                <div style={{ fontSize: "1.2em" }}>
                  Your first-listed Favorite will then become your home screen.
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", alignContent: "stretch" }}
            className="h-divider"
          >
            <div
              id="img-realestate"
              style={{ width: "33%", backgroundRepeat: "no-repeat" }}
            />
            <div
              id="img-finance"
              style={{ width: "35%", backgroundRepeat: "no-repeat" }}
              className="v-divider"
            />
            <div
              id="img-lng"
              style={{ width: "33%", backgroundRepeat: "no-repeat" }}
              className="v-divider"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
