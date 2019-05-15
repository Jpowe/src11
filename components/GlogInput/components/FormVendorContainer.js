import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  updateForm,
  addSearch,
  addSearch2,
  addNew,
  updateSecondary,
  searchOrganization,
  deleteVendor
} from "../actions";
import Form from "./Form";
import { appLogic } from "../common/data";

class FormContainer extends Component {
  componentDidMount() {}
  getFields = tab => {
    console.table(R.find(x => x.tab === tab, appLogic));
    console.log(R.prop("fields", R.find(x => x.tab === tab, appLogic)));
    let str = R.prop("fields", R.find(x => x.tab === tab, appLogic));
    return str;
  };
  onSave = obj => {
    console.log("FVC onsave");
    console.log("currentVendorID " + this.props.currentVendorID);
    if (this.props.currentVendorID) {
      let vendorName = R.prop(
        "name",
        R.find(x => x.id == this.props.currentVendorID, this.props.vendors)
      );
      console.log("vendorName " + vendorName);
      /* to do   delete vendor by vendorName.   get uuid from search **/
      this.props.deleteVendor(vendorName);
      const fVendor = R.filter(
        x => x.id == this.props.currentVendorID,
        this.props.vendors
      );
      console.table(fVendor);
    }

    console.table(obj);
    this.props.onSave(obj);
  };
  render() {
    return (
      <div>
        <Form
          fields={this.getFields("vendor")}
          data={this.props.data}
          onSave={x => this.onSave(x)}
          bubbleUp={this.props.onSearchText}
          searchText={this.props.searchText}
          //  onHandle={this.props.addSearch}
          //  onHandle2={this.props.addSearch2}

          //  title={this.props.title}
          //onNew={() => this.props.onNew(this.props.node)}
        />
      </div>
    );
  }
}

const getVendor = (gifts, searchID, vendors) => {
  console.log("getOrder");

  const gift = R.find(x => x.id === searchID, gifts);
  const vendorID = R.prop("vendor", gift);

  console.table(R.find(x => x.id === vendorID, vendors));
  return R.find(x => x.id === vendorID, vendors);
};
const mapStateToProps = (state, ownProps) => ({
  data:
    state.glogInput.searchID != 0.1
      ? getVendor(
          state.glogInput.gifts,
          state.glogInput.searchID,
          state.glogInput.vendors
        )
      : null,
  vendors: state.glogInput.vendors,
  searchText: state.glogInput.searchText
    ? state.glogInput.searchText
    : ["formVendorContainer placeholder"],
  currentVendorID:
    state.glogInput.searchID != 0.1
      ? R.prop(
          "vendor",
          R.find(x => x.id == state.glogInput.searchID, state.glogInput.gifts)
        )
      : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: obj => {
    console.log("FVC onsave vendors");
    console.table(obj);
    dispatch(updateSecondary(obj, "vendors"));
  },
  onSearchText: str => {
    dispatch(searchOrganization(str));
  },
  deleteVendor: str => {
    dispatch(deleteVendor(str));
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

const FormContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);

export default FormContainer2;
