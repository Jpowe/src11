import React, { Component } from "react";
import { connect } from "react-redux";
import IframeComm from "react-iframe-comm";
import "../widget.css";
import muiThemeable from "material-ui/styles/muiThemeable";
import WidgetBase from "./WidgetBase";
import { callModuleConfig } from "../actions";

class Iframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childData: "",
      width: Math.max(355, window.innerWidth - 280)
    };
    console.log("IFRAME call http");
    this.props.callModuleConfig();
  }
  componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }
  render() {
    const token = this.props.token;
    const attributes = {
      //  src: "https://portal.bluesprucecapital.net/present/",
      /* change to props. flowwright prefex, and props.url */
      //  src: this.props.url,
      src: `${this.props.flowWrightURL}${this.props.url}`,
      width: this.state.width,
      height: "1000"
      //frameBorder: 1 // show frame border just for fun...
    };
    const styles = {
      content: {
        padding: 4
      },
      text: {
        //fontWeight: "lighter",
        fontSize: 16,
        color: "#ffffff",
        backgroundColor: "#220088",
        padding: "4px 0  4px 8px",
        borderRadius: "5px",
        textAlign: "center"
      },
      paper: {
        borderRadius: "5px"
      }
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
        {this.props.flowWrightURL && (
          <WidgetBase title={this.props.title}>
            <IframeComm
              attributes={attributes}
              handleReady={onReady}
              handleReceiveMessage={onReceiveMessage}
            />
          </WidgetBase>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.notifications.token,
  flowWrightURL: state.notifications.flowWrightURL
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  callModuleConfig: () => {
    dispatch(callModuleConfig());
  }
});
const Iframe2 = connect(mapStateToProps, mapDispatchToProps)(Iframe);
export default muiThemeable()(Iframe2);
