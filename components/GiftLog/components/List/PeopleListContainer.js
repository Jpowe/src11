import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import List from "./PeopleList";
import { assocRecipientRequest, onGroupSelect } from "../../actions";
import {
  getCurrentRequestPersons,
  getCurrentRequestOrganizations,
  getCurrentRequestGroups
} from "../../reducers";

class ListContainer extends Component {
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
        {this.props.rows && (
          <List
            data={this.props.rows}
            title="Gift parties"
            onselect={this.props.onselect}
            selection={[
              ...this.props.requestPersons,
              ...this.props.requestOrganizations,
              ...this.props.requestGroups
            ]}
            multiSelect={true}
            onGroupSelect={this.props.onGroupSelect}
          />
        )}
      </div>
    );
  }
}

const sortByAnchors = (rows, gen) => {
  console.table(rows);
  const groups = [];
  let genRows = R.uniq(R.filter(x => x.generation == gen, rows));
  const process = row => {
    let a = [];
    a.push(row);
    R.map(
      x => a.push(x),
      R.filter(x => R.contains(row.uuid, x.children), rows)
    );
    const parents = R.filter(x => R.contains(row.uuid, x.children), rows);
    const gran = R.map(
      x => R.filter(y => R.contains(x.uuid, y.children), rows),
      parents
    );
    R.map(x => a.push(x), gran);
    let childRows = R.filter(x => R.contains(x.uuid, row.children), rows);
    R.map(x => a.push(x), childRows);
    const grandKids = R.map(
      x => R.filter(y => R.contains(y.uuid, x.children), rows),
      childRows
    );
    R.map(x => a.push(x), grandKids);
    groups.push(a);
  };
  R.map(process, genRows);
  console.table(R.flatten(groups));
  return R.flatten(groups);
};

const getHierarchy = state => {
  console.log("getHierarchy");
  try {
    if (!state.giftLog.groupHierarchy) {
      return [];
    }
    console.table(state.giftLog.groupHierarchy);
    return state.giftLog.groupHierarchy;
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};

/* CHANGE TO ONLY GET HIER IF NOT PERSONS>>>>> if eventOrg or eventGroup exists */
const getRows = state => {
  console.log("getRows");
  let rows;
  try {
    if (state.giftLog.groupHierarchy && state.giftLog.groupHierarchy.length) {
      rows = getHierarchy(state);
    } else {
      rows = [...sortByAnchors(state.giftLog.geneology, 3)];
      console.log("with -3 generationDiplay...");
      rows = R.map(x => ({ ...x, generationDisplay: x.generation - 3 }), rows);
      console.table(rows);
    }
    console.log("with real generation...");
    console.table(rows);
    return rows;
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};

const mapStateToProps = (state, ownProps) => ({
  rows: state.giftLog.geneology ? getRows(state) : null,
  requestPersons: getCurrentRequestPersons(state)
    ? getCurrentRequestPersons(state)
    : [],
  requestOrganizations: getCurrentRequestOrganizations(state)
    ? getCurrentRequestOrganizations(state)
    : [],
  requestGroups: getCurrentRequestGroups(state)
    ? getCurrentRequestGroups(state)
    : []
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onselect: (recipientID, obj) => {
    dispatch(assocRecipientRequest(recipientID, obj));
  },
  onGroupSelect: id => {
    dispatch(onGroupSelect(id));
  }
  /*
  sendData: () => {
    dispatch(sendData());
  }
  */
});

const ListContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);

export default ListContainer2;
