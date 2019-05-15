import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { submitPending } from "./actions";
import FormPendingList from "./FormPendingList";
import { getEndPoints } from "../../utils/utils";
const data = [
  { name: "Alex", possessive: `Alex’s`, teamWorkID: "222160", value: 0 },
  { name: "Bianca", possessive: `Bianca's`, teamWorkID: "167406", value: 1 },
  { name: "Brad", possessive: `Brad’s`, teamWorkID: "222163", value: 2 },
  { name: "Cathy", possessive: `Cathy's`, teamWorkID: "167404", value: 3 },
  { name: "Chris", possessive: `Chris'`, teamWorkID: "168651", value: 4 },
  { name: "Dale", possessive: `Dale's`, teamWorkID: "167405", value: 5 },
  { name: "Emily", possessive: `Emily's`, teamWorkID: "130182", value: 6 },
  { name: "Audrey", possessive: `Audrey's`, teamWorkID: "241799", value: 7 },
  { name: "Carly", possessive: `Carly's`, teamWorkID: "243287", value: 8 },
  {
    name: "Mackenzie",
    possessive: `Mackenzie's`,
    teamWorkID: "243286",
    value: 9
  },
  { name: "Ami", possessive: `Ami's`, teamWorkID: "244807", value: 10 }
];
class PendingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* ROLES == 'adminSubmitter" || "submitter"'*/
    };
  }
  getDataSubmitter = data => {
    const d = R.find(x => x.name == this.props.firstName, data);
    return d ? d : data[0];
  };
  render() {
    return (
      <div>
        {this.props.allowed ? (
          <FormPendingList
            onSelect={this.props.onselect}
            dataPerson={this.getDataSubmitter(data)}
            data={data}
            role={this.props.adminSubmitter ? "adminSubmitter" : "submitter"}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  allowed: state.notifications.user
    ? R.contains(
        "CreatePendingSubmission",
        getEndPoints(state.notifications.user.roles)
      )
    : null,
  firstName: state.notifications.user.firstName
    ? state.notifications.user.firstName
    : null,
  adminSubmitter: R.contains(
    "CreatePendingReport",
    getEndPoints(state.notifications.user.roles)
  )
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onselect: (teamWorkID, dateFormat, list) => {
    dispatch(submitPending(teamWorkID, dateFormat, list));
  }
});

const PendingContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingContainer);

export default PendingContainer2;
