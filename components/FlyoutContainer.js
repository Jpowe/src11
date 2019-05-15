import React, { Component } from "react";
import R from "ramda";
import classNames from "classnames";
import "./App.css";
import Item from "./Item";
import { data1 } from "./data_notify";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import muiThemeable from "material-ui/styles/muiThemeable";
import { connect } from "react-redux";
import { deleteNotification } from "../actions";
import moment from "moment";

/**
 *  NOT CURRENTLY USED
 * THIS IS A REUSE OF NOTIFICATION CONTAINER FOR FLYOUT Notifications
 */
class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    console.log("constructor props.notification: " + this.props.notifications);
    this.state = {
      data1: data1,
      items1: this.getData(),
      level1Selection: null
    };
  }
  componentWillMount() {
    this.setState({
      data: [...this.state.data1]
      //  items1: this.props.notifications,
    });
  }
  componentDidMount() {
    //this.state.data1.map(d => this.props.onClickAdd(d));
  }
  getData() {
    return this.props.notifications;
  }

  onclickLevel = (id, level) => {
    console.log("id level   " + [id, level]);
    console.log(R.filter(x => x.id !== id, this.state["items" + level]));
    this.setState({
      items1: R.filter(x => x.id !== id, this.state["items" + level])
    });

    // console.log(R.map(R.filter(x => x.id !== id) , this.state["items" + level]))
  };

  onTest(id) {
    this.props.onClick2(id);
  }
  onModify() {
    /*clear interval ?? **/
    setInterval(this.setShowNewFalse, 2000);
  }
  tooOld(x) {
    let now = moment(new Date());
    let end = moment(x["time"]);
    let duration = moment.duration(now.diff(end));
    let seconds = duration.asSeconds();
    console.log("SECONDS " + seconds);
    if (seconds > 5) {
      return true;
    }
  }
  setShowNewFalse = () => {
    console.log("test testing " + this.props.notifications);
    //  console.log('notifications lngth: '+x.length )
    let tooOldList = R.filter(x => this.tooOld(x), this.props.notifications);
    //change find to filter and set all to now showNew
    R.map(x => this.props.onClickModify(x.id), tooOldList);
  };
  renderItems() {
    return this.props.notifications.map((item1, index) => (
      <Item
        key={item1.id}
        styl={this.fStyleObj(item1.priority, index)}
        item={item1}
        onclick={() => this.onTest(item1.id)}
      />
    ));
  }

  /* change:  getColor param not used */
  getColor(index) {
    /*
    const arr = [
      this.props.muiTheme.palette.accent1Color,
      "#1a7b70", //darker teal
      "#1a7b70" //darkerer teal
    ];
    let choice = index % arr.length;
    return arr[choice];
    */
    return "#1a7b70";
  }

  fStyleObj(type, index) {
    //console.log("fstyleObj type " + type);
    let temp = "";
    switch (type) {
      case 1:
        temp = {
          backgroundColor: this.props.muiTheme.palette.accent5Color,
          borderTop: "",
          color: "white",
          borderRadius: "5px",
          padding: "5px",
          margin: "5px"
        };
        break;
      default:
        temp = {
          backgroundColor: this.getColor(index),
          borderTop: "",
          color: "white",
          borderRadius: "5px",
          padding: "5px",
          margin: "5px"
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
    return (
      <div>
        <button style={{ backgroundColor: "black" }}>delete shownew</button>
        <div className="overlayNotify">
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={700}
          >
            {this.renderItems()}
          </ReactCSSTransitionGroup>
          <button
            onClick={() => this.onModify(this.props.notifications)}
            style={{ backgroundColor: "black", color: "white", opacity: 0.2 }}
          >
            start delete shownew
          </button>
          <button
            onClick={() =>
              this.props.onClickAdd({
                id: Math.round(Math.random() * 10000, 0),
                title: "Title 6",
                message: "Message text 6",
                messageType: "error",
                priority: 1,
                delet: 0,
                showNew: 1
              })
            }
            style={{ backgroundColor: "blue", color: "white", opacity: 0.2 }}
          >
            add v
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  notifications: R.filter(x => x.showNew, state.notifications)
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick2: id => {
    dispatch(deleteNotification(id));
  }
});
const NotificationContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  NotificationContainer
);

export default muiThemeable()(NotificationContainer2);
