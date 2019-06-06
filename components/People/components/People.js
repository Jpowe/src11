import React, { Component } from "react";
import * as R from "ramda";
import "../../../App.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import FieldText from "./FieldText";
import TableContainer from "./Search/TableContainer";
import GiftEventView from "./GiftEventView";

const data = [
  { uuid: 1, urgent: true, name: "a" },
  { uuid: 2, urgent: true, name: "b" },
  { uuid: 3, urgent: false, name: "c" }
];

/*
*Table container shows person search results
*
*/
class People extends Component {
  constructor(props) {
    super(props);
    this.state = { data: data };
  }
  componentDidMount() {}
  /*
  renderItems() {
    return this.props.rows
      ? this.props.rows.map((row, index) => (
          <div
            style={{ padding: "10px" }}
            onClick={() => console.log(row.uuid)}
          >
            {row.toString()}
          </div>
        ))
      : null;
  }
  */
  filterStr = v => {
    console.log("filterStr str= " + v);
    console.log("filterLength " + v.length);

    this.setState({ filterStr: v });
    this.props.onSearchText(v);
  };

  render() {
    return (
      <div>
        <FieldText ontext={this.filterStr} />
        <TableContainer searchType={"person"} />
        <div>
          <GiftEventView rows={this.props.rows} />
        </div>
      </div>
    );
  }
}

export default People;
