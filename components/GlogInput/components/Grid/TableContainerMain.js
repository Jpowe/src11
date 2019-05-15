import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  rowSubmit,
  setView,
  setSelectedRow,
  queryGiftEvent
} from "../../actions";

import Table from "./Table/Table";
import { columnsGiftEventInstance, events } from "../../common/data";

/* could R.pick row obj keys from here instand of RowMain */

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      col: null,
      ascend: null,
      page: 0,
      perPage: 100,
      totalRows: null,
      bPaginated: true,
      people: this.props.people,
      gifts: this.props.gifts
    };
  }
  componentDidMount() {
    console.log("TableContainerMain CDM");
    this.props.getDataForComp();
  }
  componentWillRecieveProps(nextProps) {
    console.log("TC CWRP nextProps.rows " + nextProps.rows);
  }
  sortColumns = columns => {
    return R.sort(R.ascend(R.prop("order")), columns);
  };
  removeSubmitColumn = columns => {
    return R.filter(x => x.name !== "override", columns);
  };
  /*
  byDate = (a, b) => {
    const c = new Date(a.date);
    const d = new Date(b.date);
    return this.state.ascend ? c - d : d - c;
  };
  */
  byDate = (a, b) => {
    console.log("byDate " + [JSON.stringify(a), JSON.stringify(b)]);
    const c = a.eventMonth;
    const d = b.eventMonth;
    console.log("c== " + c);
    console.log("d== " + d);
    console.log("byDate this.state.ascend " + this.state.ascend);
    console.log(this.state.ascend ? c - d : d - c);
    return this.state.ascend ? c - d : d - c;
  };
  onSort = (col, ascend) => {
    console.log("TCM onSort " + [col, ascend]);
    this.setState({ col: col, ascend: ascend });
    this.tcSort(this.props.rows);
  };
  tcSort = rows => {
    let col = this.state.col;
    /* hack column as name = firstName +lastName */
    col = "date";
    let ascend = this.state.ascend;
    console.log("tcSort " + ascend);
    let newRows, byStatus;
    //if (col == "date") {
    //  console.log("col is date");
    //newRows = R.sort(this.byDate, rows);
    //  } else {
    console.log("col is NOT date");
    byStatus = ascend ? R.descend(R.prop(col)) : R.ascend(R.prop(col));
    newRows = R.sort(byStatus, rows);
    //  }
    return newRows;
  };
  paginated = i => {
    console.log("TC paginated");
    const newRow = (this.state.page + i) * this.state.perPage;
    const page = this.state.page + i;
    const start = 0;
    const end = start + this.state.perPage;

    let id = R.prop("id", this.props.rows[newRow]);
    let a = R.map(
      x => (x.id !== id ? { ...x, selected: false } : x),
      this.props.rows
    );
    let b = R.map(x => (x.id === id ? { ...x, selected: true } : x), a);
    let c = R.find(x => x.id === id, b);
    this.setState({
      page: page
      //showRows: R.slice(0, this.state.perPage, this.state.rows)
    });
    this.onSelected(id, this.props.rows[newRow], null, "paginate");
  };
  /* UPDATING FOR PREVIOUS PERSON SELECT AS WELL CURRENT SELECTION */
  /* NOT ACCOUNTING FOR MULTI-SELECT */
  onSelected = (id, item, edit, source = "row") => {
    console.log("TC onSelected " + id, JSON.stringify(item));
    console.log("source paginate or row  " + source);
    this.props.onselected(id, item);
    if (source != "paginate") {
      this.props.bubbleUp(id);
    }
    edit && this.props.setView("details");
  };
  onSelected2 = (id, item) => {
    console.log("TC onSelected2 " + id, JSON.stringify(item));
    this.props.onselected(id, item);
  };
  paginateRows = rows => {
    const start = this.state.perPage * this.state.page;
    return R.slice(start, start + this.state.perPage, rows);
  };
  getColumns = node => {
    return columnsGiftEventInstance;
  };
  sortByCol = rows => {
    const createdSort = this.state.ascend
      ? R.sortWith([R.ascend(R.prop([this.state.col]))])
      : R.sortWith([R.descend(R.prop([this.state.col]))]);
    return createdSort(rows);
  };
  render() {
    return (
      <div>
        {!this.props.loading ? (
          <Table
            columns={
              !this.props.submittable
                ? R.compose(
                    this.sortColumns,
                    this.removeSubmitColumn
                  )(this.getColumns(this.props.node))
                : this.sortColumns(this.getColumns(this.props.node))
            }
            rows={
              this.state.bPaginated
                ? this.sortByCol(this.paginateRows(this.props.rows))
                : this.sortByCol(this.props.rows)
            }
            rollOverColor="#9ccc65"
            stripeRows={true}
            stripeRowsColor="#A4AECB"
            sortable={true}
            selectable={true}
            multiselect={false}
            selectColor="#f58c32"
            paginated={this.state.bPaginated}
            onPaginated={this.paginated}
            page={this.state.page}
            perPage={this.state.perPage}
            onselected={this.onSelected}
            onselected2={this.onSelected2}
            submittable={this.props.submittable}
            onSort={this.onSort}
            totalRows={this.props.totalRows}
            onUpdate={this.props.onUpdate}
            rowType="RowMain"
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const filteredStatuses = (status, gifts) => {
  const byDate = (a, b) => {
    const c = new Date(a.date);
    const d = new Date(b.date);
    return d - c;
  };
  //console.table(R.filter(x => x.status === "preapproved", gifts));
  let tableAction;
  if (R.contains("preapproved", status)) {
    return R.filter(x => x.statusGroup === "preapproved", gifts);
  } else if (R.contains("approved", status)) {
    return R.filter(x => x.statusGroup === "approved", gifts);
  } else if (R.contains("activity", status)) {
    return R.sort(byDate, gifts);
  } else if (R.contains("date", status)) {
    return R.sort(byDate, gifts);
  }
};

const convertRecipients = (obj, people, orgs, groups, animals) => {
  const recipients = obj.recipients;

  const getFirstName = a => {
    return R.prop("firstName", R.find(x => x.id == a.id, people));
  };
  const getLastName = a => {
    return R.prop("lastName", R.find(x => x.id == a.id, people));
  };
  const getName = id => {
    return getFirstName(id) + " " + getLastName(id);
  };
  const getOrg = a => {
    return R.prop("name", R.find(x => x.id == a.id, orgs));
  };
  const getGroup = a => {
    return R.prop("name", R.find(x => x.id == a.id, groups));
  };
  const getAnimal = a => {
    return R.prop("name", R.find(x => x.id == a.id, animals));
  };
  const getPartyName = x => {
    switch (x.type) {
      case "people":
        return getName(x);
        break;
      case "orgs":
        return getOrg(x);
        break;
      case "groups":
        return getGroup(x);
        break;
      case "animals":
        return getAnimal(x);
        break;
      default:
        console.log("NO SWITCH CASE");
    }
  };

  return {
    ...obj,
    recipients: R.uniq(R.map(x => getPartyName(x), recipients))
  };
};

const clean = (instances, people, orgs, groups, animals, mainFilter = null) => {
  //const giftInstances = R.map(x => getEventName(x), instances);

  let wholeList = R.map(
    x => convertRecipients(x, people, orgs, groups, animals),
    instances
  );

  const filterList = (mainFilter, wholeList) => {
    return !mainFilter
      ? wholeList
      : R.filter(x => x.eventMonth === mainFilter, wholeList);
  };

  //return filterList(mainFilter, wholeList);
  return wholeList;
};

const convertRegistryStatus = r => {
  console.log("r " + r + "typeof " + typeof r);
  let str;
  switch (r) {
    case 1:
      str = "Yes";
      break;
    case 2:
      str = "No";
      break;
    default:
      str = r;
  }
};

/*
recipients: obj.eventPersons
  ? R.uniq(R.map(x => `${x.firstName} ${x.lastName}`, obj.eventPersons))
  : [""],
  */
const clean2 = geis => {
  //  console.table(geis);
  const combineRecips = (persons, animals, evtOrgs, evtGroups) => {
    let peps = [""];
    let anims = [""];
    let organizations = [""];
    let grps = [""];
    if (persons) {
      peps = R.uniq(R.map(x => `${x.firstName} ${x.lastName}`, persons));
    }
    if (animals) {
      anims = R.uniq(R.map(x => x.name, animals));
    }
    if (evtOrgs) {
      organizations = R.uniq(R.map(x => x.name, evtOrgs));
    }
    if (evtGroups) {
      grps = R.uniq(R.map(x => x.name, evtGroups));
    }
    return [...peps, ...anims, ...organizations, ...grps];
  };
  const newObj = obj => {
    return {
      ...R.omit(["recurring"], obj),
      id: obj.uuid ? obj.uuid : obj.id,
      date: `${obj.eventMonth}/${obj.eventDay}`,
      recipients: combineRecips(
        obj.eventPersons,
        obj.eventAnimals,
        obj.eventOrganizations,
        obj.eventGroups
      )
        ? combineRecips(
            obj.eventPersons,
            obj.eventAnimals,
            obj.eventOrganizations,
            obj.eventGroups
          )
        : [""],
      registry: obj.registryStatus,
      recurring: obj.recurring[0] ? "True" : "False"
    };
  };
  const temp = R.map(x => newObj(x), geis);
  //console.table(temp);
  return R.map(x => newObj(x), geis);
};

const filterByMonth = (geis, month) => {
  const getID = obj => {
    return obj.id;
  };
  return R.uniqBy(getID, R.filter(x => x.eventMonth == month, geis));
};

const sortByTimestamp = rows => {
  const createdSort = R.sortWith([R.descend(R.prop("createdTimestamp"))]);
  return createdSort(rows);
};
const mapStateToProps = (state, ownProps) => ({
  node: state.glogInput.node ? state.glogInput.node : null,
  people: state.glogInput.people ? state.glogInput.people : null,
  groups: state.glogInput.groups ? state.glogInput.groups : null,
  animals: state.glogInput.animals ? state.glogInput.animals : null,
  orgs: state.glogInput.orgs ? state.glogInput.orgs : null,
  gifts: state.glogInput.gifts ? state.glogInput.gifts : null,
  //rows: state.glogInput.GEI_RAW ? clean2(state.glogInput.GEI_RAW) : null,
  rows: state.glogInput.giftEventInstances
    ? filterByMonth(
        clean2(state.glogInput.giftEventInstances),
        state.glogInput.mainFilter
      )
    : null,
  totalRows: state.glogInput.giftEventInstances
    ? filterByMonth(
        clean2(state.glogInput.giftEventInstances),
        state.glogInput.mainFilter
      ).length
    : null,
  loading: state.glogInput.loading
  //  mainFilter: state.glogInput.mainFilter ? state.glogInput.mainFilter : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getDataForComp: x => {
    //dispatch(getData());
  },
  onselected: (id, obj) => {
    dispatch(rowSubmit(id, obj));
    dispatch(setSelectedRow(id));
    dispatch(queryGiftEvent(id));
  },
  setView: x => {
    dispatch(setView(x));
  },
  onUpdate: (id, obj) => {
    //  dispatch(updateRow(obj));
  }
});

const TableContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);

export default TableContainer2;
