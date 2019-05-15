import React from "react";
import Cell from "./Cell";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import { white } from "material-ui/styles/colors";
import { emailName, sentenceCase } from "../../../utils/utils";

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
    const { selectColor, color, selectable, data, rollOverColor } = this.props;
    const setColor = id => {
      this.props.onclick(data.id);
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
            backgroundColor: this.props.selected
              ? this.props.selectColor
              : this.state.color,
            fontSize: "large"
          }}
          onMouseOver={rollOver}
          onMouseOut={rollOut}
        >
          {this.props.submittable && (
            <Cell
              data={
                data.submit && (
                  <RaisedButton
                    label="Submit"
                    backgroundColor="#f58c32"
                    labelColor={white}
                  />
                )
              }
              type="component"
            />
          )}

          <Cell data={parseFloat(data.createdTimestamp)} type="date" />
          <Cell data={sentenceCase(data.status)} type="string" />
          <Cell data={emailName(data.submittedBy)} type="string" />
        </div>
        <Divider />
      </div>
    );
  }
}
