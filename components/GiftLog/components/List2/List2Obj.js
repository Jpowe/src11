import React, { Component } from "react";
import Paper from "material-ui/Paper";

class List2 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { eventType, eventMonth, eventDay, notes } = this.props.data;
    return (
      <Paper zDepth={1}>
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            fontSize: "20px"
          }}
        >
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "4px"
            }}
          >
            Gift event:
          </div>
          <div
            style={{
              border: "1px solid green",
              padding: "4px"
            }}
          >
            <div>
              <span style={{ fontVariant: "small-caps", marginRight: "12px" }}>
                Event type:
              </span>
              {eventType}
            </div>
            <div>
              <span style={{ fontVariant: "small-caps", marginRight: "12px" }}>
                Event date :
              </span>
              {`${eventMonth}/${eventDay}`}
            </div>
            <div>
              <span style={{ fontVariant: "small-caps", marginRight: "12px" }}>
                Event notes:
              </span>
              {notes}
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default List2;
