import React, { Component } from "react";
import { connect } from "react-redux";
import { getToken } from "../actions";
import IframeComm from "react-iframe-comm";

class InOfficeIframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childData: ""
    };
  }
  render() {
    console.log("Iframe this.props.token " + this.props.token);
    const token = this.props.token;
    const attributes = {
      src: "https://portal.bluesprucecapital.net/addepar/",
      //src: "http://localhost:3001",
      //src: "/wrapper.html",
      width: "1000",
      height: "1000",
      frameBorder: 1 // show frame border just for fun...
    };
    /**the postMessage data you want to send to your iframe **/
    /** it will be send after the iframe has loaded **/
    //  const postMessageData = "Message from parent";

    /******
     /** TO   DO   .  CHECK E ORIGIN  **/
    //e.origin   and e. message ...verify e.origin
    //window.lcoation.protical.   window.location.host
    /*******/

    /**
     * parent received a message from iframe
     */

    const onReceiveMessage = event => {
      /*  TO DO myOrigin should have a * */
      let myOrigin = window.location.protocol + "//" + window.location.host;
      const strCompare = "bluesprucecapital.net";
      if (myOrigin.indexOf(strCompare) == -1) {
        return;
      }
      /*
      if (event.origin != myOrigin) {
        return;
      }
      */

      console.log("Parent says: onReceiveMessage " + event.data);
      console.log("token inside onReceiveMessage " + token);
      const message = JSON.parse(event.data).message;
      if (message === "authenticate") {
        event.source.postMessage(
          JSON.stringify({
            message: "jwt",
            data: token
          }),
          "*"
        );
      }
    };
    /** iframe has loaded **/
    const onReady = xx => {
      console.log("onReady");
    };
    const show = () => {
      return (
        <div style={{ padding: "20px" }}>PARENT: {this.state.childData}</div>
      );
    };
    return (
      <div>
        <IframeComm
          attributes={attributes}
          handleReady={onReady}
          handleReceiveMessage={onReceiveMessage}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.notifications.token
});

const InOfficeIframe2 = connect(mapStateToProps)(InOfficeIframe);

export default InOfficeIframe2;
