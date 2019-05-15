import React, { Component } from "react";
import * as R from "ramda";
import FishEye from "material-ui/svg-icons/image/panorama-fish-eye";
import Fill from "material-ui/svg-icons/image/brightness-1";
import "./InOffice.css";
import Moment from "moment";
import { Log } from "../../utils/utils";

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  onSelect = () => {
    //console.log("Row.onSelect  ");
    this.props.onSelect();
  };
  componentWillReceiveProps(nextProps) {
    //  console.log("Presence.Row compwillRecProps");
    //console.table(nextProps.data);
    this.setState({
      data: nextProps.data
    });
  }
  render() {
    const {
      firstName,
      lastName,
      returnMessage,
      isInvisible,
      lastSeenTimestamp,
      uuid
    } = this.props.data;

    /*
    const count = () => {
      console.log("Row.count");
      const arr = [];
      const t = this.props.data.map(x => {
        return x.firstName;
      });
      console.log("t " + JSON.stringify(t));
    };
*/
    const getName = (firstName, lastName) => {
      const headLens = R.lensIndex(0);
      if (this.props.showLastInitial) {
        return firstName + R.view(headLens, lastName.split(""));
      }
      return firstName ? firstName : "no name";
    };
    /* FIX */
    const status = this.props.status;
    const { color } = this.props;
    const getBackgroundColor = () => {
      return color ? "#ccc" : "#A4AECB";
    };
    const light = [
      {
        name: "green",
        n: "1",
        justifyContent: "flex-start",
        color: "#007700",
        icon: "Fill"
      },
      {
        name: "red",
        n: "2",
        justifyContent: "flex-end",
        color: "#ed0000",
        icon: "Fill"
      },
      {
        name: "yellow",
        n: "0",
        justifyContent: "flex-end",
        color: "#e8dc00",
        icon: "FishEye"
      }
    ];
    const filterLight = n => {
      const obj = R.find(x => x.n == n, light);
      return (
        <div
          style={{
            display: "flex",
            justifyContent: obj.justifyContent
          }}
        >
          {obj.icon === "Fill" ? (
            <Fill
              style={{ color: obj.color }}
              className="svg_icons-large-screen"
            />
          ) : (
            <FishEye
              style={{ color: obj.color }}
              className="svg_icons-large-screen"
            />
          )}
        </div>
      );
    };
    const truncateUTCtime = timestamp => {
      return Number(String(timestamp).substring(0, 10));
    };
    const lastSeenStatus = timestamp => {
      //  Log("Row lastSeenStatus " + timestamp);
      let now, minAgo5, minAgo10;
      now = Moment.utc().valueOf();
      now = truncateUTCtime(now);
      minAgo5 = Moment()
        .subtract(5, "minutes")
        .utc()
        .valueOf();
      minAgo5 = truncateUTCtime(minAgo5);
      minAgo10 = Moment()
        .subtract(10, "minutes")
        .utc()
        .valueOf();
      minAgo10 = truncateUTCtime(minAgo10);
      /*
      Log("NOW " + now);
      Log(
        "5 mins ago " +
          Moment()
            .subtract(5, "minutes")
            .utc()
            .valueOf()
      );
      Log(
        "10 mins ago " +
          Moment()
            .subtract(10, "minutes")
            .utc()
            .valueOf()
      );
      */
      if (!timestamp) {
        return filterLight(2);
      } else if (minAgo10 > timestamp) {
        return filterLight(2);
      } else if (minAgo5 > timestamp) {
        return filterLight(0);
      } else {
        return filterLight(1);
      }
    };

    return (
      <div
        onClick={this.onSelect}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "7px",
          backgroundColor: getBackgroundColor(),
          alignItems: "center"
        }}
      >
        <div style={{ width: "55px" }}>
          {lastSeenStatus(this.state.data.lastSeenTimestamp)}
        </div>
        <div style={{ width: "5%", fontSize: "large" }}>
          {!isInvisible ? (
            <strong>{getName(firstName, lastName)}</strong>
          ) : (
            <div style={{ color: "#888" }}>{getName(firstName, lastName)}</div>
          )}
        </div>
        <div style={{ width: "40%", fontSize: "large" }}>
          {this.state.data.returnMessage}
        </div>
      </div>
    );
  }
}

export default Row;
