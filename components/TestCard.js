import React, { Component } from "react";
import "./App.css";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

import muiThemeable from "material-ui/styles/muiThemeable";
import "../widget.css";
import NotificationContainer from './NotificationContainer'

class NotifyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //one: true,
      title: "what",
      expanded: false
    };
    this.testFunc = this.testFunc.bind(this);
  }
  testFunc() {
    return this.state.title;
  }
  handleExpandChange() {
    console.log("handleExpandChange");
  }
  handleToggle() {
    console.log("handleToggle");
  }
  render() {
    const { onclick } = this.props;
    return (
      <div className="overlayNotify">
       <NotificationContainer />

      </div>
    );
  }
}

export default  muiThemeable()(NotifyCard);
