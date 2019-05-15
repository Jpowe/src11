import React, { Component } from "react";

class ColumnRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.table(this.props.data);
  }

  render() {
    const { data } = this.props;

    return (
      <div
        style={{
          display: "flex",
          minHeight: "30px",
          padding: "8px",
          justifyContent: "space-between",
          alignItems: "flex-end",
          color: "#fff",
          backgroundColor: "#aaa"
        }}
      >
        {data.map(x => (
          <div>{x}</div>
        ))}
      </div>
    );
  }
}

export default ColumnRow;
