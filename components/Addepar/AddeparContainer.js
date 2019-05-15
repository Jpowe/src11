import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { getAddepar, submitNewRow } from "./actions";
import CardAddepar from "./CardAddepar";
import { getEndPoints } from "../../utils/utils";
class AddeparContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getDataForComp();
  }

  render() {
    return (
      <div>
        {this.props.allowed ? (
          <CardAddepar
            data={this.props.data}
            onSelect={this.props.onselectNewRow}
            onRefresh={this.props.getDataForComp}
            loaded={this.props.loaded}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: state.addepar.received ? state.addepar.rows : null,
  allowed: state.addepar.received
    ? R.contains(
        "AddeparBloombergSubmissions",
        getEndPoints(state.notifications.user.roles)
      )
    : null,
  loaded: state.addepar.received ? state.addepar.loaded : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getDataForComp: () => {
    dispatch(getAddepar());
  },
  onselectNewRow: () => {
    dispatch(submitNewRow());
  }
});

const AddeparContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  AddeparContainer
);

export default AddeparContainer2;
