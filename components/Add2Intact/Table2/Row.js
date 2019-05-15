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

    const bubble1 = () => {
      const id = this.props.data.id;
      console.log("Row bubble1 id = " + id);
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
    const onVis = () => {
      console.log("Row.onVis");
      this.props.onVis();
    };
    const getCells = data => {
      let keys = R.keys(data);
      return R.map(
        x => (
          <Cell
            data={data[x]}
            type="string"
            onclick={this.props.onclick}
            approve={data["approve"]}
            onVis={onVis}
          />
        ),
        keys
      );
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
          onClick={() => bubble1()}
        >
          {getCells(data)}
        </div>

        <Divider />
      </div>
    );
  }
}
