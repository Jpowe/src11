import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { updatePresence, updatePerson } from "./actions";
import InOffice from "./InOffice";
import { Log, LogTable, getEndPoints } from "../../utils/utils";
//import { data } from "./data";

const filterBroomfield = rows => {
  try {
    return R.filter(x => x.presenceToken, rows);
  } catch (e) {
    console.log(
      "%cCATCH   NO PRESENCE TOKEN but role Presence Viewer Submitter",
      "color: red"
    );
  }
};

class InOfficeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIndex: this.props.userUUID
        ? this.f(this.sort(this.props.data), this.props.userUUID)
        : null
    };
  }
  componentDidMount() {
    this.setState({ admin: true });
  }
  update = (time, message, uuid) => {
    this.props.onUpdate(time, message, uuid);
  };
  sort = rows => {
    let sw = R.sortWith([
      R.ascend(R.prop("isInvisible")),
      R.ascend(R.prop("firstName"))
    ]);
    return sw(rows);
  };
  f = (rows, uuid) => {
    return R.findIndex(R.propEq("uuid", uuid))(rows);
  };
  getSelfData = (rows, uuid) => {
    //  Log(JSON.stringify(R.find(x => x.uuid === uuid, rows)));
    return R.find(x => x.uuid === uuid, rows);
  };
  ////////////////////////////////////
  getArrNames = data => {
    return data.map(x => x.firstName);
  };
  arrNamesGreater1 = arr => {
    const count = arr => {
      return R.countBy(R.identity, arr);
    };
    return R.keys(R.filter(x => x > 1, count(arr)));
  };
  render() {
    return (
      <div>
        {this.props.data ? (
          <InOffice
            data={this.sort(this.props.data)}
            adminData={this.props.adminData}
            update={this.update}
            updatePerson={this.props.onUpdatePerson}
            admin={this.props.isAdmin}
            selfRow={this.getSelfData(this.props.data, this.props.userUUID)}
            duplicateFirstNames={this.arrNamesGreater1(
              this.getArrNames(this.props.data)
            )}
          />
        ) : (
          <div>LOADING</div>
        )}
      </div>
    );
  }
}
//R.contains(3, [1, 2, 3]);
const mapStateToProps = (state, ownProps) => ({
  userUUID: state.presence.rows ? state.notifications.user.uuid : null,
  data: state.presence.rows ? filterBroomfield(state.presence.rows) : null,
  adminData: state.presence.rows
    ? R.sort(R.ascend(R.prop("firstName")), state.presence.rows)
    : null,
  isAdmin: state.presence.rows
    ? R.contains("UpdatePerson", getEndPoints(state.notifications.user.roles))
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (time, message, uuid) => {
    dispatch(updatePresence(time, message, uuid));
  },
  onUpdatePerson: (id, visible, wifiAddy) => {
    dispatch(updatePerson(id, visible, wifiAddy));
  }
});

const InOfficeContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(InOfficeContainer);
export default InOfficeContainer2;
