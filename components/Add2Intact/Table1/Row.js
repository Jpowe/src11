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
      const uuid = this.props.data.uuid;
      console.log("Row bubble1 id = " + uuid);
      this.props.onclick(uuid);
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
    const getCells = data => {
      let keys = R.keys(data);
      //  console.table(data);
      return R.map(x => <Cell data={data[x]} type="string" />, keys);
    };

    return (
      <div className={getFadeClass()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            //flexWrap: "wrap",
            backgroundColor: getBackgroundColor(),
            fontSize: "large",
            cursor: "pointer"
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
