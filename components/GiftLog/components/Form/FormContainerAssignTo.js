import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import Form from "./Form";
import { fieldsSummary } from "../../common/data";
import { saveFormGift } from "../../actions";
import { getCurrentAssignedTo } from "../../reducers";
//import { getCurrentRequest } from "../../reducers";

/* to do   add array of configs from a parent wrapper */
class FormContainerAssignTo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  addOptions(rows) {
    return rows.map(
      x =>
        x.name === "assignedTo"
          ? { ...x, options: this.props.personalAssistants }
          : x
    );
  }
  save = o => {
    console.log("FCAssign saveForm f");
    console.table(o);
    const n = R.prop("assignedTo", o);
    const strTitle = R.prop(
      "title",
      R.find(x => x.value === n, this.props.personalAssistants)
    );
    this.props.saveForm({ assignedTo: strTitle });
  };
  render() {
    return (
      <div>
        {this.props.personalAssistants && (
          <Form
            fields={this.addOptions(fieldsSummary)}
            data={this.props.assignedTo ? this.props.assignedTo : []}
            onSave={this.save}
            width={"200px"}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  personalAssistants: state.giftLog.personalAssistants
    ? state.giftLog.personalAssistants
    : null,
  assignedTo: getCurrentAssignedTo(state)
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: obj => {
    console.log(JSON.stringify(obj));
    dispatch(saveFormGift(obj));
  }
});

const FormContainerAssignTo2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainerAssignTo);

export default FormContainerAssignTo2;
