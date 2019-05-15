import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { setNode, addSearch, addNew } from "../actions";
import SearchForm from "./SearchForm";

const t = "test";
class SearchFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleNode = v => {
    console.log("SearchFormContainer handleNode v: " + v);
    this.props.setNode(v);
  };
  getTitle = node => {
    const titles = [
      { node: "gifts", text: "Gift history" },
      { node: "locations", text: "Locations" },
      { node: "people", text: "People" }
    ];
    return R.prop("text", R.find(x => x.node === node, titles));
  };
  onNew = node => {
    console.log("SFC onNew node: " + node);
    this.props.onNew();
  };
  render() {
    return (
      <div>
        <SearchForm
          onHandle={this.props.addSearch}
          onselect={this.props.setNode}
          onNew={() => this.onNew(this.props.node)}
          title={this.getTitle(this.props.node)}
          showSubSelect={this.props.showSubSelect}
          hideSearch={this.props.node == "gifts"}
          node={this.props.node}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  data:state.glogInput.selectedRow
    ?state.glogInput[state.data.node][state.data.selectedRow - 1]
    :state.glogInput[state.data.node][0],
  node:state.glogInput.node ?state.glogInput.node : null,
  //  showSubSelect:state.glogInput.node === "people"
  showSubSelect: R.contains(state.data.node, ["people", "orgs", "animals"])
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setNode: x => {
    dispatch(setNode(x));
  },
  addSearch: () => {
    dispatch(addSearch());
  },
  onNew: () => {
    dispatch(addNew());
  }
});

const SearchFormContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  SearchFormContainer
);

export default SearchFormContainer2;
