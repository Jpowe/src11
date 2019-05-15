import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
//import { addRow } from "../actions";

import Grid from "./Grid";

class GridContainer extends Component {
  componentDidMount() {
    //this.props.getDataForComp();
  }
  render() {
    return (
      <div>
        <Grid
          addRow={this.props.addRow}
          title={this.props.title}
          bSearch={this.props.status}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  title:state.glogInput.status ?state.glogInput.status : "GRID: ADD TITLE",
  status:state.glogInput.status == "Gifts TABLE date"
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  addRow: x => {
    //dispatch(addRow());
  }
});

const GridContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  GridContainer
);

export default GridContainer2;
