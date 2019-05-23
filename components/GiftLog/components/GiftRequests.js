import React, { Component } from "react";
import { connect } from "react-redux";
import FormContainerRequest from "./Form/FormContainerRequest";
import GeneologyPeopleList from "./List/PeopleListContainer";
import RequestsList from "./List/RequestsListContainer";
//import FormContainerAssignTo from "./Form/FormContainerAssignTo";

class GiftRequests extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div>
        <div style={{ display: "flex" }}>
          <FormContainerRequest />
          <div style={{ marginLeft: "50px" }}>
            <RequestsList />
          </div>{" "}
          <div style={{ marginLeft: "50px" }}>
            <GeneologyPeopleList />
          </div>
        </div>
      </div>
    );
  }
}

export default GiftRequests;
