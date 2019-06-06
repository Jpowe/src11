import React, { Component } from "react";
import { connect } from "react-redux";
import { search } from "../actions";
import People from "./People";

class SearchContainer extends Component {
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
    this.props.search(str, "person");
  };
  render() {
    const { title } = this.props;
    return (
      <div>
        <People
          onSearchText={this.searchText}
          onSearchType={this.searchType}
          rows={this.props.rows}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  rows: state.giftLog.personGifts ? state.giftLog.personGifts : []
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  search: (str, typ) => {
    dispatch(search(str, typ));
  }
});

const SearchContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);

export default SearchContainer2;
