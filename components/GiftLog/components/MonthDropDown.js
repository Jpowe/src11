import React, { Component } from "react";
import * as R from "ramda";
import FieldDropDown from "./FieldDropDown";
import { connect } from "react-redux";
import { getGiftEventsByMonth } from "../actions";
class MainListDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { status: null };
  }
  componentDidMount() {}
  onselect = x => {
    this.setState({ status: x });
    this.props.setFilter(x);
  };

  render() {
    return (
      <div>
        <div style={{ padding: "0px" }}>
          <FieldDropDown
            status={this.state.status}
            onselect={x => this.onselect(x, "mainFilter")}
            options={[
              {
                name: "",
                title: "Select event month",
                value: null
              },
              {
                name: "jan",
                title: "January",
                value: "01"
              },
              {
                name: "feb",
                title: "February",
                value: "02"
              },
              {
                name: "mar",
                title: "March",
                value: "03"
              },
              {
                name: "april",
                title: "April",
                value: "04"
              },
              {
                name: "may",
                title: "May",
                value: "05"
              },
              {
                name: "jun",
                title: "June",
                value: "06"
              },
              {
                name: "jul",
                title: "July",
                value: "07"
              },
              {
                name: "aug",
                title: "August",
                value: "08"
              },
              {
                name: "sep",
                title: "September",
                value: "09"
              },
              {
                name: "oct",
                title: "October",
                value: "10"
              },
              {
                name: "nov",
                title: "November",
                value: "11"
              },
              {
                name: "dec",
                title: "December",
                value: "12"
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  //  node: state.glogInput.node ? state.glogInput.node : "people"
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: str => {
    //  dispatch(setFilter(str, variable));
    dispatch(getGiftEventsByMonth(str));
  }
});

const MainListDropDown2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainListDropDown);

export default MainListDropDown2;
