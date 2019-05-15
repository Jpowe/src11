import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  updateForm,
  addSearch,
  addSearch2,
  addNew,
  updateSecondary
} from "../actions";
import Form from "./Form";
import { appLogic, statuses } from "../common/data";

class FormOrderContainer extends Component {
  componentDidMount() {}
  getFields = tab => {
    console.table(R.find(x => x.tab === tab, appLogic));
    console.log(R.prop("fields", R.find(x => x.tab === tab, appLogic)));
    let str = R.prop("fields", R.find(x => x.tab === tab, appLogic));
    return str;
  };

  render() {
    return (
      <div>
        <Form
          fields={this.getFields("order")}
          data={this.props.data ? this.props.data : []}
          onSave={this.props.onSave}
          statuses={statuses}
          //  onHandle={this.props.addSearch}
          //  onHandle2={this.props.addSearch2}

          //  title={this.props.title}
          //onNew={() => this.props.onNew(this.props.node)}
        />
      </div>
    );
  }
}

const getOrder = (gifts, searchID, orders) => {
  console.log("getOrder");
  const gift = R.find(x => x.id === searchID, gifts);
  const orderGiftID = R.prop("order", gift);
  console.log("orderGiftID " + orderGiftID);
  console.table(R.find(x => x.id === orderGiftID, orders));
  return R.find(x => x.id === orderGiftID, orders);

  //R.find(x => x.id ===state.glogInput.searchID,state.glogInput.gifts)
};
const mapStateToProps = (state, ownProps) => ({
  data:
    state.glogInput.searchID != 0.01
      ? getOrder(
          state.glogInput.gifts,
          state.glogInput.searchID,
          state.glogInput.orders
        )
      : null

  //title: this.props.data ? "Data for item selected" : "Select item"
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: obj => {
    dispatch(updateSecondary(obj, "orders"));
  }
  /*
  addSearch: () => {
    dispatch(addSearch());
  },
  addSearch2: () => {
    dispatch(addSearch2());
  },
  onNew: () => {
    dispatch(addNew());
  }
  */
});

const FormOrderContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormOrderContainer);

export default FormOrderContainer2;
