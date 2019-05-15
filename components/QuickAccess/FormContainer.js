import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import Form from "./Form";
import { pageJSON } from "./data";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* ROLES == 'adminSubmitter" || "submitter"'*/
      json: pageJSON
    };
  }
  filterPageJSON(json, locations) {
    const arrLocs = R.map(x => R.prop("name", x), locations);
    const filterLocs = obj => {
      let keep;
      const c = listItem => {
        if (!listItem.locations) {
          return true;
        }
        const arrTF = R.map(x => R.contains(x, arrLocs), listItem.locations);
        return R.contains(true, arrTF);
      };
      let newList = R.filter(x => c(x), obj.list);
      obj.list = newList;
      return obj;
    };
    return R.filter(x => filterLocs(x), json);
  }
  render() {
    return (
      <div>
        {this.props.locations ? (
          <Form
            pageJSON={this.filterPageJSON(pageJSON, this.props.locations)}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  locations: state.notifications.user
    ? state.notifications.user.locations
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  /* NONE */
});

const FormContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);

export default FormContainer2;
