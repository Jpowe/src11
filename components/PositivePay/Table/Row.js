import React from "react";
import R from "ramda";
import Cell from "./Cell";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import { white } from "material-ui/styles/colors";
import { emailName } from "../../../utils/utils";
import "./Table.css";

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onmouseover: false,
      selected: false,
      color: this.props.selected ? this.props.selectColor : this.props.color
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected,
      color: nextProps.color
    });
  }
  render() {
    const {
      selectColor,
      color,
      selectable,
      data,
      rollOverColor,
      submittable
    } = this.props;

    const bubble1 = id => {
      this.props.onclick(id);
    };
    const bubble2 = id => {
      this.props.onclick2(id);
    };

    const rollOver = () => {
      this.setState({
        onmouseover: true,
        color: rollOverColor
      });
    };
    const rollOut = () => {
      this.setState({
        onmouseover: false,
        color: this.state.selected ? selectColor : color
      });
    };
    const newFileID = val => {
      return R.contains(data.fileID, ["NEW", "--"]) ? "--" : val;
    };
    const nullAmount = val => {
      return val === null ? "--" : val;
    };
    const getBackgroundColor = () => {
      if (R.contains(data.status, ["New", "Resubmitting", "Pending"])) {
        return "#f8ab6a";
      }
      return this.props.selected ? this.props.selectColor : this.state.color;
    };

    const statusMessage = message => {
      if (message == "--") {
        return;
      }
      return (
        <div
          style={{
            paddingBottom: "4px",
            paddingLeft: "30%",
            backgroundColor: this.props.selected
              ? this.props.selectColor
              : this.state.color
          }}
        >
          <em>{message}</em>
        </div>
      );
    };
    const ifVoidCount = val => {
      if (data.voidCount) {
        return val == undefined ? "0" : val;
      } else {
        return "--";
      }
    };
    const getFadeClass = () => {
      if (!this.props.diff) {
        return;
      }
      return !this.props.color ? "target-fade-grey" : "target-fade-blue";
    };

    return (
      <div className={getFadeClass()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            //flexWrap: "wrap",
            backgroundColor: getBackgroundColor(),
            fontSize: "large"
          }}
          onMouseOver={rollOver}
          onMouseOut={rollOut}
        >
          {submittable && (
            <Cell
              data={
                data.submit && (
                  <div>
                    <RaisedButton
                      label="Auto"
                      labelStyle={{ padding: "2px" }}
                      backgroundColor="#f58c32"
                      labelColor={white}
                      style={{
                        height: "20px",
                        width: "30px",
                        marginBottom: "6px",
                        marginRight: "4px",
                        marginTop: "6px"
                      }}
                      onClick={() => this.props.onclick(data.uuid, "auto")}
                    />
                    <RaisedButton
                      label="Manual"
                      labelStyle={{ padding: "2px" }}
                      backgroundColor="#f58c32"
                      labelColor={white}
                      style={{
                        height: "20px",
                        width: "40px",
                        marginTop: "4px"
                      }}
                      onClick={() => this.props.onclick(data.uuid, "manual")}
                    />
                  </div>
                )
              }
              type="component"
            />
          )}
          <Cell data={parseFloat(data.submittedTimestamp)} type="date" />
          <Cell data={parseFloat(data.createdTimestamp)} type="date" />
          <Cell data={data.status} type="string" />
          <Cell data={data.voidAmount} type="currency" />
          <Cell data={data.voidCount} type="integer" />
          <Cell data={newFileID(data.nonVoidAmount)} type="currency" />
          <Cell data={newFileID(data.nonVoidCount)} type="integer" />
          <Cell data={data.fileID} type="string" />
          <Cell data={data.submittedBy} type="string" />
        </div>
        {statusMessage(data.statusMessage)}
        <Divider />
      </div>
    );
  }
}
