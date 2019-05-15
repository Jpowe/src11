import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import AccountDetails from "./AccountDetails";

class AccountDetailsContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {
    console.log("AccountDetails nextProps  " + JSON.stringify(nextProps));
  }

  render() {
    return (
      <div>
        {this.props.data ? (
          <AccountDetails data={this.props.data} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const process = (data, id) => {
  console.table(data);
  const accts = R.prop("addeparAccounts", data[0]);
  console.table(accts);
  const accountData = R.filter(x => x.accountID == id, accts);
  console.table(accountData);
  return data;
};

const mapStateToProps = (state, ownProps) => ({
  data: state.addepar2intact.accountDetails
    ? process(
        state.addepar2intact.accountDetails,
        state.addepar2intact.selectedAccount
      )
    : null,
  selectedAccount: state.addepar2intact.selectedAccount
    ? state.addepar2intact.selectedAccount
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({});

const AccountDetailsContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetailsContainer);

export default AccountDetailsContainer2;
