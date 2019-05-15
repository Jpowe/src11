import React, { Component } from "react";
import * as R from "ramda";
import FieldDropDown from "./FieldDropDown";
import { connect } from "react-redux";
//import { setFilter } from "../actions";
class MainListDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "01" };
  }
  componentDidMount() {}
  onselect = x => {
    console.log("Gifteventtype  DropDown");
    this.setState({ status: x });
    this.props.setFilterEventType(x);
  };

  render() {
    return (
      <div>
        <div style={{ padding: "0px" }}>
          <FieldDropDown
            status={this.state.status}
            onselect={x => this.onselect(x)}
            options={[
              {
                name: "all",
                title: "All gift events",
                value: "01"
              },
              {
                name: "incidental",
                title: "Incidental gift events",
                value: "02"
              },
              {
                name: "recurring",
                title: "Recurring gift events",
                value: "03"
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
  setFilter: (str, variable) => {
    //  dispatch(setFilter(str, variable));
  }
});

const MainListDropDown2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainListDropDown);

export default MainListDropDown2;
