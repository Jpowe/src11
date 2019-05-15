import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";
import {
  setNode,
  rowSubmit,
  addGiftInstance,
  updateGiftInstance,
  ondelete,
  loadData,
  getData,
  setSearchID,
  setRequestID,
  setAction,
  loadConfigs,
  setVar
} from "../actions";
import Summary from "./Summary";
import { events, registryStatuses } from "../common/data";

const t = "test";

const addEventDayAndMonth = val => {
  if (val.date[0] == "") {
    return val;
  }
  if (val.date && val.date[0].length) {
    let eventMonth = val.date[0].split("/")[0];
    eventMonth = eventMonth.length == 2 ? eventMonth : `0${eventMonth}`;
    let eventDay = val.date[0].split("/")[1];
    eventDay = eventDay.length == 2 ? eventDay : `0${eventDay}`;

    return {
      ...val,
      eventMonth: eventMonth,
      eventDay: eventDay
    };
  }
};

class SummaryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.onselected(1);
  }
  componentDidMount() {
    this.props.loadData();
    this.props.loadConfigs();
  }
  /*For event dropdown */
  mergeObj(value) {
    const newObj = {
      ...this.props.giftEventInstance,
      eventType: [events[value].title]
    };
    this.props.onEvt(newObj);
  }

  updateToggle(gei) {
    let recurring = R.prop("recurring", gei)[0];
    recurring = recurring ? [0] : [1];
    const newObj = {
      ...gei,
      recurring: recurring
    };
    this.props.onEvt(newObj);
  }

  evt(value) {
    console.log("SC evt value: " + value);
    const newObj = {
      ...this.props.giftEventInstance,
      eventType: [value]
    };
    this.props.onEvt(newObj);
  }
  registry(value) {
    const newObj = {
      ...this.props.giftEventInstance,
      registryStatus: [value]
    };
    this.props.onEvt(newObj);
  }
  active(value) {
    const newObj = {
      ...this.props.giftEventInstance,
      active: [value]
    };
    this.props.onEvt(newObj);
  }
  textchange(value, name) {
    const newObj = {
      ...this.props.giftEventInstance,
      [name]: [value]
    };
    this.props.onEvt(newObj);
  }
  onclick(id) {
    console.log("SumContainer onClick");
    const gei = this.props.giftEventInstance;
    const children = [...gei.recipients, ...gei.requests, ...gei.giftHistory];
    console.table(children);
    let t = R.find(x => x.id == id, children);
    let node = R.prop("type", t);
    this.props.onSearchRow(id);
    //this.props.setNode(node !== "people" ? `${node}s` : node);
    console.log("node == " + node);
    this.props.setNode(node === "gift" ? `${node}s` : node);
    if (node == "requests") {
      this.props.setRequestID(id);
    }
    this.props.setAction("edit");
    this.props.onclick();
  }
  onAdd(node) {
    this.props.setNode(node);
    this.props.onSearchRow(0.1);
    this.props.setAction("create");
    this.props.onclick();
  }
  onDialog() {
    this.props.setVar("loading", true);
    //  this.props.setFilter(0, "mainFilter");
    this.props.getData(null);
    this.props.onDialog();
  }
  render() {
    const { giftEventInstance } = this.props;
    return (
      <div>
        {this.props.dataPeople ? (
          <Summary
            dataPeople={[
              ...this.props.dataPeople,
              ...this.props.dataOrgs,
              ...this.props.dataAnimals,
              ...this.props.dataGroups
            ]}
            dataRequests={this.props.dataRequests}
            giftHistory={this.props.giftHistory}
            evt={this.props.evt}
            gei={this.props.giftEventInstance}
            onEvt={value => this.evt(value)}
            onRegistry={value => this.registry(value)}
            onActive={value => this.active(value)}
            onTextChange={(value, name) => this.textchange(value, name)}
            onclick={value => this.onclick(value)}
            onNew={() => this.props.onselected(uuidv4())}
            onclick2={this.props.setNode}
            onDialog={() => this.onDialog()}
            ontoggle={x => this.updateToggle(giftEventInstance)}
            ondelete={this.props.ondelete}
            onAdd={value => this.onAdd(value)}
            giftEventTypes={this.props.giftEventTypes}
            loading={this.props.loading}
            //setRequestID={value => this.props.setRequestID(value)}
          />
        ) : null}
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
const convertGifts = (obj, gifts) => {
  console.log("convertGifts f");
  const a = R.map(x => x.id, R.path(["giftHistory"], obj));
  console.table(R.filter(x => R.contains(x.id, a), gifts));
  return R.filter(x => R.contains(x.id, a), gifts);
};
const convertRequests = (obj, requests) => {
  const a = R.map(x => x.id, R.path(["requests"], obj));

  return R.filter(x => R.contains(x.id, a), requests);
};
const getLocations = (obj, locations) => {
  let r, personLocations;
  const recipInLoc = (recip, loc) => {
    return !!R.find(x => R.contains(x.id, recip), loc.person);
  };
  r = R.map(x => x.id, R.path(["recipients"], obj));

  return R.filter(x => recipInLoc(r, x), locations);
};

const mapStateToProps = (state, ownProps) => ({
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
    ? convertAnimals(
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
  dataRequests: state.glogInput.selectedRow
    ? convertRequests(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.requests
      )
    : null,
  giftHistory: state.glogInput.selectedRow
    ? convertGifts(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.gifts
      )
    : null,
  evt: state.glogInput.selectedRow
    ? R.prop(
        "eventType",
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        )
      )
    : null,
  instancesLength: state.glogInput.giftEventInstance
    ? state.glogInput.giftEventInstances.length
    : 0,
  giftEventInstance: state.glogInput.selectedRow
    ? R.find(
        x => x.id === state.glogInput.selectedRow,
        state.glogInput.giftEventInstances
      )
    : null,
  giftEventTypes: state.glogInput.eventTypes
    ? state.glogInput.eventTypes
    : null,
  loading: state.glogInput.loading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSearchRow: id => {
    console.log("onSearchRow call setSearchID " + id);
    dispatch(setSearchID(id));
  },
  loadData: () => {
    dispatch(loadData());
    //  dispatch(getData());
  },
  setNode: x => {
    dispatch(setNode(x));
  },
  onselected: (id, obj) => {
    //dispatch(rowSubmit(id, obj));
    dispatch(addGiftInstance(id));
  },
  onEvt: val => {
    dispatch(updateGiftInstance(addEventDayAndMonth(val)));
  },
  ondelete: val => {
    dispatch(ondelete(val));
  },
  setRequestID: x => {
    dispatch(setRequestID(x));
  },
  setAction: x => {
    dispatch(setAction(x));
  },
  loadConfigs: () => {
    dispatch(loadConfigs());
  },
  setVar: (name, payload) => {
    dispatch(setVar(name, payload));
  },
  getData: mo => {
    console.log("getData SC  ");
    dispatch(getData(mo));
  }
});

const SummaryContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryContainer);

export default SummaryContainer2;
