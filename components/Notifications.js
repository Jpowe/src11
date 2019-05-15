import React, { Component } from "react";
import R from "ramda";
import classNames from "classnames";
import "./App.css";
//import NotifyCard from "./NotifyCard";
import Item from "./Item";
//import { data1 } from "./data_notify";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import muiThemeable from "material-ui/styles/muiThemeable";

//import { connect } from "react-redux";
//import { getNotifications, deleteNotification } from "../actions";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items1: this.getData(),
      level1Selection: null
    };
  }
  componentWillMount() {}
  componentDidMount() {
    //  this.state.data1.map(d => this.props.onClickAdd(d));
  }
  getData() {
    return this.props.notifications;
  }
  delete = id => {
    console.log("Notifications.delete f id " + id);
    this.props.onclick(id);
  };
  renderItems() {
    return this.props.notifications.map((item1, index) => (
      <Item
        key={item1.uuid}
        styl={this.fStyleObj(item1.urgent, index)}
        item={item1}
        onclick={() => this.delete(item1.uuid)}
      />
    ));
  }
  /* change:  getColor param not used */
  getColor(index) {
    /*
    const arr = [
      this.props.muiTheme.palette.accent1Color,
      this.props.muiTheme.palette.accent3Color,
      this.props.muiTheme.palette.accent4Color,
    ]
    let choice = index % arr.length
    return arr[choice]
    */
    return "#1a7b70"; //darkerest teal
  }

  fStyleObj(type, index) {
    let temp = "";
    switch (type) {
      case true:
        temp = {
          backgroundColor: this.props.muiTheme.palette.accent5Color,
          borderTop: "",
          color: "white",
          borderRadius: "5px",
          paddingLeft: "6px",
          paddingBottom: "20px",
          margin: "5px",
          width: "280px"
        };
        break;
      default:
        temp = {
          backgroundColor: this.getColor(index),
          borderTop: "",
          color: "white",
          borderRadius: "5px",
          paddingLeft: "6px",
          paddingBottom: "20px",
          margin: "5px",
          width: "280px"
        };
    }
    return temp;
  }
  fStyle(type) {
    //console.log("fstyle type " + type);
    let temp = "";
    switch (type) {
      case "success":
        temp = "todoitem success";
        break;
      case "error":
        temp = " todoitem error";
        break;
      case "warning":
        temp = "todoitem warning";
        break;
      case "info":
        temp = "todoitem info";
        break;
      default:
        temp = "todoitem info";
    }
    return temp;
  }

  render() {
    //console.log('notifications(from container): '+this.props.notifications)
    //const { primary3Color } = this.props.muiTheme.palette.primary3Color;
    const cssLevel1 = classNames({});
    const cssLevel2 = classNames({});
    const cssLevel3 = classNames({});
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={700}
        >
          {this.renderItems()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default muiThemeable()(Notifications);
