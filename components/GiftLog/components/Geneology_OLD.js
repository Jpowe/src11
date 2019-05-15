import React, { Component } from "react";
import GeneologyComponent from "./Geneology/Main";
import FieldText from "./FieldText";
import TableContainer from "./Search/TableContainer";

class Geneology extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1, filterStr: "" };
  }
  componentDidMount() {}
  filterStr = v => {
    console.log("filterStr str= " + v);
    console.log("filterLength " + v.length);
    if (v.length > 2) {
      this.setState({ showForm: true });
    }
    this.setState({ filterStr: v });
    this.props.onSearchText(v);
  };
  test(rows) {
    console.table(rows);
    return rows;
  }
  render() {
    return (
      <div>
        <div
          style={{
            padding: "20px",
            color: "white",
            backgroundColor: "green"
          }}
        >
          Search person and add to geneology
          <FieldText ontext={this.filterStr} />
        </div>

        <TableContainer />
        <GeneologyComponent
          sendData={this.props.sendData}
          data={this.test(this.props.rows)}
        />
      </div>
    );
  }
}

export default Geneology;
