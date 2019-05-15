import React, { Component } from "react";
import "./CardAddepar.css";
import Pic1 from "../../images/namaste.jpg";
import Pic2 from "../../images/ZenPortal.png";
import RaisedButton from "material-ui/RaisedButton";
import { white } from "material-ui/styles/colors";
import WidgetBase from "../WidgetBase";
import Table from "./Table/Table";
import { columns } from "./data";
import Replay from "material-ui/svg-icons/av/replay";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      presses: 0,
      width: Math.max(355, window.innerWidth - 280),
      data: this.props.data,
      animation: false
    };
  }
  componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
    console.table(this.props.data);
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("CardAddepar nextProps  " + JSON.stringify(nextProps));
    this.setState({
      data: nextProps.data,
      animation: !nextProps.loaded
    });
  }

  handleButton = () => {
    this.props.onSelect();
    const newItem = {
      createdTimestamp: Date.now(),
      status: "Submited",
      submittedBy: "YOU"
    };
    this.setState({ data: [...this.state.data, newItem] });
    !this.state.presses
      ? this.setState({
          response: "Ah...that should feel better",
          presses: this.state.presses + 1
        })
      : this.setState({
          response:
            "Dont over do it. This only brings one so much enlightment. "
        });
  };
  getClass = () => {
    return this.state.animation ? "rotating" : null;
  };
  render() {
    return (
      <div style={{ width: this.state.width }}>
        <WidgetBase title={"Export to Bloomberg"}>
          <div className="container">
            <img
              src={Pic2}
              alt="Pic"
              style={{ height: "300px", width: this.state.width - 40 }}
            />

            <div
              className="overlayAddepar"
              style={{ width: this.state.width - 52 }}
            >
              <div style={{ fontSize: "24px", paddingBottom: "8px" }}>
                Namaste
              </div>
              <div
                style={{
                  color: "#ccc",
                  fontSize: "16px",
                  paddingBottom: "8px",
                  paddingLeft: "2px"
                }}
              >
                The answer to enlightment
              </div>
            </div>
          </div>
          <div className="card">
            <div style={{ fontSize: "24px", paddingBottom: "2px" }}>
              <strong>Addepar export</strong>
            </div>
            <div
              style={{
                color: "#aaa",
                paddingBottom: "18px",
                paddingLeft: "2px"
              }}
            >
              The path from Addepar to Bloomberg
            </div>
            <div style={{ color: "#777", paddingLeft: "2px" }}>
              Addepar not playing nicely with Bloomberg? <br />Take a deep
              breathe... <br /> ...and submit ...
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "baseline",
                padding: 8
              }}
            >
              <div>
                <RaisedButton
                  label="Submit"
                  backgroundColor="#f58c32"
                  labelColor={white}
                  style={{ margin: "10px" }}
                  onClick={this.handleButton}
                />
                <Replay
                  className={this.getClass()}
                  onClick={this.props.onRefresh}
                  style={{
                    color: "#f58c32",
                    cursor: "pointer"
                  }}
                />
              </div>
            </div>
            {this.state.response}
          </div>
          <Table
            columns={columns}
            rows={this.state.data}
            rollOverColor="#9ccc65"
            stripeRows={true}
            stripeRowsColor="#A4AECB"
            sortable={true}
            selectable={false}
            multiselect={false}
            selectColor="#f58c32"
            paginated={false}
            perPage={10}
            onselected={null}
            submittable={false}
          />
        </WidgetBase>
      </div>
    );
  }
}

export default App;
