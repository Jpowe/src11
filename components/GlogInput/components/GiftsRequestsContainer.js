import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { addNew, onTypeGift, setSearchID, updateSecondary } from "../actions";
import Parties from "./Parties";
import ListSingleLevel from "./ListSingleLevel/ListSingleLevel";

let to1;

class GiftsRequestsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    clearTimeout(to1);
  }
  onselect = id => {
    console.log("return from GiftsPartiesContainer");
    return;
    this.props.bubbleSelect();
    this.props.onselected(id);
  };

  parse = (people, orgs, animals, selectedGroups, allGroups) => {
    console.log("parse parties container");
    let rows = [...people, ...orgs, ...animals, ...selectedGroups];
    const addRowAndChild = row => {
      rows = [...rows, { ...row.children[0], level: 1 }];
    };
    R.map(x => (x.children ? addRowAndChild(x) : x), rows);
    //  console.table(rows);
    return rows;
  };
  showThis = bool => {
    console.log("showThis " + bool);
    this.props.showRequestContainer(bool);
  };

  onSelectRequest = (x, obj) => {
    console.log("onSelectRequest x,obj " + [x, JSON.stringify(obj)]);
    console.log(
      "giftRequestGiftPayload " +
        JSON.stringify(this.props.giftRequestGiftPayload)
    );
    this.setState({ selectedItem: x });
    if (x == this.state.selectedItem) {
      return;
    }
    this.props.bubbleUp(x, obj);
    let bRemove = false;
    this.showThis(false);
    to1 = setTimeout(() => this.showThis(true), 1000);
    let newRecips;
    const tempRequest = this.props.request;
    console.log(JSON.stringify(tempRequest));
    //console.log(JSON.stringify(this.props.requests));
    const add = () => {
      console.log("add");
      console.log(JSON.stringify(obj));
      const objRequest = R.pick(["id", "name", "requestNotes"], obj);
      newRecips = [...tempRequest.requests, objRequest];
      console.log(JSON.stringify(newRecips));
    };
    const remove = () => {
      console.log("remove");
      newRecips = R.filter(y => y.id != x, tempRequest.requests);
      bRemove = true;
    };
    console.log(
      "CONTAINS " + R.contains(x, R.map(x => x.id, tempRequest.requests))
    );
    R.contains(x, R.map(x => x.id, tempRequest.requests)) ? remove() : add();
    //  console.log(R.contains(x, R.map(x => x.id, tempRequest.recipients)));

    tempRequest.requests = newRecips;
    console.log("tempRequest...");
    console.log(JSON.stringify(tempRequest));
    let newTempRequest = {
      ...tempRequest,
      requests: [
        {
          ...tempRequest.requests["0"],
          requestNotes: obj.requestNotes,
          ...this.props.giftRequestGiftPayload
        }
      ]
    };
    console.log(JSON.stringify(newTempRequest));
    console.log("update Gift table from GiftRequests");
    this.props.updateSecondary(
      newTempRequest,
      "gifts",
      x,
      this.props.giftRequestGiftPayload,
      bRemove
    );
  };
  render() {
    return (
      <div>
        {this.props.enabled ? (
          <ListSingleLevel
            data={this.props.requests}
            title={this.props.title}
            onselect={(x, obj) => this.onSelectRequest(x, obj)}
            groups={this.props.allGroups}
            multiSelect={true}
            request={this.props.request}
            field={"requests"}
            gift={true}
          />
        ) : (
          <div
            style={{ padding: "40px", minWidth: "200px", maxWidth: "200px" }}
          >
            Gift year must be four digits for Gift Requests to show.
          </div>
        )}
      </div>
    );
  }
}

const convertRecipients = (obj, people) => {
  const a = R.map(x => x.id, R.path(["recipients"], obj));
  return R.filter(x => R.contains(x.id, a), people);
};
const convertOrgs = (obj, orgs) => {
  const a = R.map(x => x.id, R.path(["recipients"], obj));
  return R.filter(x => R.contains(x.id, a), orgs);
};
const convertAnimals = (obj, animals) => {
  const a = R.map(x => x.id, R.path(["recipients"], obj));
  return R.filter(x => R.contains(x.id, a), animals);
};
const convertGroups = (obj, groups) => {
  const a = R.map(x => x.id, R.path(["recipients"], obj));
  return R.filter(x => R.contains(x.id, a), groups);
};
const getGiftRequestID = arrRequest => {
  return arrRequest[0].id;
};
const convertRequests = (obj, requests) => {
  console.log("convertRequests");
  const sortRequestNotes = R.sortWith([R.ascend(R.prop("requestNotes"))]);

  const a = R.map(x => x.id, R.path(["requests"], obj));
  console.table(a);
  console.table(R.filter(x => R.contains(x.id, a), requests));
  return sortRequestNotes(R.filter(x => R.contains(x.id, a), requests));
};
const mapStateToProps = (state, ownProps) => ({
  selection: state.glogInput.searchID ? state.glogInput.searchID : null,
  data: state.glogInput.selectedRow
    ? state.glogInput[state.glogInput.node]
    : state.glogInput[state.glogInput.node][0],

  node: state.glogInput.node ? state.glogInput.node : null,
  //  showSubSelect:state.glogInput.node === "people"
  showSubSelect: R.contains(state.glogInput.node, [
    "people",
    "orgs",
    "animals"
  ]),
  dataPeople: state.glogInput.selectedRow
    ? convertRecipients(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.people
      )
    : null,
  dataOrgs: state.glogInput.selectedRow
    ? convertOrgs(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.orgs
      )
    : null,
  dataAnimals: state.glogInput.selectedRow
    ? convertOrgs(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.animals
      )
    : null,
  dataGroups: state.glogInput.selectedRow
    ? convertGroups(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.groups
      )
    : null,
  allGroups: state.glogInput.selectedRow ? state.glogInput.groups : null,
  request1: state.glogInput.requestID
    ? R.find(x => x.id === state.glogInput.requestID, state.glogInput.requests)
    : null,
  request: state.glogInput.searchID
    ? R.find(x => x.id == state.glogInput.searchID, state.glogInput.gifts)
    : null,
  requests: state.glogInput.selectedRow
    ? convertRequests(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.requests
      )
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSecondary: (
    payload,
    node,
    assocID,
    giftRequestGiftPayload,
    bRemove
  ) => {
    dispatch(
      updateSecondary(payload, node, assocID, giftRequestGiftPayload, bRemove)
    );
  },
  onNew: payload => {
    dispatch(addNew(payload));
  },
  onType: (payload, giftID) => {
    dispatch(onTypeGift(payload, giftID));
  }
  /*
  onselected: id => {
    dispatch(setSearchID(id));
    //  dispatch(setSelectedRow(id));
  },*/
});

const GiftsRequestsContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftsRequestsContainer);

export default GiftsRequestsContainer2;
