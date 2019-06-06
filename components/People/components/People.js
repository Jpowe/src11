import React, { Component } from "react";
import * as R from "ramda";
import "../../../App.css";
import Paper from "material-ui/Paper";
import globalStyles from "../../../styles";
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

  filterStr = v => {
    console.log("filterStr str= " + v);
    console.log("filterLength " + v.length);

    this.setState({ filterStr: v });
    this.props.onSearchText(v);
  };

  render() {
    const styles = {
      content: {
        padding: 4
      },
      text: {
        //fontWeight: "lighter",
        fontSize: 16,
        color: "#ffffff",
        backgroundColor: "#220088",
        padding: "4px 0  4px 8px",
        borderRadius: "5px"
      },
      paper: {
        borderRadius: "5px"
      }
    };
    return (
      <div style={{ minWidth: "1200px" }}>
        <Paper style={styles.paper} zDepth={globalStyles.depth.n}>
          <div style={{ color: "#00502F" }}>
            <h2 align="center">Gifts for Person</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "6px"
            }}
          >
            <div
              style={{
                fontSize: "20px",
                marginRight: "30px",
                fontVariant: "small-caps",
                color: "#00502F"
              }}
            >
              Search, select, and show
            </div>
            <FieldText ontext={this.filterStr} />
          </div>
          <TableContainer searchType={"person"} />
          <div>
            <GiftEventView rows={this.props.rows} />
          </div>
        </Paper>
      </div>
    );
  }
}

export default People;
