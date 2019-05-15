import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  addNew,
  onTypeGift,
  setSearchID,
  updateSecondary,
  setVar,
  onGroupSelect,
  hierarchyRemove
} from "../actions";
import Parties from "./Parties";
//import ListSingleLevel from "./ListSingleLevel2/ListSingleLevel";
import ListSingleLevel from "./ListSingleLevel3/ListSingleLevel";

class GiftsPartiesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  onselect = id => {
    console.log("return from GiftsPartiesContainer");
    return;
    this.props.bubbleSelect();
    this.props.onselected(id);
  };
  convertObj = (obj, parentID, rootID = null, level = 0) => {
    return {
      id: obj.uuid ? obj.uuid : obj.id,
      name: `${obj.firstName} ${obj.lastName}`,
      level: level,
      parent: parentID,
      rootID: rootID,
      partyType: "person"
    };
  };
  parseOrg = org => {
    let rows = [
      {
        name: org.name,
        id: org.id,
        root: true,
        hasChildren: true,
        level: 0,
        partyType: "org"
      }
    ];
    let groups = R.map(
      x => this.parseGroupOrg(x.group, org.id),
      org.memberGroups
    );
    rows = [
      ...rows,
      ...groups,
      ...R.map(x => this.convertObj(x.person, org.id), org.employees, 1)
    ];
    return rows;
  };
  /* get leaf from group.   leaf of memberPersons */
  parseGroupOrg = (group, parentID) => {
    console.table(group);
    console.log(R.prop("name", group));
    let rows = [
      {
        name: R.prop("name", group),
        id: R.prop("uuid", group),
        hasChildren: true,
        parent: parentID,
        level: 1,
        partyType: "group"
      }
    ];
    console.table(rows);
    console.table(R.prop("memberPersons", group));
    rows = [
      ...rows,
      ...R.map(
        x => this.convertObj(x.person, group.uuid, parentID, 2),
        R.prop("memberPersons", group)
      )
    ];
    console.table(rows);
    return rows;
  };
  /* parse group root vs group child--a member of a group or a member of a org */
  parseGroup = group => {
    console.table(group);
    let rows = [
      {
        name: group.name,
        id: group.id,
        root: true,
        hasChildren: true,
        level: 0,
        partyType: "group"
      }
    ];
    let memberGroups = R.map(
      x => this.parseGroupOrg(x.group, group.id),
      group.memberGroups
    );
    rows = [
      ...rows,
      ...R.map(
        x => this.convertObj(x.person, group.id, 1),
        group.memberPersons
      ),
      ...memberGroups
    ];

    console.table(memberGroups);
    console.table(rows);
    return rows;
  };

  parse = (people, orgs, animals, selectedGroups, allGroups) => {
    console.log("parse parties container");
    let newRows, rowsOrgs, rowsGroups;
    console.table(orgs);
    console.table(selectedGroups);
    //  let rows = [...people, ...orgs, ...animals, ...selectedGroups];
    let rows = [...people, ...animals];
    const convertPerson = obj => {
      return {
        id: obj.uuid ? obj.uuid : obj.id,
        name: obj.name ? obj.name : `${obj.firstName} ${obj.lastName}`,
        root: true
      };
    };
    rows = R.map(x => convertPerson(x, null, true), rows);

    rowsOrgs = R.map(this.parseOrg, orgs);
    console.table(rowsOrgs);
    rowsGroups = R.map(this.parseGroup, selectedGroups);

    newRows = [...rowsOrgs, ...rowsGroups];
    const addOrder = (r, i) => {
      //  console.log("addorder");
      //console.table(r);
      return { ...r, order: i };
    };
    const mapIndex = R.addIndex(R.map);
    newRows = mapIndex((x, i) => addOrder(x, i), R.flatten(newRows));
    newRows = [...rows, ...newRows];

    console.table(newRows);
    return newRows;
  };

  parse2 = (
    people,
    orgs,
    animals,
    selectedGroups,
    allGroups,
    groupHierarchy
  ) => {
    console.log("parse2 f  parties container");
    console.table(groupHierarchy);
    let newRows, rowsOrgs, rowsGroups, newGroupHierarchy;
    let rows = [...people, ...animals];
    rowsOrgs = R.map(this.parseOrg2, orgs);
    rowsGroups = R.map(this.parseGroup2, selectedGroups);
    newRows = [...rows, ...rowsOrgs, ...rowsGroups];
    console.table(newRows);
    if (groupHierarchy) {
      const addID = obj => {
        return { ...obj, id: obj.uuid };
      };
      newGroupHierarchy = R.map(addID, groupHierarchy);
      newRows = [...newRows, ...newGroupHierarchy];
    }
    console.table(R.flatten(newRows));
    //  this.addLevel(newRows)
    return R.flatten(newRows);
  };
  parseOrg2 = org => {
    let rows = [
      {
        name: org.name,
        id: org.id,
        root: true,
        hasChildren: true,
        level: 0,
        partyType: "org"
      }
    ];

    return rows;
  };
  parseGroup2 = group => {
    console.table(group);
    let rows = [
      {
        name: group.name,
        id: group.id,
        root: true,
        hasChildren: true,
        level: 0,
        partyType: "group"
      }
    ];

    return rows;
  };

  onSelectRequest = (x, obj) => {
    console.log(
      "GiftsPartiesContainer onSelectRequest obj: " + JSON.stringify(obj)
    );
    console.log("GPC x " + x);
    let bRemove = false;

    /* props.request = gifts*/
    const gift = this.props.request;
    console.table(gift);
    let newParties;
    const tempParties = gift.parties;
    const tempRecipPersons = gift.recipientPersons;
    const arrToUse = gift.recipientPersons
      ? gift.recipientPersons
      : gift.parties;
    const add = () => {
      console.log("add");
      const objRequest = R.pick(["id", "name", "firstName", "lastName"], obj);
      newParties = [...tempParties, objRequest];
    };
    const remove = () => {
      console.log("remove");
      newParties = R.filter(y => y.id != x, tempParties);
      bRemove = true;
    };
    console.log(x);
    console.table(tempParties);
    if (tempParties) {
      R.contains(x, R.map(x => x.id, arrToUse)) ? remove() : add();
    } else {
      add();
    }

    gift.parties = newParties;
    gift.recipientPersons = newParties;
    console.log("update Gift table from GiftParties");
    this.props.updateSecondary(gift, "gifts", x, bRemove);
  };

  render() {
    return (
      <div>
        {this.props.enabled ? (
          <ListSingleLevel
            data={this.parse2(
              this.props.dataPeople,
              this.props.dataOrgs,
              this.props.dataAnimals,
              this.props.dataGroups,
              this.props.allGroups,
              this.props.groupHierarchy
            )}
            title={this.props.title}
            onselect={(x, obj) => this.onSelectRequest(x, obj)}
            groups={this.props.allGroups}
            multiSelect={true}
            request={this.props.request}
            field={"parties"}
            onGroupSelect={this.props.onGroupSelect}
            hierarchyRemove={this.props.hierarchyRemove}
          />
        ) : (
          <div
            style={{ padding: "40px", minWidth: "200px", maxWidth: "200px" }}
          >
            Gift year must be four digits for Gift Parties to show.
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
  groupHierarchy: state.glogInput.groupHierarchy
    ? state.glogInput.groupHierarchy
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSecondary: (payload, node, assocID, bRemove) => {
    console.log("updateSecondary. called from GPC ");
    console.table(payload);
    console.log("node & assocID " + [node, assocID]);
    console.log("bREmove " + bRemove);
    dispatch(updateSecondary(payload, node, assocID, null, bRemove));
  },
  setVar: (name, payload) => {
    dispatch(setVar(name, payload));
  },
  onNew: payload => {
    dispatch(addNew(payload));
  },
  onType: (payload, giftID) => {
    dispatch(onTypeGift(payload, giftID));
  },
  onGroupSelect: id => {
    dispatch(onGroupSelect(id));
  },
  hierarchyRemove: id => {
    dispatch(hierarchyRemove(id));
  }
  /*
  onselected: id => {
    dispatch(setSearchID(id));
    //  dispatch(setSelectedRow(id));
  },*/
});

const GiftsPartiesContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftsPartiesContainer);

export default GiftsPartiesContainer2;
