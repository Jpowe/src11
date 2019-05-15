import React, { Component } from "react";
import { connect } from "react-redux";
import {
  search,
  setVar,
  addRelatives,
  parentChildRelationship,
  partnerRelationship
} from "../actions";
import GeneologyScreen from "./GeneologyScreen";

class GeneologyContainer extends Component {
  constructor(props) {
    console.log("GeneologyContainer construct");
    super(props);
    this.state = { searchType: "person" };
  }
  componentDidMount() {}
  searchType = typ => {
    console.log("GC searchType " + typ);
    this.setState({ searchType: typ });
  };
  searchText = str => {
    console.log("searchText " + [str, this.state.searchType]);
    this.props.search(str, this.state.searchType);
  };
  render() {
    const { title } = this.props;
    return (
      <div>
        <GeneologyScreen
          onSearchText={this.searchText}
          onSearchType={this.searchType}
          rows={this.props.rows}
          setCurrentSelection={this.props.setCurrentSelection}
          selectedPerson={this.props.selectedPerson}
          expandSelection={this.props.expandSelection}
          parentChildRelationship={this.props.parentChildRelationship}
          partnerRelationship={this.props.partnerRelationship}
          nResults={this.props.nResults}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  rows: state.giftLog.geneology ? state.giftLog.geneology : [],
  selectedPerson: state.giftLog.selectedPerson
    ? state.giftLog.selectedPerson
    : null,
  nResults: state.giftLog.searchResults ? state.giftLog.searchResults.length : 0
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  search: (str, typ) => {
    dispatch(search(str, typ));
  },

  setCurrentSelection: uuid => {
    dispatch(setVar("selectedPerson", uuid));
  },
  expandSelection: uuid => {
    dispatch(addRelatives(uuid));
  },
  parentChildRelationship: (parentUUID, childUUID, addRemove) => {
    dispatch(parentChildRelationship(parentUUID, childUUID, addRemove));
  },
  partnerRelationship: (addRemove, otherUUID, mainUUID) => {
    dispatch(partnerRelationship(addRemove, otherUUID, mainUUID));
  }
});

const GeneologyContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneologyContainer);

export default GeneologyContainer2;
