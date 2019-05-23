import React, { Component } from "react";
import ListRow from "./ListRow";
import ColumnRow from "./ColumnRow";
import { typography } from "material-ui/styles";

class HistorySection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    const { title, data, headers } = this.props;
    return (
      <div
        style={{
          padding: "4px",
          marginTop: "30px"

          //  border: "4px solid #6076A9"
          //  backgroundColor: "#f4dfb7"
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: typography.fontWeightLight
          }}
        >
          {title}
        </div>
        <hr
          style={{
            backgroundColor: "dimgrey",
            color: "dimgrey",
            border: "solid 2px dimgrey",
            height: "5px"
          }}
        />
        <ColumnRow data={headers} colWidth={this.props.colWidth} />
        {data.map((x, i) => (
          <ListRow data={x} rowNum={i} colWidth={this.props.colWidth} />
        ))}
      </div>
    );
  }
}

export default HistorySection;
