import React, { Component } from "react";

class ListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.table(this.props.data);
  }
  componentDidMount() {}

  render() {
    const { data, rowNum } = this.props;
    const getColor = n => (n % 2 === 0 ? "#e6e6e6" : "#cccccc");
    return (
      <div
        style={{
          display: "flex",
          minHeight: "30px",
          padding: "8px",
          justifyContent: "space-between",
          alignItems: "flex-end",

          backgroundColor: getColor(rowNum)
        }}
      >
        {Object.keys(data).map(x => (
          <div>{data[x]}</div>
        ))}
      </div>
    );
  }
}

export default ListRow;
