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
import ListSingleLevel from "./ListSingleLevel3/ListSingleLevel";

class PartiesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  onselect = id => {
    console.log("return from Req PartiesContainer");
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
  /*
   process root row, add groups,add leafs,
  */
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
    //  this.processHier2(this.props.hier2);
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
      //  console.table(r);
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
  /*
  addLevel = data => {
    let rows = data
    let initLevel = 0
    while(R.filter(x=>x.level === null,rows)){

    }


    const level = row.parent + 1;
    return { ...row, level: level };
  };
  */
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
  processHier2 = data => {
    console.log("processHier2 f");

    console.table(R.uniq(data));
    let newData = R.uniq(data);
    let firstRow = { ...newData[0], root: true, hasChildren: true, level: 0 };
    newData = [firstRow, ...R.tail(newData)];
    const addChildren = row => {
      if (!row.memberPersons || !row.memberGroups) {
        return row;
      } else {
        return { ...row, hasChildren: true };
      }
    };
    newData = R.map(addChildren, newData);
    const addPersons = (row, parentID, parentLevel) => {
      if (!row.memberPersons) {
        return;
      }
      const createPersonObj = (person, parent) => {
        return {
          ...person,
          name: `${person.firstName} ${person.lastName}`,
          parentID: parent,
          level: parentLevel + 1,
          partyType: "person"
        };
      };
      return R.map(x => createPersonObj(x.person, parentID), row.memberPersons);
    };

    const addParentID = row => {
      if (!row.memberGroups.length) {
        return;
      }
      const arrIDs = R.map(x => R.prop("uuid", x.group), row.memberGroups);
      console.table(arrIDs);
      const insertVal = rowIDs => {
        let aRow = R.find(x => x.uuid == rowIDs, newData);
        console.table(aRow);
        aRow = R.assoc("parentID", row.uuid, aRow);
        aRow = R.assoc("level", row.level + 1, aRow);
        aRow = R.assoc("partyType", "group", aRow);
        console.table(aRow);
        return aRow;
      };
      const r = R.map(x => insertVal(x), arrIDs);
      console.table(r);
      return r;
    };
    /* add before adding leafs like perso  */
    let rowsGroupsParentID = R.flatten(R.map(x => addParentID(x), newData));
    newData = [...newData, ...rowsGroupsParentID];
    newData = R.filter(x => x, newData);

    let moreRows = R.map(x => addPersons(x, x.uuid, x.level), newData);
    moreRows = R.filter(x => x, moreRows);
    console.table(R.flatten(moreRows));
    newData = [...newData, ...R.flatten(moreRows)];
    newData = R.filter(x => x.level === 0 || x.level, newData);
    const mapIndexed = R.addIndex(R.map);
    newData = mapIndexed((x, i) => R.assoc("order", i, x), newData);
    const changeKey = row => {
      return { ...row, id: row.uuid };
    };
    newData = R.map(
      x => R.omit(["uuid", "memberPersons", "memberGroups"], changeKey(x)),
      newData
    );
    const orderParentChild = rows => {
      const rows1 = R.filter(x => x.partyType == "group" || !x.partyType, rows);
      const orderedRows = [];
      console.table(rows1);
      const processRow = row => {
        const parentID = R.prop("id", row);
        orderedRows.push(row);
      };
      R.map(processRow, rows1);
    };
    console.table(newData);
  };
  onSelectRequest = (x, obj) => {
    console.log("onSelectRequest x,obj " + [x, JSON.stringify(obj)]);

    let newRecips, bRemove;
    const tempRequest = this.props.request;
    console.log(tempRequest);
    const add = () => {
      console.log("add");
      bRemove = false;
      const objRequest = R.pick(
        ["id", "name", "firstName", "lastName", "partyType"],
        obj
      );
      newRecips = [...tempRequest.recipients, objRequest];
    };
    const remove = () => {
      console.log("remove");
      bRemove = true;
      newRecips = R.filter(y => y.id != x, tempRequest.recipients);
    };
    console.table(tempRequest.recipients);
    R.contains(x, R.map(x => x.id, tempRequest.recipients)) ? remove() : add();
    //  console.log(R.contains(x, R.map(x => x.id, tempRequest.recipients)));

    tempRequest.recipients = newRecips;
    console.log("bRemove " + bRemove);
    this.props.updateSecondary(tempRequest, "requests", x, null, bRemove);
  };
  render() {
    return (
      <div>
        {this.props.dataPeople ? (
          <ListSingleLevel
            data={this.parse2(
              this.props.dataPeople,
              this.props.dataOrgs,
              this.props.dataAnimals,
              this.props.dataGroups,
              this.props.allGroups,
              this.props.groupHierarchy
            )}
            title={"Parties"}
            onselect={(x, obj) => this.onSelectRequest(x, obj)}
            groups={this.props.allGroups}
            multiSelect={true}
            request={this.props.request}
            onGroupSelect={this.props.onGroupSelect}
            hierarchyRemove={this.props.hierarchyRemove}
          />
        ) : (
          <div>no requests yet</div>
        )}
      </div>
    );
  }
}

const convertGifts = (obj, gifts) => {
  const a = R.map(x => x.id, R.path(["giftHistory"], obj));
  return R.filter(x => R.contains(x.id, a), gifts);
};
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
  console.log("convertGroups f ");
  const a = R.map(x => x.id, R.path(["recipients"], obj));
  const objGroups = R.filter(x => R.contains(x.id, a), groups);
  console.table(objGroups);
  /* to do get children of group and add to list */
  return objGroups;
};
const mapStateToProps = (state, ownProps) => ({
  selection: state.glogInput.searchID ? state.glogInput.searchID : null,
  data: state.glogInput.selectedRow
    ? state.glogInput[state.glogInput.node]
    : state.glogInput[state.glogInput.node][0],

  gifts: convertGifts(
    R.find(
      x => x.id == state.glogInput.selectedRow,
      state.glogInput.giftEventInstances
    ),
    state.glogInput.gifts
  )
    ? convertGifts(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.gifts
      )
    : null,

  node: state.glogInput.node ? state.glogInput.node : null,
  //  showSubSelect:state.glogInput.node === "people"
  showSubSelect: R.contains(state.glogInput.node, [
    "people",
    "orgs",
    "animals",
    "groups"
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
  allGroups: state.glogInput.selectedRow ? state.glogInput.groups : null,
  request: state.glogInput.requestID
    ? R.find(x => x.id === state.glogInput.requestID, state.glogInput.requests)
    : null,
  //  hier2: state.glogInput.hier2 ? state.glogInput.hier2[0].SearchGroup : null
  hier2: state.glogInput.hier2 ? state.glogInput.hier2 : null,
  groupHierarchy: state.glogInput.groupHierarchy
    ? state.glogInput.groupHierarchy
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSecondary: (payload, node, assocID, q, bRemove) => {
    dispatch(updateSecondary(payload, node, assocID, q, bRemove));
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

const PartiesContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(PartiesContainer);

export default PartiesContainer2;
