import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import List from "./RequestList";
import { setVar, deleteRequest } from "../../actions";
import { getRequests, getCurrentRequest } from "../../reducers";

class RequestsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 1 };
  }
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div>
        <div style={{ fontWeight: "bold" }}>{title}</div>
        {this.props.rows ? (
          <List
            data={this.props.rows}
            title="Gift requests"
            onselect={this.props.setVar}
            deleteable={true}
            onDelete={this.props.delete}
            selection={[this.props.currentRequest]}
            multiSelect={false}
          />
        ) : (
          <div>No gift requests yet.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  rows: getRequests(state),
  currentRequest: getCurrentRequest(state)
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setVar: (field, val) => {
    console.table(val);
    dispatch(setVar("currentGiftRequest", R.prop("uuid", val)));
  },
  delete: id => {
    console.log("RequestsListContainer id " + id);
    dispatch(deleteRequest(id));
  }
  /*
  searchPerson: str => {
    dispatch(searchPerson(str));
  },
  */
});

const RequestsListContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsListContainer);

export default RequestsListContainer2;
