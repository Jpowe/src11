import React from "react";
import Cell from "./Cell";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import { white } from "material-ui/styles/colors";

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
    const setColor = id => {
      this.props.onclick(data.uuid);
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
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            //flexWrap: "wrap",
            backgroundColor: this.props.selected
              ? this.props.selectColor
              : this.state.color,
            fontSize: "large"
          }}
          onClick={selectable && data.status === "Failed" && setColor}
          onMouseOver={rollOver}
          onMouseOut={rollOut}
        >
          {submittable && (
            <Cell
              data={
                data.submit && (
                  <RaisedButton
                    label="Resubmit"
                    backgroundColor="#f58c32"
                    labelColor={white}
                  />
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
          <Cell data={data.nonVoidAmount} type="currency" />
          <Cell data={data.nonVoidCount} type="integer" />
          <Cell data={data.fileID} type="string" />
          <Cell data={data.submittedBy} type="string" />
        </div>
        <Divider />
      </div>
    );
  }
}
